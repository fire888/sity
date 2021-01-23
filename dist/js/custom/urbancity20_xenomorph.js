
function load_urbancity() {

    const arrAllBuildings = []
    const modelsCacheData = {}
    let loadedCountCacheObjects = 0
    let tolalCountCacheObjects = 0


    for (let key in items.purchases) {
        arrAllBuildings.push({
            key,
            data: items.purchases[key]
        })
    }

    for (let i = 0; i < arrAllBuildings.length; i ++) {
        if (!modelsCacheData[arrAllBuildings[i].data.name]) {
            modelsCacheData[arrAllBuildings[i].data.name] = arrAllBuildings[i].data
            tolalCountCacheObjects ++
        }
    }

    for (let key in modelsCacheData) {
            const modelData = modelsCacheData[key]
            console.log(modelData)
            console.log('Loading model:',);
            new THREE.MTLLoader()
                .load('./'+modelData.textures, function(materials) {
                    materials.preload();
                    new THREE.OBJLoader()
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
                                createAllBuildingsFromCache(arrAllBuildings, modelsCacheData)
                            }
                        });
                });
    }
}


function createAllBuildingsFromCache (arrAllBuildings, modelsCacheData) {
    for (let dataHouse of arrAllBuildings) {
        const { name, x, y, z } = dataHouse.data
        const mesh = modelsCacheData[name].mesh.clone()
        mesh.position.set(x, y, z)
        mesh.uuid = Math.floor(new Date()).toString();
        mesh.scale.set(15, 15, 15);
        scene.add(mesh);
    }
}
