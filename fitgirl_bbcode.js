// ==UserScript==
// @name         fitgirl repack BBCode quick copy
// @namespace    https://greasyfork.org/
// @version      0.31
// @description  copy fitgirl infomation to clipboard with BBCode-encode
// @author       lucianjp
// @match        https://fitgirl-repacks.site/*
// @grant        GM_setClipboard
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==
 
(function() {
    'use strict';
   
    if(window.location.hostname == 'fitgirl-repacks.site'){
      steamButton();
    }
   

    function steamButton(){
      const $btn = document.createElement('a');
      const text = '复制BBCode';
      $btn.classList.add('btnv6_blue_hoverfade', 'btn_small');
      const $text = $btn.appendChild(document.createElement('span'));
      $text.innerHTML = `${text}<img src="https://ptpimg.me/sx226x.png">`;
      $btn.addEventListener('click', function(){
        GM_setClipboard(parseFitgirRepack(document), 'text');
        $text.childNodes[0].nodeValue = '已复制';
        setTimeout(function(){$text.childNodes[0].nodeValue = text; }, 3000);
      });
   
      const $container = document.querySelector("div[class='entry-meta']" )
      if (!$container) return

      $container.style = 'display: flex;justify-content: space-between;align-items: center;';
      $container.appendChild($btn);
    }
   
    // copy and credit to: https://pterclub.com/forums.php?action=viewtopic&forumid=36&topicid=3391
    function html2bb(str) {
        if (!str) return "";
        str = str.replace(/< *br *\/*>/g, "\n\n"); //*/
        str = str.replace(/< *b *>/g, "[b]");
        str = str.replace(/< *\/ *b *>/g, "[/b]");
        str = str.replace(/< *u *>/g, "[u]");
        str = str.replace(/< *\/ *u *>/g, "[/u]");
        str = str.replace(/< *i *>/g, "[i]");
        str = str.replace(/< *\/ *i *>/g, "[/i]");
        str = str.replace(/< *strong *>/g, "[b]");
        str = str.replace(/< *\/ *strong *>/g, "[/b]");
        str = str.replace(/< *em *>/g, "[i]");
        str = str.replace(/< *\/ *em *>/g, "[/i]");
        str = str.replace(/< *li *>/g, "[*]");
        str = str.replace(/< *\/ *li *>/g, "");
        str = str.replace(/< *ul *class=\\*\"bb_ul\\*\" *>/g, "");
        str = str.replace(/< *\/ *ul *>/g, "");
        str = str.replace(/< *h2 *class=\"bb_tag\" *>/g, "\n[center][u][b]");
        str = str.replace(/< *h[12] *>/g, "\n[center][u][b]");
        str = str.replace(/< *\/ *h[12] *>/g, "[/b][/u][/center]\n");
        str = str.replace(/\&quot;/g, "\"");
        str = str.replace(/\&amp;/g, "&");
        str = str.replace(/< *img *src="([^"]*)".*>/g, "\n");
        str = str.replace(/< *a [^>]*>/g, "");
        str = str.replace(/< *\/ *a *>/g, "");
        str = str.replace(/< *p *>/g, "\n\n");
        str = str.replace(/< *\/ *p *>/g, "");
        //Yeah, all these damn stars. Because people put spaces where they shouldn't.
        str = str.replace(//g, "\"");
        str = str.replace(//g, "\"");
        str = str.replace(/  +/g, " ");
        str = str.replace(/\n +/g, "\n");
        str = str.replace(/\n\n\n+/gm, "\n\n");
        str = str.replace(/\n\n\n+/gm, "\n\n");
        str = str.replace(/\[\/b\]\[\/u\]\[\/align\]\n\n/g, "[/b][/u][/align]\n");
        str = str.replace(/\n\n\[\*\]/g, "\n[*]");
        return str;
    }

    function parseFitgirRepack($document){
      var info1 = $document.querySelector("div[class='entry-content'] > p:nth-child(2)" );
      var info2_headerlist = $document.querySelectorAll("div[class='entry-content'] > h3" );

      if (!info1) {
        console.log("Not found: div[class='entry-content']");
        return          
      }

      if (!info2_headerlist) {
        console.log("Not found: div[class='entry-content'] > h3[3]");
        return          
      }
      var info1_bb = html2bb(info1.textContent)
      var foundFeature = Array.from(info2_headerlist).find(gg => (gg.textContent.indexOf('Feature')>=0));
      // console.log(foundFeature)

      var info2_header_bb = html2bb(foundFeature.innerHTML);
      var info2_list = foundFeature.nextSibling;
      while(info2_list && info2_list.nodeType != 1) {
        info2_list = info2_list.nextSibling;
      }
      if (!info2_list) {
        console.log("Not found: ul");
        return
      }
      var info2_list_bb = html2bb(info2_list.innerHTML);
      //   console.log(info2_list_bb)
      var hidetext = '[hide=安装步骤]\n [*]运行 \"Verify BIN files before installation.bat\" 进行MD5验证（可选）\n [*]运行 \"setup.exe\"安装游戏\n [*]开始游玩\n [*]游戏经过高压，需要一定时间才能解压完毕，请耐心等待。[/hide]';

      var output = hidetext + '\n\n[font=sans-serif]\n\n\n' + info1_bb + '\n\n[b]' + info2_header_bb + '[/b]\n' +  info2_list_bb + '\n[/font]'

      return output;
    }
   
  })();