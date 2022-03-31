var BgControl = pc.createScript('bgControl');

// initialize code called once per entity
BgControl.prototype.initialize = function() {
    this.plane1=this.app.root.findByName('Plane1');
    this.plane2=this.app.root.findByName('Plane2');
};

// update code called every frame
BgControl.prototype.update = function(dt) {
    
    
    this.plane1.rotateLocal(0,1*dt*5*1.5,0);
    this.plane2.rotateLocal(0,0.85*dt*5*1.5,0); 
    // var scale=this.plane1.getLocalScale().x;
    // var newscale=pc.math.lerp(scale,10,0.05*dt);
    // this.plane1.setLocalScale(newscale,newscale,newscale);
    // this.plane2.setLocalScale(newscale,newscale,newscale);
    
    
//    //this.entity.rotate(0,0,0.75*dt*5);
};



// swap method called for script hot-reloading
// inherit your script state here
// BgControl.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/