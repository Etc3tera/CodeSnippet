// TamperMonkey (Chrome Add-on)'s plugin

// ==UserScript==
// @name         Youtube Download Link
// @namespace    http://your.homepage/
// @version      1.1
// @description  Generate Youtube Download Link
// @author       Khem S.
// @match        https://www.youtube.com/watch?*
// @grant        none
// @require		 http://code.jquery.com/jquery-latest.js
// ==/UserScript==

$(document).ready(function () {
	addGlobalStyle('.my-downloader{ padding-top: 20px; font-size: 18pt; } .my-downloader a{ display: inline-block; } .my-downloader a:not(:first-child){ margin-left: 20px; } .my-downloader a{ border: 1px solid #005D8F; color: #000; text-decoration: none; border-radius: 3px; background: linear-gradient(to bottom,#70CDFF,#EBF8FF); font-size: 14px; padding: 4px; } .my-downloader a:hover{ border-color: #B88A00; background: linear-gradient(to bottom,#FFDB70,#FFFAEB); } ');

    var link_objs = ytplayer.config.args.url_encoded_fmt_stream_map.split(',');
    var items = [];
    link_objs.forEach(function(obj){
        var item = {};
        obj.split('&').forEach(function(token){
            var matches = /(.+)=(.+)/gi.exec(token);
            if(matches[1] == 'url')
                item.url = decodeURIComponent(matches[2]);
            else if(matches[1] == 'quality')
                item.quality = matches[2];
        });
        items.push(item);
    });
    //console.log(items);

    var download_pane = $('<div class="my-downloader"></div>');
    items.forEach(function(item){
       download_pane.append('<a href="'+item.url+'">'+item.quality+'</a>');
    });
	// --------------------------------

	// VERSION 1.1: Add HTTP Hook function
	oldOpenFunc = XMLHttpRequest.prototype.open;
	XMLHttpRequest.prototype.open = function(){
		if(arguments[1].indexOf('videoplayback?') != -1){
			//console.log(arguments[1]);
			if(arguments[1].indexOf('audio') != -1 && $('#ydl_audio_link a').length === 0)
				$('#ydl_audio_link').html('<a href="' + tryReplaceRange(arguments[1]) + '">Link</a>');
			else if(arguments[1].indexOf('video') != -1 && $('#ydl_video_link a').length === 0)
				$('#ydl_video_link').html('<a href="' + tryReplaceRange(arguments[1]) + '">Link</a>');
		}
		oldOpenFunc.apply(this, arguments);
	};

    var foundInsertionPoint = false;
    var insertionTicker;

    function waitingForInsert()
    {
        if(!foundInsertionPoint){
            if($('#messages').length > 0){
                foundInsertionPoint = true;
                setTimeout(function(){
                    $('#messages').append(download_pane).append('<div style="margin-top: 15px; color:blue; font-size:14px;">วิธีใช้: คลิกขวาบนคุณภาพที่ต้องการแล้วเลือก "Save link as" หากใช้ไม่ได้ให้ทดลองโหลดด้วยลิงค์แยก Video กับ Audio ที่อยู่ด้านล่างแทน</div>')
                   .append('<div style="padding-top: 20px; font-size:14px;"><b>Video: </b><span id="ydl_video_link"></span><br><b>Audio: </b><span id="ydl_audio_link"></span></span></div>');
                }, 5000);
                clearInterval(insertionTicker);
            }
        }
    }

    insertionTicker = setInterval(waitingForInsert, 100);
});

function tryReplaceRange(str){
	var temp = str.replace(/[\?&]range=.+?&/g,'&');
	if(temp.length < str.length)
		return temp;
	return str.replace(/[\?&]range=.+?$/gm,'');
}

function addGlobalStyle(css){
	var head = document.getElementsByTagName("head")[0];
	var style = document.createElement("style");
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}