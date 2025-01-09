// defines the precision
precision highp float;

uniform float v_reflectance;

in vec3 color;

out vec4 fragment_color;

void main() {
    fragment_color = vec4(color*v_reflectance, 1.f);
}

