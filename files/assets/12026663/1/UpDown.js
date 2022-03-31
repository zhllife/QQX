var UpDown = pc.createScript('upDown');

// initialize code called once per entity
ForwardAndBack.prototype.initialize = function() {
    
    this.fb = 1;
    this.t = 0;
    this.opx = this.entity.getLocalPosition().x;
    this.opy = this.entity.getLocalPosition().y;
    this.opz = this.entity.getLocalPosition().z;
    
};

// update code called every frame
ForwardAndBack.prototype.update = function(dt) {
    
    if(this.t>=0.1)
    {
        this.fb = -1;
        
    }else if(this.t<=-0.1)
    {
        this.fb = 1;
        
    }
    this.t+=this.fb*dt;
    this.entity.setLocalPosition(this.opx,this.opy+this.t,this.opz);
    
};