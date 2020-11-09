import * as THREE from 'three'

import { playerConfig } from './constants_elements'




export function createPlayer (emitterLink) {
    const emitter = emitterLink

    const {
        startPos,
        startRot,
        cameraData,
        frontObjPos,
        lightDataOne,
        lightDataTwo,
        speed,
        speedRot,
    } = playerConfig


    let camera
    let keys = {}
    let isButtonsDisabled = false
  

    const mainObj = new THREE.Object3D()
    mainObj.position.fromArray(startPos)
    mainObj.rotation.fromArray(startRot)

    const frontObj = new THREE.Object3D()
    frontObj.position.fromArray(frontObjPos)
    mainObj.add(frontObj)
  
    {
        const { fov, ratio, near, far, pos } = cameraData
        camera = new THREE.PerspectiveCamera(fov, ratio, near, far)
        camera.position.fromArray(pos)
        mainObj.add(camera)
    }

    {
        const { color, strenth, pos } = lightDataOne
        const light = new THREE.PointLight(color, strenth)
        light.position.fromArray(pos)
        mainObj.add(light)
    }

    {
      const { color, strenth, pos } = lightDataTwo
      const light = new THREE.PointLight(color, strenth)
      light.position.fromArray(pos)
      mainObj.add(light)
    }

    const update = data => {
        if (isButtonsDisabled) return;

        if (!keys) return;

        if (keys['up']) {

            mainObj.translateZ(-speed * data.count)
        }
        keys['left'] && (mainObj.rotation.y += (speedRot * data.count))
        keys['right'] && (mainObj.rotation.y -= (speedRot * data.count))
    }


    emitter.subscribe('keyEvent')(data => keys = data)
    emitter.subscribe('frameUpdate')(update)
    emitter.subscribe('toggleDialog')(val => isButtonsDisabled = val.isOpen)


    return {
        getObj: () => mainObj,
        getCamera: () => camera,
        setToPos: (x, y, z) => mainObj.position.set(x, y, z)
    }
}

