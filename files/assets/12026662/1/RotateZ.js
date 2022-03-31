var Rotatez = pc.createScript('rotatez');
Rotatez.attributes.add('speed',{type:'number',default:10});
// initialize code called once per entity
Rotatez.prototype.initialize = function() {
    
};

// update code called every frame
Rotatez.prototype.update = function(dt) {
    this.entity.rotateLocal(0,0,this.speed*dt);
};

// swap method called for script hot-reloading
// inherit your script state here
// Rotatez.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/