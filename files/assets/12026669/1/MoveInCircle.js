var MoveIncircle = pc.createScript('moveIncircle');

MoveIncircle.attributes.add('RotateAxis',{
                            type            :'vec3',
                            description     :'旋转轴',
                            default         :[0,1,0]
                        });

MoveIncircle.attributes.add('Speed',{
                            type            :'number',
                            description     :'速度',
                            default         :1
                        });

MoveIncircle.attributes.add('CentrifugalForce',{
                            type            :'number',
                            description     :'旋转时候的向心力,没有向心力时，将一直绕着固定半径运动',
                            default         :0.1
                        });

MoveIncircle.attributes.add('CenterPoint',{
                            type            :'vec3',
                            description     :'球心的坐标',
                            default         :[0,0,0]
                        });

// MoveIncircle.attributes.add('CentrifugalForceFade',{
//                             type            :'number',    
//                             description     :'向心力的衰减',
//                             default         :0.1
//                         });

// initialize code called once per entity
MoveIncircle.prototype.initialize = function() {
    this.canRotate=true;
    
    //按照某个点做圆周运动的思路是：
    //每一个时刻，物体都按照半径的切线方向获得切线速度，
    //切线速度和向心力想家就可以得到最终的速度
};

// update code called every frame
MoveIncircle.prototype.update = function(dt) {
    
    if(this.canRotate===true);
        this.circleMove(dt);
};

MoveIncircle.prototype.circleMove=function(dt){
    
    //获取位置
    var pos=this.entity.getLocalPosition();
    
    //计算半径方向
    var radius=pos.sub(this.CenterPoint);
    
    //计算切线方向
    var tangent=new pc.Vec3().cross(radius,this.RotateAxis);
    
    //获得切线方向的单位向量
    var direction=tangent.normalize();
    
    //this.CentrifugalForce=pc.math.lerp(this.CentrifugalForce,0.5,this.CentrifugalForceFade);
    this.Speed=pc.math.lerp(this.Speed,0,0.01);
    if(Math.abs(this.Speed)<0.1){
        this.Speed=0;
        this.entity.setLocalPosition(0,0,0);
        this.canRotate=false;
    }
    //切线方向的速度
    direction=new pc.Vec3(direction.x*this.Speed,direction.y*this.Speed,direction.z*this.Speed);
    
    //如果有向心力，那么需要在原速度上再加上一个指向圆心的向量
    //radius=radius.normalize();
    //var innerforce=new pc.Vec3(radius.x*this.CentrifugalForce,radius.y*this.CentrifugalForce,radius.z*this.CentrifugalForce);
    //var finalSpeed=direction.sub(innerforce);
    finalSpeed=direction.sub(radius);
    
    this.entity.translateLocal(finalSpeed.x*dt,finalSpeed.y*dt,finalSpeed.z*dt);
    
    
    // console.log(this.entity.getLocalPosition().toString());
};