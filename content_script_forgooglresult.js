var test_url = window.location.href;

var bkl_div = '<div id="serped_modal_blkm" class="col-lg-12 serped_plugin_div"></div>'; 
$('body').append(bkl_div);

//if($('body').hasClass('serped_plugin_div')){
//   alert("test1");
//    // do nothing
//}else{
//   alert("test2");
//}
//console.log("test_google");


var icon = chrome.extension.getURL("images/btn_loader.gif");
var loader_image5 = chrome.extension.getURL("images/loading.new5.gif");
var favicon = chrome.extension.getURL("images/icon-16.png");
var is_valid_img = chrome.extension.getURL("images/grammar-ok-01.png");

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
try{
    chrome.extension.sendRequest({'message': 'disable_site', 'data_val': test_url}, function (response) {
        // disable sites
    });
}catch(err){
    // do nothing
}

var check_home = test_url.search("#q");
if (check_home == -1) {
    check_home = test_url.search("&q=");
}
if (check_home == -1) {
    check_home = test_url.search("q=");
}
if (check_home != -1) {
    var hostname = location.hostname;
    var host_Status = hostname.match(/google./gi);
    var checkOtherPage = test_url.search("tbm=");
    if (host_Status == null || host_Status == 'null' || host_Status == 'NULL' || checkOtherPage != -1) {
        // do nothing
    } else {
//        var icon = chrome.extension.getURL("images/btn_loader.gif");
//        var loader_image5 = chrome.extension.getURL("images/loading.new5.gif");
//        var favicon = chrome.extension.getURL("images/icon-16.png");
        //chrome-extension://cooaoeonleicpjnpkkolmmhnapejnedm/images/btn_loader.gif
        var mid = '';
        var general_btn_status = '';
        var v_pluginkey = '';
        var keyword = '';
        var reload_page = 0;
        var reload_pageo = 0;
//        var loader_img = '<img src="' + HOST_URL + 'btn_loader.gif" alt="Loading..." height="80" width="80">';
        var loader_img = '<img src="' + icon + '" alt="Loading..." style="height: 68px;margin-top: -30px;margin-left: -153px;"/>';
        var new_btn_class = '';
        var loader_link1 = '<img src="' + icon + '" alt="Loading..." style="height: 68px;margin-top: -27px;margin-left: 97px;"/>';
        var loader_link2 = '<img src="' + icon + '" alt="Loading..." style="height: 68px;margin-top: -27px;margin-left: 97px;"/>';
        var changes_desgin = false;
        var requestRunning = false;

        // orginal
//        var top_btn = '<label class="switch" id="switch"> ' +
//                '<input type="checkbox" name="sActive" id="top_btn">' +
//                '<div class="slider round"></div><div id="serpet_btn_loader" style="position:fixed;top:10px;color:black;"></div>' +
//                '</label>' +
//                '';
        var favicon_img = '<img src="' + favicon + '" style="margin-top: -3px;margin-left: -123px;" />';
        
//            margin-left: -100px;
//    margin-top: -27px;
        if ($('button').hasClass('sbico-c')) {
//            new_btn_class = 'style="margin-left:100%;margin-top:42%"';
            favicon_img = '<img src="' + favicon + '" style="margin-top: -3px;margin-left: -110px;" />';
            new_btn_class = 'style="margin-left:-150%;margin-top:-48%"';
            loader_img = '<img src="' + icon + '" alt="Loading..." style="height: 68px;margin-top: -45px;margin-left: -140px;"/>';
            changes_desgin = true;
        } else {
            new_btn_class = 'style="margin-left:-100px;margin-top:-27px"';
            loader_img = '<img src="' + icon + '" alt="Loading..." style="height: 68px;margin-top: -70px;margin-left: -140px;position: absolute;"/>';
        }


        var top_btn = '<label class="switch" id="switch" style="position: absolute"><span>' + favicon_img + '</span> ' +
                '<input type="checkbox" name="sActive" id="top_btn"/>' +
                '<div class="_slider round"' + new_btn_class + '></div>' +
                '<div id="serpet_btn_loader" class="col-lg-6" style="position:relative;margin-left:65px;color:black"></div>' +
                '</label>';

        var onoff_btn = '<div class="onoffswitch" >'+
                            '<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch">'+
                            '<label class="onoffswitch-label" for="myonoffswitch">'+
                                '<span class="onoffswitch-inner"></span>'+
                            '</label>'+
                        '</div>';
        var attach_data = '<div class="serped-data-panel" style="overflow-x:auto!important;">' +
                                '<div class="">' +
                                    '<span class="serped-params" title="Serped Rank" >SR : <strong>4.28K</strong></span>' +
                                    '<span class="serped-params" title="Alexa Rank">ALX : <strong>4.28K</strong></span>' +
                                    '<span class="serped-params" title="Social">Social : <strong>4.28K</strong></span>' +
                                    '<span class="serped-params" title="Moz Rank">MR : <strong>4.28K</strong></span>' +
                                    '<span class="serped-params" title="Moz Domain Authority">DA : <strong>4.28K</strong></span>' +
                                    '<span class="serped-params" title="Moz Page Authority">PA : <strong>4.28K</strong></span>' +
                                    '<span class="serped-params" title="Total External Links">LINKS : <strong>4.28K</strong></span>' +
                                    '<span class="serped-params" title="Total Reffering Domains">REF : <strong>4.28K</strong></span>' +
                                    '<span class="serped-params" title="Total Gov Unique Reffering Domains">GOV : <strong>4.28K</strong></span>' +
                                    '<span class="serped-params" title="Total EDU  Unique Reffering Domains">EDU : <strong>4.28K</strong></span>' +
                                    '<span class="serped-params" title="Majestic Citation Flow">CF : <strong>4.28K</strong></span>' +
                                    '<span class="serped-params" title="Majestic TrustFlow">TF : <strong title="42815">4.28K</strong></span>' +
                                '</div>' +
                            '</div>';
        //sfibbbc
        var top_bar = '<div id="center_col">' +
                '           <div class="serped-top-bar">' +
                '<div>' +
                '<span>S.Vol :<strong>20000</strong> </span>' +
                '<span> - CPC :<strong>20000</strong> </span>' +
                '<span> - Comp :<strong>20000</strong> </span>' +
                '<span> - Traffic Val :<strong>20000</strong></span>' +
                '</div>' +
                '<div></div>'+
                '<div>' +
                '<span>AVG SR :<strong>20000</strong> </span>' +
                '<span> - AVG Social :<strong>20000</strong> </span>' +
                '<span> - AVG PA :<strong>20000</strong> </span>' +
                '<span> - AVG TF :<strong>20000</strong></span>' +
                '</div>' +
                '<div><strong>Keyword difficulty</strong></div>' +
                '<div style="width:100%; padding:2px; border:1px #ebebeb solid; background-color:#FFF;">' +
                '<div style="padding:5px; width:67%; margin:0; font-size:17px; background-color:#d9edf7 ">67%</div>' +
                '</div>' +
                '</div>' +
                '</div>';
// append class data
//        var general_btn = false;
        var general_btn = true;
        setInterval(function () {
            try{
                chrome.extension.sendRequest({'message': 'checkGeneralButton', 'data_val': 'check'}, function (response) {
                general_btn_status = response.general_btn;
                general_btn = true;
                if (general_btn_status != "false") {
                    

                    if ($('#switch').hasClass('switchdata')) {
                        //
                    } else {
                        $('.tsf-p').append(top_btn);
//                        $('.tsf-p').find('.switch').css('left', $('.sfibbbc').width() - 197);
                        $('.tsf-p').find('.switch').css('left', $('.sfibbbc').width() + 270);
                        $('.tsf-p').find('.switch').css('top',  $('.sfibbbc').offset().top + 4);
//                        $('.tsf-p').find('.switch').css('top', '-27px');
                        //                        $('.sfcnt').find('.switch').css('left', $('.sfibbbc').width() + 120);

//                        var ff_url = btoa(test_url);
//                        setClickEvent(ff_url);
                    }

                    general_btn = false;
                } else {
                    $('#myonoffswitch').remove();
                    $('.onoffswitch').remove();
                    $('.switch').remove();
                    $('.serped-data-panel').remove();
                    $('.serped-top-bar').remove();
                    $('.serped-index').remove();
                    $('.g a').removeClass('serped-red serped-yellow serped-green serped-grey');
                    $('.g').css("clear", "both");
                    general_btn = true;
                }
            });
            }catch(err){
                // do nothing
            }
        }, 200);


// Need to keep on if it is already on
//        var ff_url = btoa(test_url);
//        setClickEvent(ff_url);
//        checkButtonStatus();
//        function checkButtonStatus() {
//            chrome.extension.sendRequest({'message': 'checkButton', 'data_val': 'check'}, function (response) {
//                if (response == 'true') {
//                    $('#serpet_btn_loader').html(loader_img).css({"top": "20px", "margin-left": "65px"});
//                    $('#top_btn').attr('checked', true);
//                    $('#top_btn').addClass('switchOn').removeClass('switchOff');
//                    general_btn = false;
//                    setTimeout(function () {
//                        get_data();
//                    }, 200);
//                }
//            });
//        }
//            function setClickEvent(fullUrl) {
//
//            }

            $(document).off().on('click','#top_btn', function (e) {
                $("#top_btn").prop('disabled', true);
                if ($('#top_btn').attr('checked')) {
                    $("#top_btn").prop('disabled', false);
                    $(this).removeAttr('checked');
                    $(this).addClass('switchOff').removeClass('switchOn');
                    try{
                        chrome.extension.sendRequest({'message': 'updateButton', 'data_val': 'false'}, function (response) {
                            //console.log(response);
                        });
                    }catch(err){
                        // do nothing
                    }

                    $('.serped-data-panel').remove();
                    $('.serped-top-bar').remove();
                    $('.serped-index').remove();
                    $('.g a').removeClass('serped-red serped-yellow serped-green serped-grey');
                    $('#serpet_btn_loader').html('');
                } else {
                    if (changes_desgin) {
                        $('#serpet_btn_loader').html(loader_img).css({"margin-left": "70px"});
                    } else {
                        loader_img = '<img src="' + icon + '" alt="Loading..." style="height: 68px;margin-top: -70px;margin-left: 40px;position: absolute;"/>';
                        $('#serpet_btn_loader').html(loader_img).css({"top": "20px", "margin-left": "65px"});
                    }
                    $('#top_btn').attr('checked', true);
                    $(this).addClass('switchOn').removeClass('switchOff');
                    try{
                        chrome.extension.sendRequest({'message': 'updateButton', 'data_val': 'true'}, function (response) {
                            //console.log(response);
                        });
                    }catch(err){
                        // do nothing
                    }
                    var ff_url = btoa(test_url);
                    get_top_data(ff_url);
                }
            });
//        }
        $(document).on('click','#myonoffswitch',function(event){
//            event.stopImmediatePropagation();
//                if (requestRunning) { // don't do anything if an AJAX request is pending
//                    return;
//                }
                var ckbox = $('#myonoffswitch');
                   if (ckbox.is(':checked')) {
           //            alert('You have Checked it');
                        var ff_url = btoa(test_url);
                        get_top_data(ff_url);

                   } else {
                       try{
                            chrome.extension.sendRequest({'message': 'updateButton', 'data_val': 'false'}, function (response) {
                                  //                        console.log(response);
                            });
                        } catch(err){
                            // do nothing
                        }
                       $('.serped-data-panel').remove();
                       $('.serped-top-bar').remove();
                       $('.serped-index').remove();
                       $('.g a').removeClass('serped-red serped-yellow serped-green serped-grey');
                       $('#serpet_btn_loader').html('');
                        // hide data code
                   }
           });
           
        function get_top_data(fullUrl){
            
            var world = false;

            keyword = $('#lst-ib').val(); // google search keyword
            keyword = encodeURI($('#lst-ib').val()); // google search keyword
//            keyword = escape(keyword);
//            console.log(keyword);
            var domain = location.hostname;
            try{
             chrome.extension.sendRequest({'message': 'checkDomainButton', 'data_val': 'check'}, function (response) {
                var res = response.general_domain_btn;
                if (res == 'true') {
                    world = true;
                }
                try{
                   chrome.extension.sendRequest({'message': 'getTopData', 'data_val': {'keyword': keyword, 'url': domain, 'full_url': fullUrl, 'world': world}}, function (response) {
                       
                    if(response.status == -2){
                        
//                                icon: '48.png',
                        $('#serpet_btn_loader').html(response.msg).css({"width": "400px", "margin-left": "-105px"});
                        // daily check limit msg
                    } 
                    else if(response.status == -1){
                        $('#serpet_btn_loader').html(response.msg).css({"width": "400px", "margin-left": "-105px"});
                    }
                    else if (response.status != 0) {
                        var v_response = JSON.parse(response.data);
                        if (v_response.analyze_status != 0) {
                            var top_bar = '<div id="center_col"><div class="serped-top-bar">' +
                                            '<div class="top-row">' +
                                                    '<div class="resoult-col"><span>S.Vol<span class="resoult" title="' + v_response.top_bar.s_vol_title + '">' + v_response.top_bar.s_vol + '</span></div>' +
                                                    '<div class="resoult-col"><span>CPC<span class="resoult" title="' + v_response.top_bar.cpc_title + '">' + v_response.top_bar.cpc + '</span></div>' +
                                                    '<div class="resoult-col"><span>Comp<span class="resoult" title="' + v_response.top_bar.comp_title + '">' + v_response.top_bar.comp + '</span></div>' +
                                                    '<div class="resoult-col"><span>Traffic Val<span class="resoult" title="' + v_response.top_bar.v_traffic_title + '">' + v_response.top_bar.v_traffic + '</span></div>' +
                                                    '<div class="resoult-col new_credit_data"><span>AVG SR</div>' +
                                                    '<div class="resoult-col new_credit_data"><span>AVG Social</div>' +
                                                    '<div class="resoult-col new_credit_data"><span>AVG PA</div>' +
                                                    '<div class="resoult-col new_credit_data"><span>AVG TF</div>'+
                                                    '<div class="new_credit_data "><a style="margin-left:75px;font-size: medium;" href="javascript:void(0);" class="load_more_data loader_link1">Click to Load Metrics</a></div>'+
                                            '</div>' +
                                            '<div class="key-deff"><strong>Keyword difficulty</strong></div>' +
                                            '<div style="width:100%; padding:2px; border:1px #ebebeb solid; border-left:0px; border-right:0px; background-color:#FFF;" class="keyword_diff"><div><a style="margin-left:75px;font-size: medium;" href="javascript:void(0);" class="load_more_data loader_link2">Click to Load Keyword Difficulty</a></div>' +
                                            '</div>'+
                                            '</div></div>';
                            $('#topabar').append(top_bar);
                            $('#serpet_btn_loader').html('');
                        }else{
                            $('#serpet_btn_loader').html('');
                            $('#serpet_btn_loader').html("Something went wrong while performing analyze, please try again.").css({"width": "400px", "margin-left": "-105px"});
                        }
                    }else{
                        $('#serpet_btn_loader').html(response.message).css({"width": "400px", "margin-left": "-105px"});
                    }
                    $("#top_btn").prop('disabled', false);
                });  
                } catch(err){
                    // do nothing
                }
            });
            } catch(err){
                // do nothing
            }
        }

    $(document).on('click','.load_more_data',function(){
        var ff_url = btoa(test_url)
        $('.loader_link1').html(loader_link1);
        $('.loader_link2').html(loader_link2);
        get_data(ff_url)
    });

        function load_more_data(){
            var fullUrl = btoa(test_url);
            var full_test = [];
            var full_test_data = '';
            var world = false;
            
            $('.srg').find('.g').find('.rc').find('.r a').each(function (i, e) {
//                if(i < 10){
                    full_test[i] = $(e).context.href;
                    if (i == 0) {
                        full_test_data += $(e).context.href;
                    } else {
                        full_test_data += "&#13;";
                        full_test_data += $(e).context.href;
                    }
//                }else{
//                    return false;
//                }                
            });
            keyword = $('#lst-ib').val(); // google search keyword
//            keyword = encodeURI($('#lst-ib').val()); // google search keyword
            keyword = escape(keyword);
            
            var domain = location.hostname;
            try{
                chrome.extension.sendRequest({'message': 'checkDomainButton', 'data_val': 'check'}, function (response) {
                var res = response.general_domain_btn;
                if (res == 'true') {
                    world = true;
                }
                try{
                   chrome.extension.sendRequest({'message': 'getData', 'data_val': {'keyword': keyword, 'url': domain, 'all_url': btoa(full_test_data), 'full_url': fullUrl, 'world': world,'browser_type':"chrome",'plugin_type':"serped"}}, function (response) {
                    if (response.status != 0) {
                        var v_response = JSON.parse(response.data);
                        if(response.status == -1){
                            if (changes_desgin) {
                                $('#serpet_btn_loader').html(response.msg).css({"width": "400px", "margin-left": "-105px"});
                            } else {
                                $('#serpet_btn_loader').html(response.msg).css({"top": "21px", "margin-left": "69px", "position": "absolute", "width": "400px"});
                            }
                            $('.loader_link1').html("Click to Load Metrics");
                            $('.loader_link2').html("Click to Load Keyword Difficulty");
                        }
                        else if (v_response.analyze_status != 0) {
//                            if ($("#top_btn").hasClass("switchOn")) {
//                                $('.serped-data-panel').remove();
//                                $('.serped-top-bar').remove();
                                $('.serped-index').remove();
                                $('.g a').removeClass('serped-red serped-yellow serped-green serped-grey');
                                $('.g').css("clear", "both");
                                if (v_response.analyze_status == 1 && general_btn_status == "true") {
                                    
                                    var resu = '<div class="resoult-col new_credit_data"><span>AVG SR<span class="resoult" title="' + v_response.top_bar.avg_sr_title + '">' + v_response.top_bar.avg_sr + '</span></div>' +
                                                '<div class="resoult-col new_credit_data"><span>AVG Social<span class="resoult" title="' + v_response.top_bar.avg_social_title + '" >' + v_response.top_bar.avg_social + '</span></div>' +
                                                '<div class="resoult-col new_credit_data"><span>AVG PA<span class="resoult" title="' + v_response.top_bar.avg_pa_title + '" >' + v_response.top_bar.avg_pa + '</span></div>' +
                                                '<div class="resoult-col new_credit_data"><span>AVG TF<span class="resoult" title="' + v_response.top_bar.avg_tf_title + '" >' + v_response.top_bar.avg_tf + '</span></div>';
//                                    $('.without_data').html(resu);
//                                    $('.without_data').remove();
                                    $('.new_credit_data').remove();
                                    $('.top-row').append(resu);
                                    var key_diff = '<div style="padding:5px; width:' + v_response.top_bar.keyword_difficulty + '%; margin:0; font-size:17px; background-color:#d9edf7 ">' + v_response.top_bar.keyword_difficulty + '%</div>';
                                    $('.keyword_diff').html(key_diff);
                                      
                                   var index = -1;
                                    $('#rso > .g').each(function (i, e) {
                                        var flag = false;
                                        var onlyAttrNames = $(this).map(attr => attr.name);
                                        var all_attr = onlyAttrNames.context.attributes;
                                        var ar_val = [];
                                        $.each(all_attr, function (ii, value) {
                                            ar_val[ii] = value.nodeName;
                                        });

                                        var correct_tag = 0;
                                        if ($.inArray("data-hveid", ar_val) < 0) {
                                            if ($.inArray("id", ar_val) > 0) {
                                                correct_tag++;
                                            }
                                            if ($.inArray("data-ved", ar_val) > 0) {
                                                correct_tag++;
                                            }
                                            if (correct_tag == 0) {
                                                index++;
                                                flag = true;
                                            }
                                        } else {
                                            if ($.inArray("id", ar_val) > 0) {
                                                correct_tag++;
                                            }
                                            if ($.inArray("data-ved", ar_val) > 0) {
                                                correct_tag++;
                                            }
                                            if (correct_tag == 0) {
                                                index++;
                                                flag = true;
                                            }
                                        }
                                        if ($.inArray("data-md", ar_val) > 0) {
                                            index--;
                                            flag = false;
                                        }
                                        if (flag) {
//                                            console.log(index);
                                            var google_result = v_response.google_result[index];
                                            var attach_data = '<div class="serped-data-panel" style="overflow-x:auto!important;"><div class="">' +
                                                    '<span class="serped-params" title="Serped Rank" >SR : <strong title="' + google_result.pr_title + '">' + google_result.pr + '</strong></span>' +
                                                    '<span class="serped-params" title="Alexa Rank">ALX : <strong title="' + google_result.alx_title + '">' + google_result.alx + '</strong></span>' +
                                                    '<span class="serped-params" title="Social">Social : <strong title="' + google_result.social_title + '">' + google_result.social + '</strong></span>' +
                                                    '<span class="serped-params" title="Moz Rank">MR : <strong title="' + google_result.mr_title + '" >' + google_result.mr + '</strong></span>' +
                                                    '<span class="serped-params" title="Moz Domain Authority">DA : <strong title="' + google_result.da_title + '" >' + google_result.da + '</strong></span>' +
                                                    '<span class="serped-params" title="Moz Page Authority">PA : <strong title="' + google_result.pa_title + '" >' + google_result.pa + '</strong></span>' +
                                                    '<span class="serped-params" title="Total External Links">LINKS : <strong title="' + google_result.links_title + '" >' + google_result.links + '</strong></span>' +
                                                    '<span class="serped-params" title="Total Reffering Domains">REF : <strong title="' + google_result.ref_title + '" >' + google_result.ref + '</strong></span>' +
                                                    '<span class="serped-params" title="Total Gov Unique Reffering Domains">GOV : <strong title="' + google_result.gov_title + '">' + google_result.gov + '</strong></span>' +
                                                    '<span class="serped-params" title="Total EDU  Unique Reffering Domains">EDU : <strong title="' + google_result.edu_title + '" >' + google_result.edu + '</strong></span>' +
                                                    '<span class="serped-params" title="Majestic Citation Flow">CF : <strong title="' + google_result.cf_title + '">' + google_result.cf + '</strong></span>' +
                                                    '<span class="serped-params" title="Majestic TrustFlow">TF : <strong title="' + google_result.tf_title + '">' + google_result.tf + '</strong></span>' +
                                                    '</div>' +
                                                    '</div>';
                                            var prepen = index + 1;
                                            var cls = google_result.result_color;
                                            $(this).append(attach_data);
                                            $(e).find('.rc > .r').prepend('<span class="serped-index ' + cls + '"><strong>' + prepen + '.</strong></span>');
                                            $(e).find('.r a').addClass(cls);
                                            $(e).find('.r a').css("clear", "both");
                                        }
                                    });
                                    if (index == -1) {
                                        index = 0;
                                    } else {
                                        index++;
                                    }
                                    $('.srg > .g').each(function (i, e) {

                                        var google_result = v_response.google_result[index];
                                        var attach_data = '<div class="serped-data-panel" style="overflow-x:auto!important;"><div class="">' +
                                                '<span class="serped-params" title="Serped Rank" >SR : <strong title="' + google_result.pr_title + '">' + google_result.pr + '</strong></span>' +
                                                '<span class="serped-params" title="Alexa Rank">ALX : <strong title="' + google_result.alx_title + '">' + google_result.alx + '</strong></span>' +
                                                '<span class="serped-params" title="Social">Social : <strong title="' + google_result.social_title + '">' + google_result.social + '</strong></span>' +
                                                '<span class="serped-params" title="Moz Rank">MR : <strong title="' + google_result.mr_title + '" >' + google_result.mr + '</strong></span>' +
                                                '<span class="serped-params" title="Moz Domain Authority">DA : <strong title="' + google_result.da_title + '" >' + google_result.da + '</strong></span>' +
                                                '<span class="serped-params" title="Moz Page Authority">PA : <strong title="' + google_result.pa_title + '" >' + google_result.pa + '</strong></span>' +
                                                '<span class="serped-params" title="Total External Links">LINKS : <strong title="' + google_result.links_title + '" >' + google_result.links + '</strong></span>' +
                                                '<span class="serped-params" title="Total Reffering Domains">REF : <strong title="' + google_result.ref_title + '" >' + google_result.ref + '</strong></span>' +
                                                '<span class="serped-params" title="Total Gov Unique Reffering Domains">GOV : <strong title="' + google_result.gov_title + '">' + google_result.gov + '</strong></span>' +
                                                '<span class="serped-params" title="Total EDU  Unique Reffering Domains">EDU : <strong title="' + google_result.edu_title + '" >' + google_result.edu + '</strong></span>' +
                                                '<span class="serped-params" title="Majestic Citation Flow">CF : <strong title="' + google_result.cf_title + '">' + google_result.cf + '</strong></span>' +
                                                '<span class="serped-params" title="Majestic TrustFlow">TF : <strong title="' + google_result.tf_title + '">' + google_result.tf + '</strong></span>' +
                                                '</div>' +
                                                '</div>';
                                        var prepen = index + 1;
                                        var cls = google_result.result_color;
                                        $(this).append(attach_data);
                                        $(e).find('.rc > .r').prepend('<span class="serped-index ' + cls + '"><strong>' + prepen + '.</strong></span>');
                                        $(e).find('.r a').addClass(cls);
                                        $(e).find('.r a').css("clear", "both");
                                        index++;
                                    });
//                                    console.log(index);
                                    $('#serpet_btn_loader').html('');
                                } else if (general_btn_status == "false") {
                                    // do nothing
                                    $('.switch').remove();
                                    $('.serped-data-panel').remove();
                                    $('.serped-top-bar').remove();
                                    $('.serped-index').remove();
                                    $('.g a').removeClass('serped-red serped-yellow serped-green serped-grey');
                                    $('.g').css("clear", "both");
                                    $('#top_btn').off('click');
                                }
                                else {
                                    $('#serpet_btn_loader').html('');
                                    alert(v_response.message);
                                    // switch off the btn
                                }
//                            } else if (general_btn_status == "false") {
//                                $('.switch').remove();
//                                $('.serped-data-panel').remove();
//                                $('.serped-top-bar').remove();
//                                $('.serped-index').remove();
//                                $('.g a').removeClass('serped-red serped-yellow serped-green serped-grey');
//                                $('.g').css("clear", "both");
//                                $('#top_btn').off('click');
//                            }
                        }
                        else {
                            if (changes_desgin) {
//                        if ($('button').hasClass('sbico-c')) {
                                $('#serpet_btn_loader').html(v_response.message).css({"width": "400px", "margin-left": "-105px"});
                            } else {
                                $('#serpet_btn_loader').html(response.message).css({"top": "21px", "margin-left": "69px", "position": "absolute", "width": "400px"});
                            }
                        }
                    } else {
                        if (changes_desgin) {
//                    if ($('button').hasClass('sbico-c')) {
                            $('#serpet_btn_loader').html(response.message).css({"width": "400px", "margin-left": "-105px"});
                        } else {
                            $('#serpet_btn_loader').html(response.message).css({"top": "21px", "margin-left": "69px", "position": "absolute", "width": "400px"});
                        }
                    }
                });
                } catch(err){
                    // do nothing
                }
            });
            } catch(err){
                // do nothing
            }

        }
        
        function get_data(fullUrl) {
            var full_test = [];
            var full_test_data = '';
            var world = false;

            $('.srg').find('.g').find('.rc').find('.r a').each(function (i, e) {
                if(i<10){
                    full_test[i] = $(e).context.href;
    //                var url_href = $(e).context.href;
    //                var last_chr = url_href.substr(url_href.length - 1);
    //                if(last_chr == "/"){
    //                    url_href = url_href.substring(0, url_href.length-1);
    //                }
                    if (i == 0) {
                        full_test_data += $(e).context.href;
                    } else {
                        full_test_data += "&#13;";
                        full_test_data += $(e).context.href;
                    }
                }else{
                    return false;
                }
            });
            keyword = $('#lst-ib').val(); // google search keyword
//            keyword = encodeURI($('#lst-ib').val()); // google search keyword
            keyword = escape(keyword);
            var domain = location.hostname;
            try{
                chrome.extension.sendRequest({'message': 'checkDomainButton', 'data_val': 'check'}, function (response) {
                var res = response.general_domain_btn;
                if (res == 'true') {
                    world = true;
                }
                    try{
                        chrome.extension.sendRequest({'message': 'getData', 'data_val': {'keyword': keyword, 'url': domain, 'all_url': btoa(full_test_data), 'full_url': fullUrl, 'world': world,'browser_type':"chrome",'plugin_type':"omg"}}, function (response) {
                            if(response.status == -1){
                                if (changes_desgin) {
                                    $('#serpet_btn_loader').html(response.msg).css({"width": "400px", "margin-left": "-105px"});
                                } else {
                                    $('#serpet_btn_loader').html(response.msg).css({"top": "21px", "margin-left": "69px", "position": "absolute", "width": "400px"});
                                }
                                $('.loader_link1').html("Click to Load Metrics");
                                $('.loader_link2').html("Click to Load Keyword Difficulty");
                            }
                            else if (response.status != 0) {
                                var v_response = JSON.parse(response.data);

                                if (v_response.analyze_status != 0) {
        //                            if ($("#top_btn").hasClass("switchOn")) {
        //                                $('.serped-data-panel').remove();
        //                                $('.serped-top-bar').remove();
                                        $('.serped-index').remove();
                                        $('.g a').removeClass('serped-red serped-yellow serped-green serped-grey');
                                        $('.g').css("clear", "both");
                                        if (v_response.analyze_status == 1 && general_btn_status == "true") {

                                            var resu = '<div class="resoult-col new_credit_data"><span>AVG SR<span class="resoult" title="' + v_response.top_bar.avg_sr_title + '">' + v_response.top_bar.avg_sr + '</span></div>' +
                                                        '<div class="resoult-col new_credit_data"><span>AVG Social<span class="resoult" title="' + v_response.top_bar.avg_social_title + '" >' + v_response.top_bar.avg_social + '</span></div>' +
                                                        '<div class="resoult-col new_credit_data"><span>AVG PA<span class="resoult" title="' + v_response.top_bar.avg_pa_title + '" >' + v_response.top_bar.avg_pa + '</span></div>' +
                                                        '<div class="resoult-col new_credit_data"><span>AVG TF<span class="resoult" title="' + v_response.top_bar.avg_tf_title + '" >' + v_response.top_bar.avg_tf + '</span></div>';
        //                                    $('.without_data').html(resu);
        //                                    $('.without_data').remove();
                                            $('.new_credit_data').remove();
                                            $('.top-row').append(resu);
                                            var key_diff = '<div style="padding:5px; width:' + v_response.top_bar.keyword_difficulty + '%; margin:0; font-size:17px; background-color:#d9edf7 ">' + v_response.top_bar.keyword_difficulty + '%</div>';
                                            $('.keyword_diff').html(key_diff);

    //                                    $('#topabar').append(resu);

    //                                    var top_bar = '<div id="center_col"><div class="serped-top-bar">' +
    //                                            '<div class="top-row">' +
    //                                            '<div class="resoult-col"><span>S.Vol<span class="resoult" title="' + v_response.top_bar.s_vol_title + '">' + v_response.top_bar.s_vol + '</span></div>' +
    //                                            '<div class="resoult-col"><span>CPC<span class="resoult" title="' + v_response.top_bar.cpc_title + '">' + v_response.top_bar.cpc + '</span></div>' +
    //                                            '<div class="resoult-col"><span>Comp<span class="resoult" title="' + v_response.top_bar.comp_title + '">' + v_response.top_bar.comp + '</span></div>' +
    //                                            '<div class="resoult-col"><span>Traffic Val<span class="resoult" title="' + v_response.top_bar.v_traffic_title + '">' + v_response.top_bar.v_traffic + '</span></div>' +
    //                                            '<div>AVG SR&nbsp;&nbsp;&nbsp;&nbsp;AVG Social&nbsp;&nbsp;&nbsp;&nbsp;AVG PA&nbsp;&nbsp;&nbsp;&nbsp;AVG TF</div><div></div><div class="hidden_val_load">'+
    //                                            '</div>'+
    //                                            //'</div>' +
    //                                            //'<div class="bottom-row">' +
    //                                            '</div>' +
    //                                            '<div class="key-deff"><strong>Keyword difficulty</strong></div>' +
    //                                            '<div style="width:100%; padding:2px; border:1px #ebebeb solid; border-left:0px; border-right:0px; background-color:#FFF;">' +
    //                                            '<div style="padding:5px; width:' + v_response.top_bar.keyword_difficulty + '%; margin:0; font-size:17px; background-color:#d9edf7 ">' + v_response.top_bar.keyword_difficulty + '%</div>' +
    //                                            '</div>' +
    //                                            '</div></div>';

    //                          var top_bar = '<div id="center_col"><div class="serped-top-bar">' +
    //                                    '<div>' +
    //                                    '<span>S.Vol :<strong title="' + v_response.top_bar.s_vol_title + '">' + v_response.top_bar.s_vol + '</strong> </span>' +
    //                                    '<span> - CPC :<strong title="' + v_response.top_bar.cpc_title + '">' + v_response.top_bar.cpc + '</strong> </span>' +
    //                                    '<span> - Comp :<strong title="' + v_response.top_bar.comp_title + '">' + v_response.top_bar.comp + '</strong> </span>' +
    //                                    '<span> - Traffic Val :<strong title="' + v_response.top_bar.v_traffic_title + '">' + v_response.top_bar.v_traffic + '</strong></span>' +
    //                                    '</div>' +
    //                                    '<div>' +
    //                                    '<span>AVG SR :<strong title="' + v_response.top_bar.avg_sr_title + '">' + v_response.top_bar.avg_sr + '</strong> </span>' +
    //                                    '<span> - AVG Social :<strong title="' + v_response.top_bar.avg_social_title + '" >' + v_response.top_bar.avg_social + '</strong> </span>' +
    //                                    '<span> - AVG PA :<strong title="' + v_response.top_bar.avg_pa_title + '" >' + v_response.top_bar.avg_pa + '</strong> </span>' +
    //                                    '<span> - AVG TF :<strong title="' + v_response.top_bar.avg_tf_title + '" >' + v_response.top_bar.avg_tf + '</strong></span>' +
    //                                    '</div>' +
    //                                    '<div><strong>Keyword difficulty</strong></div>' +
    //                                    '<div style="width:100%; padding:2px; border:1px #ebebeb solid; background-color:#FFF;">' +
    //                                    '<div style="padding:5px; width:' + v_response.top_bar.keyword_difficulty + '%; margin:0; font-size:17px; background-color:#d9edf7 ">' + v_response.top_bar.keyword_difficulty + '%</div>' +
    //                                    '</div>' +
    //                                    '</div></div>';
    //                                    
    //                                    $('#topabar').append(top_bar);
                                        var index = -1;
                                        $('#rso > .g').each(function (i, e) {
                                            var flag = false;
                                            var onlyAttrNames = $(this).map(attr => attr.name);
                                            var all_attr = onlyAttrNames.context.attributes;
                                            var ar_val = [];
                                            $.each(all_attr, function (ii, value) {
                                                ar_val[ii] = value.nodeName;
                                            });

                                            var correct_tag = 0;
                                            if ($.inArray("data-hveid", ar_val) < 0) {
                                                if ($.inArray("id", ar_val) > 0) {
                                                    correct_tag++;
                                                }
                                                if ($.inArray("data-ved", ar_val) > 0) {
                                                    correct_tag++;
                                                }
                                                if (correct_tag == 0) {
                                                    index++;
                                                    flag = true;
                                                }
                                            } else {
                                                if ($.inArray("id", ar_val) > 0) {
                                                    correct_tag++;
                                                }
                                                if ($.inArray("data-ved", ar_val) > 0) {
                                                    correct_tag++;
                                                }
                                                if (correct_tag == 0) {
                                                    index++;
                                                    flag = true;
                                                }
                                            }
                                            if ($.inArray("data-md", ar_val) > 0) {
                                                index--;
                                                flag = false;
                                            }
                                            if (flag) {
                                                var google_result = v_response.google_result[index];
                                                var attach_data = '<div class="serped-data-panel" style="overflow-x:auto!important;"><div class="">' +
                                                        '<span class="serped-params" title="Serped Rank" >SR : <strong title="' + google_result.pr_title + '">' + google_result.pr + '</strong></span>' +
                                                        '<span class="serped-params" title="Alexa Rank">ALX : <strong title="' + google_result.alx_title + '">' + google_result.alx + '</strong></span>' +
                                                        '<span class="serped-params" title="Social">Social : <strong title="' + google_result.social_title + '">' + google_result.social + '</strong></span>' +
                                                        '<span class="serped-params" title="Moz Rank">MR : <strong title="' + google_result.mr_title + '" >' + google_result.mr + '</strong></span>' +
                                                        '<span class="serped-params" title="Moz Domain Authority">DA : <strong title="' + google_result.da_title + '" >' + google_result.da + '</strong></span>' +
                                                        '<span class="serped-params" title="Moz Page Authority">PA : <strong title="' + google_result.pa_title + '" >' + google_result.pa + '</strong></span>' +
                                                        '<span class="serped-params" title="Total External Links">LINKS : <strong title="' + google_result.links_title + '" >' + google_result.links + '</strong></span>' +
                                                        '<span class="serped-params" title="Total Reffering Domains">REF : <strong title="' + google_result.ref_title + '" >' + google_result.ref + '</strong></span>' +
                                                        '<span class="serped-params" title="Total Gov Unique Reffering Domains">GOV : <strong title="' + google_result.gov_title + '">' + google_result.gov + '</strong></span>' +
                                                        '<span class="serped-params" title="Total EDU  Unique Reffering Domains">EDU : <strong title="' + google_result.edu_title + '" >' + google_result.edu + '</strong></span>' +
                                                        '<span class="serped-params" title="Majestic Citation Flow">CF : <strong title="' + google_result.cf_title + '">' + google_result.cf + '</strong></span>' +
                                                        '<span class="serped-params" title="Majestic TrustFlow">TF : <strong title="' + google_result.tf_title + '">' + google_result.tf + '</strong></span>' +
                                                        '</div>' +
                                                        '</div>';
                                                var prepen = index + 1;
                                                var cls = google_result.result_color;
                                                $(this).append(attach_data);
                                                $(e).find('.rc > .r').prepend('<span class="serped-index ' + cls + '"><strong>' + prepen + '.</strong></span>');
                                                $(e).find('.r a').addClass(cls);
                                                $(e).find('.r a').css("clear", "both");
                                                if(prepen == 10){
                                                    return false;
                                                }
                                            }
                                        });
                                        if (index == -1) {
                                            index = 0;
                                        } else {
                                            index++;
                                        }
                                        $('.srg > .g').each(function (i, e) {

                                            var google_result = v_response.google_result[index];
                                            var attach_data = '<div class="serped-data-panel" style="overflow-x:auto!important;"><div class="">' +
                                                    '<span class="serped-params" title="Serped Rank" >SR : <strong title="' + google_result.pr_title + '">' + google_result.pr + '</strong></span>' +
                                                    '<span class="serped-params" title="Alexa Rank">ALX : <strong title="' + google_result.alx_title + '">' + google_result.alx + '</strong></span>' +
                                                    '<span class="serped-params" title="Social">Social : <strong title="' + google_result.social_title + '">' + google_result.social + '</strong></span>' +
                                                    '<span class="serped-params" title="Moz Rank">MR : <strong title="' + google_result.mr_title + '" >' + google_result.mr + '</strong></span>' +
                                                    '<span class="serped-params" title="Moz Domain Authority">DA : <strong title="' + google_result.da_title + '" >' + google_result.da + '</strong></span>' +
                                                    '<span class="serped-params" title="Moz Page Authority">PA : <strong title="' + google_result.pa_title + '" >' + google_result.pa + '</strong></span>' +
                                                    '<span class="serped-params" title="Total External Links">LINKS : <strong title="' + google_result.links_title + '" >' + google_result.links + '</strong></span>' +
                                                    '<span class="serped-params" title="Total Reffering Domains">REF : <strong title="' + google_result.ref_title + '" >' + google_result.ref + '</strong></span>' +
                                                    '<span class="serped-params" title="Total Gov Unique Reffering Domains">GOV : <strong title="' + google_result.gov_title + '">' + google_result.gov + '</strong></span>' +
                                                    '<span class="serped-params" title="Total EDU  Unique Reffering Domains">EDU : <strong title="' + google_result.edu_title + '" >' + google_result.edu + '</strong></span>' +
                                                    '<span class="serped-params" title="Majestic Citation Flow">CF : <strong title="' + google_result.cf_title + '">' + google_result.cf + '</strong></span>' +
                                                    '<span class="serped-params" title="Majestic TrustFlow">TF : <strong title="' + google_result.tf_title + '">' + google_result.tf + '</strong></span>' +
                                                    '</div>' +
                                                    '</div>';
                                            var prepen = index + 1;
                                            var cls = google_result.result_color;
                                            $(this).append(attach_data);
                                            $(e).find('.rc > .r').prepend('<span class="serped-index ' + cls + '"><strong>' + prepen + '.</strong></span>');
                                            $(e).find('.r a').addClass(cls);
                                            $(e).find('.r a').css("clear", "both");
                                            index++;
                                            if(index == 11){
                                                return false;
                                            }
                                        });
                                        $('#serpet_btn_loader').html('');
                                    } else if (general_btn_status == "false") {
                                        // do nothing
                                        $('.switch').remove();
                                        $('.serped-data-panel').remove();
                                        $('.serped-top-bar').remove();
                                        $('.serped-index').remove();
                                        $('.g a').removeClass('serped-red serped-yellow serped-green serped-grey');
                                        $('.g').css("clear", "both");
                                        $('#top_btn').off('click');
                                    }
                                    else {
                                        $('#serpet_btn_loader').html('');
                                        alert(v_response.message);
                                        // switch off the btn
                                    }
    //                            } else if (general_btn_status == "false") {
    //                                $('.switch').remove();
    //                                $('.serped-data-panel').remove();
    //                                $('.serped-top-bar').remove();
    //                                $('.serped-index').remove();
    //                                $('.g a').removeClass('serped-red serped-yellow serped-green serped-grey');
    //                                $('.g').css("clear", "both");
    //                                $('#top_btn').off('click');
    //                            }
                            }
                            else {
                                if (changes_desgin) {
    //                        if ($('button').hasClass('sbico-c')) {
                                    $('#serpet_btn_loader').html(v_response.message).css({"width": "400px", "margin-left": "-105px"});
                                } else {
                                    $('#serpet_btn_loader').html(response.message).css({"top": "21px", "margin-left": "69px", "position": "absolute", "width": "400px"});
                                }
                            }
                        } else {
                            if (changes_desgin) {
    //                    if ($('button').hasClass('sbico-c')) {
                                $('#serpet_btn_loader').html(response.message).css({"width": "400px", "margin-left": "-105px"});
                            } else {
                                $('#serpet_btn_loader').html(response.message).css({"top": "21px", "margin-left": "69px", "position": "absolute", "width": "400px"});
                            }
                        }
                    });
                    } catch(err){
                        // do nothing
                    }
                });
            } catch(err){
                // do nothing
            }
        }

        $(document).ready(function () {

            if ($("#top_btn").hasClass("switchOn")) {

                var new_keyword = $('#lst-ib').val();
//                var new_keyword = encodeURI($('#lst-ib').val());
                new_keyword = escape(new_keyword);
                if (keyword !== new_keyword) {
                    $('#top_btn').removeAttr('checked');
                    $('#top_btn').addClass('switchOff').removeClass('switchOn');
                    try{
                        chrome.extension.sendRequest({'message': 'updateButton', 'data_val': 'false'}, function (response) {
                            //console.log(response);
                        });
                    } catch(err){
                        // do nothing
                    }
                    $('.serped-data-panel').remove();
                    $('.serped-top-bar').remove();
                    $('.serped-index').remove();
                    $('.g a').removeClass('serped-red serped-yellow serped-green serped-grey');
                    $('#serpet_btn_loader').html('');

//                    if (changes_desgin) {
//                        $('#serpet_btn_loader').html(loader_img).css({"top": "24px", "margin-left": "70px"});
//                    } else {
//                        $('#serpet_btn_loader').html(loader_img).css({"top": "20px", "margin-left": "65px"});
//                    }
//
//                    general_btn = false;
//                    var furl = btoa(test_url);
//                    setTimeout(function () {
//                        get_data(furl);
//                    }, 200);
                }
            }
        });
    }

}
else{
    var favicon = "https://web.whatsapp.com/img/50f7c47f611e65a746f1d8328172af4c.png";
    var favicon_img = '<img src="' + favicon + '" style="margin-top: 5px;" />';
    var hostname = location.hostname;
    var host_Status = test_url.match(/whatsapp./gi);
    var new_btn_class = 'style="margin-left:-100px;margin-top:-27px"';

    var top_btn = '<label class="switchdata" id="switchdata" style="position: absolute"><span>' + favicon_img + '</span> ' +
            '<input type="checkbox" name="sActive" id="top_btn1"/>' +
            '<div class="_slider round"' + new_btn_class + '></div>' +
            '<div id="serpet_btn_loader" class="col-lg-6" style="position:relative;margin-left:65px;color:black"></div>' +
            '</label>';
            $('._2umId').append(top_btn);

    if (host_Status == null || host_Status == 'null' || host_Status == 'NULL') {
                    // this is other page
    }else{
        /*
            var new_btn_class = 'style="margin-left:-100px;margin-top:-27px"';
            var top_btn = '<label class="switch" id="switch"><span>' + favicon_img + '</span> ' +
            '<div id="serpet_btn_loader" class="col-lg-6" style="position:relative;margin-left:65px;color:black"></div>' +
            '</label>';
            $('._2umId').append(top_btn);
        */

    }
	
	
}
$(document).ready(function () {
    try{
        chrome.extension.sendRequest({'message': 'gent_ct_af_set_key'}, function (response) {
            // generate context menu after plugin key set
        });
    }catch(err){
        // do nothing headle error only
    }
    
});
$(document).on('change', '#project_select', function () {
    var p_id = parseInt($("#project_select option:selected").val());
    $('#add_backlink_div').html('');
    $('._modal-dialog').css({"width": "44%"});
    get_bklm_model_data(p_id, 0, 0);
});
$(document).on('change', '#site_select', function () {
    $('#add_backlink_div').html('');
    $('._modal-dialog').css({"width": "44%"});
//    var p_id = parseInt($("#project_select option:selected").val());
//    var s_id = parseInt($("#site_select option:selected").val());
//    get_bklm_model_data(p_id, s_id, 0);
});
//$(document).on('change', '#page_select', function () {
//    var p_id = parseInt($("#project_select option:selected").val());
//    var s_id = parseInt($("#site_select option:selected").val());
//    var in_id = parseInt($("#page_select option:selected").val());
//    get_bklm_model_data(p_id, s_id, in_id);
//});
setInterval(function () { 
    try{
        chrome.extension.sendRequest({'message': 'backlinks_manager_link', 'cntUrl': test_url}, function (response) {
        
        var blkm_data = response; 
        if (blkm_data.status == 1) {

            if (blkm_data.backlinks_url_link != '' && blkm_data.backlinks_url_link != null && blkm_data.backlinks_url_link != 'null') { 
                if (blkm_data.backlinks_url_domain == test_url) {
                    $('#serped_modal_blkm').html(blkm_data.data_test);
//              $("#backlinksm_site").modal();
                    $('#backlinksm_site').fadeIn(350);
                    $('#backlinksm_site').addClass('in');
                    //  var targeted_popup_class = jQuery(this).attr('data-popup-open');
                    //    $('[data-popup="popup-1"]').fadeIn(350);

                    $('._modal-dialog').css({"width": "44%", "margin-top": "7%"});
                    $('._modal-title').html('Backlinks Manager');
                    get_bklm_model_data(0, 0, 0);
                } else {  
//                    chrome.extension.sendRequest({'message': 'set_alerted'}, function (response) {
//                        
//                    }); 
//                    chrome.extension.sendRequest({'message': 'reloadPage', 'tabId': blkm_data.srpd_link_id}, function (response) {
                        chrome.extension.sendRequest({'message': 'unset_bklm_link'}, function (response) {      
//                       
                        }); 
//                    }); 
                           
                }
            }
        }
        else {
            if (blkm_data.srpd_bklm_st == 1) {
                alert(blkm_data.data_test);
            }
        }
    });
    }
    catch(err){
        // do nothing
    }
}, 100);


function get_bklm_model_data(pid, s_id, in_id) {
    $('#project_data_div').html('<p align="center" id="icon_loader_image"> <img height="50" width="50" src="' + loader_image5 + '"></p>');
    try{
        chrome.extension.sendRequest({'message': 'get_bklm_link_formate', 'pid': pid, 'sid': s_id, 'in_id': in_id}, function (response) {
        if (response.status == 1) {
            $('._modal-body').html(atob(response.data));
//            $('#project_data_div').html('');
        } else {
            $('._modal-body').html(response.data + "!! reload page and try again.");
//            $('#project_data_div').html('');
        }
    });
    } catch(err){
        // do nothing
    }
    $('.modal-backdrop').removeClass('modal-backdrop');
    try{
        chrome.extension.sendRequest({'message': 'unset_bklm_link'}, function (response) {

        }); 
    } catch(err){
        // do nothing
    }

}

function loadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}

$(document).on('click', '#bklm_add_btn', function () {
    $('#project_data_div').html('<p align="center" id="icon_loader_image"> <img height="50" width="50" src="' + loader_image5 + '"></p>');
    var url = btoa($('#blkm_link_box').val());
    var target_url = btoa($('#blkm_link').val());
    var target_url_s = $('#blkm_link').val();
    var full_url_domain = $('#blkm_link_box').val();
    var flag = false;
    var p_id = parseInt($("#project_select option:selected").val());
    var s_id = parseInt($("#site_select option:selected").val());
//    var in_id = parseInt($("#page_select option:selected").val());

    var data_link = '&back_url=' + url;
    if (p_id > 0) {
        data_link += '&pid=' + p_id;
    }
    if (s_id > 0) {
        data_link += '&sid=' + s_id;
        flag = true;
    }
//    if (in_id > 0) {
//        data_link += '&inid=' + in_id;
//    }
    if ((full_url_domain.trim()) == ' ' || (full_url_domain.trim()) == '')
    {
//        $('#msg_backlinksm').html('<span> Please enter URL. </span>').show();
        $('#project_data_div').html("<div class='_alert _alert-danger'>please enter proper url.</div>");
        setTimeout(function () {
            $('#project_data_div').html('');
        }, 5000);
        $('#blkm_link_box').focus();
    } else {
        if (flag) {
            var p_id = $('#project_select').val();
            var s_id = $('#site_select').val();
            try{
                chrome.extension.sendRequest({'message': 'bklm_url_model', 'pid': p_id, 'sid': s_id, 'links': full_url_domain,'target_url':target_url}, function (response) {
                    if(response.status == -1){
                        if (changes_desgin) {
                            $('#add_backlink_div').html('<div class="_alert _alert-danger"><i class="fa fa-warning"></i>'+response.msg+'</div>');
                        } else {
                            $('#add_backlink_div').html('<div class="_alert _alert-danger"><i class="fa fa-warning"></i>'+response.msg+'</div>');
                        }
                    }else if(response.status == 1){
                        $('._modal-dialog').css({"width": "70%"});
                        $('#project_data_div').html('');
                        $('#add_backlink_div').html(atob(response.data));
                    }
                });
            } catch(err){
                // do nothing
            }
//            $('#msg_backlinksm').html('').hide();

//                var link = 'http://serpedlocal.com/private/serpedextension/backlinks.manager.addlinks.php?pid='+p_id+'&sid='+s_id+'&links='+test_url;
//                var ifram = '<iframe style="width:100%" src="'+link+'"></iframe>';
//                $('#add_backlink_div').html(ifram);
//            chrome.extension.sendRequest({'message': 'add_extra_bklm_url', 'more': data_link}, function (response) {
//                
//                console.log(response);
//                var v_status = Number(response.status);
//                $('#project_select').val('0');
//                $('#site_select').html('<option value="0">Site</option>');
//                $('#page_select').html('<option value="0">Inner-Page</option>');
//                if (v_status == 1)
//                {
//                    // success
//                    $('#project_data_div').html('');
////                    $('#serped_modal_blkm').html('');
//                    $('#bklm_close_btn').trigger('click');
//                    alert("Url successfully added into backlinks manager");
//                }
//                else
//                {
////                    $('#project_data_div').html('');
//                    $('#project_data_div').html("<div class='_alert _alert-danger'>something went wrong try again</div>");
//                    setTimeout(function(){
//                        $('#project_data_div').html('');
//                    },5000);
////                    alert("something went wrong try ageain");
//                    //something  went wrong
//                }
//            });
        } else {
            $('#project_data_div').html("<div class='_alert _alert-danger'><center><strong>Please select site.</strong></center></div>");
            setTimeout(function () {
                $('#project_data_div').html('');
            }, 5000);

        }
    }
});

$(document).on('click', '#bklm_close_btn', function () {
    $('#backlinksm_site').removeClass('in');
    $('#serped_modal_blkm').html('');
    $('#backlinksm_site').fadeIn(350);
});
$(document).on('click', '._close', function () {
    $('#backlinksm_site').removeClass('in');
    $('#serped_modal_blkm').html('');
    $('#backlinksm_site').fadeIn(350);
});
$(document).on('click', '._close2', function () {
    $('#add-page').removeClass('in');
    $('#add-page').removeClass('_modal _fade');
    $('.modal-backdrop').removeClass('modal-backdrop');
    $('#add-page').fadeIn(350);
});
//----- OPEN
$('[data-popup-open]').on('click', function (e) {
    var targeted_popup_class = jQuery(this).attr('data-popup-open');
    $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);

    e.preventDefault();
});

//----- CLOSE
$('[data-popup-close]').on('click', function (e) {
    var targeted_popup_class = jQuery(this).attr('data-popup-close');
    $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);

    e.preventDefault();
});

$(document).on('click', '#save-page', function () { 
    var project_id = $('#project_select').val();
    var sid = $('#site_select').val();
    var url = $('#srpd_url').val();
    var site_name = $('#srpd_site_name').val();
    var main_kwrd = $('#srpd_main_kwrd').val();
    var other_kwrds = $('#srpd_other_kwrds').val();
    var engine = $('#srpd_engine').val();
    var date = $('.bklm_date_picker').datepicker({dateFormat: 'dd-mm-yy'}).val();
    try{
        chrome.extension.sendRequest({'message': 'add_bklm_page', 'project_id': project_id, 'sid': sid, 'url': url, 'site_name': site_name, 'main_kwrd': main_kwrd, 'other_kwrds': other_kwrds, 'engine': engine, 'date': date}, function (response) {
//        console.log(response.data);
        var result = atob(response.data);
        result = JSON.parse(result);
//        console.log(result['status']);
        if (result['status'] == "true") { 
            $('.add-page').parent().html('<img src="'+is_valid_img+'">');
            $('#add-page').removeClass('in');
            $('#add-page').removeClass('_modal _fade');
            $('.modal-backdrop').removeClass('modal-backdrop');
            $('#add-page').fadeIn(350);
        }
        else {
            $htn = '<div class="_alert _alert-danger"><i class="fa fa-warning"></i> We are unable to add inner page at the moment</div>';
            $("#error").html($htn);
        }
        $("#loader").hide();
    });
    } catch(err){
        // do nothing
    }
});

$('.switchdata').on('click',function(){
    /*
    var $k=0;
    $('._2wP_Y').each(function(e,i){
        var img1 = $(this).find('img').attr('src');
        //console.log(img1);
        var name = $(this).find('._1wjpf').html();
        console.log(name);
        console.log($k);
        if($k == 0){
            $(this).click();
        }
        $k = $k + 1;
    });
    */
    var $k=0;
    var $i=0;
//    
    $('._2y17h').each(function(){
        var header_Data = $(this).find('.O90ur').html();
        console.log(header_Data);
//        $(this).find('.O90ur').each(function(){
//            
//        });
        chrome.extension.sendRequest({'message': 'get_whats_number','params':header_Data}, function (response) {
            
        });
    });
    $('.AfVTG ._1CRb5').each(function(){
        if($k == 4){
            var total_mem = $(this).find('._1sYdX').html();
            var res = total_mem.split(" ");
            //console.log(res);
            var total_all = res[0];
            console.log(total_all);
            
//            $(this).find('._2wP_Y').each(function(){
            $(this).find('.RLfQR ._2wP_Y').each(function(){
//                if(total_all > $i){
                    var c_num = $(this).find('._1wjpf').html();
                    console.log($i+"=>"+c_num);
//                }
                $i++;
            });
        }
        $k = $k + 1;
    });
});

$(document).on('click','#bklm_import_links',function(){
    var params = $('#imp_params').val();
    var totalLinks = $('#imp_totalLinks').val();
    var type = $('#imp_type').val();
    var pb_date = $('.hasDatepicker').val();
    var anchor = $('#srpd_anchor').val();
    var link = $('#srpd_link').val();
    var tag = $('#srpd_tag').val();
    try{
        chrome.extension.sendRequest({'message': 'bklm_import_links','params':params,'totalLinks':totalLinks,'type':type,'pb_date':pb_date,'anchor':anchor,'link':link,'tag':tag }, function (response) {
            var result = response; 
            if(result.status == -1){
                $('#_srpd_status_imprt_links').html('<div class="_alert _alert-danger"><i class="fa fa-warning"></i>'+result.msg+'</div>')
            }
            else if (result.status == "1") { 
                $('#_srpd_status_imprt_links').html('<div class="_alert _alert-success"><i class="fa fa-warning"></i> Successfully import links</div>')
                $('#backlinksm_site').removeClass('in');
                $('#serped_modal_blkm').html('');
                $('#backlinksm_site').fadeIn(350);
            }else{
                $('#_srpd_status_imprt_links').html('<div class="_alert _alert-danger"><i class="fa fa-warning"></i> We are unable to import links at the moment</div>')
            }
        });
    } catch(err){
        // do nothing
    }
});
