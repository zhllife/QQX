var RockGoout = pc.createScript('rockGoout');

RockGoout.attributes.add('speed',{type:'number'});
// initialize code called once per entity
RockGoout.prototype.initialize = function() {
        this.basePosition = new pc.Vec3(this.entity.getLocalPosition().x,this.entity.getLocalPosition().y,this.entity.getLocalPosition().z);
        this.originPosition = this.basePosition;
        this.toZ = Math.abs(this.originPosition.z);
        this.mcc = this.app.root.findByName('Camera').script.MainCameraControl;  
        this.needSpeed = this.speed;
        this.currentSpeed =this.speed;
        
        this.max_scal = this.entity.getLocalScale().x;
    
        this.entity.children[0].enabled = false;
};

// update code called every frame
RockGoout.prototype.update = function(dt) {
    
        if(this.mcc.speed===100)
        {
            this.entity.children[0].enabled = true;
            this.needSpeed = 2*this.speed;
            if(this.currentSpeed<this.needSpeed)
            {
                this.currentSpeed+=dt*10;
            }
            //this.entity.enabled = true;
            
            if(this.entity.getLocalPosition().z>=0)
            {
                this.originPosition = new pc.Vec3(this.basePosition.x+Math.random(-0.2,0.2),this.basePosition.y+Math.random(-0.2,0.2),this.basePosition.z);
                this.entity.setLocalScale(0.001,0.001,0.001);
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
                if(this.entity.getLocalPosition().z>0)
                    this.entity.children[0].enabled = false;
            }

        }
        this.entity.rotateLocal(0,0,dt*100);
};

// swap method called for script hot-reloading
// inherit your script state here
// GoOut.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/