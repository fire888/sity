import composerVert from './composer.vert'
import noiseFrag from './noise.frag'


export const NoiseShader = {
	uniforms: {
		"tDiffuse": { value: null },
		"iTime": { value: .1 },
	},
	vertexShader: composerVert,
	fragmentShader: noiseFrag,
};

