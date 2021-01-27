uniform float offset;
uniform float darkness;
uniform vec3 colorNoise;
uniform vec3 colorClouds;
uniform vec3 colorOverlay;
uniform sampler2D tDiffuse;
uniform float iTime;
  
varying vec2 vUv;


// -------- Clouds ----------------------- //

#define SPEED 0.1
#define MOD3 vec3(.1031,.11369,.13787)


vec3 hash33(vec3 p3)
{
 	p3 = fract(p3 * MOD3);
    p3 += dot(p3, p3.yxz+19.19);
    return -1.0 + 2.0 * fract(vec3((p3.x + p3.y)*p3.z, (p3.x+p3.z)*p3.y, (p3.y+p3.z)*p3.x));
}


float simplex_noise(vec3 p)
 {
     const float K1 = 0.33333333;
     const float K2 = 0.166666667;
    
     vec3 i = floor(p + (p.x + p.y + p.z) * K1);
     vec3 d0 = p - (i - (i.x + i.y + i.z) * K2);
    
     // thx nikita: https://www.shadertoy.com/view/XsX3zB
     vec3 e = step(vec3(0.0), d0 - d0.yzx);
 	 vec3 i1 = e * (1.0 - e.zxy);
 	 vec3 i2 = 1.0 - e.zxy * (1.0 - e);
    
     vec3 d1 = d0 - (i1 - 1.0 * K2);
     vec3 d2 = d0 - (i2 - 2.0 * K2);
     vec3 d3 = d0 - (1.0 - 3.0 * K2);
    
     vec4 h = max(0.6 - vec4(dot(d0, d0), dot(d1, d1), dot(d2, d2), dot(d3, d3)), 0.0);
     vec4 n = h * h * h * h * vec4(dot(d0, hash33(i)), dot(d1, hash33(i + i1)), dot(d2, hash33(i + i2)), dot(d3, hash33(i + 1.0)));
    
     return dot(vec4(20.316), n);
}



float getNoise(vec2 uv)
{
    vec3 p = vec3(uv, iTime * SPEED);
    float f = 0.0;
    p = p * 4.0;
    f += 1.0000 * simplex_noise(p); p = 2.0 * p;
    f += 0.5000 * simplex_noise(p); p = 2.0 * p;
	f += 0.2500 * simplex_noise(p); p = 2.0 * p;
	f += 0.1250 * simplex_noise(p); p = 2.0 * p;
	f += 0.0625 * simplex_noise(p); p = 2.0 * p;
    
    return f;
}


// ------ GRAIN ----------------- //

float rand(vec2 uv, float t) {
    return fract(sin(dot(uv, vec2(122.6548, 32.8942))) * 4251.4865 + t);
}


vec3 getGrain(vec2 uv, sampler2D diffuse) {
    float scale = 2.;
    vec2 offsetGrain = vec2((rand(uv, iTime * 0.05) - 0.5) * scale);
    return texture(diffuse, uv + offsetGrain).rgb;
}


// ----- MAIN -------------------- //

void main() {
	vec2 uv = ( vUv - vec2( 0.5 ) ) * vec2( offset );
	uv.y -= 0.1;

    vec4 texel = texture2D( tDiffuse, vUv );

    vec3 grain = getGrain(uv, tDiffuse);
    vec3 renderColor = mix(texel.rgb, grain, .2);

    vec3 clouds = vec3(getNoise(uv)) + colorClouds * (1. - darkness);
    renderColor = mix(renderColor, clouds, dot(uv, uv));

    gl_FragColor = vec4(renderColor, 1.);
}
