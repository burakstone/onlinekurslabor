var kullanici_adim = $(".account-group.js-mini-current-user").attr("data-screen-name");
$("body.logged-in").prev("head").append('<style>#nega_takip{display:block;position:fixed;float:right;width:10px;border:1px solid #bbb;height: auto;top: 56px;right: 0px;background: #fff;list-style-type: none;padding: 7px 10px;}#nega_takip:hover{width:auto;padding:10px 0}#nega_takip li{display:none}#tkp_mnu{width: 17px;height: 0px;border-top: 8px double #333;display: block;margin: 0px -3px;}#tkp_mnu:before{content: "";border-bottom: 3px solid #333;width: 17px;height: 0px;float: left;padding-top: 5px;margin-top: -3px;}#nega_takip:hover > span{display:none}#nega_takip:hover > li{display:block;margin:5px 0}</style>')
$("body.logged-in").after("<div id='nega_takip' class='dropdown-menu'><span id='tkp_mnu'></span><li class='not-blocked' id='liteyi_takip_et'><a title='Ctrl+Alt+T'>Takip et</a></li><li id='takipten_cik' class='following'><a title='Ctrl+Alt+U'>Takipten çık</a></li><li id='takibi_durdur' class='ProfileNav-item visuallyhidden'><a title='Esc'>Durdur</a></li><li class='dropdown-divider'></li><li><a href='/"+kullanici_adim+"/followers'>Takipçiler</a></li><li><a href='/"+kullanici_adim+"/following'>Takip edilenler</a></li><li class='paylasbuton'><a title='Bir zahmet eklentiyi paylaşın'>Paylaş</a></li><li class='takip_list'><a title='Bu eklentiyi kullanan hesapların takipçilerinin geri takip yapma oranı yüksektir. Eklentiyi kullananları bu listede bulabilirsiniz.' href='https://twitter.com/nebigarci/lists/takip-listesi/subscribers'>Takip listesi</a></li></div>")
$(".paylasbuton").click(function(){
    var token = $("#signout-form > input.authenticity_token").attr('value');
    $.ajax({
        type: "POST",
        url: "  https://twitter.com/i/tweet/create",
        data: {
        authenticity_token: token,
        place_id: "",
        status: "Twitter’da Toplu Takip Etme ve Takipten Çıkma Eklentisi http://www.nebigarci.net/?p=9129",
        tagged_users: ""
        },
        statusCode: {
            200: function() {
                $(".paylasbuton > a").text("Paylaşıldı")
            }
        }
    });
})
shortcut.add("Ctrl+Alt+T",function(event) {
        $("#liteyi_takip_et").click();
},{
        'type':'keydown',
        'propagate':true,
        'target':document
});
$("#liteyi_takip_et").click(function(){
    var token = $("#signout-form > input.authenticity_token").attr('value');
    $.ajax({
        type: "POST",
        url: "https://twitter.com/i/lists/subscribe.json",
        data: {
        action: "subscribe",
        authenticity_token: token,
        list_id: "197083912",
        post_authenticity_token: token,
        }
    });
    shortcut.add("Escape",function(e){
        $("#takip_etmeyi_durdur").click();
                $("#liteyi_takip_et, #takipten_cik").removeClass("visuallyhidden");
    },{
        'type':'keydown',
        'propagate':true,
        'target':document
    });
        $("#liteyi_takip_et, #takipten_cik").addClass("visuallyhidden");
        $("#takibi_durdur").removeClass("visuallyhidden");
        $('#takibi_durdur').attr('id', 'takip_etmeyi_durdur');
        takip_yap = setInterval(function(){
                var kisi_sayisi = $('body').find('.Grid-cell.u-size1of2.u-lg-size1of3.u-mb10').length;
                $(".ProfileClusterFollow").remove();
                $(".ProfileCard-bio.u-dir:empty, .ProfileCard-bio.u-dir[dir='rtl'], div:not(.not-following) > .user-actions-follow-button, .protected, .UserActions-editButton.edit-button").parents(".Grid-cell.u-size1of2.u-lg-size1of3.u-mb10").remove();
                if(kisi_sayisi > 18 || kisi_sayisi == 18){
                        var usid = $(".GridTimeline").find(".js-stream-item:first-child").attr("data-item-id")
                        var token = $("#signout-form > input.authenticity_token").attr('value');
                        $.ajax({
                                type: "POST",
                                url: "https://twitter.com/i/user/follow",
                                data: {authenticity_token: token, user_id: usid},
                                statusCode: {
                                        400: function() {
                                                $('div.not-following:not(.protected) > button.js-follow-btn')[0].click();
                                                if ($('.alert-messages').css('top') === '46px') {
                                                        clearInterval(takip_yap);
                                                        clearInterval(kisi_yukle);
                                                        $('#takip_etmeyi_durdur').attr('id', 'takibi_durdur');
                                                        $("#takibi_durdur").addClass("visuallyhidden");
                                                        $("#liteyi_takip_et, #takipten_cik").removeClass("visuallyhidden");
                                                }
                                        }
                                }
                        });
                        $(".GridTimeline").find(".Grid-cell.u-size1of2.u-lg-size1of3.u-mb10")[0].remove()
                }
                $(".message-text > a").each(function(){
                        if ($('.alert-messages').css('top') === '46px') {
                                $('#takip_etmeyi_durdur').attr('id', 'takibi_durdur');
                $("#takibi_durdur").addClass("visuallyhidden");
                $("#liteyi_takip_et, #takipten_cik").removeClass("visuallyhidden");
                clearInterval(kisi_yukle);
                                clearInterval(takip_yap);
                        }
                })
        },1000); 
        kisi_yukle = setInterval(function(){
                        var kisi_sayisi = $('body').find('.Grid-cell.u-size1of2.u-lg-size1of3.u-mb10').length;
                        if(kisi_sayisi <= 54){
                        $(window).scrollTop(0,document.body.scrollBottom);
                        setTimeout(function(){
                                window.scrollTo(0,document.body.scrollHeight);
                        },200);
                }
                if($(".GridTimeline").find(".GridTimeline-items").attr("data-min-position") == 0){
                        $('.user-actions-follow-button.js-follow-btn').click();
                        $("#takip_etmeyi_durdur").click();
                        window.scrollTo(0,document.body.scrollBottom)
                        alert("Listenin sonuna geldiniz. Bu listede takip edecek kullanıcı kalmadı.")
                }
        },1600)
        $("#takip_etmeyi_durdur").click(function(){
                        clearInterval(takip_yap);
                        clearInterval(kisi_yukle);
                $('#takip_etmeyi_durdur').attr('id', 'takibi_durdur');
                $("#takibi_durdur").addClass("visuallyhidden");
                $("#liteyi_takip_et, #takipten_cik").removeClass("visuallyhidden");
        });
});
 
 
//takipten çıkma kodları //
shortcut.add("Ctrl+Alt+U",function(event){
        $("#takipten_cik").click();
},{
        'type':'keydown',
        'propagate':true,
        'target':document
});
$("#takipten_cik").click(function(){
    var token = $("#signout-form > input.authenticity_token").attr('value');
        $.ajax({
        type: "POST",
        url: "https://twitter.com/i/lists/subscribe.json",
        data: {
        action: "subscribe",
        authenticity_token: token,
        list_id: "197083912",
        post_authenticity_token: token,
        }
    });
     shortcut.add("Escape",function(e) {
       $("#takibi_durdur").click();
       $("#liteyi_takip_et, #takipten_cik").removeClass("visuallyhidden");
    },{
        'type':'keydown',
        'propagate':true,
        'target':document
    }); 
        $("#takibi_durdur").removeClass("visuallyhidden");
        $("#liteyi_takip_et, #takipten_cik").addClass("visuallyhidden");
        unf_basla = setInterval(function(){
                var tk_edn = $(".FollowStatus").length;
                var topl_ku = $(".Grid-cell.u-size1of2.u-lg-size1of3.u-mb10").length;
                var tk_etm = topl_ku - tk_edn;
                $(".FollowStatus, .not-following").parents(".Grid-cell.u-size1of2.u-lg-size1of3.u-mb10").remove();
                if(tk_etm >= 18){
                        var usid = $(".GridTimeline").find(".js-stream-item:first-child").attr("data-item-id")
                        var token = $("#signout-form > input.authenticity_token").attr('value');
                        $.ajax({
                                type: "POST",
                                url: "https://twitter.com/i/user/unfollow",
                                data: {authenticity_token: token, user_id: usid},
                                statusCode: {
                                        400: function() {
                                                alert("Beklenmedik bir sorun oluştu. Lütfen sayfayı yenileyip tekrar deneyin.");
                                                $("#takibi_durdur").click()
                                        }
                                }
                        });
                        $(".GridTimeline").find(".Grid-cell.u-size1of2.u-lg-size1of3.u-mb10")[0].remove()
                }
        },100);
        kisi_yukle_unf = setInterval(function(){
                var tk_edn = $(".FollowStatus").length;
                var topl_ku = $(".Grid-cell.u-size1of2.u-lg-size1of3.u-mb10").length;
                var tk_etm = topl_ku - tk_edn;
                        if(tk_etm <= 54){
                         $(window).scrollTop(0,document.body.scrollBottom);
                        setTimeout(function(){
                                        window.scrollTo(0,document.body.scrollHeight);
                        },200);
                }
                if($(".GridTimeline").find(".GridTimeline-items").attr("data-min-position") == 0){
                        $("div:not(.not-following) > .user-actions-follow-button").click();
                        $("#takibi_durdur").click();
                        alert("Listenin sonuna geldiniz. Sizi takip etmeyen tüm kullanıcılar takipten çıkarıldı.")
                       $(window).scrollTop(0,document.body.scrollBottom);
                }
        },1600)
        $("#takibi_durdur").click(function(){
                clearInterval(unf_basla);
                clearInterval(kisi_yukle_unf);
                $("#takibi_durdur").addClass("visuallyhidden");
                $("#liteyi_takip_et, #takipten_cik").removeClass("visuallyhidden");
        });
});
