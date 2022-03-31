var PointsMaterial = pc.createScript('PointsMaterial');

// initialize code called once per entity
PointsMaterial.prototype.initialize = function() {
    
};

// update code called every frame
PointsMaterial.prototype.update = function(dt) {
    
};


PointsMaterial.prototype.CreateMaterial = function(opts){
    var app = this.app;
    
    var vshader = [
        'attribute vec3 aPosition;',
        'attribute vec4 aColor;',
        'varying vec4 vColor;',
        'uniform float size;',
        'uniform float scale;',
        'uniform mat4 matrix_view;',
        'uniform mat4 matrix_model;',
        'uniform mat4 matrix_projection;',
        'void main()',
        '{',
            'vColor = aColor;',
            'vec4 mvPosition = matrix_view * matrix_model * vec4(aPosition,1.0);',
            'gl_PointSize = size * (scale / - mvPosition.z);',
            'gl_Position = matrix_projection * mvPosition;',
        '}'
    ].join('\n');
    var fshader = [
        'precision '+app.graphicsDevice.precision + " float;",
        'varying vec4 vColor;',
        'uniform vec4 diffuse;',
        'uniform float opacity;',
        'uniform sampler2D map;',
        'void main()',
        '{',
            'vec3 outgoingLight = vec3(0.0);',
            'vec4 diffuseColor = vec4(diffuse.rgb,opacity);',
            'vec4 mapTexel = texture2D(map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y));',
            'diffuseColor *= mapTexel;',
            'diffuseColor.rgb *= vColor.rgb;',
            'outgoingLight = diffuseColor.rgb;',
            'gl_FragColor = vec4(outgoingLight,diffuseColor.a);',
        '}'
    ].join('\n');
    
    var shaderDefinition = {
        attributes:{
            aPosition:pc.SEMANTIC_POSITION,
            aColor:pc.SEMANTIC_COLOR
        },
        vshader:vshader,
        fshader:fshader
    };
    var shader = new pc.Shader(app.graphicsDevice,shaderDefinition);
    var mat = new pc.Material();
    mat.shader = shader;
    mat.depthTest = opts.depthTest === undefined ? false:opts.depthTest;
    mat.alphaTest = opts.alphaTest === undefined ? 0.0 : opts.alphaTest;
    
    var size = opts.size === undefined ? 1.0:opts.size,
        scale = opts.scale === undefined ? 1.0:opts.scale,
        map =   opts.map === undefined ? null:opts.map,
        diffuse = opts.diffuse === undefined ?  new pc.Color(1.0,1.0,1.0).data:opts.diffuse,
        opacity = opts.opacity === undefined ? 1.0 :opts.opacity;
    mat.setParameter('size',size);
    mat.setParameter('map',map);
    mat.setParameter('scale',scale);
    mat.setParameter('diffuse',diffuse);
    mat.setParameter('opacity',opacity);
    
    mat.blendType = pc.BLEND_ADDITIVEALPHA;
    return mat;
};

PointsMaterial.prototype.createMesh = function(device, positions, opts) {
    var normals = opts && opts.normals !== undefined ? opts.normals : null;
    var tangents = opts && opts.tangents !== undefined ? opts.tangents : null;
    var colors = opts && opts.colors !== undefined ? opts.colors : null;
    var uvs = opts && opts.uvs !== undefined ? opts.uvs : null;
    var uvs1 = opts && opts.uvs1 !== undefined ? opts.uvs1 : null;
    var indices = opts && opts.indices !== undefined ? opts.indices : null;
    var vertexDesc = [{ semantic: pc.SEMANTIC_POSITION, components: 3, type: pc.ELEMENTTYPE_FLOAT32 }];
    if (normals !== null) {
        vertexDesc.push({ semantic: pc.SEMANTIC_NORMAL, components: 3, type: pc.ELEMENTTYPE_FLOAT32 });
    }
    if (tangents !== null) {
        vertexDesc.push({ semantic: pc.SEMANTIC_TANGENT, components: 4, type: pc.ELEMENTTYPE_FLOAT32 });
    }
    if (colors !== null) {
        vertexDesc.push({ semantic: pc.SEMANTIC_COLOR, components: 4, type: pc.ELEMENTTYPE_UINT8, normalize: true });
    }
    if (uvs !== null) {
        vertexDesc.push({ semantic: pc.SEMANTIC_TEXCOORD0, components: 2, type: pc.ELEMENTTYPE_FLOAT32 });
    }
    if (uvs1 !== null) {
        vertexDesc.push({ semantic: pc.SEMANTIC_TEXCOORD1, components: 2, type: pc.ELEMENTTYPE_FLOAT32 });
    } 
    var vertexFormat = new pc.VertexFormat(device, vertexDesc);
    var numVertices = positions.length / 3;
    var vertexBuffer = new pc.VertexBuffer(device, vertexFormat, numVertices, pc.BUFFER_STATIC);
    var iterator = new pc.VertexIterator(vertexBuffer);
    for (var i = 0; i < numVertices; i++) {
        iterator.element[pc.SEMANTIC_POSITION].set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
        if (normals !== null) {
            iterator.element[pc.SEMANTIC_NORMAL].set(normals[i * 3], normals[i * 3 + 1], normals[i * 3 + 2]);
        }
        if (tangents !== null) {
            iterator.element[pc.SEMANTIC_TANGENT].set(tangents[i * 4], tangents[i * 4 + 1], tangents[i * 4 + 2], tangents[i * 4 + 3]);
        }
        if (colors !== null) {
            iterator.element[pc.SEMANTIC_COLOR].set(colors[i * 4], colors[i * 4 + 1], colors[i * 4 + 2], colors[i * 4 + 3]);
        }
        if (uvs !== null) {
            iterator.element[pc.SEMANTIC_TEXCOORD0].set(uvs[i * 2], uvs[i * 2 + 1]);
        }
        if (uvs1 !== null) {
            iterator.element[pc.SEMANTIC_TEXCOORD1].set(uvs1[i * 2], uvs1[i * 2 + 1]);
        }
        iterator.next();
    }
    iterator.end();
    var indexBuffer = null;
    var indexed = indices !== null;
    if (indexed) {
        indexBuffer = new pc.IndexBuffer(device, pc.INDEXFORMAT_UINT16, indices.length);
        var dst = new Uint16Array(indexBuffer.lock());
        dst.set(indices);
        indexBuffer.unlock();
    }
    var aabb = new pc.BoundingBox();
    var mesh = new pc.Mesh();
    mesh.vertexBuffer = vertexBuffer;
    mesh.indexBuffer[0] = indexBuffer;
    mesh.primitive[pc.RENDERSTYLE_POINTS] = {
        type: pc.PRIMITIVE_POINTS,
        base: 0,
        count: numVertices,
        indexed: indexed
    };
    mesh.aabb = aabb;
    return mesh;
};





