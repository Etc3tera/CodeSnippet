// FACEBOOK photo bot-click
// TO USE: view image in Theater mode and run this script, it saves and auto-click next button.
// counter: number of image to save
// writeToNewWindow: true, print result on new tab, false do nothing (output is still stored in myImages varieble)
// writeToNewWindow: string array

var myImages = [];
(function(counter, writeToNewWindow, acceptList){
	if(document.getElementsByClassName('fullScreenAvailable').length == 0 ||
		document.getElementsByClassName('fullScreenAvailable')[0].className.indexOf('pagingReady') == -1)
		alert('Please run this script on Theater Mode');

	myImages = [];
	var next_button;
	var currentUrl = "";
	var DELAY_LENGTH = 1000;

	function getPhotoUrl(){
		return document.getElementsByClassName('spotlight')[0].src;
	}

	function getPhotoInfo(){
		var image_id = /\/(\d+)\/\?/g.exec(document.baseURI)[1];
		if(typeof acceptSet[image_id] === 'undefined')
			return undefined;

		var obj = document.getElementsByClassName('see_more_link_inner');
		var photo_info;
		if(obj.length > 0)
			obj[0].click();

		photo_info = {
			id: image_id,
			text: obj.length > 0 ? document.getElementsByClassName('text_exposed_root text_exposed')[0].innerText : document.getElementsByClassName('hasCaption')[0].innerText,
			url: getPhotoUrl()
		};
		return photo_info;
	}

	var waitForImageLoad = function(){
		var url = getPhotoUrl();
		if(url != currentUrl){
			var photo_info = getPhotoInfo()
			if(photo_info)
				myImages.push(photo_info);
			counter--;
			if(counter > 0){
				if(counter % 10 == 0)
					console.log('Remain item: ' + counter);
				triggerNext();
			}
			else{
				if(writeToNewWindow){
					var newWindow = window.open();
					newWindow.document.write(createImagePage());
				}
				alert("Finished!!");
			}
		}else
			setTimeout(waitForImageLoad, DELAY_LENGTH);
	};

	var triggerNext = function(){
		next_button.click();
		setTimeout(waitForImageLoad, DELAY_LENGTH);
	};

	var createImagePage = function(){
		$html_string = '';
		myImages.forEach(function(img){
			$html_string += '<tr><td><img src="' + img.url + '" /></td><td><pre>' + img.text + '</pre></td></tr>'
		});

		return '<body><table border="1"><thead><tr><td>Image</td><td>Text</td></tr></thead>' + $html_string + '</table></body>';
	};

	// Process Start Form here
	var acceptSet = {};
	acceptList.forEach(function(e){
		acceptSet[e] = true;
	});

	// first image
	var photo_info = getPhotoInfo();
	if(photo_info)
		myImages.push(photo_info);
	next_button = document.getElementsByClassName('snowliftPager next')[0];
	counter--;
	if(counter > 0)
	{
		triggerNext();
	}
})(5, false, []);
