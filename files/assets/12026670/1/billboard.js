var Billboard = pc.createScript('billboard');
Billboard.attributes.add('camera',{type:'entity'});

// initialize code called once per entity
Billboard.prototype.initialize = function() {
    
};

// update code called every frame
Billboard.prototype.update = function(dt) {
    this.entity.setRotation(this.camera.getRotation());
    this.entity.rotateLocal(90, 0, 0);   
};
