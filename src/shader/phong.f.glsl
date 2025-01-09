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

in vec3 vPosition;
in vec3 vNormal;

out vec4 fragment_color;

void main() {

    vec4 ambientColor = vec4(lightColorAmbient*lightReflecAmbient, 1.f);
    vec3 transNormal = mat3(inverse(transpose(modelMatrix))) * vNormal;
    vec3 transLight = (lightSource) - (modelMatrix * vec4(vPosition, 1)).xyz;
    vec3 normNormal = normalize(transNormal);
    vec3 normLight = normalize(transLight);
    float fColor = max(dot(normNormal, normLight),0.0);
    vec4 diffuseColor = vec4(lightColorDiffuse * lightReflecDiffuse * lightColor * fColor, 1.f);

    vec3 viewDirection = (cameraPosition) - (modelMatrix * vec4(vPosition, 1)).xyz;
    vec3 outLight = 2.0*(transNormal*dot(transNormal,normLight)) - normLight;
    vec4 specColor;

    //if (fColor > 0.0) {
        vec3 viewDirNormal = normalize(viewDirection);
        vec3 outLightNormal = normalize(outLight);
        float specLight = max(dot(outLightNormal, viewDirNormal),0.0);
        specLight = min(1.0, pow(specLight,specIntensity));
        specColor = vec4(lightColorSpec * lightReflecSpec * lightColor * specLight, 1.f);
    //}

    fragment_color = (ambientColor + diffuseColor + specColor);
}

