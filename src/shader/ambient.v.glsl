// defines the precision
precision highp float;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

uniform vec3 v_color;
uniform float v_reflectance;

in vec3 position;

out vec3 color;

void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
    color = v_color;
}
