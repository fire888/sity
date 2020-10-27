import { createDeviceResizer } from './util_deviceResizer'
import { KeyBoard } from './util_keyBoard'
import { createEmitter } from './util_emitter'
import { createFrameUpdater } from './util_frameUpater'

import { ASSETS_TO_LOAD } from './constants_elements'
//import { BRIDGE_HTML_DEC_CONFIG } from './constants_devBridgeHtmlSliders'

import { loadAssets } from './utils_loadAssets'
//import { prepareMeshesFromAssets } from './helper_prepareMeshesFromAssets'

import { createStudio } from './createStudio'
import { createPlayer } from './createPlayer'

//import { createSystemBridge } from './system_bridge'
//import { createSystemPlatforms } from './system_platforms'
//import { createSystemTerminals } from './system_terminals'
//import { createSystemTopWorld } from './system_topWorld'

//import { setItemToFloorsCollision } from './component_collisionFloor'
//import { setItemToWallCollision } from './component_collisionWalls'
//import { addItemToNearChecker } from './component_checkNearItem'
//import { createLevelBorder } from './component_createLevelBorders'
//import { bridgeParamsHtml } from './systemHtml_bridgeSliders'
//import { createDialog } from './systemHtml_dialog'
import { showStartButton } from './systemHtml_intro'
//import { createInfo } from './systemHtml_info'



createDeviceResizer()



const init = assets => {
    const emitter = createEmitter()
    createFrameUpdater(emitter)

    const studio = createStudio(emitter, assets)
    studio.addToScene(assets['sity'].scene)

    /** player */
    new KeyBoard(emitter)
    const player = createPlayer(emitter)
    studio.setCamera(player.getCamera())
    studio.addToScene(player.getObj())

    showStartButton(emitter)
}



window.addEventListener('load', () => 
    loadAssets(ASSETS_TO_LOAD)
        .then(init))

