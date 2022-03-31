var DragControy = pc.createScript('dragControy');
DragControy.attributes.add('selfSpeed',{type:'number',default:1});

DragControy.attributes.add('cameraEntity', {type: 'entity', title: 'Camera Entity'});
DragControy.attributes.add('orbitSensitivity', {
    type: 'number', 
    default: 0.1, 
    title: 'Orbit Sensitivity', 
    description: 'How fast the camera moves around the orbit. Higher is faster'
});


// initialize code called once per entity
DragControy.prototype.initialize = function() {
    this.mcc = this.app.root.findByName('Camera').script.MainCameraControl;  
    
    
    
    this.lastTouchPoint = new pc.Vec2();
    if (this.app.touch) {
        this.app.touch.on(pc.EVENT_TOUCHMOVE, this.onTouchMove, this);        
    }else{
        this.app.mouse.on(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);
    }
    
    this.dx_t =0;
    this.dy_t =0;
    
    this.dx_f =0;
    this.dy_f =0;
    
};

DragControy.prototype.update = function(dt){
    
    if(this.dx_f!==this.dx_t||this.dy_f!==this.dy_t)
    {

        this.dx_f =  pc.math.lerp( this.dx_f,this.dx_t,dt/0.05);
        this.dy_f =  pc.math.lerp( this.dy_f,this.dy_t,dt/0.05);
        if(Math.abs(this.dx_f-this.dx_t)<0.005)
            this.dx_f = this.dx_t;
        if(Math.abs(this.dy_f-this.dy_t)<0.005)
            this.dy_f = this.dy_t;

        var horzQuat = DragControy.horizontalQuat;
        var vertQuat = DragControy.verticalQuat;
        var resultQuat = DragControy.resultQuat;

        // Create a rotation around the camera's orientation in order for them to be in 
        // screen space  
        horzQuat.setFromAxisAngle(this.cameraEntity.up, this.dx_f * this.orbitSensitivity);
        vertQuat.setFromAxisAngle(this.cameraEntity.right, this.dy_f * this.orbitSensitivity);

        // Apply both the rotations to the existing entity rotation
        resultQuat.mul2(horzQuat, vertQuat);
        resultQuat.mul(this.entity.getRotation());

        this.entity.setRotation(resultQuat); 
    }else
    {
        this.entity.rotate(0,dt*5*this.selfSpeed,0);
    }

};


DragControy.horizontalQuat = new pc.Quat();
DragControy.verticalQuat = new pc.Quat();
DragControy.resultQuat = new pc.Quat();

DragControy.prototype.rotate = function (dx, dy) {

     this.dx_t = dx;
     this.dy_t = dy;
};

DragControy.prototype.onTouchMove = function (event) {
    if(this.mcc.gameState === GameState.ShowPlanetOver)
    {
            var touch = event.touches[0];
            var dx = touch.x - this.lastTouchPoint.x;
            var dy = touch.y - this.lastTouchPoint.y;
            if(dx>10)
                dx = 10;
            else if(dx<-10)
                dx = -10;

            if(dy>10)
                dy=10;
            else if(dy<-10)
                dy = -10;
            this.rotate(dx, dy);

            this.lastTouchPoint.set(touch.x, touch.y);
    }

};

DragControy.prototype.onMouseMove = function (event) {    
    var mouse = this.app.mouse;
    if (mouse.isPressed(pc.MOUSEBUTTON_LEFT)) {
        if(this.mcc.gameState === GameState.ShowPlanetOver)
        {
                var touch = event.touches[0];
                var dx = touch.x - this.lastTouchPoint.x;
                var dy = touch.y - this.lastTouchPoint.y;
                if(dx>10)
                    dx = 10;
                else if(dx<-10)
                    dx = -10;

                if(dy>10)
                    dy=10;
                else if(dy<-10)
                    dy = -10;
                this.rotate(dx, dy);

                this.lastTouchPoint.set(touch.x, touch.y);
        }
    }
};
