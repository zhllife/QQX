var Uimanager = pc.createScript('uimanager');

if(typeof UI_ID == "undefined"){
    var UI_ID = {};
    UI_ID.begin = 0;
    UI_ID.fly = 1;
    UI_ID.show = 2;
    UI_ID.shot = 3;
    UI_ID.over = 4;
}

// initialize code called once per entity
Uimanager.prototype.initialize = function() {
    this.mcc = this.entity.script.MainCameraControl;
    this.InitUI();
    this.screenShotOverPageBool = true;
};

// update code called every frame
Uimanager.prototype.update = function(dt) {
    
};

Uimanager.prototype.InitUI = function()
{
    if(document.getElementById('revertFly'))
    {
        
        document.getElementById('revertFly').addEventListener('click',function(){
            pc.app.root.findByName('Camera').script.uimanager.HideUI(UI_ID.over);
            if(this.entity.script.MainCameraControl.hasLookOtherPlanet)
            {
                this.entity.script.MainCameraControl.HideOver();
            }
            
        }.bind(this));
        
        document.getElementById('refreshALL').addEventListener('click',function(){
            pc.app.root.findByName('Camera').script.uimanager.HideUI(UI_ID.over);
            if(!this.entity.script.MainCameraControl.hasLookOtherPlanet)
            {
              this.entity.script.MainCameraControl.HideQiEXing();
            }
            
        }.bind(this));
        
    }
        
    
    if(document.getElementById('screenShot'))
        document.getElementById('screenShot').addEventListener('click',function(){
            pc.app.root.findByName('Camera').script.uimanager.screenShot();
        }.bind(this));
    
    if(document.getElementById('timeRemain'))
    {
        this.timeValue = document.getElementById("timeRemain");
        if(this.timeValue)
        {
           this.timeValue.innerText = Math.random().toFixed(3).replace('.',"\'");
        }
    }
        
};

Uimanager.prototype.ShowUI = function(uiID)
{
    
    if(document.getElementById('loadedContainer'))
    {
        switch(uiID)
        {
            case UI_ID.begin:
                console.log("UI_ID.begin");
                window.enterLoaded();
                break;
            case UI_ID.fly:
                console.log("UI_ID.fly");
                window.buttonPress(55,70);
                break;
            case UI_ID.show:
                console.log("UI_ID.show");
                window.enterStar(this.mcc.currentPlanet-1);
                
                var timeP = 0;
                if(this.mcc.currentPlanet>=2)
                    timeP =this.mcc.currentPlanet+2.05+Math.random()*0.1;
                else
                    timeP = Math.random();
                console.log("timeP:"+timeP);
                if(this.timeValue)
                {
                   this.timeValue.innerText = timeP.toFixed(3).replace('.',"\'");
                }
                
                break;
            case UI_ID.shot:
                console.log("UI_ID.shot");
                break;
            case UI_ID.over:
                console.log("UI_ID.over");
                window.enterHire();
                break;
        }

    }
};
Uimanager.prototype.HideUI = function(uiID)
{
    if(document.getElementById('loadedContainer'))
    {
        switch(uiID)
        {
            case UI_ID.begin:
                console.log("UI_ID.begin");
                document.getElementById('loadedContainer').style.display = "none";
                break;
            case UI_ID.fly:
                console.log("UI_ID.fly");
                $("#flyContainer").fadeOut();
                break;
            case UI_ID.show:
                console.log("UI_ID.show");
                document.getElementById('starContainer').style.display = "none";
                break;
            case UI_ID.shot:
                console.log("UI_ID.shot");
                break;
            case UI_ID.over:
                console.log("UI_ID.over");
                if(this.timeValue)
                {
                   this.timeValue.innerText = Math.random().toFixed(3).replace('.',"\'");
                }
                document.getElementById('hireContainer').style.display = "none";
                document.getElementById('starContainer').style.display = "none";
                break;
        }

    }
};



Uimanager.prototype.screenShot = function() {
 
        // this.app.once('frameend', function() {
        //     var screenshotImg = pc.app.graphicsDevice.canvas.toDataURL('image/png');
        //     window.getCanvasIMG(screenshotImg);
        //  });
    
};
Uimanager.prototype.screenShotOverPage = function() {
    
    // if(this.screenShotOverPageBool===true)
    // {
    //     this.screenShotOverPageBool = false;
    //     if(document.getElementById('screenShot'))
    //     this.app.once('frameend', function() {
    //         var screenshotImg = pc.app.graphicsDevice.canvas.toDataURL('image/png');
    //         window.getCanvasIMGlast(screenshotImg);
    //      });
    // }

};


window.PressFryDown = function()
{
    pc.app.root.findByName('Camera').script.touchControy.onMouseDown();
};
window.PressFryUp = function()
{
    pc.app.root.findByName('Camera').script.touchControy.onMouseUp();
};