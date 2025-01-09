// defines the precision
precision highp float;

uniform vec3 lightSource;
uniform vec3 lightColor;
uniform vec3 lightColorAmbient;
uniform float lightReflecAmbient;
uniform vec3 lightColorDiffuse;
uniform float lightReflecDiffuse;
uniform vec3 lightColorSpec;
uniform float lightReflecSpec;

in vec3 transNormal;
in vec3 transLight;
in vec4 ambientColor;
in vec4 diffuseColor;
in vec4 specColor;

out vec4 fragment_color;


void main() {
    //vec3 normNormal = normalize(transNormal);
    //vec3 normLight = normalize(transLight);
    //float angle = max(dot(normNormal, normLight),0.0);
    //fragment_color = vec4(lightColor*angle*lightReflec, 1.f);
    fragment_color = (ambientColor + diffuseColor + specColor);
}

