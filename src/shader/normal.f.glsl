// defines the precision
precision highp float;

in vec3 transNormal;

out vec4 fragment_color;

void main() {
    vec3 normNormal = normalize(transNormal);
    vec3 color = 0.5 * (normNormal + 1.0);
    fragment_color = vec4(color, 1.f);
}

