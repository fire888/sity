alert('aanhtyrthrt')
//console.log('mouse', mouse)


// import { createDeviceResizer } from './util_deviceResizer'
// import { KeyBoard } from './util_keyBoard'
// import { createEmitter } from './util_emitter'
// import { createFrameUpdater } from './util_frameUpater'
//
// import { ASSETS_TO_LOAD } from './constants_elements'
//
// import { loadAssets } from './utils_loadAssets'
//
// import { createStudio } from './createStudio'
// import { createPlayer } from './createPlayer'
//
// import { showStartButton } from './systemHtml_intro'
// import { createTown } from './sityTown'
//
//
// // https://threejs.org/examples/#webgl_shadowmap_pcss
// // https://threejs.org/examples/#webgl_lights_hemisphere
// // https://threejs.org/examples/?q=shadow#webgl_materials_lightmap
//
//
//
// const init = assets => {
//     const emitter = createEmitter()
//     createFrameUpdater(emitter)
//     createDeviceResizer()
//
//     const studio = createStudio(emitter, assets)
//     const town = createTown(assets['sity'].scene)
//     studio.addToScene(town)
//
//     /** player */
//     new KeyBoard(emitter)
//     const player = createPlayer(emitter)
//     studio.setPlayerCamera(player.getCamera())
//     studio.addToScene(player.getObj())
//
//     showStartButton(emitter)
// }
//
//
//
// window.addEventListener('load', () => loadAssets(ASSETS_TO_LOAD).then(init))
//
