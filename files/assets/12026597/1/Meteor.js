var Meteor = pc.createScript('meteor');
Meteor.attributes.add('speed',{type:'number',default:10});
// initialize code called once per entity
Meteor.prototype.initialize = function() {
    this.f_x = this.entity.getLocalPosition().x;
    this.f_y = this.entity.getLocalPosition().y;
    this.f_z = this.entity.getLocalPosition().z;
};

// update code called every frame
Meteor.prototype.update = function(dt) {
    if(this.entity.getLocalPosition().x>=this.f_x-20)
    {
          this.entity.setLocalPosition(this.entity.getLocalPosition().x+dt*this.speed*-1,this.entity.getLocalPosition().y+dt*this.speed*-1,this.entity.getLocalPosition().z+dt*this.speed*-1);  
    }else{
        this.entity.setLocalPosition(this.f_x,this.f_y,this.f_z);
    }
};

// swap method called for script hot-reloading
// inherit your script state here
// Meteor.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/