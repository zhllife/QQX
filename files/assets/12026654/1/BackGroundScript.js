var BackGroundScript = pc.createScript('backGroundScript');
BackGroundScript.attributes.add('speed',{type:'number'});
// initialize code called once per entity
BackGroundScript.prototype.initialize = function() {
        this.mcc = this.app.root.findByName('Camera').script.MainCameraControl;  
        this.needSpeed = this.speed;
        this.currentSpeed =this.speed;
};

// update code called every frame
BackGroundScript.prototype.update = function(dt) {

        if(this.mcc.speed===1001)
        {
            this.needSpeed = 25*this.speed;
            if(this.currentSpeed>this.needSpeed)
            {
                this.currentSpeed-=dt*30;
            }
        }else
        {
            this.needSpeed = this.speed;
            if(this.currentSpeed<this.needSpeed)
            {
                this.currentSpeed+=dt*30;
                if(this.currentSpeed>this.needSpeed)
                    this.currentSpeed=this.needSpeed;
            }

        }
        
        
        this.entity.rotateLocal(0,dt*this.currentSpeed,0);
 
};