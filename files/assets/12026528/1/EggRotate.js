var EggRotate = pc.createScript('eggRotate');
EggRotate.attributes.add('selfSpeed',{type:'number',default:1});
EggRotate.attributes.add('childSpeed',{type:'number',default:1});

// initialize code called once per entity
EggRotate.prototype.initialize = function() {
    this.mcc = this.app.root.findByName("Camera");
    this.mt = this.entity.children[0].children[0].model.model.meshInstances[0].material;
};

// update code called every frame
EggRotate.prototype.update = function(dt) {
    this.entity.rotate(0,dt*5*this.selfSpeed,0);
    this.entity.children[0].children[0].rotateLocal(0,dt*10*this.childSpeed,0);
    this.entity.children[0].lookAt(this.mcc.getPosition());
    var c =(this.entity.children[0].getPosition().z+4)/2;
    this.mt.emissive.set(c,c,c,1);
    this.mt.update();
};

// swap method called for script hot-reloading
// inherit your script state here
// EggRotate.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/