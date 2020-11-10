import './assets/start-img.png'
import './assets/progress-img.png'
import pxjpg from './assets/skybox/px.jpg'
import nxjpg from './assets/skybox/nx.jpg'
import pyjpg from './assets/skybox/py.jpg'
import nyjpg from './assets/skybox/ny.jpg'
import pzjpg from './assets/skybox/pz.jpg'
import nzjpg from './assets/skybox/nz.jpg'

import sitySrc from './assets/City(Vasiliy).glb'



export const ASSETS_TO_LOAD = [{
        type: 'glb',
        filename: sitySrc,
        key: 'sity'
    }, {
        type: 'cubeTextures',
        filename: { px: pxjpg, nx: nxjpg, py: pyjpg, ny: nyjpg, pz: pzjpg, nz: nzjpg, },
        key: 'skyBox'
},]



export const studioConfig = {
    canId: 'webgl-canvas',
    rendererCon: {
        antialias: true
    },
    clearColor: 0x0e2535,
    backgroundColor: 0x222024,
    fogData: {
        color: 0x0e2535,
        strength: 0.0057,
    },
    amb: {
        color: 0xffffff,
        strength: 0.8,
    },
}



export const playerConfig = {
    speed: 0.02,
    speedRot: 0.02,
    speedDown: -0.25,
    offsetFromFloor: 10.0,
    offsetFromFloorFactor: 0.5,
    offsetWallCollision: 3.5,
    level: -13,
    startRot: [0, 0, 0],
    startPos: [11, 0.2, 2],
    cameraData: {
        fov: 90,
        ratio: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 1000,
        pos: [0, 0, -0.1],
    },
    frontObjPos: [0, 0, -1],
    lightDataOne: {
        color: 0x00FF00,
        strength: 0.5,
        pos: [15, 40, 0],
    },
    lightDataTwo: {
        color: 0xff0000, 
        strength: 0.4,
        pos: [-10, -6, 0],
    },
}

