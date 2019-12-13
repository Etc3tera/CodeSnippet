// ==UserScript==
// @name         My Pantip
// @version      1.0
// @match        https://pantip.com/topic/*
// ==/UserScript==

(function() {
    'use strict';
    $('body').css('background', '#d9effc');
    $('head').append(`<style>
.samgee .altcolor05 .display-post-wrapper-inner { background: #b2d9ea; }
.samgee .display-post-wrapper-inner { background: #f0c5d5; }
.samgee .display-post-wrapper.main-post { background: #fed797 }
.samgee .display-post-title { color: #333; }
.samgee .main-post .display-post-story { color: #333; }
.samgee .display-post-story { color: #333; }
.samgee .altcolor05 .display-post-story { color: #333; }
.samgee .display-post-number { color: #333; }
.samgee .display-post-tag-wrapper .tag-item { background: #e69288; color: #333; }
.samgee .emotion-vote-list.alt02, .samgee .altcolor05 .display-post-wrapper-inner .emotion-vote-list { background: #e69288; color: #333; }
.samgee .emotion-vote-user a:link, .samgee .emotion-vote-user a:visited { color: #333!important; }
.samgee .emotion-vote-list { background: #e69288; color: #333; }
.samgee .display-post-avatar .display-post-avatar-inner .display-post-name { color: #333; }
.samgee .display-post-avatar .display-post-avatar-inner .display-post-timestamp { color: #333; }
.remark-four-txt { color: #333!important; }
.samgee .pageno-title .title { color: #333; background: #e69288; }
.samgee .main-post .display-post-vote .icon-heart-like, .samgee .main-post .display-post-vote .icon-heart-dislike, .samgee .altcolor05 .display-post-vote .icon-heart-like, .samgee .altcolor05 .display-post-vote .icon-heart-dislike { background: #d7e7a9; }
.samgee .display-post-vote .icon-heart-like, .samgee .display-post-vote .icon-heart-dislike  { background: #d7e7a9; }
.samgee .loadmore-bar-paging a, .samgee .loadmore-bar-paging .loadmore-bar-inner { background-color: #fa6e4f!important; }
.samgee .comment-box-color .display-post-wrapper-inner { background: #feadb9; }
.samgee .display-post-wrapper.comment-box-color input, .samgee .display-post-wrapper.comment-box-color select, .samgee .display-post-wrapper.comment-box-color textarea { background: #f9e1e0;}
.button.letdo-butt span, .button.selected-butt.letdo-butt:hover span { background: #fa6e4f; }
.related-block-title { background-color: #70ae98; }
.related-block-title h3 { color: #333; }
.related-show .related-post-list .post-pick-nothumb { background: #adddce; }
.related-show .related-post-list .post-pick { background: #adddce; }
.samgee .comment-box-remark { background: #70ae98; }
.related-show .related-post-list .post-pick a, .related-show .related-post-list .post-pick-nothumb a, .post-pick-ad a, .post-pick-ad-nothumb a { color: #333; }
.related-show .related-post-list .post-pick .post-pick-by .by-name, .related-show .related-post-list .post-pick-nothumb .post-pick-by .by-name, .related-show .related-post-list .post-pick-ad .post-pick-by .by-name { color: #1500ff; }
.samgee .comment-box-remark .tag-item { color: #333; }
.samgee .comment-box-remark { color: #333; }
.samgee .sub-comment .display-post-wrapper-inner { background: #adddce; }
.samgee .sub-comment .emotion-vote-list { background: #e69288; }

</style>`);
    $('.pt-doodle').hide();
    $('#jump_paging').hide();
    $('.footer').hide();
})()