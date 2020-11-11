import * as THREE from 'three'
import { studioConfig } from './constants_elements'
import { MapControls } from "three/examples/jsm/controls/OrbitControls"
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';



export function createStudio (emitter, assets) {
    const { canId, rendererCon, clearColor, fogData, amb } = studioConfig


    const canvas = document.getElementById(canId)
    rendererCon.canvas = canvas


    let camera
    
    const topCamera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, .5, 10000)
    topCamera.position.set(0, 8, 4)
    topCamera.lookAt(new THREE.Vector3(4, 0, 0))
    camera = topCamera

    let playerCamera

    const scene = new THREE.Scene()
    //scene.background = assets.skyBox

    scene.fog = new THREE.Fog( 0x3a939e, 5, 100 );
    scene.add( new THREE.AmbientLight( 0xffce6e, 0.3 ) );
    
    const light = new THREE.DirectionalLight( 0xdfebff, 1.35 );
    light.position.set( -5, 15, 10 );
    scene.add(light)



    const renderer = new THREE.WebGLRenderer(rendererCon)
    renderer.setClearColor(clearColor)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor( scene.fog.color );
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;



    const renderPass = new RenderPass( scene, camera );
    const fxaaPass = new ShaderPass( FXAAShader );
    const pixelRatio = renderer.getPixelRatio();
    fxaaPass.material.uniforms[ 'resolution' ].value.x = 1 / ( window.innerWidth * pixelRatio );
    fxaaPass.material.uniforms[ 'resolution' ].value.y = 1 / ( window.innerHeight * pixelRatio );
    const bokehPass = new BokehPass( scene, camera, {
        focus: 10.0,
        aperture: 0.001,
        maxblur: 0.0025,
        width: window.innerWidth,
        height: window.innerHeight,
    } );

    const composer = new EffectComposer( renderer );
    composer.addPass( renderPass );
    //composer.addPass( bokehPass );
    //composer.addPass( fxaaPass );


    const controls = new MapControls(topCamera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(8, 0, 0)


    const resize = () => {
        const size = { width: window.innerWidth, height: window.innerHeight }
        renderer.setSize(size.width, size.height)
        if (camera) {
            camera.aspect = size.width/size.height
            camera.updateProjectionMatrix()
        }
    }

    window.addEventListener('resize', resize)
    resize()

    const addToScene = scene.add.bind(scene)

    const drawFrame = () => {
        renderer.render(scene, camera)
        //composer.render( 0.1 );
        controls.update()
    }
    emitter.subscribe('frameUpdate')(drawFrame)

    let toggleCam = false
    emitter.subscribe('clickCam')(() => {
        toggleCam = !toggleCam
        if (toggleCam) { 
            camera = playerCamera
            scene.fog = new THREE.Fog( 0x96c0ff, 3, 20 );
        } else { 
            camera = topCamera 
            scene.fog = new THREE.Fog( 0x3a939e, 5, 100 );
        }
        bokehPass.camera = camera
        renderPass.camera = camera
        renderer.setClearColor( scene.fog.color )
    })


    return {
        setPlayerCamera: cam => playerCamera = cam,
        addToScene,
    }
}

