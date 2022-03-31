var AuxiliaryLine = pc.createScript('auxiliaryLine');
AuxiliaryLine.attributes.add('max_opacity',{type:'number'});

// initialize code called once per entity
AuxiliaryLine.prototype.initialize = function() {
    this.change_material = this.entity.model.model.meshInstances[0].material;
    this.scaleX = this.entity.getLocalScale().x;
    this.scaleY = this.entity.getLocalScale().y;
    this.scaleZ = this.entity.getLocalScale().z;
};

// update code called every frame
AuxiliaryLine.prototype.update = function(dt) {
    
};

AuxiliaryLine.prototype.show = function()
{

    var entity = this.entity;
    var all = this.entity.script.auxiliaryLine;
    
    entity.setLocalScale(0.8*all.scaleX,0.8*all.scaleY,0.8*all.scaleZ);
    all.change_material.opacity = 0;
    all.change_material.update();
    this.togalaxyAnimation = new TWEEN.Tween({t:0,s:0.8,op:0})
                            .to({t:1,s:1,op:this.max_opacity},300).delay(0)
                            .easing(TWEEN.Easing.Linear.None)
                            .onStart(function(){

                            })
                            .onUpdate(function(){

                                entity.setLocalScale(this.s*all.scaleX,this.s*all.scaleY,this.s*all.scaleZ);
                                all.change_material.opacity = this.op;
                                all.change_material.update();
                            })
                            .onComplete(function(){

                             }).start();
};
AuxiliaryLine.prototype.hide = function()
{

    var entity = this.entity;
    var all = this.entity.script.auxiliaryLine;
    this.togalaxyAnimation = new TWEEN.Tween({t:0,s:1,op:this.max_opacity})
                            .to({t:1,s:0.8,op:0},500).delay(0)
                            .easing(TWEEN.Easing.Linear.None)
                            .onStart(function(){

                            })
                            .onUpdate(function(){

                                entity.setLocalScale(this.s*all.scaleX,this.s*all.scaleY,this.s*all.scaleZ);
                                all.change_material.opacity =this.op;
                                all.change_material.update();
                                    
                            })
                            .onComplete(function(){

                             }).start();
};

// swap method called for script hot-reloading
// inherit your script state here
// AuxiliaryLine.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/