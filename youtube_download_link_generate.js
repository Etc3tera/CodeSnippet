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

	// VERSION 1.0
	// -------------------------------------
	addGlobalStyle('.yt-downloader{ margin-top: 20px; clear: both; list-style: none; } .yt-downloader li{ display: inline-block; } .yt-downloader li:not(:first-child){ margin-left: 20px; } .yt-downloader a{ border: 1px solid #005D8F; color: #000; text-decoration: none; border-radius: 3px; background: linear-gradient(to bottom,#70CDFF,#EBF8FF); font-size: 14px; padding: 4px; } .yt-downloader a:hover{ border-color: #B88A00; background: linear-gradient(to bottom,#FFDB70,#FFFAEB); } ');

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

    var download_pane = $('<ul class="yt-downloader"></ul>');
    items.forEach(function(item){
       download_pane.append('<li><a href="'+item.url+'">'+item.quality+'</a></li>');
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

	$('#watch7-user-header').append(download_pane).append('<p style="margin-top: 15px; color:blue;">วิธีใช้: คลิกขวาบนคุณภาพที่ต้องการแล้วเลือก "Save link as" หากใช้ไม่ได้ให้ทดลองโหลดด้วยลิงค์แยก Video กับ Audio ที่อยู่ด้านล่างแทน</p>')
							.append('<p style="padding-top: 20px;"><b>Video: </b><span id="ydl_video_link"></span><br><b>Audio: </b><span id="ydl_audio_link"></span></span></p>');
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