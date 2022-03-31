var Rotate = pc.createScript('rotate');
Rotate.attributes.add('speed',{type:'number',default:10});
// initialize code called once per entity
Rotate.prototype.initialize = function() {
    
};

// update code called every frame
Rotate.prototype.update = function(dt) {
    this.entity.rotateLocal(0,this.speed*dt,0);
};
