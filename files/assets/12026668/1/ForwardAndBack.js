var ForwardAndBack = pc.createScript('forwardAndBack');



// initialize code called once per entity
ForwardAndBack.prototype.initialize = function() {
    this.fb = 1;
    this.fp = new pc.Vec3(this.entity.forward.x,this.entity.forward.y,this.entity.forward.z);
    this.t = 0;
    this.opx = this.entity.getLocalPosition().x;
    this.opy = this.entity.getLocalPosition().y;
    this.opz = this.entity.getLocalPosition().z;
    
};

// update code called every frame
ForwardAndBack.prototype.update = function(dt) {
    
    if(this.t>=0.05)
    {
        this.fb = -0.2;
        
    }else if(this.t<=-0.05)
    {
        this.fb = 0.2;
        
    }
    this.t+=this.fb*dt;
    this.entity.setLocalPosition(this.opx+this.t*this.fp.x,this.opy+this.t*this.fp.y,this.opz+this.t*this.fp.z);
};

// swap method called for script hot-reloading
// inherit your script state here
// ForwardAndBack.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/