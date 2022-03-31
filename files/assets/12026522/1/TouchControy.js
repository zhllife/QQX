var TouchControy = pc.createScript('touchControy');
// initialize code called once per entity
TouchControy.prototype.initialize = function() {
    
    this.passNumber =0;
    this.flyTime =0;
    this.isPress = false;
    this.pressTime =0;
    this.PressIsActive = false;
    this.app.graphicsDevice.devicePixelRatio=window.maxPixelRatio===1?1:2; 
    
    this.mcc = this.entity.script.MainCameraControl;
    this.ui = this.entity.script.uimanager;
    //this.app.graphicsDevice.precision='lowp';
    //thia.app.maxPixelRatio=window.devicePixelRatio===1?1:2;

    // this.app.keyboard.on(pc.EVENT_KEYDOWN, this.onKeyDown, this);
    
    
};
TouchControy.prototype.onKeyDown = function(event){
    if (event.key === pc.KEY_T){
        this.entity.script.MainCameraControl.ToShowEarth();
    }else if (event.key === pc.KEY_H){
           if(this.entity.script.MainCameraControl.hasLookOtherPlanet)
            {
                this.entity.script.MainCameraControl.HideOver();
            }else
            {
                this.entity.script.MainCameraControl.HideQiEXing();
            }
    }else if (event.key === pc.KEY_O){
        this.entity.script.MainCameraControl.ShowOver();
    }else if (event.key === pc.KEY_B){
        this.onMouseDown();
    }else if (event.key === pc.KEY_E){
        this.onMouseUp();
    }
};

TouchControy.prototype.onTouchStart = function (event) {

    event.event.preventDefault(); 
    this.onMouseDown();
};
TouchControy.prototype.onTouchEnd = function (event) {

     this.onMouseUp();
};
TouchControy.prototype.key_T = function()
{
    this.entity.script.MainCameraControl.ToShowEarth();
};
TouchControy.prototype.key_H = function()
{
    this.entity.script.MainCameraControl.HideOver();
};

TouchControy.prototype.onMouseDown = function()
{
    this.PressIsActive = false;
    this.isPress = true;
    
    this.mcc.LastWillHide();
};
TouchControy.prototype.onMouseUp = function()
{
    if(this.PressIsActive)
    {
        this.PressIsActive = false;
        console.log("this.passNumber:"+this.passNumber);
        this.entity.script.MainCameraControl.EndMove(this.passNumber+1);
    }
    this.pressTime = 0;
    this.flyTime = 0;
    this.isPress = false;
    this.passNumber =0;
    
    this.mcc.LastWillHideBack();
};
TouchControy.prototype.update = function(dt)
{
    if(this.isPress&&!this.PressIsActive)
    {
        this.pressTime+=dt;
        if(this.pressTime>=1)
        {
            this.entity.script.MainCameraControl.BeinMove();
            this.pressTime =0;
            this.flyTime = 0;
            this.isPress = false;
            this.PressIsActive = true;
            
            if(this.mcc.currentPlanet>=1)
            {
                if(document.getElementById('revertFly'))
                    window.setFlyStar(this.mcc.currentPlanet+1);
                //console.log("即将到达:"+(this.mcc.currentPlanet+1));
            }
            
        }
    }else if(this.PressIsActive)
    {
        this.pressTime+=dt;
    }else{
        this.passNumber =0;
        this.pressTime = 0;
        this.flyTime = 0;
    }
    
    if(this.mcc.gameState === GameState.Shuttle&&this.mcc.isAddSpeed === false)
    {
        this.flyTime+=dt;
        var timeP = this.flyTime;
        if(this.mcc.currentPlanet>=2)
            timeP =this.mcc.currentPlanet+2+this.flyTime;
        
        if(this.ui.timeValue)
        {
           this.ui.timeValue.innerText = timeP.toFixed(3).replace('.',"\'");
        }
         
        this.caculateTime = this.flyTime;
        //飞过一个星球
        if(this.mcc.currentPlanet<=1)
        {
            this.caculateTime = this.flyTime-3;
        }else
        {
            this.caculateTime = this.flyTime;
        }
        
        if(Math.floor(this.caculateTime)>this.passNumber)
        {

            this.passNumber = Math.floor(this.caculateTime);
            
            if(this.mcc.currentPlanet+this.passNumber>=2&&this.mcc.currentPlanet+this.passNumber<=this.mcc.maxPlanet)
                this.mcc.PassOnePlanet(this.mcc.currentPlanet+this.passNumber);
            
            console.log("飞过:"+(this.mcc.currentPlanet+"+"+this.passNumber));
            if(this.mcc.currentPlanet+this.passNumber>=1)
            {
                
                if(document.getElementById('revertFly'))
                    window.setFlyStar(this.mcc.currentPlanet+this.passNumber+1);

            }

            if(this.mcc.currentPlanet+this.passNumber+1>this.mcc.maxPlanet)
            {
                this.onMouseUp();
            }
        }
        
    }
};