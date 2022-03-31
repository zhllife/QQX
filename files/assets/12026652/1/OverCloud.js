var OverCloud = pc.createScript('overCloud');

// initialize code called once per entity
OverCloud.prototype.initialize = function() {
    this.f_x = this.entity.getLocalPosition().x;
    this.f_y = this.entity.getLocalPosition().y;
    this.f_z = -3.5;//this.entity.getLocalPosition().z;
    this.change_material = this.entity.model.model.meshInstances[0].material;
    this.max_opacity = this.change_material.opacity; 
    
    this.t_x = this.f_x;
    this.t_y = this.f_y-0.8;
    this.t_z = -3.5+1.5;
    
    this.speed_x = 0;
    this.speed_y = -0.04;
    this.speed_z = 0.075;
};

// update code called every frame
OverCloud.prototype.update = function(dt) {
    this.entity.setLocalPosition(this.entity.getLocalPosition().x+dt*this.speed_x,
                                 this.entity.getLocalPosition().y+dt*this.speed_y,
                                 this.entity.getLocalPosition().z+dt*this.speed_z);
    if(this.entity.getLocalPosition().z>=this.t_z)
    {
        this.entity.setLocalPosition(this.f_x,this.f_y,this.f_z);
        this.change_material.opacity=0;
        this.change_material.update();
    }
    if(this.change_material.opacity<this.max_opacity)
    {
        this.change_material.opacity+=dt;
        this.change_material.update();
    }
};

// swap method called for script hot-reloading
// inherit your script state here
// OverCloud.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/