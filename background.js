var v_localStorageSupport = false;
var v_pluginkey = '';
var v_hoangUrl = '';
v_userid = 0;
var notID = 0;
v_tool = {};
var seted_url = '';
var old_version = '1.0.4';
function toHost(url) {
    var host = new RegExp('(https{0,1}://.*?)/.*').exec(url);
    if (host == null)
        host = url;
    else
        host = host[1];
    return host;
}



/* define default values for Language and the keyboard shortcut */
if (localStorage['language'] == undefined)
    localStorage['language'] = 'English';
if (localStorage['shortcut'] == undefined)
    localStorage['shortcut'] = 'true,false,true,false,83,0';
if (localStorage['auto'] == undefined)
    localStorage['auto'] = 'false';
if (localStorage['button'] == undefined)
    localStorage['button'] = 'true';
if (localStorage['message'] == undefined)
    localStorage['message'] = 'true';
if (localStorage['general_btn_status'] == undefined) {
    localStorage['general_btn_status'] = 'true';
    localStorage['serped_plugin_bklm'] = 0;
//    var win = window.open('http://www.serped.com/', '_blank');
//    if (win) {
//        //Browser has allowed it to be opened
//        win.focus();
//    } else {
//        //Browser has blocked it
//        alert('Please allow popups for this website');
//    }
}
if (localStorage['general_domain_status'] == undefined)
    localStorage['general_domain_status'] = 'false';

/* always disable auto-proofread feature in older versions of Chrome */
if (chrome.browserAction['setPopup'] == undefined)
    localStorage['auto'] = false;

/* we're going to get some nasty errors if our options are not set */
var options = ['options', 'sites', 'phrases', 'guess'];
for (var x = 0; x < options.length; x++) {
    if (localStorage[options[x]] == undefined)
        localStorage[options[x]] = '';
}

//chrome.runtime.onUpdateAvailable.addListener(function(details) {
//  console.log("updating to version " + details.version);
//  chrome.runtime.reload();
//});
//
//function plugin_update_notifiction(){
//    if (window.Notification) {
//        var ntOption = {
//            type : "basic",
//            title: "Please update plugin"
//        };
//        ntOption.iconUrl = chrome.runtime.getURL("images/icon-128.png");
//        ntOption.message = "Your plugin is out of date please update";
//        chrome.notifications.create("id"+notID++, ntOption);
//    }
//}
////chrome.notifications.onButtonClicked.addListener(replyBtnClick);
//chrome.notifications.onClicked.addListener(function() {
//   var newURL = "http://www.youtube.com/watch?v=oHg5SJYRHA0";
//   chrome.tabs.create({ url: newURL });
//});
//
//chrome.runtime.requestUpdateCheck(function(status) {
//  if (status == "update_available") {
//    //       set_update_msg_link();
//    plugin_update_notifiction();
//    
//// Conditionally initialize the options.
//    if (!localStorage.isInitialized) {
//      localStorage.isActivated = true;   // The display activation.
//      localStorage.frequency = 1;        // The display frequency, in minutes.
//      localStorage.isInitialized = true; // The option initialization.
//    }
//    
//    fun_get_plugin_version(function (res) {
//        if(res.status == 1){
//            if (window.Notification) {
//                setInterval(function() {
//                    var manifestData = chrome.runtime.getManifest();
//                    var old_version = manifestData.version; 
//                    if(res.version != old_version){
//                        plugin_update_notifiction();
//                    }
//                }, res.interval_time);
//            }
//        }
//    });
//    
//    console.log("update pending...");
//  }
//  else if (status == "no_update") {
//    console.log("no update found");
//  } else if (status == "throttled") {
//    console.log("Oops, I'm asking too frequently - I need to back off.");
//  }
//});


/* a function to refresh all the tab icons */
function checkTab(tabId, url, change) {
    var sites = localStorage['sites'].split(/,\s+/);
    var enabled = true;
    var aurl = toHost(url);
    for (var x = 0; x < sites.length; x++) {
        if (sites[x] != '' && sites[x] == aurl)
            enabled = false;
    }

    if (!change)
        chrome.tabs.sendRequest(tabId, enabled ? 'enabled' : 'disabled');


    if (enabled) {
        chrome.browserAction.setIcon({path: v_imageObject.enable, tabId: tabId});

        /* check if we're using an older ver of Chrome, if so don't even mess with page actions 
         if (chrome.browserAction['setPopup'] != undefined)
         chrome.browserAction.setPopup({popup: 'action/disable.html', tabId: tabId});*/
    }
    else {
        chrome.browserAction.setIcon({path: v_imageObject.disable, tabId: tabId});
        /* check if we're using an older ver of Chrome, if so don't even mess with page actions 
         if (chrome.browserAction['setPopup'] != undefined)
         chrome.browserAction.setPopup({popup: 'action/enable.html', tabId: tabId});*/
    }

    if (localStorage['button'] == 'true') {
        chrome.browserAction.enable(tabId);
        /*chrome.browserAction.setPopup({popup: 'action/enable.html'});*/
    }
    else {
        chrome.browserAction.disable(tabId);
        chrome.browserAction.setPopup({popup: 'action/plugin.html'});
    }

    /* show AtD will have nothing to do with these pages */
    if (aurl == 'http://acid3.acidtests.org' || aurl == 'https://docs.google.com' || aurl == 'http://spreadsheets.google.com') {
        chrome.browserAction.setIcon({path: v_imageObject.block, tabId: tabId})
        //chrome.browserAction.setPopup({popup: 'action/block.html', tabId: tabId});
        //chrome.browserAction.setPopup({popup: 'action/plugin.html'});
        enabled = false;
    }
}

function refreshTabs() {
    chrome.windows.getAll({populate: true}, function (windows) {
        for (var x = 0; x < windows.length; x++) {
            var window = windows[x];
            for (var y = 0; y < window.tabs.length; y++) {
                checkTab(window.tabs[y].id, window.tabs[y].url);
            }
        }
    });
}

function fun_chekEnterUrl(){
    if (typeof (Storage) !== "undefined")
        v_localStorageSupport = true;
    else
        v_localStorageSupport = false;
    if (v_localStorageSupport)
    {
        v_hoangUrl = localStorage.getItem("hoangUrl");
        chrome.browserAction.setPopup({popup: 'action/features.html'});
        $('.body-pluginkey').css('width', '776');
        $('.body-pluginkey').load('features.html');
        setTimeout(function () {
            fun_setEvents();
        }, 200);
        //chrome.browserAction.setPopup({popup: 'action/index.html'});
    }
    else{
        // set cookie
    }    
}


function fun_getPluginKey()
{
    if (typeof (Storage) !== "undefined")
        v_localStorageSupport = true;
    else
        v_localStorageSupport = false;

    if (v_localStorageSupport)
    {
        v_pluginkey = localStorage.getItem("serpedplukey");
        chrome.browserAction.setPopup({popup: 'action/plugin.html'});
        if (v_pluginkey == 'undefined' || v_pluginkey == '' || v_pluginkey == 'null' || v_pluginkey == null)
        {
            localStorage.setItem("serped_plugin_bklm", 0);
//             setTimeout(function () {
//                fun_setEvents();
                chrome.browserAction.setPopup({popup: 'action/plugin.html'});
                $('.body-pluginkey').css('width', '285');
                $('.body-pluginkey').load('plugin.html'); 
//            }, 3000);
        }
        else
        {
            localStorage.setItem("serped_plugin_bklm", 1);
            setTimeout(function () {
                fun_checkPluginKeyActivation(v_pluginkey);
            }, 200)
        }
    }
}
function foo(x) {
    var dom = x.document.documentElement.outerHTML;
//    console.log(dom);
}
/* setup code to show whether AtD is enabled/disabled on the current site */
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    var url_test = '';
    if (typeof (changeInfo.url) !== "undefined") {
        url_test = changeInfo.url;
        checkTab(tabId, changeInfo.url, true);
    }
    else {
        url_test = tab.url;
        chrome.tabs.get(tabId, function (t) {
             checkTab(tabId, t.url, true);
        });
    }
//    console.log(url_test);
    
    
//chrome.tabs.executeScript(tab.id, {file: "content.js"}, function() {
//      // Note: we also sent a message above, upon loading the event page,
//      // but the content script will not be loaded at that point, so we send
//      // another here.
//      sendMessage();
//    });


    if (changeInfo.status === 'complete')
    {
        
        //fun_getPluginKey();
//        chrome.tabs.executeScript(null, {file: "scripts/jquery.min.1.12.4.js"}, function () {
//        });
        try{
//            chrome.tabs.executeScript(null, {file: "content_script_forgooglresult.js"});
//            chrome.tabs.executeScript(null, {file: "scripts/datatable/jquery.dataTables.js"}); 
            
            chrome.tabs.executeScript(tab.id, {file: "content_script_forgooglresult.js"});
            chrome.tabs.executeScript(null, {file: "scripts/datatable/jquery.dataTables.js"}); 
            
            
        }catch(err){
            console.log(err);
            try{
                chrome.tabs.executeScript({
                    file: "content_script_forgooglresult.js",
                    allFrames: true
                });

                chrome.tabs.executeScript({
                    file: "scripts/datatable/jquery.dataTables.js",
                    allFrames: true
                });
            }catch(err){
                console.log("Error: "+err);
            }
        }
        
//        
        
                //chrome.tabs.executeScript({file: "content_script_forgooglresult.js"});
                //chrome.tabs.executeScript(null, {file: "content_script_forgooglresult.js"});
                //chrome.tabs.executeScript({code: 'document.body.style.backgroundColor="red"'});
    }
//    $.ajax({
//        url:'https://www.google.co.in/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=test',
//        type:'GET',
//        crossDomain: true,
//        success: function(data){
//            var test_arry = $(data);
//            console.log($(data).find('div.serped_plugin_div'));
//            console.log("test");
//            console.log($(test_arry[11]).hasClass('serped_plugin_div'));
//
//        }
//     });
});

var clickHandler = function (e, tab) {
//    console.log(e);
    var url = e.pageUrl;
    var serpedPostUrl = '';
    // menu for keyword selection start
    if (e.menuItemId.match("kwrd_research")) {
        get_contextMenu_keyword_link(e.menuItemId, e.selectionText, "keyword");
//        serpedPostUrl = get_contextMenu_keyword_link(e.menuItemId);
//        console.log(serpedPostUrl);
    }
    else if (e.menuItemId == "what_ranks_where") {
        get_contextMenu_keyword_link(e.menuItemId, e.selectionText, "keyword");
//        serpedPostUrl = get_contextMenu_keyword(e.menuItemId);
    }
    else if (e.menuItemId == "competition_analyzer") {
        get_contextMenu_keyword_link(e.menuItemId, e.selectionText, "keyword");
//        serpedPostUrl = get_contextMenu_keyword(e.menuItemId);
    }
    else if (e.menuItemId == "long_tail_keywords") {
        get_contextMenu_keyword_link(e.menuItemId, e.selectionText, "keyword");
//        // menu for keyword selection end
    }
    else if (e.menuItemId == "suspend_keyword") {
        // keyword
    } else if (e.menuItemId == "bulk_analyzer") {
        get_contextMenu_keyword_link(e.menuItemId, e.selectionText, "links");
    }
    else if (e.menuItemId == "backlinks_explorer") {
        get_contextMenu_keyword_link(e.menuItemId, e.selectionText, "links");
    }
    else if (e.menuItemId == "site_explorer") {
        get_contextMenu_keyword_link(e.menuItemId, e.selectionText, "links");
    }
    else if (e.menuItemId == "suspend_link") {
        get_contextMenu_keyword_link(e.menuItemId, e.selectionText, "links");
    }
    else if (e.menuItemId == "backlinks_managerlink") {
        seted_url = e.pageUrl;
        var domail = extractDomain(e.pageUrl); 
        var link_url = e.linkUrl;
        
//        chrome.tabs.getSelected(null, function (tab) {
//           console.log(tab); 
//           
//        });
        
        if (domail.indexOf("google") > -1) {
            var geturl = link_url.split("&");
            $.each(geturl, function (key, value) {
                if (value.indexOf("url") > -1) {
                    var getTag = value.split("=");
                    if (getTag[0] == "url") {
                        link_url = getTag[1];
                    }
                }
            });
        }
        link_url = decodeURI(link_url);
        localStorage.setItem("backlinks_manager_link", link_url);
        localStorage.setItem("backlinks_manager_domain", e.pageUrl);
//        alert("test");
//        chrome.tabs.executeScript(null, {file: "action/backlinks_manager_links.html"});
    }
    else if (e.menuItemId == "backlinks_managerlink_selection") {
        var domail = extractDomain(e.selectionText);
        var link_url = e.selectionText;
        if (domail.indexOf("google") > -1) {
            var geturl = link_url.split("&");
            $.each(geturl, function (key, value) {
                if (value.indexOf("url") > -1) {
                    var getTag = value.split("=");
                    if (getTag[0] == "url") {
                        link_url = getTag[1];
                    }
                }
            });
        }
        link_url = decodeURI(link_url);
        localStorage.setItem("backlinks_manager_link", link_url);
        localStorage.setItem("backlinks_manager_domain", e.pageUrl);
//        alert("test");
//        chrome.tabs.executeScript(null, {file: "action/backlinks_manager_links.html"});
    }
    else if (e.menuItemId == "bulk_analyzerlink") {
        var domail = extractDomain(e.pageUrl);
        var link_url = e.linkUrl;
        if (domail.indexOf("google") > -1) {
            var geturl = link_url.split("&");
            $.each(geturl, function (key, value) {
                if (value.indexOf("url") > -1) {
                    var getTag = value.split("=");
                    if (getTag[0] == "url") {
                        link_url = getTag[1];
                    }
                }
            });
        }
        get_contextMenu_keyword_link("bulk_analyzer", link_url, "links");
    }
    else if (e.menuItemId == "backlinks_explorerlink") {
        var domail = extractDomain(e.pageUrl);
        var link_url = e.linkUrl;
        if (domail.indexOf("google") > -1) {
            var geturl = link_url.split("&");
            $.each(geturl, function (key, value) {
                if (value.indexOf("url") > -1) {
                    var getTag = value.split("=");
                    if (getTag[0] == "url") {
                        link_url = getTag[1];
                    }
                }
            });
        }
        get_contextMenu_keyword_link("backlinks_explorer", link_url, "links");
    }
    else if (e.menuItemId == "site_explorerlink") {
        var domail = extractDomain(e.pageUrl);
        var link_url = e.linkUrl;
        if (domail.indexOf("google") > -1) {
            var geturl = link_url.split("&");
            $.each(geturl, function (key, value) {
                if (value.indexOf("url") > -1) {
                    var getTag = value.split("=");
                    if (getTag[0] == "url") {
                        link_url = getTag[1];
                    }
                }
            });
        }
        get_contextMenu_keyword_link("site_explorer", link_url, "links");
    }


//    else {
//        if (e.selectionText) {
//            // The user selected some text, put this in the message.
//            serpedPostUrl += e.selectionText;
//            //          serpedPostUrl += "message=" + encodeURI(e.selectionText) + "&";
//        }
//
//        if (e.mediaType === "image") {
//            //            serpedPostUrl += "imageurl=" + encodeURI(e.srcUrl) + "&";
//
//            serpedPostUrl = e.linkUrl;
//        }
//
//        chrome.tabs.create(
//                {"url": serpedPostUrl});
//
//    }

//    else if (e.menuItemId == "contextimage") {
//        if (e.mediaType === "image") {      
////            serpedPostUrl += "imageurl=" + encodeURI(e.srcUrl) + "&";
//            serpedPostUrl = e.srcUrl;
//            alert("serped url="+serpedPostUrl);
//        }
////        serpedPostUrl = encodeURI(e.srcUrl);
//    }

//    else if (e.menuItemId == "child1") {
////        chrome.contextMenus.create({"title": "Test parent item", "id": "parent1"});
////        chrome.contextMenus.update("child1",{"title": "Test updated child3", "id": "child3"});
//        alert("child 1 clicked");
//    }
//    else if (e.menuItemId == "child2") {
//        var data = test_contextMenu();
//        serpedPostUrl += data;
//    }
//    else if (e.menuItemId == "contextpage") {
//        serpedPostUrl = encodeURI(e.pageUrl);
//    }
//    else if (e.menuItemId == "contextselection") {
//        serpedPostUrl += e.selectionText;
//    }
//    else if (e.menuItemId == "contextlink") {
//        //        serpedPostUrl = encodeURI(e.pageUrl);
//        console.log("item " + e.menuItemId + " was clicked");
//    }
//    else {
//        if (e.selectionText) {
//            // The user selected some text, put this in the message.
//            serpedPostUrl += e.selectionText;
//            //          serpedPostUrl += "message=" + encodeURI(e.selectionText) + "&";
//        }
//
//        if (e.mediaType === "image") {
//            //            serpedPostUrl += "imageurl=" + encodeURI(e.srcUrl) + "&";
//
//            serpedPostUrl = e.linkUrl;
//        }
//
//        chrome.tabs.create(
//                {"url": serpedPostUrl});
//
//    }
//    chrome.tabs.create(
//            {"url": serpedPostUrl});
}

chrome.contextMenus.onClicked.addListener(clickHandler);
// shortCut created fir testing
chrome.commands.onCommand.addListener(function (command) {
    if (command == "test") {
        //alert('Keyboard shortcut from extension worked!');
    }
});

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function () {

//    
   

// var win = window.open('http://www.serped.com/', '_blank');
//    if (win) {
//        //Browser has allowed it to be opened
//        win.focus();
//    } else {
//        //Browser has blocked it
//        alert('Please allow popups for this website');
//    }

//    if (localStorage['sites'] !== undefined)
//        var values = localStorage['sites'].split(/,\s*/);
//    else
//        var values = [];
//
//    if (values.length == 0) {
    localStorage['sites'] = ",http://*/*";
//    }

    chrome.windows.getAll({populate: true}, function (window_list) {

        for (var x = 0; x < window_list.length; x++) { 
            var list = [];
            list = list.concat(window_list[x].tabs);
            for (var i = 0; i < list.length; i++) {
//                if(i == 1){ 
//                    var code = 'window.location.reload();'; 
//                    chrome.tabs.executeScript(list[i].id, {code: code});
//                }
                var c_url = list[i].url;
                on_load_disable_site(c_url);
            }
        }
    });

    make_extra_contextMenu(1, "", 1);



//    if (!$.inArray(new_items, values)) {
//        values.push(new_items);
//        values = makeUnique(values);
//        localStorage['sites'] = values.join(', ');
//        refreshTabs();
//    }

});

/* chrome message passing listener */
chrome.extension.onRequest.addListener(function (request, sender, callback) {
//    console.log(request.data);
    var xhr = new XMLHttpRequest();
    if (request.command == 'options') {
        callback({auto: localStorage['auto'],
            options: localStorage['options'],
            sites: localStorage['sites'],
            phrases: localStorage['phrases'],
            shortcut: localStorage['shortcut']});
//        return;
    }
    else if (request.command == 'alert') {
        if (localStorage['message'] == 'true') {
            alert(request.text);
        }
//        return;
    }
    else if (request.command == 'refreshTabs') {
        refreshTabs();
//        return;
    }
    else if (request.command == 'ignore') {
        var strings = localStorage['phrases'].split(/,\s*/);
        strings.push(request.word);
        localStorage['phrases'] = strings.join(', ');
//        return;
    }
    else if (request.command == 'open') {
        var left = (screen.width / 2) - (480 / 2);
        var top = (screen.height / 2) - (380 / 2);
        window.open(request.url, '', 'width=480,height=440,toolbar=0,status=0,resizable=0,location=0,menuBar=0,left=' + left + ',top=' + top).focus();
//        return;
    }
    if (request.message == "setText") {
        var expression = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/;
        var regex = new RegExp(expression);
        var t = request.data_val;
        if (t.match(regex))
        {
            get_contextMenu_keyword(2, "update");
        } else {
            get_contextMenu_keyword(1, "update");
        }
//        var contexts = ["image", "link"];
//        for (var i = 0; i < contexts.length; i++) {
//            var context = contexts[i];
//            var title = "Test '" + context + "' menu item";
//            var id = chrome.contextMenus.create({"title": title, "contexts": [context],
//                "id": "context" + context});
//        }
        window.seltext = request.data_val;
//        console.log(window.seltext);
    } else if (request.message == "checkButton") {
        fun_checkButtonStatus(request.data_val, function (res) {
            callback(res);
        });
    } else if (request.message == "checkGeneralButton") {
        callback({general_btn: localStorage['general_btn_status']});
    } else if (request.message == "checkDomainButton") {
        callback({general_domain_btn: localStorage['general_domain_status']});
    }
    else if (request.message == "backlinks_manager_link") {
        fun_get_backlinksm_url_data(request.cntUrl,function (res) {
            callback(res);
        });
    }
    else if (request.message == "get_bklm_link_formate") {
        check_bklm_project(request.pid, request.sid, request.in_id, function (res) {
            callback(res);
        });
//        callback({backlinks_url_link: localStorage['backlinks_manager_link']});
    }
    else if (request.message == "unset_bklm_link") {
        localStorage.setItem("backlinks_manager_link", "");
        localStorage.setItem("backlinks_manager_domain", "");

    }
    else if (request.message == "gent_ct_af_set_key") {
        make_extra_contextMenu(1, "", 1);
    }
    else if (request.message == "add_extra_bklm_url") {
        add_bklm_url(request.more, function (res) {
            callback(res);
        });
    }
    else if (request.message == "bklm_url_model") {
        bklm_url_model(request.pid,request.sid,request.links,request.target_url, function (res) {
            callback(res);
        });
    }
    else if (request.message == "add_bklm_page") {
        add_bklm_page(request.project_id,request.sid,request.url,request.site_name,request.main_kwrd,request.other_kwrds,request.engine,request.date, function (res) {
            callback(res);
        });
    }
    else if (request.message == "bklm_import_links") {
        bklm_import_links(request.params,request.totalLinks,request.type,request.pb_date,request.anchor,request.link,request.tag, function (res) {
            callback(res);
        });
    }
    else if (request.message == "get_whats_number") {
        get_whats_number(request.params,function(res){
            callback(res);
        });
    }
    else if (request.message == "set_alerted") {
         localStorage.setItem('alerted','no');
    }
    else if (request.message == "reloadPage") {
             var alerted = localStorage.getItem('alerted') || '';
              if (alerted != 'yes') {
        var code = 'alert("Refresh page to enable this feature")'; 
//        var code = 'window.location.reload();'; 
//        var test = confirm("Do you want to reload?");
//            if(test){
                chrome.tabs.executeScript(request.tabId, {code: code});
                localStorage.setItem('alerted','yes');
                localStorage.setItem("backlinks_manager_link", "");
                localStorage.setItem("backlinks_manager_domain", ""); 
            }else{
                 localStorage.setItem('alerted','no');
            }
//            }
                
    }
    else if (request.message == "updateButton") {
        fun_updateButtonStatus(request.data_val, function (res) {
            callback(res);
        });
        $("#top_btn").remove();
    } 
    else if (request.message == "getData") {
        //        var url_expresion = '/(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/';
        fun_analyzeKeywordForGoogleResult(request.data_val, function (res) {
            if (window.Notification) {
                if(res.limitStatus == 1){
                    var ntOption = {
                                        type : "basic",
                                        title: "Daily Limit Notification"
                                };
                    ntOption.iconUrl = chrome.runtime.getURL("images/icon-128.png");
                    ntOption.message = res.msg;
                    
                    chrome.notifications.create("id"+notID++, ntOption);
//                    new Notification(4, {
//                        body: 'You reach to daily limit'
//                      });
                }
            } 
            callback(res);
        });
    }
    else if (request.message == "getTopData") {
        //        var url_expresion = '/(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/';
        fun_analyzeKeywordTopResult(request.data_val, function (res) {
            if (window.Notification) {
                if(res.limitStatus == 1){
                    var ntOption = {
                                        type : "basic",
                                        title: "Daily Limit Notification"
                                };
                    ntOption.iconUrl = chrome.runtime.getURL("images/icon-128.png");
                    ntOption.message = res.msg;
                    chrome.notifications.create("id"+notID++, ntOption);
//                    new Notification(4, {
//                        body: 'You reach to daily limit'
//                      });
                }
            } 
            callback(res);
        });
    }
    else if (request.message == "disable_site") {
        //disable_site
        var c_url = request.data_val;
        on_load_disable_site(c_url);
    }
    else {
        if (!xhr)
            return null;

        /* handle language option */
        var language = localStorage['language'];
        /*if (language == 'French')
         request.url = 'https://fr.service.afterthedeadline.com' + request.url;
         else if (language == 'German')
         request.url = 'https://de.service.afterthedeadline.com' + request.url;
         else if (language == 'Portuguese')
         request.url = 'https://pt.service.afterthedeadline.com' + request.url;
         else if (language == 'Spanish')
         request.url = 'https://es.service.afterthedeadline.com' + request.url;
         else
         request.url = 'https://en.service.afterthedeadline.com' + request.url;*/



        if (typeof (request.data) != 'undefined') {
            if (language == 'French')
                request.url = 'https://fr.service.afterthedeadline.com' + request.url;
            else if (language == 'German')
                request.url = 'https://de.service.afterthedeadline.com' + request.url;
            else if (language == 'Portuguese')
                request.url = 'https://pt.service.afterthedeadline.com' + request.url;
            else if (language == 'Spanish')
                request.url = 'https://es.service.afterthedeadline.com' + request.url;
            else
                request.url = 'https://en.service.afterthedeadline.com' + request.url;

            xhr.open('POST', request.url, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    callback(xhr.responseText);
                }
            };

            if (localStorage['user-key'] == undefined)
                localStorage['user-key'] = 'atd-chrome-' + (new Date()).getTime();

            if (request.data.length)
                request.data = encodeURI(request.data).replace(/&/g, '%26');

            if (request.data.length)
                request.data += '&key=' + localStorage['user-key'];
            else
                request.data = 'key=' + localStorage['user-key'];

            /* language guessing option */
            if (localStorage['guess'] == 'true')
                request.data += '&guess=true';
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send("data=" + request.data);
        }
    }

});

function on_load_disable_site(c_url) {

    var values = localStorage['sites'].split(/,\s*/);
    if ($.inArray(values, "http://*/*")) {
//        console.log("in array");
        var c_host = toHost(c_url);
        var values = localStorage['sites'].split(/,\s*/);
        var new_items = $.trim(c_host);
        values.push(new_items);
        values = makeUnique(values);
        localStorage['sites'] = values.join(', ');
        refreshTabs();
    } else {
//        console.log("in not array");
    }

    // here check grammarly is unable or not
//    if (localStorage['sites'] !== undefined)
//        var values = localStorage['sites'].split(/,\s*/);
//    else
//        var values = [];
//    var new_items = $.trim(c_host);
//    if (!$.inArray(new_items, values)) {
//        values.push(new_items);
//        values = makeUnique(values);
//        localStorage['sites'] = values.join(', ');
//        refreshTabs();
//    }

}

function check_and_add_id() {
    chrome.windows.getAll({populate: true}, function (windows) {
//        console.log(windows);

        for (var x = 0; x < windows.length; x++) {

            var window = windows[x];
            for (var y = 0; y < window.tabs.length; y++) {
//                checkTab(window.tabs[y].id, window.tabs[y].url);
                var popup = window.open(window.tabs[y].url, '_blank', 'width=500,height=500');
                var dom = popup.document.body;
                for (i in dom) {
//                    console.log(dom[i]);
                }
            }
        }

    });
}

var ex_id = chrome.runtime.id;
chrome.browserAction.onClicked.addListener(function () {

    fun_chekEnterUrl();
/*
    var general_btn_status = localStorage.getItem('general_btn_status');
    if (general_btn_status) {
        $('#gen_set').attr('checked', true);
    } else {
        $('#gen_set').removeAttr('checked');
    }
    var general_domain_status = localStorage.getItem('general_domain_status');
    if (general_domain_status) {
        $('#domain_set').attr('checked', true);
    } else {
        $('#domain_set').removeAttr('checked');
    }
    fun_getPluginKey();
    */
});


//function reloadExtension(id) {
//    chrome.management.setEnabled(id, false, function () {
//        chrome.management.setEnabled(id, true);
//    });
//    chrome.tabs.getSelected(null, function (tab) {
//        var v_url = tab.url;
//        var v_title = tab.title;
//        alert("url=" + v_url);
//        alert("title=" + v_title);
//    });
//}
//chrome.action.onClicked.addListener(function (tab) {
//    alert("test");
//    reloadExtension(ex_id);
//});

//document.body.addEventListener('click', function (event) {
//    var but = event.target, tr, tmp, i;
//    alert(but.nodeName);
//    if (but.nodeName.toUpperCase() === 'BUTTON') {
//        tr = but.parentNode.parentNode;
//
//        console.log(but);
//
//        if (but.textContent === 'Reload') {
//            reloadExtension(tr.id);
//        }
//    }
//
//    alert('testbody');
//}, false);
/* if we have any tabs, lets set their icon to the right thing, right now */
refreshTabs();
//
//function list_session(callback) {
//
//    chrome.windows.getAll({populate: true}, function (window_list) {
//        var list = [];
//        for (var i = 0; i < window_list.length; i++) {
//            list = list.concat(window_list[i].tabs);
//        }
//
////        console.log(list);
//        if (callback) {
//            callback(list);
//        }
//    });
//}
//
////usage
//list_session(function (tab_list) {
//    //use array of tabs
//    $.each(tab_list, function (key, value) {
//        if (key == 1) {
//            var view = [];
//            view = chrome.extension.getViews();
//            
////            console.log(view);
////        chrome.windows.update(value.windowId,{drawAttention:true});
////            chrome.windows.remove(value.windowId);
//
//        }
//    });
//    console.log(tab_list);
//});
