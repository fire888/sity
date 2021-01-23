import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';


const CONFIG = {
    fogData: {
        color: 0x5B96E7,
        strength: 0.00057,
    },
    amb: {
        color: 0xffffff,
        strength: 0.6,
    },
    lightDataOne:{
        color: 0x00FF00,
        strength: 3,
        pos: [15, 40, 0],
    },
    lightDataTwo: {
        color: 0xff0000,
        strength: 5,
        pos: [-10, -6, 0],
    },
}


export const createStudio = function () {
    const camera = new THREE.PerspectiveCamera( 25, window.innerWidth / window.innerHeight, 1, 10000 );
    //965.1431661754809 444.48798524668956 1043.8103908570088
    camera.position.set( 1133.3833013186731, 351.9369853120578, 1133.4263294071484 ).setLength(1700);
    camera.rotation.set(0.751582872929487, 0.6294554469014992, 0.5029801008660981);
    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x5B96E7 );
    //scene.fog = new THREE.FogExp2( 0xFFEECD, 0.0005 );

    {
         const light = new THREE.HemisphereLight('#e0e1ce', '#bad1cd', 1);
         light.position.set(0, 1200, 0);
         scene.add(light);
    }
    {
        const light = new THREE.DirectionalLight('#ffff99', .6);
        light.position.set(1133.3833013186731, -1000, 1000.4263294071484);
        const targetObject = new THREE.Object3D();
        scene.add(targetObject);
        light.target = targetObject;
    // //     light.castShadow = false;
    // //     // light.shadow.camera.top = 1080;
    // //     // light.shadow.camera.bottom = -1800;
    // //     // light.shadow.camera.left = -1820;
    // //     // light.shadow.camera.right = 1820;
    // //     // //Set up shadow properties for the light
    // //     // light.shadow.mapSize.width = 1000;  // default
    // //     // light.shadow.mapSize.height = 520; // default
    // //     // light.shadow.camera.near = 1;    // default
    // //     // light.shadow.camera.far = 500;     // default
    // //
        scene.add( light );
    }


    {
        //const {color, strength} = CONFIG.fogData
        //scene.fog = new THREE.FogExp2(color, strength)
    }

    // {
    //     const { color, strength } = CONFIG.amb
    //     const lightA = new THREE.AmbientLight(color, strength)
    //     scene.add(lightA)
    // }

    // {
    //     const { color, strenth, pos } = CONFIG.lightDataOne
    //     const light = new THREE.PointLight(color, strenth)
    //     light.position.fromArray(pos)
    //     camera.add(light)
    // }
    //
    // {
    //     const { color, strenth, pos } = CONFIG.lightDataTwo
    //     const light = new THREE.PointLight(color, strenth)
    //     light.position.fromArray(pos)
    //     camera.add(light)
    // }


    const renderer = new THREE.WebGLRenderer( { antialias: false } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = false;
    document.getElementById('city').appendChild(renderer.domElement);

    const renderPass = new RenderPass( scene, camera );
    const fxaaPass = new ShaderPass( FXAAShader );
    const pixelRatio = renderer.getPixelRatio();
    fxaaPass.material.uniforms[ 'resolution' ].value.x = 1 / ( renderer.domElement.offsetWidth * pixelRatio );
    fxaaPass.material.uniforms[ 'resolution' ].value.y = 1 / ( renderer.domElement.offsetHeight * pixelRatio );
    const effectFilm = new FilmPass( 0.35, 0.75, 2048, 0 );
    const composer = new EffectComposer( renderer );
    composer.addPass( renderPass );
    composer.addPass( fxaaPass );
    //composer.addPass( effectFilm );




    const controls = new OrbitControls( camera, renderer.domElement );
    controls.enablePan = true;
    controls.minPolarAngle = THREE.Math.degToRad(25);
    controls.maxPolarAngle = THREE.Math.degToRad(70);
    controls.minDistance = 350;
    controls.maxDistance = 1000;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;
    controls.target.set( 500, 100, 600 );
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