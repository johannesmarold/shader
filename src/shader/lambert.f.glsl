// defines the precision
precision highp float;

uniform vec3 lightSource;
uniform vec3 lightColor;
uniform vec3 lightColorDiffuse;
uniform float lightReflecDiffuse;

in vec3 transNormal;
in vec3 transLight;
in vec4 dColor;

out vec4 fragment_color;


void main() {
    //vec3 normNormal = normalize(transNormal);
    //vec3 normLight = normalize(transLight);
    //float angle = max(dot(normNormal, normLight),0.0);
    //fragment_color = vec4(lightColorDiffuse*angle*lightReflecDiffuse, 1.f);
    fragment_color = dColor;
}

