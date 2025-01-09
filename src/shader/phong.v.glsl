// defines the precision
precision highp float;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 modelMatrix;
uniform vec3 cameraPosition;

uniform vec3 lightSource;
uniform vec3 lightColor;
uniform vec3 lightColorAmbient;
uniform float lightReflecAmbient;
uniform vec3 lightColorDiffuse;
uniform float lightReflecDiffuse;
uniform vec3 lightColorSpec;
uniform float lightReflecSpec;
uniform float specIntensity;

in vec3 position;
in vec3 normal;

out vec3 vNormal;
out vec3 vPosition;

void main() {

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
    vNormal = normal;
    vPosition = position;
}
