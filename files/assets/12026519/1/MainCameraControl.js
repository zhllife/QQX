var MainCameraControl = pc.createScript('MainCameraControl');

if(typeof GameState == "undefined"){
    var GameState = {
        None:0,
        Enter: 1,        //进入游戏
        EnterOver: 2,    
        Shuttle: 3,      //按住穿梭
        ShuttleOver: 4,  //穿梭结束过程
        ShowPlanet: 5,   //展示数据
        ShowPlanetOver: 6,   //展示数据
        Over: 7,   //展示数据
    };
}

// initialize code called once per entity
MainCameraControl.prototype.initialize = function() {
    
    var back = new pc.Vec3().cross(pc.Vec3.RIGHT, pc.Vec3.UP);

    this.minPlanet = 1;
    this.maxPlanet = 14;
    this.currentPlanet = 0;
    
    this.hasLookOtherPlanet = false;
    
    this.speed = 1;//漂浮陨石的速度
    //this.scenemanager = this.app.root.findByName('Manager').script.SceneManager;
    this.Meteor = this.app.root.findByName('Meteor');
    this.galaxy = this.app.root.findByName('galaxy');
    this.shuttleEffect = this.app.root.findByName('ShuttleEffectParent').script.shuttleEffect;
    
    this.isAddSpeed = false;
    this.gameState = GameState.None;
    
    
    this.touchControy = this.entity.script.TouchControy;
    this.MoveTimeLength = 0;
    
    this.Meteor.enabled = false;
    
    this.app.root.findByName('StarrySky').enable = true;
    this.app.root.findByName('StarrySky').setPosition(0,0,-30);
    setTimeout(function(){
        pc.app.root.findByName('Camera').script.MainCameraControl.StarryDown();
        pc.app.root.findByName('beginImage').script.beginImage.canShow = true;
        window.ShowBeginText();
        },500);
};
MainCameraControl.prototype.update = function(dt)
{
    TWEEN.update();
    if(this.MoveTimeLength<2)
        this.MoveTimeLength+=dt;
};

MainCameraControl.prototype.StarryDown = function()
{
    var galaxy= this.app.root.findByName('StarrySky');
    this.galaxyShow = new TWEEN.Tween({px:0,py:0,pz:-30,t:0})
                            .to({px:0,py:0,pz:-12,t:1},5200).delay(0)
                            .easing(TWEEN.Easing.Quadratic.Out)
                            .onStart(function(){

                                galaxy.enabled = true;

                            })
                            .onUpdate(function(){
                                galaxy.setLocalPosition(this.px,this.py,this.pz);

                            })
                            .onComplete(function(){

                                pc.app.root.findByName('Camera').script.MainCameraControl.gameState = GameState.EnterOver;
                            }).start();

    this.togalaxyAnimation = new TWEEN.Tween({py:0,pz:-12,rotx:galaxy.getEulerAngles().x})
                                .to({py:-8,pz:12,rotx:45},1800).delay(5000)//py:-8,pz:12,rotx:45
                                .easing(TWEEN.Easing.Quadratic.In)
                                .onStart(function(){
       
                                    galaxy.enabled = true;
                                    pc.app.root.findByName('beginImage').script.beginImage.AddSpeed();
                                    pc.app.root.findByName('AudioManager').script.audioManager.PlayMoveUp();
                                })
                                .onUpdate(function(){
                                    galaxy.setPosition(0,this.py,this.pz);
                                    //galaxy.setEulerAngles(this.rotx,0,0);
                                })
                                .onComplete(function(){
                                    galaxy.enabled = false;
                                    pc.app.root.findByName('Camera').script.MainCameraControl.gameState = GameState.EnterOver;
                                }).start();
    
    this.ShowEarth(6000);
};


MainCameraControl.prototype.ShowEarth = function(delayTime)
{
    this.hasLookOtherPlanet = false;
    this.currentPlanet=1;
    //this.gameState = GameState.ShowPlanet;
    var galaxy= this.app.root.findByName('StarrySky');
    var lightManager= this.app.root.findByName('lightManager');
    
    lightManager.setLocalEulerAngles(0,270,0);
    var Planet = this.app.root.findByName('Planet'+ this.currentPlanet);
    var Planet_material = Planet.children[1].model.model.meshInstances[0].material;
    var Cloud_material = Planet.children[2].model.model.meshInstances[0].material;
    var tween = new TWEEN.Tween({px:0,py:0,pz: -3,bx:0.83,by:3.912,bz:-30.422,s1:0,t:0})
                        .to({px:0.422,py:0.441,pz: -3,bx:-2.831,by:-1.413,bz:-20,s1:1.3,t:1},3000).delay(delayTime)
                        .easing(TWEEN.Easing.Quadratic.Out)
                        .onStart(function(){
                           Planet.setLocalScale(0,0,0);
                           Planet.setLocalPosition(0,0,-3);
                           Planet.enabled = true;
                            lightManager.enabled = true;
                            Planet.children[0].enabled = false;
                            //Planet.children[1].script.planetRotate.SetComming(50);
                            
                            pc.app.root.findByName('AudioManager').script.audioManager.PlayShowPlanetSlot();
                        })
                        .onUpdate(function(){
                            Planet.setLocalPosition(0.422 - MainCameraControl.Sin(this.t)*0.5,0.441 - MainCameraControl.Sin(this.t)*0.5,this.pz);
                            lightManager.setLocalPosition(Planet.getLocalPosition().x,Planet.getLocalPosition().y,Planet.getLocalPosition().z);
                            Planet.setLocalScale(this.s1,this.s1,this.s1);
                            Planet_material.reflectivity = this.t*3;
                            Planet_material.update();
                            Cloud_material.emissiveIntensity = this.t;
                            Cloud_material.update();
                            
                            Planet.children[1].enable = true;
                            Planet.children[1].setLocalPosition(0,0,0);    
                            Planet.children[1].setLocalEulerAngles(0,0,0);
                            
                            Planet.children[2].enable = true;
                            Planet.children[2].setLocalPosition(0,0,0);    
                            Planet.children[2].setLocalEulerAngles(0,0,0);
                        })
                        .onComplete(function(){
                          
                            galaxy.enabled = false;
                            pc.app.root.findByName('Camera').script.MainCameraControl.gameState = GameState.ShowPlanetOver;
                            
                            pc.app.root.findByName('Camera').script.uimanager.ShowUI(UI_ID.begin);
                            
                            pc.app.root.findByName('AudioManager').script.audioManager.PlayClick();
                            for(var i=0;i<Planet.children[0].children.length;i++)
                            {
                                Planet.children[0].children[i].script.auxiliaryLine.show();
                            }
                            Planet.children[0].enabled = true;
                            //pc.app.root.findByName('Camera').script.touchControy.onMouseDown();
                        }).start();
    this.app.root.findByName('lightManager').script.lightManager.BeginMove(delayTime);
};

MainCameraControl.prototype.ShowPlanet = function()
{
    console.log(this.currentPlanet);
    if(this.currentPlanet>this.maxPlanet+1)
        this.currentPlanet =  this.maxPlanet+1;
    if(this.currentPlanet<this.minPlanet)
        this.currentPlanet =  this.minPlanet;
    pc.app.root.findByName('Camera').script.uimanager.HideUI(UI_ID.fly);
    this.gameState = GameState.ShowPlanet;
    var Planet = this.app.root.findByName('Planet'+ this.currentPlanet);
    var lightManager= this.app.root.findByName('lightManager');
    Planet.setLocalEulerAngles(0,50,0);
    


    //Planet.children[1].script.planetRotate.SetComming(100);
    
    var y_r = Math.random()*0.2+0.3;
    var x_r = Math.random()*0.1;
    var tween = new TWEEN.Tween({px:0,py:0.34,pz: -2.8,bx:0.83,by:3.912,bz:-30.422,rz:-50,s1:0,t:0})
                        .to({px:0,py:0.34,pz: -2.8,bx:-2.831,by:-1.413,bz:-20,rz:0,s1:1,t:1},3000).delay(0)
                        .easing(TWEEN.Easing.Back.OutLater)
                        .onStart(function(){
                           Planet.setLocalScale(0,0,0);
                           Planet.setLocalPosition(0,0,-3);
                            Planet.enabled = true;
                            lightManager.enabled = true;
                            Planet.children[0].enabled = false;
                            
                            pc.app.root.findByName('AudioManager').script.audioManager.PlayShowPlanetSlot();
                        })
                        .onUpdate(function(){
                            Planet.setLocalPosition(this.px - MainCameraControl.Sin(this.t)*x_r,this.py - MainCameraControl.Sin(this.t)*y_r,this.pz);
                            Planet.setLocalScale(this.s1,this.s1,this.s1);
                            Planet.setLocalEulerAngles(0,0,this.rz);
                            
                            Planet.children[1].enable = true;
                            Planet.children[1].setLocalPosition(0,0,0);    
                            Planet.children[1].setLocalEulerAngles(0,0,0);
                            
                            lightManager.setLocalPosition(Planet.getLocalPosition().x,Planet.getLocalPosition().y,Planet.getLocalPosition().z);
                        })
                        .onComplete(function(){
                            pc.app.root.findByName('Camera').script.uimanager.ShowUI(UI_ID.show);
                            pc.app.root.findByName('Camera').script.MainCameraControl.gameState = GameState.ShowPlanetOver;
                            
                            pc.app.root.findByName('AudioManager').script.audioManager.PlayClick();
                            Planet.children[0].enabled = true;
                            for(var i=0;i<Planet.children[0].children.length;i++)
                            {
                                Planet.children[0].children[i].script.auxiliaryLine.show();
                            }
                            
                        }).start();
    this.app.root.findByName('lightManager').script.lightManager.BeginMove(500);
};
MainCameraControl.prototype.ShowOver = function()
{
    this.gameState = GameState.Over;
    var OverObject = this.app.root.findByName('OverObject');//1.198  1.274   1.111
    OverObject.enabled = true;
    pc.app.root.findByName('Camera').script.uimanager.HideUI(UI_ID.fly);
    var OverObjectPlanet = this.app.root.findByName('OverObjectPlanet');
    var tween_1 = new TWEEN.Tween({px:0,py:-1,pz:-15.941,s:0,t:0})
                    .to({px:0,py: -1,pz:1,s:2,t:1},2000).delay(0)
                    .easing(TWEEN.Easing.Linear.None)
                    .onStart(function(){
                        OverObjectPlanet.enabled = true;
                        pc.app.root.findByName('AudioManager').script.audioManager.PlayShowPlanetSlot();
                    })
                    .onUpdate(function(){
                        if(this.s<=1)
                        {
                            OverObjectPlanet.setLocalScale(this.s,this.s,this.s);
                        }
                        OverObjectPlanet.setLocalPosition(this.px,this.py+MainCameraControl.Sin(this.t),this.pz);
                    })
                    .onComplete(function(){
                        
                    }).start();
    
    var OverObjectEarth = this.app.root.findByName('OverObjectEarth');
    var scal = OverObjectEarth.getLocalScale().x;
    var tween_2 = new TWEEN.Tween({px:0,py:-0.508,pz:-36.077,t:0,s:0})
                .to({px:0,py: -0.508,pz:-5.047 ,t:1,s:scal},4000).delay(2000)
                .easing(TWEEN.Easing.Quartic.InOut)//TWEEN.Easing.Quadratic.InOut
                .onStart(function(){
                    OverObjectEarth.enabled = true;
                    pc.app.root.findByName('AudioManager').script.audioManager.PlayShowPlanetSlot();
                })
                .onUpdate(function(){
                    if(this.t<=0.5)
                    {
                        OverObjectEarth.setLocalScale(this.s*2,this.s*2,this.s*2);
                    }
                    var y_value = MainCameraControl.Sin(this.t)*2;
                    OverObjectEarth.setLocalPosition(this.px,-0.508-y_value,this.pz);
                })
                .onComplete(function(){
                    
                }).start();
    var OverMount = this.app.root.findByName('OverMount');
    OverMount.enable = true;
    OverMount.script.overMount.show(500);

};
MainCameraControl.prototype.HideOver = function()
{
    
    this.Meteor.enabled = false;
    this.gameState = GameState.Over;
    var OverObjectEarth = this.app.root.findByName('OverObjectEarth');

    var tween_2 = new TWEEN.Tween({px:0,py:-0.508,pz:-5.047,s:1})
                .to({px:0,py: -10,pz:-5.047,s:0},3000).delay(0)
                .easing(TWEEN.Easing.Quadratic.InOut)
                .onStart(function(){
                    OverObjectEarth.enabled = true;
                })
                .onUpdate(function(){
                    OverObjectEarth.setLocalPosition(this.px,this.py,this.pz);

                })
                .onComplete(function(){
                    OverObjectEarth.enabled = false;
                }).start();
    var OverMount = this.app.root.findByName('OverMount');
    OverMount.script.overMount.hide(0);
    
};
MainCameraControl.prototype.HideQiEXing = function()
{
    var Planet = this.app.root.findByName('Planet'+ this.currentPlanet);
    Planet.setLocalPosition(1,Planet.getLocalPosition().y,0);
    this.Meteor.enabled = false;
    this.gameState = GameState.Over;
    Planet.enabled = false;
    Planet.children[0].enabled = false;
    this.ShowEarth(0);
};

MainCameraControl.prototype.BeinMove = function()
{
    if(this.gameState === GameState.EnterOver)
    {

    }else if(this.gameState === GameState.ShowPlanetOver)
    {
        pc.app.root.findByName('AudioManager').script.audioManager.PlayClick();
        this.MoveTimeLength =0;
        pc.app.root.findByName('Camera').script.uimanager.ShowUI(UI_ID.fly);
        this.isAddSpeed = true;
        this.gameState = GameState.Shuttle;
        
        var mcc = pc.app.root.findByName('Camera').script.MainCameraControl;
        if(this.currentPlanet===1)
        {
            this.HideEarth();
        }else
        {
            this.HideLastPlanet();
        }
            
            var tween = new TWEEN.Tween({t:0})
                .to({t:1},1).delay(1000)
                .easing(TWEEN.Easing.Quadratic.InOut)
                .onStart(function(){
                    mcc.isAddSpeed = false;
                })
                .onUpdate(function(){
                })
                .onComplete(function(){
                    mcc.shuttleEffect.BeginMove();
                    mcc.speed = 100;
                    mcc.CameraViewAdd();
                }).start();
        
    }else if(this.gameState === GameState.Over)
    {
        //this.HideOver();
    }

};
MainCameraControl.prototype.EndMove = function(addNumber)
{
    if(this.gameState === GameState.Shuttle)
    {
        
        this.gameState = GameState.ShowPlanet;
        var mcc = pc.app.root.findByName('Camera').script.MainCameraControl;
        this.CameraViewBack();
        var tween = new TWEEN.Tween({t:0})
            .to({t:1},1).delay(2000-this.MoveTimeLength*1000)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onStart(function(){
            })
            .onUpdate(function(){
            })
            .onComplete(function(){
                mcc.shuttleEffect.EndMove();
                mcc.speed = 1;
                mcc.currentPlanet+=addNumber;
                if(mcc.currentPlanet > mcc.maxPlanet)
                {
                    if(mcc.hasLookOtherPlanet)
                    {
                         mcc.ShowOver();
                    }else
                    {
                         console.log("企鹅星:"+mcc.currentPlanet);
                         mcc.ShowPlanet();
                    }
                   
                }else
                {
                    mcc.hasLookOtherPlanet = false;
                    mcc.ShowPlanet();
                }
            }).start();

    }else if(this.gameState === GameState.Over)
    {
        //this.ShowEarth();
    }
};
        

MainCameraControl.prototype.HideLastPlanet = function()
{

    if(this.currentPlanet>=this.minPlanet&&this.currentPlanet<=this.maxPlanet)  
    {
        var bgi = this.app.root.findByName('BackGroundImage');
        var bgi_p =  bgi.getLocalPosition();
        var Planet = this.app.root.findByName('Planet'+ this.currentPlanet);
        //Planet.children[1].script.planetRotate.SetGoOut();
        var p = Planet.getLocalPosition();
        var tween = new TWEEN.Tween({px:p.x,py:p.y,pz: p.z,bx:bgi_p.x,by:bgi_p.y,bz:bgi_p.z,s1:0,t:0})
                .to({px:1,py:p.y,pz: 0,bx:bgi_p.x,by:bgi_p.y,bz:bgi_p.z,s1:1,t:1},1500).delay(0)
                .easing(TWEEN.Easing.Quadratic.In)
                .onStart(function(){
                    for(var i=0;i<Planet.children[0].children.length;i++)
                    {
                        Planet.children[0].children[i].script.auxiliaryLine.hide();
                    }
                })
                .onUpdate(function(){
                    Planet.setLocalPosition(p.x+(this.px-p.x)*MainCameraControl.Sin(this.t*0.5),this.py,this.pz);
                    //bgi.setLocalPosition(this.bx+MainCameraControl.Sin(this.t),this.by,this.bz);
                })
                .onComplete(function(){
                    this.gameState = GameState.ShuttleOver;
                    Planet.enabled = false;
                    Planet.children[0].enabled = false;
                }).start();
    }

};
MainCameraControl.prototype.HideEarth = function()
{

    if(this.currentPlanet>=this.minPlanet&&this.currentPlanet<=this.maxPlanet)  
    {
        var Planet = this.app.root.findByName('Planet'+ this.currentPlanet);//1.198  1.274   1.111
        //Planet.children[1].script.planetRotate.SetGoOut();
        var p = Planet.getLocalPosition();
        var tween = new TWEEN.Tween({px:p.x,py:p.y,pz: p.z,s1:0,t:0})
                .to({px:2,py:p.y,pz: 10,s1:1,t:1},5000).delay(0)
                .easing(TWEEN.Easing.Quadratic.InOut)
                .onStart(function(){
                    for(var i=0;i<Planet.children[0].children.length;i++)
                    {
                        Planet.children[0].children[i].script.auxiliaryLine.hide();
                    }
                })
                .onUpdate(function(){
                    if(this.s1>=0.01)
                    {
                        Planet.children[0].enabled = false;
                    }else
                    {
                        Planet.children[0].setLocalScale(1-this.s1*10,1-this.s1*10,1-this.s1*10);
                    }
                    Planet.setLocalPosition(p.x+(this.px-p.x)*MainCameraControl.Sin(this.t),this.py,this.pz);
                })
                .onComplete(function(){
                    this.gameState = GameState.ShuttleOver;
                    Planet.enabled = false;
                    Planet.children[0].enabled = false;

                }).start();
    }

};
MainCameraControl.prototype.CameraViewAdd= function()
{
         var fov = this.entity.children[0].camera.fov;
         var ca = this.entity.children[0].camera;
         var tween = new TWEEN.Tween({t:0,fov:fov})
                .to({t:1,fov:60},2000).delay(0)
                .easing(TWEEN.Easing.Quadratic.InOut)
                .onStart(function(){
                })
                .onUpdate(function(){
                    ca.fov = fov+(this.fov-fov)*MainCameraControl.Sin(this.t);
                })
                .onComplete(function(){

                }).start();
};
MainCameraControl.prototype.CameraViewBack = function()
{
         var fov = this.entity.children[0].camera.fov;
         var ca = this.entity.children[0].camera;
         var tween = new TWEEN.Tween({t:0,f:fov})
                .to({t:1,f:50},1000).delay(0)
                .easing(TWEEN.Easing.Quadratic.InOut)
                .onStart(function(){
                })
                .onUpdate(function(){
                    ca.fov = this.f;
                })
                .onComplete(function(){

                }).start();
};
MainCameraControl.prototype.PassOnePlanet = function(number)
{
    var tx = 1;
    var ty = 0.24;
    if(number%4===0)
    {
        tx = 1;
        ty = 0.24;
    }else if(number%4===1)
    {
        tx = -1;
        ty = 0.24;
    }else if(number%4===2)
    {
        tx = 1;
        ty = -0.24;
    }else if(number%4===3)
    {
        tx = -1;
        ty = -0.24;
    }
    var Planet = this.app.root.findByName('Planet'+ number);
    var tween = new TWEEN.Tween({px:0,py:ty,pz: -2.8,rz:-50,s1:0,t:0})
            .to({px:tx,py:ty,pz: 0,rz:0,s1:1,t:1},2000).delay(0)
            .easing(TWEEN.Easing.Back.OutLater)
            .onStart(function(){
                Planet.enabled = true;
                
                Planet.children[0].enabled = false;
                Planet.children[2].enabled = false;
                Planet.children[3].enabled = false;
            })
            .onUpdate(function(){
                Planet.setLocalPosition(this.px,this.py,this.pz);
                Planet.setLocalScale(this.s1,this.s1,this.s1);
                Planet.setLocalEulerAngles(0,0,this.rz);
            })
            .onComplete(function(){
                Planet.enabled = true;
                Planet.children[0].enabled = true;
                Planet.children[2].enabled = true;
                Planet.children[3].enabled = true;
            }).start();
};

MainCameraControl.Sin = function(value)
{
    return Math.sin(value*Math.PI);
};


MainCameraControl.prototype.LastWillHide = function()
{
    if(this.currentPlanet>=this.minPlanet&&this.currentPlanet<=this.maxPlanet)
    {
        this.app.root.findByName('Planet'+ this.currentPlanet).children[1].script.planetRotate.SetWillGoOut();
        if(this.currentPlanet===this.minPlanet)
        {
            this.app.root.findByName('Planet'+ this.currentPlanet).children[2].script.planetRotate.SetWillGoOut();
        }
    }
};
MainCameraControl.prototype.LastWillHideBack = function()
{
    if(this.currentPlanet>=this.minPlanet&&this.currentPlanet<=this.maxPlanet)
    {
        this.app.root.findByName('Planet'+ this.currentPlanet).children[1].script.planetRotate.SetWillGoOutGiveUp();
        if(this.currentPlanet===this.minPlanet)
        {
            this.app.root.findByName('Planet'+ this.currentPlanet).children[2].script.planetRotate.SetWillGoOutGiveUp();
        }
    }
};