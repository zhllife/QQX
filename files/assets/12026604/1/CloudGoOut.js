var CloudGoout = pc.createScript('cloudGoout');
CloudGoout.attributes.add('speed',{type:'number'});
// initialize code called once per entity
CloudGoout.prototype.initialize = function() {
        this.originPosition = new pc.Vec3(this.entity.getLocalPosition().x,this.entity.getLocalPosition().y,this.entity.getLocalPosition().z);

        this.toZ = Math.abs(this.originPosition.z);
        this.mcc = this.app.root.findByName('Camera').script.MainCameraControl;  
        this.needSpeed = this.speed;
        this.currentSpeed =this.speed;
        
        this.change_material = this.entity.children[0].model.model.meshInstances[0].material;
        this.max_opacity = this.change_material.opacity;
        this.entity.children[0].enabled = false;
    
};

// update code called every frame
CloudGoout.prototype.update = function(dt) {
    
        if(this.mcc.speed===100)
        {
            this.entity.children[0].enabled = true;
            this.needSpeed = 2*this.speed;
            if(this.currentSpeed<this.needSpeed)
            {
                this.currentSpeed+=dt*40;
            }
            //this.entity.enabled = true;
            
            if(this.entity.getLocalPosition().z>=0)
            {
                this.change_material.opacity = 0;
                this.change_material.update();
                this.entity.setLocalPosition(this.originPosition.x,this.originPosition.y,this.originPosition.z);
            }else
            {
                this.entity.setLocalPosition(this.originPosition.x,this.originPosition.y,this.entity.getLocalPosition().z+dt*this.currentSpeed);
                if(this.change_material.opacity<this.max_opacity)
                {
                    this.change_material.opacity +=dt*0.5;
                    if(this.change_material.opacity>this.max_opacity)
                        this.change_material.opacity =this.max_opacity;
                    this.change_material.update();
                }
                
            }
        }else
        {
            this.needSpeed = this.speed;
            if(this.currentSpeed>this.needSpeed)
            {
                this.currentSpeed-=dt*20;
            }
            
            
            if(this.entity.getLocalPosition().z<=0)
            {
                this.entity.setLocalPosition(this.originPosition.x,this.originPosition.y,this.entity.getLocalPosition().z+dt*this.currentSpeed);
                if(this.entity.getLocalPosition().z>0)
                    this.entity.children[0].enabled = false;
            }

        }
        
        
        this.entity.rotateLocal(0,0,dt*this.currentSpeed*2);
        
};

// swap method called for script hot-reloading
// inherit your script state here
// GoOut.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/