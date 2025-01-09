// defines the precision
precision highp float;
const float PI = 3.1415926535897932384626433832795;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 modelMatrix;
uniform vec3 cameraPosition;

uniform vec3 lightSource;
uniform vec3 lightColor;
uniform vec3 lightColorDiffuse;
uniform float lightReflecDiffuse;
uniform vec3 lightColorSpec;
uniform float lightReflecSpec;
uniform float roughness;

in vec3 vPosition;
in vec3 vNormal;

out vec4 fragment_color;

void main() {

    vec3 transNormal = mat3(inverse(transpose(modelMatrix))) * vNormal;
    vec3 transLight = (lightSource) - (modelMatrix * vec4(vPosition, 1)).xyz;
    vec3 normNormal = normalize(transNormal);
    vec3 normLight = normalize(transLight);
    float diffColor = max(dot(normNormal, normLight),0.0);
    vec3 k_d_pi = (lightColorDiffuse * lightReflecDiffuse)/PI;

    //preparing necessary vectors
    vec3 viewDirection = (cameraPosition) - (modelMatrix * vec4(vPosition, 1)).xyz;
    viewDirection = normalize(viewDirection);
    vec3 halfVector = normalize(viewDirection + normLight);
    
    //D calculations
    float d = 0.0;
    float nThSquared = pow(dot(normNormal, halfVector), 2.0);
    float aSquared = roughness * roughness;

    if (nThSquared > 0.0) {
        d =  aSquared / (PI * pow(nThSquared * (aSquared + ((1.0 - nThSquared)/(nThSquared))), 2.0));
    };

    //G calculations
    float vTnSquared = pow(dot(viewDirection, normNormal), 2.0);
    float lTnSquared = pow(dot(normLight, normNormal), 2.0);
    float g1 = 0.0;
    float g2 = 0.0;
    
    if (vTnSquared > 0.0) {
        g1 = 2.0 / (1.0 + sqrt(1.0 + aSquared * (1.0 - vTnSquared)/(vTnSquared)));
    }
    if (lTnSquared > 0.0) {
        g2 = 2.0 / (1.0 + sqrt(1.0 + aSquared * (1.0 - lTnSquared)/(lTnSquared)));
    }
    float g = g1 * g2;

    //F calculations
    vec3 f_0 = lightColorSpec;
    vec3 f = f_0 + (1.0 - f_0) * pow(1.0 - dot(viewDirection, halfVector), 5.0);

    //spec Light (f_s) calculations
    vec3 specLight = lightReflecSpec * ((d * f * g) / (4.0 * abs(dot(normNormal, normLight)) * abs(dot(normNormal, viewDirection))));

    //general light calculations
    fragment_color = vec4((k_d_pi + specLight) * diffColor * lightColor, 1.f);
}

