// TamperMonkey (Chrome Add-on)'s plugin

// ==UserScript==
// @name         Youtube Download Link
// @namespace    http://your.homepage/
// @version      1.0
// @description  Generate Youtube Download Link
// @author       Khem S.
// @match        https://www.youtube.com/watch?*
// @grant        none
// @require		 http://code.jquery.com/jquery-latest.js
// ==/UserScript==

$(document).ready(function () {
	addGlobalStyle('.yt-downloader{ margin-top: 20px; clear: both; list-style: none; } .yt-downloader li{ display: inline-block; } .yt-downloader li:not(:first-child){ margin-left: 20px; } .yt-downloader a{ border: 1px solid #005D8F; color: #000; text-decoration: none; border-radius: 3px; background: linear-gradient(to bottom,#70CDFF,#EBF8FF); font-size: 14px; padding: 4px; } .yt-downloader a:hover{ border-color: #B88A00; background: linear-gradient(to bottom,#FFDB70,#FFFAEB); } ');

    var link_objs = ytplayer.config.args.url_encoded_fmt_stream_map.split(',');
    var items = [];
    link_objs.forEach(function(obj){
        var item = {};
        obj.split('&').forEach(function(token){
            var matches = /(.+)=(.+)/gi.exec(token);
            if(matches[1] == 'url')
                item['url'] = decodeURIComponent(matches[2]);
            else if(matches[1] == 'quality')
                item['quality'] = matches[2];
        });
        items.push(item);
    });
    //console.log(items);

    var download_pane = $('<ul class="yt-downloader"></ul>');
    items.forEach(function(item){
       download_pane.append('<li><a href="'+item["url"]+'">'+item["quality"]+'</a></li>');
    });

    $('#watch7-user-header').append(download_pane).append('<p style="margin-top: 15px; color:blue;">วิธีใช้: คลิกขวาบนคุณภาพที่ต้องการแล้วเลือก "Save link as"</p>');
});

function addGlobalStyle(css){
    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}