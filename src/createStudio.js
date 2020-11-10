import * as THREE from 'three'
import { studioConfig } from './constants_elements'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"



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
    topCamera.position.set(0, 5, 5)
    topCamera.lookAt(new THREE.Vector3(5, 0, 0))
    const controls = new OrbitControls(topCamera, renderer.domElement);
    controls.target.set(8, 0, 0)
    camera = topCamera

    let playerCamera

    const scene = new THREE.Scene()
    scene.background = assets.skyBox

    {
        const { color, strength } = fogData
        scene.fog = new THREE.FogExp2(color, strength)
    }

    {
        const { color, strength } = amb
        let lightA = new THREE.AmbientLight( color, strength )
        scene.add( lightA )
    }

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

