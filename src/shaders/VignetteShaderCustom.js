/**
 * change this import { VignetteShader } from 'three/examples/jsm/shaders/VignetteShader' 
 */

import composerVert from './composer.vert'
import vignetteFrag from './vignette.frag'


export const VignetteShaderCustom = {
	uniforms: {
		"tDiffuse": { value: null },
		"offset": { value: 1. },
        "darkness": { value: .5 },
		"color": { value: new THREE.Color( '#7628FB' )},
		"iTime": { value: .1 },
	},
	vertexShader: composerVert,
	fragmentShader: vignetteFrag,
}

