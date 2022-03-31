var ShuttleEffect = pc.createScript('shuttleEffect');

if(typeof ParticleState == "undefined"){
    var ParticleState = {
        Hide:0,
        Begin:1,
        End:2
    };
}

// initialize code called once per entity
ShuttleEffect.prototype.initialize = function() {
    
    this.particleSpeed = 10;
    this.particleCount  = 200;
    this.particleState = ParticleState.Hide;

    this.particlesystem1 = this.entity.children[0].particlesystem;
    this.particlesystem2 = this.entity.children[1].particlesystem;
    this.particlesystem3 = this.entity.children[2].particlesystem;
    this.particlesystem2_3 = this.entity.children[3].particlesystem;
    
    
    this.particlesystem1.stop();
    this.particlesystem2.stop();
    this.particlesystem3.stop();
    this.particlesystem2_3.stop();
    
    this.showParticle = false;
};

// update code called every frame
ShuttleEffect.prototype.update = function(dt) {
    if(this.particleState === ParticleState.Begin)
    {
        this.particlesystem1.reset();
        this.particlesystem2.reset();
        this.particlesystem2_3.reset();
        this.particlesystem1.play();
        this.particlesystem2.play();
        this.particlesystem2_3.play();
        this.particleState = ParticleState.Hide;
        pc.app.root.findByName('AudioManager').script.audioManager.PlayShult();
    }else if(this.particleState === ParticleState.End)
    {
        this.particlesystem3.reset();
        this.particlesystem2_3.reset();
        this.particlesystem1.stop();
        this.particlesystem2.stop();
        this.particlesystem3.play();
        this.particlesystem2_3.stop();
        this.particleState = ParticleState.Hide;

        pc.app.root.findByName('AudioManager').script.audioManager.PauseShult();
    }
};

ShuttleEffect.prototype.BeginMove = function()
{
    this.showParticle = true;
    this.particleState = ParticleState.Begin;

};

ShuttleEffect.prototype.EndMove = function()
{
    this.showParticle = false;
    this.particleState = ParticleState.End;
};
