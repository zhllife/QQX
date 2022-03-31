(function () {
    {
        var u = navigator.userAgent, app = navigator.appVersion;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    }
    document.body.addEventListener('touchmove', function (e) {
        e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
    }, {passive: false}); //passive 参数不能省略，用来兼容ios和android
    {
        $("#myCanvas").css({
            height : window.innerHeight
        });
        //===== 判断是否转屏
        flipEquipment();
        $(window).bind( 'orientationchange', function(e){
            flipEquipment();
        });
        //===== 判断是否转屏
        function flipEquipment(){
            if (window.orientation == 0 || window.orientation == 180) {
                orientation = 'portrait';
                $('#horizontal-wrapper').hide();
                return false;
            }else if (window.orientation == 90 || window.orientation == -90) {
                orientation = 'landscape';
                $('#horizontal-wrapper').show();
                return false;
            }
        }
    }//横竖屏判断

    var costtime = null;

    {
        window.playMoveupAudio = function () {
            document.getElementById("audio_moveup").play();
        }
        window.playShulteAudio = function () {
            document.getElementById("audio_shulte").play();
        }
        window.pauseShulteAudio = function () {
            document.getElementById("audio_shulte").pause();
        }
    }


    window.ShowBeginText = function(){
        document.getElementById('loadedContainer').style.display = "block";
        $("#loadedTIP").fadeIn(1500).delay(2000).fadeOut(1000);
    }
    window.enterLoaded = function () {
        document.getElementById("inputContainer").style.display = "block";
        document.getElementById("realInput").onfocus = function(){
            $("#inputContainer > .inputDiv > label").css("color","#ffffff");
            if(isIOS)
            $("#inputContainer > .inputDiv").css("top","30%");
            if($("#realInput").val() === "")
                document.getElementById("inputShow").innerText = " ";





            if(isAndroid){//安卓软键盘的收起判断 ，代替onblur时间
                var winHeight= $(window).height();
                $(window).bind("resize",function(){
                    var thisHeight=$(this).height();
                    if(winHeight - thisHeight >50){
                        console.log("软键盘出现");
                    }else{
                        // alert("软键盘收起");
                        $("#inputContainer > .inputDiv > label").css("color","");
                        var getName = $("#realInput").val();
                        // document.getElementById("getNameInput0").innerText = getName;
                        document.getElementById("getNameInput1").innerText = getName;
                        enterStart();
                        $(this).unbind("resize");
                    }
                });
            }
        };
        document.getElementById("realInput").onblur = function(){
            $("#inputContainer > .inputDiv > label").css("color","");
            if(isIOS)
            {
                $("#inputContainer > .inputDiv").css("top","");
                var getName = $("#realInput").val();
                // document.getElementById("getNameInput0").innerText = getName;
                document.getElementById("getNameInput1").innerText = getName;
                enterStart();
            }

        };

        {
            var Str = {
                byteLen : function (str){
                    //正则取到中文的个数，然后len*count+原来的长度。不用replace
                    str += '';
                    var tmp = str.match(/[^\x00-\xff]/g) || [];
                    return str.length + tmp.length;
                },
                getMaxlen : function(str,maxlen){
                    var sResult = '', L=0, i=0, stop = false, sChar;
                    if(str.replace(/[^\x00-\xff]/g,'xxx').length <= maxlen){
                        return str;
                    }
                    while(!stop){
                        sChar = str.charAt(i);
                        L+= sChar.match(/[^\x00-\xff]/) ? 2 : 1;
                        if(L > maxlen){
                            stop = true;
                        }else{
                            sResult+=sChar;
                            i++;
                        }
                    }
                    return sResult;
                }
            };
            var inputLock = false;
            document.querySelector('#realInput').addEventListener('compositionstart', function(){
                inputLock = true;
            })
            document.querySelector('#realInput').addEventListener('compositionend', function(){
                inputLock = false;
                var value = this.value,
                    maxlength = this.getAttribute('maxlength');
                if(Str.byteLen(value) > maxlength){
                    this.value = Str.getMaxlen(value, maxlength);
                }
                document.getElementById("inputShow").innerText = $("#realInput").val();
                if($("#realInput").val()!=""){
                    $("#inputBtn").removeClass("invisible");
                }
            })
            document.querySelector('#realInput').addEventListener('input', function(){
                if(!inputLock){
                    var value = this.value,
                        maxlength = this.getAttribute('maxlength');
                    if(Str.byteLen(value) > maxlength){
                        this.value = Str.getMaxlen(value, maxlength);
                    }
                    document.getElementById("inputShow").innerText = $("#realInput").val();
                    if($("#realInput").val()!=""){
                        $("#inputBtn").removeClass("invisible");
                    }
                }
            });
        }
    }
    function enterStart(){
        $("#starTip").show();
        window.is1stBP = false;
        $("#loadedTIP").attr("src","img/loaded/loadedTip.png");
        $("#mainButtonIMG").attr("src","img/star/starIconCenter.png");//初始化

        document.getElementById('loadingContainer').style.display = "none";
        document.getElementById('loadedContainer').style.display = "block";
        // window.buttonShow(1,24);
        document.getElementById("screenShot").style.display = "none";
        document.getElementById("refreshALL").style.display = "none";
        document.getElementById('flyContainer').style.display = "none";
        document.getElementById('starContainer').style.display = "block";

        document.getElementById('starImgContainer').style.display = "none";
        document.getElementById('mainButton').style.display = "block";

        document.getElementById('shareContainer').style.display = "none";
        document.getElementById('hireContainer').style.display = "none";
        // window.ShowBeginText();
    }
    window.enterFly = function () {
        $("#inputContainer").fadeOut();
        setTimeout(function () {
            $("#mainButtonIMG").attr("src","img/star/starIconCenter2.png");
            $(".flyTimeDIV").fadeIn("slow");
        },600);
        $("#screenShot").hide();
        $("#starContainer").fadeOut(500);
        document.getElementById('loadedContainer').style.display = "none";
        document.getElementById('flyContainer').style.display = "block";

        // document.getElementsByClassName('flyTimeDIV')[0].style.display = "block";
        // document.getElementsByClassName('flyTimeDIV')[1].style.display = "block";

        // document.getElementById("starImgContainer").style.display = "none";
        $("#starImgContainer").fadeOut(500);

        // document.getElementById('starContainer').style.display = "none";
        document.getElementById('shareContainer').style.display = "none";
        document.getElementById('hireContainer').style.display = "none";
    }
    function getWeChatUserHeadImg (headImg) {
        var img = new Image();
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        img.crossOrigin = 'Anonymous';
        img.onload = function () {
            canvas.height = img.height;
            canvas.width = img.width;
            ctx.drawImage(img, 0, 0);
            var dataURL = canvas.toDataURL('image/png');
            document.getElementById("starUserFace").src = dataURL;
            canvas = null;
        };
        img.src = window.headImg;
    }
    window.enterStar = function (index) {
        //document.getElementById("starUserFace0").src = window.headimg;
        //document.getElementById("starUserFace").src = window.headimg;
        //getWeChatUserHeadImg(window.headimg);
        index--;
        costtime = document.getElementById("timeRemain").innerText.replace('\'',".");
        document.getElementById("starContent").src = "img/star/starName/"+index+".png";

        document.getElementById('loadedContainer').style.display = "none";
        document.getElementById('flyContainer').style.display = "none";
        $("#starContainer").fadeIn(500);
        // document.getElementById('starContainer').style.display = "block";

        // document.getElementById("screenShot").style.display = "block";
        $("#screenShot").fadeIn(1000);
        if(index>=13){
            $("#starTip").hide();
            $("#refreshALL").fadeIn(1000);
            $("#mainButton").hide();
        }
        document.getElementById("starImgContainer").style.display = "block";

        window.buttonPressed(101,129);
        document.getElementById('shareContainer').style.display = "none";
        document.getElementById('hireContainer').style.display = "none";
        document.getElementById("getCanvasIMG").src = "img/share/starPreIMG/"+index+".jpg";
    }
    window.enterShare = function (){
        document.getElementById('loadedContainer').style.display = "none";
        document.getElementById('starContainer').style.display = "none";
        document.getElementById('flyContainer').style.display = "none";
        // document.getElementById('shareContainer').style.display = "block";
        $("#shareContainer").show();
        document.getElementById('hireContainer').style.display = "none";
    }
    window.enterHire = function () {
        document.getElementById("endUser").innerText = window.nickname;
        document.getElementById("endTime").innerText = document.getElementById("timeRemain").innerText.replace('\'',".");
        document.getElementById('loadedContainer').style.display = "none";
        document.getElementById('flyContainer').style.display = "none";
        document.getElementById('starContainer').style.display = "none";
        document.getElementById('shareContainer').style.display = "none";
        // document.getElementById('hireContainer').style.display = "block";
        $("#hireContainer").fadeIn();
    }
    document.getElementById('revertFly').onclick = function(){
        MtaH5.clickStat("again");
        _hmt.push(['_trackEvent','click', "再次"]);
    }
    document.getElementById('refreshALL').onclick = function(){
        $("#realInput").val("");
        $("#inputBtn").addClass("invisible");
        document.getElementById("inputShow").innerText = "输入你的名字，找到答案";
    }
    document.getElementById("shareClose").onclick = function () {
        MtaH5.clickStat("close");
        _hmt.push(['_trackEvent','click', "关闭"]);
        document.getElementById('shareContainer').style.display = "none";
        $(outImage).hide();
        document.getElementById('starContainer').style.display = "block";
        $("#shareClose").hide();
    };

    $("#hireIMGClose").click(function () {
        $("#share-wrapper").hide();
    });

    window.addEventListener('contextmenu', function(e){
        e.preventDefault();
    });
    document.getElementById("mainButton").ontouchstart = function(e){
        window.PressFryDown();
    };
    document.getElementById("mainButton").ontouchend = function(e){
        window.PressFryUp();
    };

    window.setFlyStar = function (index) {
        if (index<14&&index>=2){
        }

    }
})();