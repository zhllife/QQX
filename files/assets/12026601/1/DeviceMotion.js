var DeviceMotion = pc.createScript('deviceMotion');

// initialize code called once per entity
DeviceMotion.prototype.initialize = function() {
    
    this.initpos = this.entity.getPosition().clone();  
    this.XOffset = 0;
    this.limitXOffset = 0.05;
    this.YOffset = 0;
    this.limitYOffset = 0.05;
    this.percent = pc.platform.ios ? Math.PI*200: 10000;
    var self = this;
    var Move = function(e){
        // if(SceneState.curState !== SceneState.states.stylescenes.yuexiang){
        //     return;
        // }
        var rotationRate = e.rotationRate;
        self.XOffset += rotationRate.beta*e.interval/self.percent;
        self.YOffset += rotationRate.alpha*e.interval/self.percent;
        self.XOffset = pc.math.clamp(self.XOffset,-self.limitXOffset,self.limitXOffset);
        self.YOffset = pc.math.clamp(self.YOffset,-self.limitYOffset,self.limitYOffset);
        self.entity.setPosition(self.initpos.x+self.XOffset,self.initpos.y+self.YOffset,self.initpos.z);
    };
    window.addEventListener('devicemotion',Move);
    
};

// update code called every frame
DeviceMotion.prototype.update = function(dt) {
    
};

// swap method called for script hot-reloading
// inherit your script state here
// DeviceMotion.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/