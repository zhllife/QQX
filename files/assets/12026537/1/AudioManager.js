var AudioManager = pc.createScript('audioManager');

// initialize code called once per entity
AudioManager.prototype.initialize = function() {
    
};

// update code called every frame
AudioManager.prototype.update = function(dt) {
    
};

AudioManager.prototype.PlayClick = function() {
    
};

AudioManager.prototype.PlayShult= function() {
    if(document.getElementById('revertFly'))
    window.playShulteAudio();
};
AudioManager.prototype.PauseShult= function() {
    if(document.getElementById('revertFly'))
     window.pauseShulteAudio();
};
AudioManager.prototype.PlayMoveUp= function() {
    if(document.getElementById('revertFly'))
    window.playMoveupAudio();
};
AudioManager.prototype.PlayShowPlanetSlot= function() {
 
};
// swap method called for script hot-reloading
// inherit your script state here
// AudioManager.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/