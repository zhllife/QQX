var GalaxRote = pc.createScript('galaxRote');

// initialize code called once per entity
GalaxRote.prototype.initialize = function() {
    
};

// update code called every frame
GalaxRote.prototype.update = function(dt) {
    this.entity.rotateLocal(0,dt*5,0);
};

// swap method called for script hot-reloading
// inherit your script state here
// GalaxRote.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/