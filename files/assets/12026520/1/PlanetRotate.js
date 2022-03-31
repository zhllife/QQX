var PlanetRotate = pc.createScript('planetRotate');
PlanetRotate.attributes.add('speed',{type:'number'});
// initialize code called once per entity
PlanetRotate.prototype.initialize = function() {
        this.mcc = this.app.root.findByName('Camera').script.MainCameraControl;  
        this.currentSpeed =this.speed;
        this.isCommming = false;
        this.isGoOuting = false;
    
        this.commindCutSpeed = 100;
    
        this.willGoOut = false;
        
        this.planetMinSize = this.entity.getLocalScale().x;
        this.planetSize = this.planetMinSize;
};

// update code called every frame
PlanetRotate.prototype.update = function(dt) {
        
        if(this.isCommming)
        {
            if(this.currentSpeed<this.speed)
            {
                this.isCommming = false;
                this.currentSpeed = this.speed;
            }else if(this.currentSpeed>this.speed)
            {
                this.currentSpeed-=dt*this.commindCutSpeed;
            }
        }else if(this.isGoOuting)
        {
            if(this.currentSpeed<this.speed*2)
            {
                this.currentSpeed+=dt*10;
            }else if(this.currentSpeed>=this.speed*2){
                this.isGoOuting = false;
            }
        }
        
        if(this.willGoOut)
        {
            if(this.planetSize<this.planetMinSize+0.2)
            {
                this.planetSize+=dt*0.2;
                this.entity.setLocalScale(this.planetSize,this.planetSize,this.planetSize);
            }else if(this.planetSize>this.planetMinSize+0.2)
            {
                this.planetSize =this.planetMinSize+0.2;
                this.entity.setLocalScale(this.planetSize,this.planetSize,this.planetSize);
                
            }
        }
        else{
            if(this.planetSize>this.planetMinSize)
            {
                this.planetSize-=dt*0.4;
                this.entity.setLocalScale(this.planetSize,this.planetSize,this.planetSize);
            }else if(this.planetSize<this.planetMinSize)
            {
                this.planetSize =this.planetMinSize;
                this.entity.setLocalScale(this.planetSize,this.planetSize,this.planetSize);
            }
        }
};

PlanetRotate.prototype.SetComming= function(value)
{
    console.log("SetComming");
    this.currentSpeed = this.speed*20;
    this.commindCutSpeed = value;
    this.isCommming = true;
    this.willGoOut = false;
    
};

PlanetRotate.prototype.SetGoOut = function()
{
    this.isGoOuting = true;
    this.currentSpeed = this.speed;
};

PlanetRotate.prototype.SetWillGoOut = function()
{
    this.willGoOut = true;
};
PlanetRotate.prototype.SetWillGoOutGiveUp = function()
{
    this.willGoOut = false;
};