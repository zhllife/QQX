(function () {
    {
        var imgWrap = [];
        function preloadImgHands(arr) {
            for(var i=0;i<arr.length;i++){
                imgWrap[i] = new Image();
                imgWrap[i].src = arr[i];
            }
        }
        var imgArr = [];
        for(var n=0;n<13;n++){
            imgArr.push("img/star/starName/"+n+".png");
        }
        preloadImgHands(imgArr);
    }//预加载



    var btnall = document.getElementById("mainButton").firstElementChild;
    var btnDisplayN,btnLoopN,btnDownStartN,btnDownDownN,btnDownEndN,btnDownAfterN;
    window.curFrameIndex = 1;


    function buttonAllRE(fromIndex,toIndex) {
        clearAllInter();
        window.curFrameIndex = fromIndex;
        btnDownAfterN = setInterval(function () {
            window.curFrameIndex ++;
            if(window.curFrameIndex <= toIndex){
                btnall.src = "img/animation/" + window.curFrameIndex +".png";
            }else{
                window.curFrameIndex = fromIndex;
            }
        },40);
    }//三个同时循环

    {
        window.buttonShow = function (fromIndex,toIndex) {
            clearAllInter();
            window.curFrameIndex = fromIndex;
            btnDisplayN = setInterval(function () {
                window.curFrameIndex ++;
                if(window.curFrameIndex <= toIndex){
                    btnall.src = "img/animation/" + window.curFrameIndex +".png";
                }else{
                    window.curFrameIndex = toIndex;
                    clearInterval(btnDisplayN);
                    buttonRE(25,54);
                }
            },40);
        } //出现按钮

        function buttonRE(fromIndex,toIndex) {
            clearAllInter();
            window.curFrameIndex = fromIndex;
            btnLoopN = setInterval(function () {
                window.curFrameIndex ++;
                if(window.curFrameIndex <= toIndex){
                    btnall.src = "img/animation/" + window.curFrameIndex +".png";
                }else{
                    window.curFrameIndex = fromIndex;
                }
            },40);
        }//出现按钮循环
        window.is1stBP = false;
        window.buttonPress = function (fromIndex,toIndex) {
            MtaH5.clickStat("start");
            if(!window.is1stBP){
                _hmt.push(['_trackEvent','click', "开始光速飞行"]);
                window.is1stBP = true;
            }
            else {
                _hmt.push(['_trackEvent','click', "继续光速飞行"]);
                $("#starTip").hide();
            }
            clearAllInter();
            window.enterFly();
        } //按

        function buttonPreRE(fromIndex,toIndex) {
            clearAllInter();
            window.curFrameIndex = fromIndex;
            btnDownDownN = setInterval(function () {
                window.curFrameIndex ++;
                if(window.curFrameIndex <= toIndex){
                    document.getElementById("flyIMG").src = "img/animation/" + window.curFrameIndex +".png";
                }else{
                    window.curFrameIndex = fromIndex;
                }
            },40);
        }//按中循环

        window.buttonPressed = function (fromIndex,toIndex) {
            clearAllInter();
            // window.buttonShow(1,24)

        }//离开按
        function clearAllInter() {
            clearInterval(btnDisplayN);
            clearInterval(btnLoopN);
            // clearInterval(btnDownStartN);
            clearInterval(btnDownDownN);
            // clearInterval(btnDownEndN);
            clearInterval(btnDownAfterN);
        }
    }
})();

