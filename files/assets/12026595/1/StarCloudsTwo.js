var StarCloudsTwo = pc.createScript('starCloudsTwo');

var t = new pc.Color(0.49,0.6,1.0),
    e = new pc.Color(1.0,0.7,0.37);


StarCloudsTwo.attributes.add('starmap', { type: 'asset' });
StarCloudsTwo.attributes.add('hazemap', { type: 'asset' });
StarCloudsTwo.attributes.add('flaremap', { type: 'asset' });
StarCloudsTwo.attributes.add('scale',{type:'number'});

// initialize code called once per entity
StarCloudsTwo.prototype.initialize = function() {
    var self = this;
    this.glowObj = this.entity.findByName('glow');
    this.InitStarsData();
    this.InitMaterial();
    this.buildGeometry();
    
    this.tweenAnimation = new TWEEN.Tween({
        blastTween:1
    })
    .to({blastTween:0},900)
    .easing(TWEEN.Easing.Quartic.In)
    .onUpdate(function(){
        
        var e = this.blastTween,
            t = 0.5 > 1.5 * e ? 1.5 * e : 0.5 + e / 2,
            r = 1 > 3 * e ? 3 * e : 1;
        self.glowObj.setLocalScale(3.5 * r, 3.5 * r, 3.5 * r);
        self.largeStarGeometry.entity.setLocalScale(t, t, t);
        self.hazeGeometry.entity.setLocalScale(e, e, e);
        self.starsGeometry.entity.setLocalScale(e, e, e);
        
    })
    .onComplete(function(){
        self.entity.enabled = false;
        //self.entity.destroy();
    });
    
    this.entity.setLocalScale(this.scale,this.scale,this.scale); 
    this.on('attr:scale',function(){
       this.entity.setLocalScale(this.scale,this.scale,this.scale); 
    });
};

StarCloudsTwo.prototype.update = function(dt) {
    
};

StarCloudsTwo.prototype.InitStarsData = function() {
    
    this.blastTween = 0;
    this.starSize = (pc.platform.desktop ? 400 :600)*this.scale;
    this.arms = {
        count: 0,
        stars: 1400,
        scale: 0.45,
        twist: 0.3,
        density: 0.25,
        spread: 0.3
    };
    this.clouds = [{
            stars: 0,
            radius: 4.5,
            height: 0.5,
            color: t
        },
        {
            stars: 0,
            radius: 1,
            height: 0.4,
            color: e
        },
        {
            stars: 3e3,
            radius: 3,
            height: 0.5,
            color: t
        }
    ];
};

StarCloudsTwo.prototype.InitMaterial = function() {
    this.PointsMaterial = this.app.root.findByName('material').script.PointsMaterial;

    this.starsMaterial = this.PointsMaterial.CreateMaterial({
        map: this.starmap.resource,
        size: this.starSize / 10,
    });

    this.largeStarsMaterial = this.PointsMaterial.CreateMaterial({
        map: this.starmap.resource,
        size: this.starSize / 4,
    });

    this.hazeMaterial = this.PointsMaterial.CreateMaterial({
        map: this.hazemap.resource,
        size: this.starSize / 3,
        opacity:0.04
    });

};

StarCloudsTwo.prototype.buildGeometry = function() {
    var app = this.app;
    /*
    this.starsGeometry = { entity: new pc.Entity('stars'), vertices: [], colors: [] };
    this.entity.addChild(this.starsGeometry.entity);
    
    this.starsMaterial.setParameter('size', this.starSize/10);
    this.buildPointSpiralGeometry(this.starsGeometry, this.arms.count, this.arms.stars, this.arms.scale, this.arms.twist, this.arms.density, this.arms.spread, this.getStarColor);
    for (var e = 0; e < this.clouds.length; e++) 
        this.buildPointSphereGeometry(this.starsGeometry, this.clouds[e].stars, this.clouds[e].radius, this.clouds[e].height, this.clouds[e].color);
    var mesh = this.PointsMaterial.createMesh(app.graphicsDevice,this.starsGeometry.vertices,{colors:this.starsGeometry.colors});
    var graph = new pc.GraphNode(),
        mgraph = new pc.GraphNode();
    mgraph.addChild(graph);
    var meshinstance = new pc.MeshInstance(graph,mesh,this.starsMaterial);
    meshinstance.renderStyle = pc.RENDERSTYLE_POINTS;
    var model = new pc.Model();
    model.meshInstances = [meshinstance];
    model.graph = mgraph;
    this.starsGeometry.entity.addComponent('model');
    this.starsGeometry.entity.model.model = model;
    */
    
    this.hazeGeometry = { entity: new pc.Entity('hazes'), vertices: [], colors: [] };
    this.entity.addChild(this.hazeGeometry.entity);
    this.buildPointSpiralGeometry(this.hazeGeometry, this.arms.count, this.arms.stars / 2, this.arms.scale, this.arms.twist, 2 * this.arms.density, this.arms.spread, this.getStarColor);
    this.buildPointSphereGeometry(this.hazeGeometry, 160, this.clouds[2].radius, this.clouds[2].height, this.clouds[2].color);
    mesh = this.PointsMaterial.createMesh(app.graphicsDevice,this.hazeGeometry.vertices,{colors:this.hazeGeometry.colors});
    graph = new pc.GraphNode();
    mgraph = new pc.GraphNode();
    mgraph.addChild(graph);
    meshinstance = new pc.MeshInstance(graph,mesh,this.hazeMaterial);
    meshinstance.renderStyle = pc.RENDERSTYLE_POINTS;
    model = new pc.Model();
    model.meshInstances = [meshinstance];
    model.graph = mgraph;
    this.hazeGeometry.entity.addComponent('model');
    this.hazeGeometry.entity.model.model = model;
    
    
    this.largeStarsMaterial.setParameter('size',this.starSize/4);
    this.largeStarGeometry = { entity: new pc.Entity('largestars'), vertices: [], colors: [] };
    this.entity.addChild(this.largeStarGeometry.entity);
    this.buildPointSphereGeometry(this.largeStarGeometry, 100, this.clouds[2].radius, this.clouds[2].height, new pc.Color(0.9, 0.7, 0.8));
    mesh = this.PointsMaterial.createMesh(app.graphicsDevice,this.largeStarGeometry.vertices,{colors:this.largeStarGeometry.colors});
    graph = new pc.GraphNode();
    mgraph = new pc.GraphNode();
    mgraph.addChild(graph);
    meshinstance = new pc.MeshInstance(graph,mesh,this.largeStarsMaterial);
    meshinstance.renderStyle = pc.RENDERSTYLE_POINTS;
    model = new pc.Model();
    model.meshInstances = [meshinstance];
    model.graph = mgraph;
    this.largeStarGeometry.entity.addComponent('model');
    this.largeStarGeometry.entity.model.model = model;
    
};

StarCloudsTwo.prototype.buildPointSpiralGeometry = function(e, t, r, i, o, a, s, u) {
    for (var c = 0; r > c; c++)
        for (var l = pc.math.DEG_TO_RAD * c * a, h = 0; t > h; h++) {
            var p = new pc.Vec3();
            p.x = i * Math.cos(l) * Math.pow(Math.E, o * l) + s * (0.5 - Math.random());
            p.y = 0.7 * s * (0.5 - Math.random());
            p.z = i * Math.sin(l) * Math.pow(Math.E, o * l) + s * (0.5 - Math.random());
            var d = 360 * c / t;
            var quat = new pc.Quat().setFromAxisAngle(pc.Vec3.UP, d);
            p = quat.transformVector(p);
            e.vertices.push(p.x, p.y, p.z);
            var color = u(p);
            e.colors.push(Math.floor(color.r*255), Math.floor(color.g*255), Math.floor(color.b*255), Math.floor(color.a*255));
        }
};

StarCloudsTwo.prototype.buildPointSphereGeometry = function(e, t, r, i, o) {
    for (var a = 0; t > a; a++) {
        var s = new pc.Vec3(),
            u = Math.random() * r,
            c = 360 * Math.random() - 180,
            l = 360 * Math.random() - 180;
        s.x = u * Math.sin(c) * Math.cos(l);
        s.y = u * Math.cos(c) * i;
        s.z = u * Math.sin(c) * Math.sin(l);
        e.vertices.push(s.x, s.y, s.z);
        e.colors.push(Math.floor(o.r*255), Math.floor(o.g*255), Math.floor(o.b*255), Math.floor(o.a*255));
    }
};
StarCloudsTwo.prototype.getStarColor = function(r) {
    var i = Math.sqrt(r.x * r.x + r.y * r.y + r.z * r.z),
        o = 0.3 / i;
    if (o > 1)
        o = 1;

    var a = new pc.Color(e.r * o + t.r * (1 - o), e.g * o + t.g * (1 - o), e.b * o + t.b * (1 - o));
    return a;
};

StarCloudsTwo.prototype.updateBlast = function () {
        
};

