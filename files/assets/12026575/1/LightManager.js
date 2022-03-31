var LightManager = pc.createScript('lightManager');

// initialize code called once per entity
LightManager.prototype.initialize = function() {
    this.light_1 = this.app.root.findByName('Light_1').light;
    this.light_2 = this.app.root.findByName('Light_2').light;

    this.light_1_value = this.light_1.intensity;
    this.light_2_value = this.light_2.intensity;
    
    console.log("light1:"+this.light_1);
    console.log("light2:"+this.light_2);
    console.log("light1Value:"+this.light_1_value);
    console.log("light2Value:"+this.light_2_value);
};

// update code called every frame
LightManager.prototype.update = function(dt) {
    //this.entity.rotateLocal(0,dt*100,0);
};

LightManager.prototype.BeginMove = function(dt) {
        var lm = this.app.root.findByName('lightManager').script.lightManager;
        //lm.light_1.intensity =0;
        //lm.light_2.intensity =0;
        this.tween = new TWEEN.Tween({ry:-50,t:0})
                    .to({ry:50,t:1},1500).delay(dt)
                    .easing(TWEEN.Easing.Linear.None)
                    .onStart(function(){
                        lm.light_1.intensity =0;
                        lm.light_2.intensity =0;
                    })
                    .onUpdate(function(){
                        lm.entity.setLocalEulerAngles(0,this.ry,0);
                        lm.light_1.intensity = this.t*lm.light_1_value;
                        lm.light_2.intensity = this.t*lm.light_2_value;
                    })
                    .onComplete(function(){

                     }).start();
    
};



// swap method called for script hot-reloading
// inherit your script state here
// LightManager.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/