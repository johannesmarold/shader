// defines the precision
precision highp float;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 modelMatrix;
uniform mat3 normalMatrix;

uniform vec3 cameraPosition;

in vec3 position;
in vec3 normal;

out vec3 transNormal;
out vec3 viewDirection;

void main() {

    //viewDirection = (modelViewMatrix * vec4(position, 1.0)).xyz;
    viewDirection = (cameraPosition) - (modelMatrix * vec4(position, 1)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
    //transNormal = normalMatrix * normal;
    transNormal = mat3(inverse(transpose(modelMatrix))) * normal;

}
