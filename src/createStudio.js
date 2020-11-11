import * as THREE from 'three'
import { studioConfig } from './constants_elements'
import { MapControls } from "three/examples/jsm/controls/OrbitControls"



export function createStudio (emitter, assets) {
    const { canId, rendererCon, clearColor, fogData, amb } = studioConfig

    const canvas = document.getElementById(canId)
    rendererCon.canvas = canvas

    const renderer = new THREE.WebGLRenderer(rendererCon)
    renderer.setClearColor(clearColor)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)

    let camera
    
    const topCamera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, .5, 10000)
    topCamera.position.set(0, 7, 5)
    topCamera.lookAt(new THREE.Vector3(5, 0, 0))
    const controls = new MapControls(topCamera, renderer.domElement);
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.05;
    controls.target.set(8, 0, 0)
    camera = topCamera

    let playerCamera

    const scene = new THREE.Scene()
    //scene.background = assets.skyBox

    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.4 );
    hemiLight.color.setHSL( 0.6, 1, 0.6 );
    hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
    hemiLight.position.set( 0, 50, 0 );
    scene.add( hemiLight );

    {
        const { color, strength } = fogData
        //scene.fog = new THREE.FogExp2(color, strength)
        scene.fog = new THREE.Fog( 0xcce0ff, 5, 100 );
    }


    {
        const { color, strength } = amb
        //let lightA = new THREE.AmbientLight( color, strength )
        //scene.add( lightA )
        scene.add( new THREE.AmbientLight( 0x666666 ) );
    }


    renderer.setClearColor( scene.fog.color );
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;

    const light = new THREE.DirectionalLight( 0xdfebff, 1.75 );
    light.position.set( -5, 15, 10 );
    scene.add(light)

    light.castShadow = true;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    light.shadow.camera.far = 80;




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
        controls.update()
    }
    emitter.subscribe('frameUpdate')(drawFrame)

    let toggleCam = false
    emitter.subscribe('clickCam')(() => {
        toggleCam = !toggleCam
        camera = toggleCam ? playerCamera : topCamera 
    })


    return {
        setPlayerCamera: cam => playerCamera = cam,
        addToScene,
    }
}

