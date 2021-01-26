import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

//import 'three/examples/js/loaders/DRACOLoader'

import { load_urbancity } from './loadUrban'
import { createStudio } from './createStudio'





var container, stats, controls;
var studio, raycaster, camera, scene, renderer, light;

var mixer;
var mouse = new THREE.Vector2();
var radius = 100, theta = 0;
var selectedObject;
var clock = new THREE.Clock();
var mixers = [];
var manager = new THREE.LoadingManager();
//var loader = new THREE.GLTFLoader();
var loader = new GLTFLoader();
var clicked_;
var mash = [];

var models_scene = function () {
    var json = null;
    $.ajax({
        'async': false,
        'url': "urbancity/custom/models/allinone/models.json",
        'success': function (data) {
            json = data;
            console.log('Loaded models file:', data);
        }
    });
    return json;
}();


init();
animate();

// Functions
//Function to add models by name from JSON models
function load_ground(model) {
    new MTLLoader(manager)
        .setPath(model.path)
        .setResourcePath(model.path)
        .load(model.name+'.mtl', function(materials) {
            materials.preload();
            new OBJLoader(manager)
                .setMaterials(materials)
                .setPath(model.path)
                .load(model.name+'.obj', function(object) {

                    object.traverse( function ( child )
                    {
                        if ( child.isMesh ) {
                            child.castShadow = false;
                            child.receiveShadow = false;

                        }

                    });

                    object.name = model.name;
                    scene.add(object);
                    object.scale.set(15, 15, 15);
                    object.position.x = 0;
                    object.position.z = 0;
                    object.rotation.y = 0;
                    //object.position.y = 300;
                    object.castShadow = false;
                    object.receiveShadow = false;
                    console.log('Loaded model:', model.name);

                });
        });
}

function load_houses(model) {
    new MTLLoader(manager)
        .setPath(model.path)
        .setResourcePath(model.path)
        .load(model.name+'.mtl', function(materials) {
            materials.preload();
            new OBJLoader(manager)
                .setMaterials(materials)
                .setPath(model.path)
                .load(model.name+'.obj', function(object) {

                    object.traverse( function ( child )
                    {
                        if ( child.isMesh ) {
                            child.castShadow = false;
                            child.receiveShadow = false;
                            mash.push(child);
                        }

                    });

                    object.name = model.name;
                    //scene.add(object);
                    object.scale.set(15, 15, 15);
                    object.position.x = 0;
                    object.position.z = 0;
                    object.rotation.y = 0;
                    //object.position.y = 300;
                    object.castShadow = false;
                    object.receiveShadow = false;
                    console.log('Loaded model:', model.name);


                });
        });
}


function load_model_positioned(model) {
    console.log('Loading model:', model);
    new THREE.MTLLoader(manager)
        .load('./'+model.textures, function(materials) {
            materials.preload();
            new OBJLoader(manager)
                .setMaterials(materials)
                .load('./'+model.model, function(object) {
                    console.log('Object is loaded:', object);

                    object.traverse( function ( child )
                    {
                        if ( child.isMesh ) {
                            child.castShadow = false;
                            child.receiveShadow = false;

                        }

                    });

                    object.name = model.name;
                    scene.add(object);
                    object.scale.set(15, 15, 15);
                    object.position.x = model.x;
                    object.position.z = model.z;
                    object.position.y = model.y;

                    //object.rotation.y = 200;



                    object.castShadow = true;
                    object.receiveShadow = true;
                    console.log('Loaded model:', model.name);
                    console.log('Removing a plane', model.plane);
                    remove_model(model.plane);
                });
        });
}


function load_mash_positioned(model) {
    console.log('Loading model:', model);
    model.uuid = Math.floor(new Date()).toString();
    model.scale.set(15, 15, 15);
    const mashes = model.clone();
    scene.add(mashes);
    console.log('Scene:', scene);
}


//Function to remove models by name
function remove_model(name) {
    var selectedObject = scene.getObjectByName(name);
    console.log('Trying to remove model:', scene, selectedObject, name);

    if (selectedObject !== undefined) {
        selectedObject.geometry.dispose();
        selectedObject.material.dispose();
        selectedObject.parent.remove( selectedObject );
        scene.remove( selectedObject );
        animate();
    } else {
        console.log('Plane removal postponed for:', name)
    }
}

function load_animation(name) {
    loader.load("./urbancity/custom/animations/"+name+".glb", function (gltf) {
        console.log('Got to animate:', gltf);
        let model = gltf.scene;

        let mixer = new THREE.AnimationMixer(model);
        mixer.name = name;
        mixers.push(mixer);

        gltf.animations.forEach((animation) => {
            const action = mixer.clipAction( animation );
            action.play();
        });

        model.scale.set(15, 15, 15);

        model.name = "animation_"+name;
        scene.add(model);

    });
}


function init(){
    studio = createStudio()
    camera = studio.camera
    scene = studio.scene
    renderer = studio.renderer

    load_ground(models_scene[0]);
    _.forEach(models_scene[0].animations, function (animation) {
        load_animation(animation.name);
    });
    load_houses(models_scene[1]);

    //Raycaster
    raycaster = new THREE.Raycaster();
    renderer.domElement.addEventListener( 'click', raycast, false );
    renderer.domElement.addEventListener( 'touchend', onDocumentTouchEnd, false );

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'touchmove', onDocumentTouchMove, false );
    window.addEventListener( 'resize', onWindowResize, false );


    manager.onLoad = function ( ) {

        console.log( 'Loading complete!');

        load_urbancity(modelsCacheData => {
            for (let key in items.purchases) {
                 const { name, x, y, z } = items.purchases[key]
                 const mesh = modelsCacheData[name].mesh.clone()
                 mesh.position.set(x, y, z)
                 mesh.uuid = Math.floor(new Date()).toString();
                 mesh.scale.set(15, 15, 15);
                 scene.add(mesh);
            }
        })


        $('#city').show();
        $('#loading_status').hide();

        console.log('Scene:', scene);
        onWindowResize();

        console.log('Mashes:', mash);

    };


    manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {

        $('#loading_text').html('Загрузка города ('+itemsLoaded+' из '+itemsTotal+')');
        //console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );

    };

    manager.onError = function ( url ) {

        console.log( 'Loading failed: ' + url  );

    };

    //THREE.DRACOLoader.setDecoderPath( 'js/threejs/' );
    //loader.setDRACOLoader( new THREE.DRACOLoader() )
}



function onWindowResize() {
    studio.resize()
    raycaster.setFromCamera( mouse, camera );
}



function animate() {
    requestAnimationFrame( animate );
    raycaster.setFromCamera( mouse, camera );
    studio.renderFrame()
    update_animation();
}


function raycast ( e ) {
    mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects( scene.children, true );

    for ( var i = 0; i < intersects.length; i++ ) {

        if (intersects[ i ].object.name !== "") {
            let name = intersects[ i ].object.name.split('_');

            if (name[0] === 'tobuild') {
                console.log(name, intersects[i].object);
                $('.menu-builder').attr('data-plane', intersects[i].object.name);

                intersects[i].object.geometry.computeBoundingBox();

                var boundingBox = intersects[i].object.geometry.boundingBox;

                var position = new THREE.Vector3();
                position.subVectors(boundingBox.max, boundingBox.min);
                //position.multiplyScalar( 1.5 );
                position.add(boundingBox.min);

                position.applyMatrix4(intersects[i].object.matrixWorld);

                //alert(position.x + ',' + position.y + ',' + position.z);


                $('.menu-builder').attr('data-x', position.x);
                $('.menu-builder').attr('data-y', position.y);
                $('.menu-builder').attr('data-z', position.z);


                if (_.size(items.basic) !== 0) {
                    $('#table-builder-living tr').remove();
                    $('#table-builder-business tr').remove();
                    $('#table-builder-other tr').remove();
                    $('#table-builder-special tr').remove();


                    _.forEach(items.basic, function (value, key) {
                        switch (value.category) {
                            case ('living') : {
                                $('#table-builder-living').append('<tr class="' + value.category + '">\n' +
                                    '<td><img class="" style="width: 80px; height: auto" src="' + value.icon + '" alt=""/></td>\n' +
                                    '<td><span>' + value.topic + '</span><br>\n' +
                                    '<span><img style="width: 25px; height: auto" class="pr-2" src="images/svg/svg_coins.svg" alt=""/>+' + value.increment_money + '/день</span><br>\n' +
                                    '<span><img style="width: 25px; height: auto" class="pr-2" src="images/svg/svg_laughter.svg" alt=""/>+' + value.increment_people + '/день</span><br>\n' +
                                    '<button class="btn action-2 xsm shadow text-center gradient-loader-blue" onclick=build_item("' + key + '","basic")>Построить за '+value.price+'</button>\n' +
                                    '</td>\n' +
                                    '</tr>');
                                break;
                            }
                            case ('business') : {
                                $('#table-builder-business').append('<tr class="' + value.category + '">\n' +
                                    '<td><img class="" style="width: 80px; height: auto" src="' + value.icon + '" alt=""/></td>\n' +
                                    '<td><span>' + value.topic + '</span><br>\n' +
                                    '<span><img style="width: 25px; height: auto" class="pr-2" src="images/svg/svg_coins.svg" alt=""/>+' + value.increment_money + '/день</span><br>\n' +
                                    '<span><img style="width: 25px; height: auto" class="pr-2" src="images/svg/svg_laughter.svg" alt=""/>+' + value.increment_people + '/день</span><br>\n' +
                                    '<button class="btn action-2 xsm shadow text-center gradient-loader-blue" onclick=build_item("' + key + '","basic")>Построить за '+value.price+'</button>\n' +
                                    '</td>\n' +
                                    '</tr>');
                                break;
                            }
                            case ('airport') : {
                                if (name[1] === 'airport') {
                                    $('#table-builder-special').append('<tr class="' + value.category + '">\n' +
                                        '<td><img class="" style="width: 80px; height: auto" src="' + value.icon + '" alt=""/></td>\n' +
                                        '<td><span>' + value.topic + '</span><br>\n' +
                                        '<span><img style="width: 25px; height: auto" class="pr-2" src="images/svg/svg_coins.svg" alt=""/>+' + value.increment_money + '/день</span><br>\n' +
                                        '<span><img style="width: 25px; height: auto" class="pr-2" src="images/svg/svg_laughter.svg" alt=""/>+' + value.increment_people + '/день</span><br>\n' +
                                        '<button class="btn action-2 xsm shadow text-center gradient-loader-blue" onclick=build_item("' + key + '","basic")>Построить за '+value.price+'</button>\n' +
                                        '</td>\n' +
                                        '</tr>');
                                }
                                break;
                            }
                            case ('sea') : {
                                if (name[1] === 'sea') {
                                    $('#table-builder-special').append('<tr class="' + value.category + '">\n' +
                                        '<td><img class="" style="width: 80px; height: auto" src="' + value.icon + '" alt=""/></td>\n' +
                                        '<td><span>' + value.topic + '</span><br>\n' +
                                        '<span><img style="width: 25px; height: auto" class="pr-2" src="images/svg/svg_coins.svg" alt=""/>+' + value.increment_money + '/день</span><br>\n' +
                                        '<span><img style="width: 25px; height: auto" class="pr-2" src="images/svg/svg_laughter.svg" alt=""/>+' + value.increment_people + '/день</span><br>\n' +
                                        '<button class="btn action-2 xsm shadow text-center gradient-loader-blue" onclick=build_item("' + key + '","basic")>Построить за '+value.price+'</button>\n' +
                                        '</td>\n' +
                                        '</tr>');
                                }
                                break;
                            }
                            case ('factory') : {
                                if (name[1] === 'factory') {
                                    $('#table-builder-special').append('<tr class="' + value.category + '">\n' +
                                        '<td><img class="" style="width: 80px; height: auto" src="' + value.icon + '" alt=""/></td>\n' +
                                        '<td><span>' + value.topic + '</span><br>\n' +
                                        '<span><img style="width: 25px; height: auto" class="pr-2" src="images/svg/svg_coins.svg" alt=""/>+' + value.increment_money + '/день</span><br>\n' +
                                        '<span><img style="width: 25px; height: auto" class="pr-2" src="images/svg/svg_laughter.svg" alt=""/>+' + value.increment_people + '/день</span><br>\n' +
                                        '<button class="btn action-2 xsm shadow text-center gradient-loader-blue" onclick=build_item("' + key + '","basic")>Построить за '+value.price+'</button>\n' +
                                        '</td>\n' +
                                        '</tr>');
                                }
                                break;
                            }
                            case ('railway') : {
                                if (name[1] === 'railway') {
                                    $('#table-builder-special').append('<tr class="' + value.category + '">\n' +
                                        '<td><img class="" style="width: 80px; height: auto" src="' + value.icon + '" alt=""/></td>\n' +
                                        '<td><span>' + value.topic + '</span><br>\n' +
                                        '<span><img style="width: 25px; height: auto" class="pr-2" src="images/svg/svg_coins.svg" alt=""/>+' + value.increment_money + '/день</span><br>\n' +
                                        '<span><img style="width: 25px; height: auto" class="pr-2" src="images/svg/svg_laughter.svg" alt=""/>+' + value.increment_people + '/день</span><br>\n' +
                                        '<button class="btn action-2 xsm shadow text-center gradient-loader-blue" onclick=build_item("' + key + '","basic")>Построить за '+value.price+'</button>\n' +
                                        '</td>\n' +
                                        '</tr>');
                                }
                                break;
                            }
                            default : {
                                $('#table-builder-other').append('<tr class="' + value.category + '">\n' +
                                    '<td><img class="" style="width: 80px; height: auto" src="' + value.icon + '" alt=""/></td>\n' +
                                    '<td><span>' + value.topic + '</span><br>\n' +
                                    '<span><img style="width: 25px; height: auto" class="pr-2" src="images/svg/svg_coins.svg" alt=""/>+' + value.increment_money + '/день</span><br>\n' +
                                    '<span><img style="width: 25px; height: auto" class="pr-2" src="images/svg/svg_laughter.svg" alt=""/>+' + value.increment_people + '/день</span><br>\n' +
                                    '<button class="btn action-2 xsm shadow text-center gradient-loader-blue" onclick=build_item("' + key + '","basic")>Построить за '+value.price+'</button>\n' +
                                    '</td>\n' +
                                    '</tr>');
                                break;
                            }
                        }
                    })
                }


                if (name[1] === 'airport') {
                    $(".tab-living").hide();
                    $(".tab-business").hide();
                    $(".tab-other").hide();
                    $(".tab-special").show();
                    $('.tab-special a').click();
                } else if (name[1] === 'sea') {
                    $(".tab-living").hide();
                    $(".tab-business").hide();
                    $(".tab-other").hide();
                    $(".tab-special").show();
                    $('.tab-special a').click();
                } else if (name[1] === 'factory') {
                    $(".tab-living").hide();
                    $(".tab-business").hide();
                    $(".tab-other").hide();
                    $(".tab-special").show();
                    $('.tab-special a').click();
                } else if (name[1] === 'railway') {
                    $(".tab-living").hide();
                    $(".tab-business").hide();
                    $(".tab-other").hide();
                    $(".tab-special").show();
                    $('.tab-special a').click();
                } else {
                    $(".tab-living").show();
                    $(".tab-business").show();
                    $(".tab-other").show();
                    $(".tab-special").hide();
                    $('.tab-living a').click();
                }

                $('.menu-builder').modal('show');

            }
        }

    }

}

function onDocumentTouchEnd ( e ) {
    event = e.changedTouches[0];
    var rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ( ( event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = - ( ( event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects( scene.children, true );

    for ( var i = 0; i < intersects.length; i++ ) {

        if (intersects[ i ].object.name !== "") {
            let name = intersects[ i ].object.name.split('_');

            if (name[0] === 'tobuild') {
                console.log(name, intersects[i].object);
                $('.menu-builder').attr('data-plane', intersects[i].object.name);
                intersects[i].object.geometry.computeBoundingBox();

                var boundingBox = intersects[i].object.geometry.boundingBox;

                var position = new THREE.Vector3();
                position.subVectors(boundingBox.max, boundingBox.min);
                //position.multiplyScalar( 1.5 );
                position.add(boundingBox.min);

                position.applyMatrix4(intersects[i].object.matrixWorld);

                //alert(position.x + ',' + position.y + ',' + position.z);


                $('.menu-builder').attr('data-x', position.x);
                $('.menu-builder').attr('data-y', position.y);
                $('.menu-builder').attr('data-z', position.z);


                if (_.size(items.basic) !== 0) {
                    $('#table-builder-living tr').remove();
                    $('#table-builder-business tr').remove();
                    $('#table-builder-other tr').remove();
                    $('#table-builder-special tr').remove();


                    _.forEach(items.basic, function (value, key) {
                        switch (value.category) {
                            case ('living') : {
                                $('#table-builder-living').append('<tr class="' + value.category + '">\n' +
                                    '<td><img class="" style="width: 80px; height: auto" src="' + value.icon + '" alt=""/></td>\n' +
                                    '<td><span>' + value.topic + '</span><br>\n' +
                                    '<span><img style="width: 25px; height: auto" class="pr-2" src="images/svg/svg_coins.svg" alt=""/>+' + value.increment_money + '/день</span><br>\n' +
                                    '<span><img style="width: 25px; height: auto" class="pr-2" src="images/svg/svg_laughter.svg" alt=""/>+' + value.increment_people + '/день</span><br>\n' +
                                    '<button class="btn action-2 xsm shadow text-center gradient-loader-blue" onclick=build_item("' + key + '","basic")>Построить за '+value.price+'</button>\n' +
                                    '</td>\n' +
                                    '</tr>');
                                break;
                            }
                            case ('business') : {
                                $('#table-builder-business').append('<tr class="' + value.category + '">\n' +
                                    '<td><img class="" style="width: 80px; height: auto" src="' + value.icon + '" alt=""/></td>\n' +
                                    '<td><span>' + value.topic + '</span><br>\n' +
                                    '<span><img style="width: 25px; height: auto" class="pr-2" src="images/svg/svg_coins.svg" alt=""/>+' + value.increment_money + '/день</span><br>\n' +
                                    '<span><img style="width: 25px; height: auto" class="pr-2" src="images/svg/svg_laughter.svg" alt=""/>+' + value.increment_people + '/день</span><br>\n' +
                                    '<button class="btn action-2 xsm shadow text-center gradient-loader-blue" onclick=build_item("' + key + '","basic")>Построить за '+value.price+'</button>\n' +
                                    '</td>\n' +
                                    '</tr>');
                                break;
                            }
                            case ('airport') : {
                                if (name[1] === 'airport') {
                                    $('#table-builder-special').append('<tr class="' + value.category + '">\n' +
                                        '<td><img class="" style="width: 80px; height: auto" src="' + value.icon + '" alt=""/></td>\n' +
                                        '<td><span>' + value.topic + '</span><br>\n' +
                                        '<span><img style="width: 25px; height: auto" class="pr-2" src="images/svg/svg_coins.svg" alt=""/>+' + value.increment_money + '/день</span><br>\n' +
                                        '<span><img style="width: 25px; height: auto" class="pr-2" src="images/svg/svg_laughter.svg" alt=""/>+' + value.increment_people + '/день</span><br>\n' +
                                        '<button class="btn action-2 xsm shadow text-center gradient-loader-blue" onclick=build_item("' + key + '","basic")>Построить за '+value.price+'</button>\n' +
                                        '</td>\n' +
                                        '</tr>');
                                }
                                break;
                            }
                            case ('sea') : {
                                if (name[1] === 'sea') {
                                    $('#table-builder-special').append('<tr class="' + value.category + '">\n' +
                                        '<td><img class="" style="width: 80px; height: auto" src="' + value.icon + '" alt=""/></td>\n' +
                                        '<td><span>' + value.topic + '</span><br>\n' +
                                        '<span><img style="width: 25px; height: auto" class="pr-2" src="images/svg/svg_coins.svg" alt=""/>+' + value.increment_money + '/день</span><br>\n' +
                                        '<span><img style="width: 25px; height: auto" class="pr-2" src="images/svg/svg_laughter.svg" alt=""/>+' + value.increment_people + '/день</span><br>\n' +
                                        '<button class="btn action-2 xsm shadow text-center gradient-loader-blue" onclick=build_item("' + key + '","basic")>Построить за '+value.price+'</button>\n' +
                                        '</td>\n' +
                                        '</tr>');
                                }
                                break;
                            }
                            case ('factory') : {
                                if (name[1] === 'factory') {
                                    $('#table-builder-special').append('<tr class="' + value.category + '">\n' +
                                        '<td><img class="" style="width: 80px; height: auto" src="' + value.icon + '" alt=""/></td>\n' +
                                        '<td><span>' + value.topic + '</span><br>\n' +
                                        '<span><img style="width: 25px; height: auto" class="pr-2" src="images/svg/svg_coins.svg" alt=""/>+' + value.increment_money + '/день</span><br>\n' +
                                        '<span><img style="width: 25px; height: auto" class="pr-2" src="images/svg/svg_laughter.svg" alt=""/>+' + value.increment_people + '/день</span><br>\n' +
                                        '<button class="btn action-2 xsm shadow text-center gradient-loader-blue" onclick=build_item("' + key + '","basic")>Построить за '+value.price+'</button>\n' +
                                        '</td>\n' +
                                        '</tr>');
                                }
                                break;
                            }
                            case ('railway') : {
                                if (name[1] === 'railway') {
                                    $('#table-builder-special').append('<tr class="' + value.category + '">\n' +
                                        '<td><img class="" style="width: 80px; height: auto" src="' + value.icon + '" alt=""/></td>\n' +
                                        '<td><span>' + value.topic + '</span><br>\n' +
                                        '<span><img style="width: 25px; height: auto" class="pr-2" src="images/svg/svg_coins.svg" alt=""/>+' + value.increment_money + '/день</span><br>\n' +
                                        '<span><img style="width: 25px; height: auto" class="pr-2" src="images/svg/svg_laughter.svg" alt=""/>+' + value.increment_people + '/день</span><br>\n' +
                                        '<button class="btn action-2 xsm shadow text-center gradient-loader-blue" onclick=build_item("' + key + '","basic")>Построить за '+value.price+'</button>\n' +
                                        '</td>\n' +
                                        '</tr>');
                                }
                                break;
                            }
                            default : {
                                $('#table-builder-other').append('<tr class="' + value.category + '">\n' +
                                    '<td><img class="" style="width: 80px; height: auto" src="' + value.icon + '" alt=""/></td>\n' +
                                    '<td><span>' + value.topic + '</span><br>\n' +
                                    '<span><img style="width: 25px; height: auto" class="pr-2" src="images/svg/svg_coins.svg" alt=""/>+' + value.increment_money + '/день</span><br>\n' +
                                    '<span><img style="width: 25px; height: auto" class="pr-2" src="images/svg/svg_laughter.svg" alt=""/>+' + value.increment_people + '/день</span><br>\n' +
                                    '<button class="btn action-2 xsm shadow text-center gradient-loader-blue" onclick=build_item("' + key + '","basic")>Построить за '+value.price+'</button>\n' +
                                    '</td>\n' +
                                    '</tr>');
                                break;
                            }
                        }
                    })
                }


                if (name[1] === 'airport') {
                    $(".tab-living").hide();
                    $(".tab-business").hide();
                    $(".tab-other").hide();
                    $(".tab-special").show();
                    $('.tab-special a').click();
                } else if (name[1] === 'sea') {
                    $(".tab-living").hide();
                    $(".tab-business").hide();
                    $(".tab-other").hide();
                    $(".tab-special").show();
                    $('.tab-special a').click();
                } else if (name[1] === 'factory') {
                    $(".tab-living").hide();
                    $(".tab-business").hide();
                    $(".tab-other").hide();
                    $(".tab-special").show();
                    $('.tab-special a').click();
                } else if (name[1] === 'railway') {
                    $(".tab-living").hide();
                    $(".tab-business").hide();
                    $(".tab-other").hide();
                    $(".tab-special").show();
                    $('.tab-special a').click();
                } else {
                    $(".tab-living").show();
                    $(".tab-business").show();
                    $(".tab-other").show();
                    $(".tab-special").hide();
                    $('.tab-living a').click();
                }

                $('.menu-builder').modal('show');

            }
        }

    }

}



function onDocumentMouseMove( event ) {

    event.preventDefault();

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    raycaster.setFromCamera( mouse, camera );

}

function onDocumentTouchMove( event ) {

    event.preventDefault();

    event = event.changedTouches[0];
    var rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ( ( event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = - ( ( event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera( mouse, camera );

}

function update_animation() {
    const delta = clock.getDelta();
    for ( const mixer of mixers ) {
        mixer.update( delta );
    }
}