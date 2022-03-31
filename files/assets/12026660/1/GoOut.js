var GoOut = pc.createScript('goOut');
GoOut.attributes.add('tx',{type:'number'});
GoOut.attributes.add('ty',{type:'number'});
GoOut.attributes.add('tz',{type:'number'});
GoOut.attributes.add('time',{type:'number'});
// initialize code called once per entity
GoOut.prototype.initialize = function() {
        this.originPosition = new pc.Vec3(this.entity.getLocalPosition().x,this.entity.getLocalPosition().y,this.entity.getLocalPosition().z);

        //this.MoveOut(this.originPosition,new pc.Vec3(this.tx,this.ty,this.tz),this.time,this.entity);
        this.targetPosition = new pc.Vec3(this.tx,this.ty,this.tz);
        this.direction = new pc.Vec3(this.targetPosition.x-this.originPosition.x,this.targetPosition.y-this.originPosition.y,this.targetPosition.z-this.originPosition.z).normalize();
        
        this.speed = (this.targetPosition.z-this.originPosition.z)/this.time*100;    
        this.addSpeed =1;
    
        this.mcc = this.app.root.findByName('Camera').script.MainCameraControl;  
};

// update code called every frame
GoOut.prototype.update = function(dt) {
    if(this.entity.getLocalPosition().z>=this.targetPosition.z)
    {
        this.entity.setLocalPosition(this.originPosition.x,this.originPosition.y,this.originPosition.z);
    }else
    {
        this.entity.setLocalPosition(this.entity.getLocalPosition().x+dt*this.speed*this.direction.x,this.entity.getLocalPosition().y+dt*this.speed*this.direction.y,this.entity.getLocalPosition().z+dt*this.speed*this.direction.z);
        //this.entity.setLocalPosition(this.entity.getLocalPosition().x+dt*this.mcc.speed*this.speed*this.direction.x,this.entity.getLocalPosition().y+dt*this.mcc.speed*this.speed*this.direction.y,this.entity.getLocalPosition().z+dt*this.mcc.speed*this.speed*this.direction.z);
    }
        
};

GoOut.prototype.MoveOut = function(from,to,t,ent) {
    this.togalaxyAnimation = new TWEEN.Tween({px:from.x,py:from.y,pz:from.z,rotx:0})
                                .to({px:to.x,py:to.y,pz:to.z,rotx:-20},t).delay(0)
                                .easing(TWEEN.Easing.Quadratic.InOut)
                                .onStart(function(){
                                   

                                })
                                .onUpdate(function(){
                                    ent.setPosition(this.px,this.py,this.pz);

                                })
                                .onComplete(function(){
                                    
                                    ent.script.goOut.MoveOut(from,to,t,ent);
                                }).start();
};

// swap method called for script hot-reloading
// inherit your script state here
// GoOut.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/