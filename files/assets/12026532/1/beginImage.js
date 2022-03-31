var BeginImage = pc.createScript('beginImage');

// initialize code called once per entity
BeginImage.prototype.initialize = function() {
    this.canShow = false;
    this.maxZ = -2;
    this.minZ = -15;
    this.disZ =  1;
    this.count = this.entity.children.length;
    this.disAngle = 360/this.count;
    this.t = 0;
    this.speed = 0.02;
    this.maxSpeed = 0.08;
    for(var i=0;i<this.count;i++)
    {
        var entity = this.entity.children[i];
        entity.setLocalEulerAngles(90,0,i*this.disAngle);
        entity.setLocalPosition(0,0,this.minZ+this.disZ*i);
    }

};

// update code called every frame
BeginImage.prototype.update = function(dt) {
    
    if(this.canShow&&this.t<1)
    {
        if(this.speed<this.maxSpeed)
            this.speed+=dt;
        this.t+=dt*this.speed;
        if(this.t>1)
            this.t = 1;
        
        for(var i=0;i<this.count;i++)
        {
            var needDown = 0;
            if(this.maxSpeed===0.8)
            {
                needDown = this.speed*-4;
            }
           var px = this.entity.children[i].getLocalPosition().x;
           var py = this.entity.children[i].getLocalPosition().y+dt*needDown;
           var pz = this.entity.children[i].getLocalPosition().z+dt*this.speed*10;
            
           this.entity.children[i].setLocalPosition(px,py,pz);
           this.entity.children[i].model.model.meshInstances[0].material.opacity = MainCameraControl.Sin(this.t);
           this.entity.children[i].model.model.meshInstances[0].material.update();
        }
        
    }

};

BeginImage.prototype.AddSpeed = function(){
    this.maxSpeed = 0.8;
};

// swap method called for script hot-reloading
// inherit your script state here
// BeginImage.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/