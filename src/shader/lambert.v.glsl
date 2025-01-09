// defines the precision
precision highp float;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 modelMatrix;

uniform vec3 lightSource;
uniform vec3 lightColor;
uniform vec3 lightColorDiffuse;
uniform float lightReflecDiffuse;

in vec3 position;
in vec3 normal;

out vec3 transNormal;
out vec3 transLight;

out vec4 dColor;


void main() {

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
    transNormal = mat3(inverse(transpose(modelMatrix))) * normal;
    transLight = (lightSource) - (modelMatrix * vec4(position, 1)).xyz;

    vec3 normNormal = normalize(transNormal);
    vec3 normLight = normalize(transLight);
    float fColor = max(dot(normNormal, normLight),0.0);
    dColor = vec4(lightColorDiffuse * lightReflecDiffuse * lightColor * fColor, 1.f);
}
