import requests
import time

# เข้าไปดึงค่า date/time signature เพื่อมาใช้ใน request จริง
# ค่านี้เปลี่ยนทุกรอบ ใช้ซ้ำของเดิมได้ แต่คิดว่าไม่ควรทำ เพราะอาจโดนจับว่าเป็นบอทได้ง่ายขึ้น จึงควรเข้าไปดึงใหม่ทุกครั้ง
def get_dtsg(cookie):
    headers = {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
        'upgrade-insecure-requests': '1',
        'Cookie': cookie,
    }

    dtsg = ''
    r = requests.get('https://developers.facebook.com/tools/debug/og/object/', headers=headers)
    if r.status_code == 200:
        pos = r.text.find('fb_dtsg" value="') + len('fb_dtsg" value="')
        
        while r.text[pos] != '"':
            dtsg += r.text[pos]
            pos += 1
    return dtsg

def scrape_runner(input_ids, cookie, delay = 3):
    # url เป้าหมาย
    endpoint = 'https://developers.facebook.com/tools/debug/og/object/'
    
    # เฮดเดอร์ที่จะส่งเข้าไปในทุก request ได้มาจากการเลียนแบบข้อมูลที่ส่งไปจากบราวเซอร์
    headers = {
        'origin': 'https://developers.facebook.com',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
        'upgrade-insecure-requests': '1',
        'referer': 'https://developers.facebook.com/tools/debug/og/object/',
        'Cookie': cookie,
    }
    
    for id in input_ids:
        # ข้อมูลที่จะส่งเข้าไป
        payload = {
            'fb_dtsg': get_dtsg(cookie),
            'rescrape': 'true',
            'q': 'https://hinaboshi.com/walidet/' + id
        }
        r = requests.post(endpoint, headers=headers, data=payload)
        if r.status_code == 200:
            if r.text.find('Based on the raw') != -1:
                print(id + ' --> complete')
            else:
                print(id + ' --> fail')
        time.sleep(delay)

#ตัวอย่างการเรียกใช้
#scrape_runner(['575321325819976','575677132451062'], 'YOUR COOKIE HERE')