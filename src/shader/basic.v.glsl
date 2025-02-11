// These uniforms and attributes are provided by threejs.
// If you want to add your own, look at https://threejs.org/docs/#api/en/materials/ShaderMaterial #Custom attributes and uniforms
// defines the precision
precision highp float;

// = object.matrixWorld
uniform mat4 modelMatrix;

// = camera.matrixWorldInverse * object.matrixWorld
uniform mat4 modelViewMatrix;

// = camera.projectionMatrix
uniform mat4 projectionMatrix;

// = camera.matrixWorldInverse
uniform mat4 viewMatrix;

// = inverse transpose of modelViewMatrix
uniform mat3 normalMatrix;

// = camera position in world space
uniform vec3 cameraPosition;


// default vertex attributes provided by Geometry and BufferGeometry
in vec3 position;
in vec3 normal;
in vec2 uv;

// main function gets executed for every vertex
void main()
{
  gl_Position = vec4(0., 0., 0., 1.0);
}

/*
vec4 TransformToNDC(vec3 pos, mat4 mvm, mat4 pm) {
    vec4 tmp = mvm * vec4(pos,1);
    return pm * tmp;
}


material = new THREE.RawShaderMaterial( {
  vertexShader: ambientVertexShader,
  fragmentShader: ambientFragmentShader,
  uniforms: {
    v_color: {value: new THREE.Vector3(settings.ambient_color[0]/255, settings.ambient_color[1]/255, settings.ambient_color[2]/255)} 
    ,v_reflectance: {value: settings.ambient_reflectance}
  }
});
material.glslVersion = THREE.GLSL3;
material.needsUpdate = true;
*/
