var CloudTwoGoout = pc.createScript('cloudTwoGoout');

CloudTwoGoout.attributes.add('speed',{type:'number'});
// initialize code called once per entity
CloudTwoGoout.prototype.initialize = function() {
        this.originPosition = new pc.Vec3(this.entity.getLocalPosition().x,this.entity.getLocalPosition().y,this.entity.getLocalPosition().z);

        this.toZ = Math.abs(this.originPosition.z);
        this.mcc = this.app.root.findByName('Camera').script.MainCameraControl;  
        this.needSpeed = this.speed;
        this.currentSpeed =this.speed;
        
        this.max_scal = this.entity.getLocalScale().x;
    
        
};

// update code called every frame
CloudTwoGoout.prototype.update = function(dt) {
    
        if(this.mcc.speed===100)
        {
            this.needSpeed = 2*this.speed;
            if(this.currentSpeed<this.needSpeed)
            {
                this.currentSpeed+=dt*40;
            }
            //this.entity.enabled = true;
            
            if(this.entity.getLocalPosition().z>=0)
            {
                this.entity.setLocalScale(0,0,0);
                this.entity.setLocalPosition(this.originPosition.x,this.originPosition.y,this.originPosition.z);
            }else
            {
                this.entity.setLocalPosition(this.originPosition.x,this.originPosition.y,this.entity.getLocalPosition().z+dt*this.currentSpeed);
                var c_scal =this.entity.getLocalScale().x;
                if(c_scal<this.max_scal)
                {
                    c_scal+=1*dt;
                    this.entity.setLocalScale(c_scal,c_scal,c_scal);
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
            }

        }
        
};

// swap method called for script hot-reloading
// inherit your script state here
// GoOut.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/