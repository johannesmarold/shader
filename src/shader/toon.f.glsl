// defines the precision
precision highp float;

in vec3 transNormal;
in vec3 viewDirection;

out vec4 fragment_color;

void main() {
    vec3 normNormal = normalize(transNormal);
    vec3 normViewDirection = normalize(viewDirection);
    float angle = dot(normNormal, normViewDirection);
    if (abs(angle) > 0.9) {
        fragment_color = vec4(1.0, 0, 0, 1.f);
    }
    else if (abs(angle) > 0.6) {
        fragment_color = vec4(0.8, 0, 0, 1.f);
    }
    else if (abs(angle) > 0.3) {
        fragment_color = vec4(0.5, 0, 0, 1.f);
    }
    else {
        fragment_color = vec4(0.3, 0, 0, 1.f);
    }
}

