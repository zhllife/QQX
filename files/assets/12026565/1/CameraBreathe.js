var CameraBreathe = pc.createScript('cameraBreathe');
CameraBreathe.attributes.add('speed',{type:'number',default:1});

// initialize code called once per entity
CameraBreathe.prototype.initialize = function() {
    this.mcc = this.app.root.findByName("Camera").script.MainCameraControl;
    this.time =0;
};

// update code called every frame
CameraBreathe.prototype.update = function(dt) {
    if(this.mcc.gameState === GameState.ShowPlanetOver||this.mcc.gameState === GameState.Over)
    {
        if(this.time>=1)
        {
            this.time =0;
        }else
        {
            this.time+=this.speed*dt;
        }
        
        this.entity.setLocalPosition(0,MainCameraControl.Sin(this.time)*0.02,0);
        
    }
};

// swap method called for script hot-reloading
// inherit your script state here
// CameraBreathe.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/