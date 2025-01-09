// defines the precision
precision highp float;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 modelMatrix;

in vec3 position;
in vec3 normal;

in vec3 invTransMatWorld;

out vec3 transNormal;

void main() {

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
    transNormal = mat3(inverse(transpose(modelMatrix))) * normal;
    //trans_normal = invTransMatWorld * normal;
}