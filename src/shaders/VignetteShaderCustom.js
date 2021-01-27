/**
 * change this import { VignetteShader } from 'three/examples/jsm/shaders/VignetteShader' 
 */
import { VignetteShader } from 'three/examples/jsm/shaders/VignetteShader'

import composerVert from './composer.vert'
import vignetteFrag from './vignette.frag'


export const VignetteShaderCustom = {
	uniforms: {
		"tDiffuse": { value: null },
		"offset": { value: 1. },
        "darkness": { value: .1 },
		"colorClouds": { value: new THREE.Color( '#7628FB' )},
		"colorNoise": { value: new THREE.Color( '#fb14d4' )},
		"colorOverlay": { value: new THREE.Color( '#3bee10' )},
		"iTime": { value: .1 },
	},
	vertexShader: composerVert,
	fragmentShader: vignetteFrag,
}

