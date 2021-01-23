import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

export function load_urbancity (callback) {

    const arrAllBuildings = []
    const modelsCacheData = {}
    let loadedCountCacheObjects = 0
    let tolalCountCacheObjects = 0


    // create array houses props
    for (let key in items.purchases) {
        arrAllBuildings.push({
            key,
            data: items.purchases[key]
        })
    }

    // create objects cache for THREE.Meshes of repeated meshes of houses - set paths to files
    for (let i = 0; i < arrAllBuildings.length; i ++) {
        if (!modelsCacheData[arrAllBuildings[i].data.name]) {
            modelsCacheData[arrAllBuildings[i].data.name] = arrAllBuildings[i].data
            tolalCountCacheObjects ++
        }
    }

    // load THREE.Meshes and set meshes to cache
    for (let key in modelsCacheData) {
        const modelData = modelsCacheData[key]
        console.log(modelData)
        console.log('Loading model:',);
        new MTLLoader()
            .load('./'+modelData.textures, function(materials) {
                materials.preload();
                new OBJLoader()
                    .setMaterials(materials)
                    .load('./'+modelData.model, function(object) {
                        console.log('Object is loaded:', object);

                        object.traverse( function ( child )
                        {
                            if ( child.isMesh ) {
                                child.castShadow = false;
                                child.receiveShadow = false;
                            }
                        });
                        modelsCacheData[key].mesh = object

                        loadedCountCacheObjects ++;

                        if (tolalCountCacheObjects === loadedCountCacheObjects) {
                            console.log('loadingComplete')
                            // create all houses using cache

                            callback(modelsCacheData)
                            //createAllBuildingsFromCache(arrAllBuildings, modelsCacheData)
                        }
                    });
            });
    }
}


