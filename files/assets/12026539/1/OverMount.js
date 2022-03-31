var OverMount = pc.createScript('overMount');

// initialize code called once per entity
OverMount.prototype.initialize = function() {
    
    var mount1 = this.entity.children[0];
    var mount2 = this.entity.children[1];
    var mount3 = this.entity.children[2];
    
    this.mount1_pos = new pc.Vec3(mount1.getLocalPosition().x,mount1.getLocalPosition().y,mount1.getLocalPosition().z);
    this.mount2_pos = new pc.Vec3(mount2.getLocalPosition().x,mount2.getLocalPosition().y,mount2.getLocalPosition().z);
    this.mount3_pos = new pc.Vec3(mount3.getLocalPosition().x,mount3.getLocalPosition().y,mount3.getLocalPosition().z);
};

// update code called every frame
OverMount.prototype.update = function(dt) {
    
};

OverMount.prototype.show = function(delayTime)
{
    var mount1 = this.entity.children[0];
    var mount2 = this.entity.children[1];
    var mount3 = this.entity.children[2];
    
    mount1.setLocalPosition(this.mount1_pos.x,this.mount1_pos.y-2,this.mount1_pos.z);
    mount2.setLocalPosition(this.mount2_pos.x,this.mount2_pos.y-2,this.mount2_pos.z);
    mount3.setLocalPosition(this.mount3_pos.x,this.mount3_pos.y-2,this.mount3_pos.z);
    var tween = new TWEEN.Tween({px:this.mount1_pos.x,py: this.mount1_pos.y-2,pz:this.mount1_pos.z})
            .to({px:this.mount1_pos.x,py: this.mount1_pos.y,pz:this.mount1_pos.z},4700).delay(delayTime)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onStart(function(){
            })
            .onUpdate(function(){
                mount1.setLocalPosition(this.px,this.py,this.pz);
            })
            .onComplete(function(){
            }).start();
    var tween_2 = new TWEEN.Tween({px:this.mount2_pos.x,py: this.mount2_pos.y-2,pz:this.mount2_pos.z})
            .to({px:this.mount2_pos.x,py: this.mount2_pos.y,pz:this.mount2_pos.z},5000).delay(delayTime)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onStart(function(){
            })
            .onUpdate(function(){
                mount2.setLocalPosition(this.px,this.py,this.pz);
            })
            .onComplete(function(){
            }).start();
    var tween_3 = new TWEEN.Tween({px:this.mount3_pos.x,py: this.mount3_pos.y-2,pz:this.mount3_pos.z})
            .to({px:this.mount3_pos.x,py: this.mount3_pos.y,pz:this.mount3_pos.z},5200).delay(delayTime)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onStart(function(){
            })
            .onUpdate(function(){
                mount3.setLocalPosition(this.px,this.py,this.pz);
            })
            .onComplete(function(){
                 pc.app.root.findByName('Camera').script.uimanager.ShowUI(UI_ID.over);
                 pc.app.root.findByName('Camera').script.uimanager.screenShotOverPage();
                
                var st =setTimeout(function(){
                    pc.app.root.findByName('Camera').script.MainCameraControl.Meteor.enabled = true;
                },500,function(){
                    clearTimeout(st);
                });
                 
                
            }).start();
};
OverMount.prototype.hide = function(delayTime)
{
    pc.app.root.findByName('Camera').script.MainCameraControl.Meteor.enabled = false;
    var mount1 = this.entity.children[0];
    var mount2 = this.entity.children[1];
    var mount3 = this.entity.children[2];
    pc.app.root.findByName('Camera').script.MainCameraControl.ShowEarth(2000);
    var tween = new TWEEN.Tween({px:this.mount1_pos.x,py: this.mount1_pos.y,pz:this.mount1_pos.z})
            .to({px:this.mount1_pos.x,py: this.mount1_pos.y-2,pz:this.mount1_pos.z},4700).delay(delayTime)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onStart(function(){
            })
            .onUpdate(function(){
                mount1.setLocalPosition(this.px,this.py,this.pz);
            })
            .onComplete(function(){
            }).start();
    var tween_2 = new TWEEN.Tween({px:this.mount2_pos.x,py: this.mount2_pos.y,pz:this.mount2_pos.z})
            .to({px:this.mount2_pos.x,py: this.mount2_pos.y-2,pz:this.mount2_pos.z},5000).delay(delayTime)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onStart(function(){
            })
            .onUpdate(function(){
                mount2.setLocalPosition(this.px,this.py,this.pz);
            })
            .onComplete(function(){
            }).start();
    var tween_3 = new TWEEN.Tween({px:this.mount3_pos.x,py: this.mount3_pos.y,pz:this.mount3_pos.z})
            .to({px:this.mount3_pos.x,py: this.mount3_pos.y-2,pz:this.mount3_pos.z},5200).delay(delayTime)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onStart(function(){
            })
            .onUpdate(function(){
                mount3.setLocalPosition(this.px,this.py,this.pz);
            })
            .onComplete(function(){
               
                
                pc.app.root.findByName('OverMount').enable = false;
            }).start();
};

// swap method called for script hot-reloading
// inherit your script state here
// OverMount.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/