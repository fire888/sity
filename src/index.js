//import { createDeviceResizer } from './util_deviceResizer'
//import { KeyBoard } from './util_keyBoard'
import { createEmitter } from './util_emitter'
import { createFrameUpdater } from './util_frameUpater'

import { ASSETS_TO_LOAD } from './constants_elements'

import { loadAssets } from './utils_loadAssets'

import { createStudio } from './createStudio'
import { createPlayer } from './createPlayer'
//import { createTopView } from './topCameraView'

import { showStartButton } from './systemHtml_intro'
import { createTown } from './sityTown'




//createDeviceResizer()



const init = assets => {
    const emitter = createEmitter()
    createFrameUpdater(emitter)

    const studio = createStudio(emitter, assets)
    const t = createTown(assets['sity'].scene)
    //studio.addToScene(assets['sity'].scene)
    studio.addToScene(t)

    /** player */
   // new KeyBoard(emitter)
    const player = createPlayer(emitter)
    //studio.setCamera(player.getCamera())
    studio.addToScene(player.getObj())
    //const topView = createTopView()
    //studio.setCamera(topView.getCamera())
    //studio.addToScene(topView.getObj())

    showStartButton(emitter)
}



window.addEventListener('load', () => 
    loadAssets(ASSETS_TO_LOAD)
        .then(init))

