import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';

//import { VignetteShader } from 'three/examples/jsm/shaders/VignetteShader'
import { VignetteShaderCustom } from './shaders/VignetteShaderCustom'



export const createStudio = function () {
    const camera = new THREE.PerspectiveCamera( 25, window.innerWidth / window.innerHeight, 1, 10000 );
    //965.1431661754809 444.48798524668956 1043.8103908570088
    camera.position.set( 1133.3833013186731, 351.9369853120578, 1133.4263294071484 ).setLength(1700);
    const scene = new THREE.Scene();


    const backColor = '#A8D8FF'
    scene.background = new THREE.Color(backColor);
    scene.fog = new THREE.Fog( backColor, 500, 3000)
    {
        const light = new THREE.HemisphereLight( 0xffffff, 0x444444, 0.7 );
        light.position.set(0, 1200, 0);
        scene.add( light );
    }
    {    
        const light = new THREE.DirectionalLight( '#feffe1', 1);
        light.position.set(0, 2000, 2000);
        const targetObject = new THREE.Object3D();

        scene.add(targetObject);
        light.target = targetObject;
        scene.add( light );
    }



    const renderer = new THREE.WebGLRenderer( { antialias: false } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = false;
    document.getElementById('city').appendChild(renderer.domElement);

    const renderPass = new RenderPass( scene, camera )
    const composer = new EffectComposer( renderer );
    composer.addPass( renderPass );

    const fxaaPass = new ShaderPass( FXAAShader )
    const pixelRatio = renderer.getPixelRatio();
    fxaaPass.material.uniforms[ 'resolution' ].value.x = 1 / ( window.innerWidth * pixelRatio );
    fxaaPass.material.uniforms[ 'resolution' ].value.y = 1 / ( window.innerHeight * pixelRatio );
    composer.addPass( fxaaPass );

    const vignettePass = new ShaderPass(VignetteShaderCustom)
    vignettePass.material.uniforms[ 'color' ].value = new THREE.Color("#00FFFF")
    composer.addPass(vignettePass)


    const controls = new OrbitControls( camera, renderer.domElement );
    controls.enablePan = true;
    controls.minPolarAngle = THREE.Math.degToRad(25);
    controls.maxPolarAngle = THREE.Math.degToRad(70);
    controls.minDistance = 350;
    controls.maxDistance = 1000;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;
    controls.target.set( 500, 100, 600 );
    ///controls.target.set( 0, 0, 0 );
    controls.update();


    return {
        scene,
        camera,
        controls,
        renderer,
        renderFrame () {
            //renderer.render( scene, camera );
            composer.render();
        },
        resize () {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize( window.innerWidth, window.innerHeight );
            composer.setSize( window.innerWidth, window.innerHeight );

            const pixelRatio = renderer.getPixelRatio();
            fxaaPass.material.uniforms[ 'resolution' ].value.x = 1 / ( window.innerWidth * pixelRatio );
            fxaaPass.material.uniforms[ 'resolution' ].value.y = 1 / ( window.innerHeight * pixelRatio );
        },
    }
}