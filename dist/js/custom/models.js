var container, stats, controls;
var raycaster, camera, scene, renderer, light;

var mixer;
var mouse = new THREE.Vector2();
var radius = 100, theta = 0;
var selectedObject;
var clock = new THREE.Clock();
var mixers = [];
var manager = new THREE.LoadingManager();
var loader = new THREE.GLTFLoader();
var clicked_;

var models_scene = function () {
    var json = null;
    $.ajax({
        'async': false,
        'url': "urbancity/custom/models/scene/models.json",
        'success': function (data) {
            json = data;
            console.log('Loaded models file:', data);
        }
    });
    return json;
}();


/*var models_quartals_0 = function () {
    var json = null;
    $.ajax({
        'async': false,
        'url': "urbancity/custom/models/quartal_0/models.json",
        'success': function (data) {
            json = data;
            console.log('Loaded models file:', data);
        }
    });
    return json;
}();


var models_quartals_1 = function () {
    var json = null;
    $.ajax({
        'async': false,
        'url': "urbancity/custom/models/quartal_1/models.json",
        'success': function (data) {
            json = data;
            console.log('Loaded models file:', data);
        }
    });
    return json;
}();


var models_quartals_2 = function () {
    var json = null;
    $.ajax({
        'async': false,
        'url': "urbancity/custom/models/quartal_2/models.json",
        'success': function (data) {
            json = data;
            console.log('Loaded models file:', data);
        }
    });
    return json;
}();


var models_quartals_3 = function () {
    var json = null;
    $.ajax({
        'async': false,
        'url': "urbancity/custom/models/quartal_3/models.json",
        'success': function (data) {
            json = data;
            console.log('Loaded models file:', data);
        }
    });
    return json;
}();*/


init();
animate();

// Functions
//Function to add models by name from JSON models
function load_ground(model) {
    new THREE.MTLLoader(manager)
        .setPath(model.path)
        .setResourcePath(model.path)
        .load(model.name+'.mtl', function(materials) {
            materials.preload();
            new THREE.OBJLoader(manager)
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

//Function to add models by name from JSON models

function load_model(model) {
    new THREE.MTLLoader(manager)
        .setPath(model.path)
        .setResourcePath(model.path)
        .load(model.name+'.mtl', function(materials) {
            materials.preload();
            new THREE.OBJLoader(manager)
                .setMaterials(materials)
                .setPath(model.path)
                .load(model.name+'.obj', function(object) {

                    object.traverse( function ( child )
                    {
                        if ( child.isMesh ) {
                            child.castShadow = true;
                            child.receiveShadow = true;

                        }

                    });

                    object.name = model.name;
                    scene.add(object);
                    object.scale.set(10, 10, 10);
                    object.position.x = 0;
                    object.position.z = -300;
                    object.position.y = -20;
                    object.castShadow = true;
                    object.receiveShadow = true;
                    console.log('Loaded model:', model.name);

                });
        });
}


function load_model_positioned(model) {
    console.log('Loading model:', model);
    new THREE.MTLLoader(manager)
        .load('./'+model.textures, function(materials) {
            materials.preload();
            new THREE.OBJLoader(manager)
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



                    object.castShadow = false;
                    object.receiveShadow = false;
                    console.log('Loaded model:', model.name);
                    console.log('Removing a plane', model.plane);
                    remove_model(model.plane);
                });
        });
}



//Function to remove models by name
function remove_model(name) {
    var selectedObject = scene.getObjectByName(name);
    console.log('Trying to remove model:', scene, selectedObject, name);

    selectedObject.geometry.dispose();
    selectedObject.material.dispose();
    selectedObject.parent.remove( selectedObject );
    scene.remove( selectedObject );
    //animate();
}

function remove_animation(name) {
    var selectedObject = scene.getObjectByName("animation_"+name);
    scene.remove( selectedObject );
    console.log(mixers);
    let index = _.findIndex(mixers, {"name" : name});
    mixers.splice(index, 1);
    console.log(mixers);
    //animate();
}

function load_animation(name) {
    loader.load("/urbancity/custom/animations/"+name+".glb", function (gltf) {
        console.log('Got to animate:', gltf);
        let model = gltf.scene;

        let mixer = new THREE.AnimationMixer(model);
        mixer.name = name;
        mixers.push(mixer);

        gltf.animations.forEach((animation) => {
            const action = mixer.clipAction( animation );
            action.play();
        });

        model.scale.set(7, 7, 7);
        model.position.set(0, -20, -300);

        model.name = "animation_"+name;
        scene.add(model);

    });
}

function load_event(name) {
    loader.load("/urbancity/custom/events/"+name+".glb", function (gltf) {
        console.log('Got to animate:', gltf);
        let model = gltf.scene;

        let mixer = new THREE.AnimationMixer(model);
        mixer.name = name;
        mixers.push(mixer);

        gltf.animations.forEach((animation) => {
            const action = mixer.clipAction( animation );
            action.play();
        });

        model.scale.set(7, 7, 7);
        model.position.set(0, -20, -300);

        model.name = "animation_"+name;
        scene.add(model);

    });
}

function init(){
    camera = new THREE.PerspectiveCamera( 25, window.innerWidth / window.innerHeight, 1, 10000 );
    //965.1431661754809 444.48798524668956 1043.8103908570088
    camera.position.set( 1133.3833013186731, 651.9369853120578, 1133.4263294071484 ).setLength(700);
    camera.rotation.set(-0.751582872929487, 0.6294554469014992, 0.5029801008660981);
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x5B96E7 );
    scene.fog = new THREE.FogExp2( 0xFFEECD, 0.0005 );

    light = new THREE.HemisphereLight( 0xffffff, 0x444444 );
    light.position.set( 0, 1200, 0 );
    scene.add( light );

    light = new THREE.DirectionalLight( '#feffe1' );
    light.position.set( 100, 400, 100 );
    light.castShadow = false;
    light.shadow.camera.top =1080;
    light.shadow.camera.bottom = -1800;
    light.shadow.camera.left = - 1820;
    light.shadow.camera.right = 1820;

//Set up shadow properties for the light
    light.shadow.mapSize.width = 1000;  // default
    light.shadow.mapSize.height = 520; // default
    light.shadow.camera.near = 1;    // default
    light.shadow.camera.far = 500;     // default

    /*scene.add( new THREE.CameraHelper( light.shadow.camera ) );
    var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
    mesh.rotation.x = - Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add( mesh );

    var grid = new THREE.GridHelper( 2000, 20, 0x000000, 0x000000 );
    grid.material.opacity = 0.1;
    grid.material.transparent = true;
    scene.add( grid );*/

    scene.add( light );


    //Loading ground
    load_ground(models_scene[0]);


    //Loading planes
    //load_ground(models_scene[1]);

    //Loading quartals states
    /*_.forEach(city, function (state, quartal) {
        switch (state) {
            case (0) : {
                console.log('Loading quartal [0]...', quartal, state);
                let model = _.find(models_quartals_0, {name : quartal});
                console.log(model);

                load_model(model);
                _.forEach(model.animations, function (animation) {
                    load_animation(animation.name);
                });
                break;
            }

            case (1) : {
                console.log('Loading quartal [1]...', quartal, state);
                let model = _.find(models_quartals_1, {name : quartal});
                console.log(model);

                load_model(model);
                _.forEach(model.animations, function (animation) {
                    load_animation(animation.name);
                });
                break;
            }

            case (2) : {
                console.log('Loading quartal [2]...', quartal, state);
                let model = _.find(models_quartals_2, {name : quartal});
                console.log(model);

                load_model(model);
                _.forEach(model.animations, function (animation) {
                    load_animation(animation.name);
                });
                break;
            }

            case (3) : {
                console.log('Loading quartal [3]...', quartal, state);
                let model = _.find(models_quartals_3, {name : quartal});
                console.log(model);

                load_model(model);
                _.forEach(model.animations, function (animation) {
                    load_animation(animation.name);
                });
                break;
            }
        }
    });*/




    renderer = new THREE.WebGLRenderer( { antialias: false } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = false;


    document.getElementById('city').appendChild(renderer.domElement);

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.enablePan = true;
    controls.minPolarAngle = THREE.Math.degToRad(25);
    controls.maxPolarAngle = THREE.Math.degToRad(70);
    controls.minDistance = 350;
    controls.maxDistance = 1000;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;
    controls.target.set( 0, 100, 0 );
    controls.update();


    //Raycaster
    raycaster = new THREE.Raycaster();
    renderer.domElement.addEventListener( 'click', raycast, false );
    renderer.domElement.addEventListener( 'touchend', onDocumentTouchEnd, false );

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'touchmove', onDocumentTouchMove, false );
    window.addEventListener( 'resize', onWindowResize, false );


    manager.onLoad = function ( ) {

        console.log( 'Loading complete!');
        $('#city').show();
        $('#loading_status').hide();

        console.log('Scene:', scene);
        onWindowResize();

    };


    manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {

        $('#loading_text').html('Загрузка города ('+itemsLoaded+' из '+itemsTotal+')');
        //console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );

    };

    manager.onError = function ( url ) {

        console.log( 'Loading failed: ' + url  );

    };
}



function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    raycaster.setFromCamera( mouse, camera );
    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

    requestAnimationFrame( animate );

    raycaster.setFromCamera( mouse, camera );

    renderer.render( scene, camera );

    update_animation();


}

let can_click = true;

function raycast ( e ) {
    mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects( scene.children, true );

    for ( var i = 0; i < intersects.length; i++ ) {

        if (intersects[ i ].object.name !== "") {
            let name = intersects[ i ].object.name.split('_');

            if (name[0] === 'tobuild') {
                console.log(name, intersects[ i ].object);
                $('.menu-builder').attr('data-plane', intersects[ i ].object.name);

                intersects[ i ].object.geometry.computeBoundingBox();

                var boundingBox = intersects[ i ].object.geometry.boundingBox;

                var position = new THREE.Vector3();
                position.subVectors( boundingBox.max, boundingBox.min );
                //position.multiplyScalar( 1.5 );
                position.add( boundingBox.min );

                position.applyMatrix4( intersects[ i ].object.matrixWorld );

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
                                $('#table-builder-living').append('<tr class="'+value.category+'">\n' +
                                    '<td><img class="" style="width: 80px; height: auto" src="'+value.icon+'" alt=""/></td>\n' +
                                    '<td><span>'+value.topic+'</span><br><span>'+value.description+'</span><br>\n' +
                                    '<button class="btn action-2 xsm shadow text-center gradient-loader-blue" onclick=build_item("'+key+'","basic")>Построить</button>\n' +
                                    '</td>\n' +
                                    '</tr>');
                                break;
                            }
                            case ('business') : {
                                $('#table-builder-business').append('<tr class="'+value.category+'">\n' +
                                    '<td><img class="" style="width: 80px; height: auto" src="'+value.icon+'" alt=""/></td>\n' +
                                    '<td><span>'+value.topic+'</span><br><span>'+value.description+'</span><br>\n' +
                                    '<button class="btn action-2 xsm shadow text-center gradient-loader-blue" onclick=build_item("'+key+'","basic")>Построить</button>\n' +
                                    '</td>\n' +
                                    '</tr>');
                                break;
                            }
                            case ('airport') : {
                                if (name[1] === 'airport') {
                                    $('#table-builder-special').append('<tr class="'+value.category+'">\n' +
                                        '<td><img class="" style="width: 80px; height: auto" src="'+value.icon+'" alt=""/></td>\n' +
                                        '<td><span>'+value.topic+'</span><br><span>'+value.description+'</span><br>\n' +
                                        '<button class="btn action-2 xsm shadow text-center gradient-loader-blue" onclick=build_item("'+key+'","basic")>Построить</button>\n' +
                                        '</td>\n' +
                                        '</tr>');
                                }
                                break;
                            }
                            case ('port') : {
                                if (name[1] === 'port') {
                                    $('#table-builder-special').append('<tr class="'+value.category+'">\n' +
                                        '<td><img class="" style="width: 80px; height: auto" src="'+value.icon+'" alt=""/></td>\n' +
                                        '<td><span>'+value.topic+'</span><br><span>'+value.description+'</span><br>\n' +
                                        '<button class="btn action-2 xsm shadow text-center gradient-loader-blue" onclick=build_item("'+key+'","basic")>Построить</button>\n' +
                                        '</td>\n' +
                                        '</tr>');
                                }
                                break;
                            }
                            case ('factory') : {
                                if (name[1] === 'factory') {
                                    $('#table-builder-special').append('<tr class="'+value.category+'">\n' +
                                        '<td><img class="" style="width: 80px; height: auto" src="'+value.icon+'" alt=""/></td>\n' +
                                        '<td><span>'+value.topic+'</span><br><span>'+value.description+'</span><br>\n' +
                                        '<button class="btn action-2 xsm shadow text-center gradient-loader-blue" onclick=build_item("'+key+'","basic")>Построить</button>\n' +
                                        '</td>\n' +
                                        '</tr>');
                                }
                                break;
                            }
                            case ('railway') : {
                                if (name[1] === 'railway') {
                                    $('#table-builder-special').append('<tr class="'+value.category+'">\n' +
                                        '<td><img class="" style="width: 80px; height: auto" src="'+value.icon+'" alt=""/></td>\n' +
                                        '<td><span>'+value.topic+'</span><br><span>'+value.description+'</span><br>\n' +
                                        '<button class="btn action-2 xsm shadow text-center gradient-loader-blue" onclick=build_item("'+key+'","basic")>Построить</button>\n' +
                                        '</td>\n' +
                                        '</tr>');
                                }
                                break;
                            }
                            default : {
                                $('#table-builder-other').append('<tr class="'+value.category+'">\n' +
                                    '<td><img class="" style="width: 80px; height: auto" src="'+value.icon+'" alt=""/></td>\n' +
                                    '<td><span>'+value.topic+'</span><br><span>'+value.description+'</span><br>\n' +
                                    '<button class="btn action-2 xsm shadow text-center gradient-loader-blue" onclick=build_item("'+key+'","basic")>Построить</button>\n' +
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
                } else if (name[1] === 'port') {
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


                /*let item = items.basic.airport;
                item.x = position.x+item.offset_x;
                item.y = position.y;
                item.z = position.z+item.offset_z;

                console.log("Camera position is:", camera.position.x, camera.position.y, camera.position.z)
                console.log("Camera rotation is:", camera.rotation.x, camera.rotation.y, camera.rotation.z)

                purchase(item, function (done) {
                    if (done.status === 'processed') {
                        console.log('Purchased successfully!');
                        load_model_positioned(item);
                        $('#money_badge').html(done.balance);
                    }
                });*/
            }

            /*if (can_click) {
                can_click = false;

                find_click(name[0], function (clicked) {
                    if (clicked !== null) {
                        console.log('Clicked quartal:', clicked);

                        $('.quartal-title').html(clicked.description);
                        $('#quartal-badge').fadeIn(500);
                        clicked_ = clicked;


                        setTimeout(function () {
                            $('#quartal-badge').fadeOut(1000);
                        },15000);

                        var event = new CustomEvent('mapclick', {"detail" : {"quartal":clicked.quartal}});
                        document.dispatchEvent(event);
                    }

                    setTimeout(function () {
                        can_click = true;
                    },1000);
                });
            }*/

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
                console.log(name, intersects[ i ].object);
                $('.menu-builder').attr('data-plane', intersects[ i ].object.name);
                intersects[ i ].object.geometry.computeBoundingBox();

                var boundingBox = intersects[ i ].object.geometry.boundingBox;

                var position = new THREE.Vector3();
                position.subVectors( boundingBox.max, boundingBox.min );
                //position.multiplyScalar( 1.5 );
                position.add( boundingBox.min );

                position.applyMatrix4( intersects[ i ].object.matrixWorld );

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
                                $('#table-builder-living').append('<tr class="'+value.category+'">\n' +
                                    '<td><img class="" style="width: 80px; height: auto" src="'+value.icon+'" alt=""/></td>\n' +
                                    '<td><span>'+value.topic+'</span><br><span>'+value.description+'</span><br>\n' +
                                    '<button class="btn action-2 xsm shadow text-center gradient-loader-blue" onclick=build_item("'+key+'","basic")>Построить</button>\n' +
                                    '</td>\n' +
                                    '</tr>');
                                break;
                            }
                            case ('business') : {
                                $('#table-builder-business').append('<tr class="'+value.category+'">\n' +
                                    '<td><img class="" style="width: 80px; height: auto" src="'+value.icon+'" alt=""/></td>\n' +
                                    '<td><span>'+value.topic+'</span><br><span>'+value.description+'</span><br>\n' +
                                    '<button class="btn action-2 xsm shadow text-center gradient-loader-blue" onclick=build_item("'+key+'","basic")>Построить</button>\n' +
                                    '</td>\n' +
                                    '</tr>');
                                break;
                            }
                            case ('airport') : {
                                if (name[1] === 'airport') {
                                    $('#table-builder-special').append('<tr class="'+value.category+'">\n' +
                                        '<td><img class="" style="width: 80px; height: auto" src="'+value.icon+'" alt=""/></td>\n' +
                                        '<td><span>'+value.topic+'</span><br><span>'+value.description+'</span><br>\n' +
                                        '<button class="btn action-2 xsm shadow text-center gradient-loader-blue" onclick=build_item("'+key+'","basic")>Построить</button>\n' +
                                        '</td>\n' +
                                        '</tr>');
                                }
                                break;
                            }
                            case ('port') : {
                                if (name[1] === 'port') {
                                    $('#table-builder-special').append('<tr class="'+value.category+'">\n' +
                                        '<td><img class="" style="width: 80px; height: auto" src="'+value.icon+'" alt=""/></td>\n' +
                                        '<td><span>'+value.topic+'</span><br><span>'+value.description+'</span><br>\n' +
                                        '<button class="btn action-2 xsm shadow text-center gradient-loader-blue" onclick=build_item("'+key+'","basic")>Построить</button>\n' +
                                        '</td>\n' +
                                        '</tr>');
                                }
                                break;
                            }
                            case ('factory') : {
                                if (name[1] === 'factory') {
                                    $('#table-builder-special').append('<tr class="'+value.category+'">\n' +
                                        '<td><img class="" style="width: 80px; height: auto" src="'+value.icon+'" alt=""/></td>\n' +
                                        '<td><span>'+value.topic+'</span><br><span>'+value.description+'</span><br>\n' +
                                        '<button class="btn action-2 xsm shadow text-center gradient-loader-blue" onclick=build_item("'+key+'","basic")>Построить</button>\n' +
                                        '</td>\n' +
                                        '</tr>');
                                }
                                break;
                            }
                            case ('railway') : {
                                if (name[1] === 'railway') {
                                    $('#table-builder-special').append('<tr class="'+value.category+'">\n' +
                                        '<td><img class="" style="width: 80px; height: auto" src="'+value.icon+'" alt=""/></td>\n' +
                                        '<td><span>'+value.topic+'</span><br><span>'+value.description+'</span><br>\n' +
                                        '<button class="btn action-2 xsm shadow text-center gradient-loader-blue" onclick=build_item("'+key+'","basic")>Построить</button>\n' +
                                        '</td>\n' +
                                        '</tr>');
                                }
                                break;
                            }
                            default : {
                                $('#table-builder-other').append('<tr class="'+value.category+'">\n' +
                                    '<td><img class="" style="width: 80px; height: auto" src="'+value.icon+'" alt=""/></td>\n' +
                                    '<td><span>'+value.topic+'</span><br><span>'+value.description+'</span><br>\n' +
                                    '<button class="btn action-2 xsm shadow text-center gradient-loader-blue" onclick=build_item("'+key+'","basic")>Построить</button>\n' +
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
                } else if (name[1] === 'port') {
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


                /*let item = items.basic.airport;
                item.x = position.x+item.offset_x;
                item.y = position.y;
                item.z = position.z+item.offset_z;

                console.log("Camera position is:", camera.position.x, camera.position.y, camera.position.z)
                console.log("Camera rotation is:", camera.rotation.x, camera.rotation.y, camera.rotation.z)

                purchase(item, function (done) {
                    if (done.status === 'processed') {
                        console.log('Purchased successfully!');
                        load_model_positioned(item);
                        $('#money_badge').html(done.balance);
                    }
                });*/
            }

            /*if (can_click) {
                can_click = false;

                find_click(name[0], function (clicked) {
                    if (clicked !== null) {
                        console.log('Clicked quartal:', clicked);

                        $('.quartal-title').html(clicked.description);
                        $('#quartal-badge').fadeIn(500);
                        clicked_ = clicked;


                        setTimeout(function () {
                            $('#quartal-badge').fadeOut(1000);
                        },15000);

                        var event = new CustomEvent('mapclick', {"detail" : {"quartal":clicked.quartal}});
                        document.dispatchEvent(event);
                    }

                    setTimeout(function () {
                        can_click = true;
                    },1000);
                });
            }*/

        }

    }

}

function update_animation() {

    const delta = clock.getDelta();

    for ( const mixer of mixers ) {

        mixer.update( delta );

    }

}



$('.show-clicked-quartal').click(function () {
    $('#quartal-description').html(clicked_.description);
    $('#quartal-level').html(clicked_.category+'-й уровень');
    $('#quartal-coins').html(clicked_.coins+'/день');
    $('#quartal-population').html(clicked_.population+'/день');
    $('#btn-upgrade').prop('quartal', clicked_.quartal);
    $('#btn-upgrade').prop('category', clicked_.category);
    $('.quartal-info-img').attr('src', 'images/preview/'+clicked_.quartal + '.png');
    $('#quartal-info').modal('show');
});

function show_clicked_animation(name) {
    $('#animation-description').html('Гости с другой планеты');
    $('.animation-info-img').attr('src', 'images/preview/'+name + '.jpg');
    $('#animation-info').modal('show');
};

$('#btn-upgrade').click(function () {
    $('#btn-upgrade').html('<i class="fas fa-spinner fa-spin"></i> Подождите...');
    $('#btn-upgrade').attr('disabled', true);

    var posting = $.post('/api/upgrades', {
        quartal : $('#btn-upgrade').prop('quartal'),
        category : parseInt($('#btn-upgrade').prop('category'))+1,
        event : "upgrade-request"
    });

    posting
        .done(function(data){
            console.log(data);
            $('#quartal-info').modal('hide');

            $('#btn-upgrade').attr('disabled', false);
            $('#btn-upgrade').html('Улучшить');

            $('.upgrades').html(data);
            $(".my-upgrades").addClass("opened");
        })
        .fail(function(data){
            console.log(data);
            $('#quartal-info').modal('hide');

            $('#btn-upgrade').attr('disabled', false);
            $('#btn-upgrade').html('Улучшить');
        });
});


function find_click(name ,callback) {

    let i = _.size(naming);
    let j = 1;

    if (name === 'Cylinder.008') {
        //It's UFO
        show_clicked_animation('ufo');
    }

    _.forEach(naming, function (value, quartal) {
        if (value.names.includes(name.toLowerCase()) === true) {
            let category = _.get(city, [quartal]);
            let coins = value.levels.coins[category];
            let population = value.levels.population[category];

            var selectedObject = scene.getObjectByName(quartal);
            console.log(selectedObject);

            //camera.position.set(-292.93124500423517,389.7459145790208,-518.5847333436669);
            //camera.rotation.set(-2.594318980537096,-0.5542040447682948,-2.8312675430281993);
            //controls.update();

            callback({"quartal" : quartal, "description" : value.description, category: category, coins : coins, population : population});


        } else {
            j++;
        }

        if (j===i) {
            callback(null);
        }
    })
}

function disable_controls(){
    controls.enabled = false;
}

function enable_controls(){
    controls.enabled = true;
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


function buy_event(event) {
    $('.purchase-event').html('<i class="fas fa-spinner fa-spin"></i> Подождите...');
    $('.purchase-event').attr('disabled', true);

    var posting = $.post('/api/buy/event', {
        event : event
    });

    posting
        .done(function(data){
            console.log(data);
            $(".my-upgrades").removeClass("opened");

            coins = coins - parseInt(data.cost);
            population = population + parseInt(data.population);

            load_event(data.name);
            //start_confetti();
            $('.event-started-description').html(data.topic);
            $('.event-started-info').html(data.info);
            $('.event-started-img').attr('src', "images/upgrades/"+data.name+".png");
            $('#event-started').modal('show');

        })
        .fail(function(data){
            console.log(data);
            if (data.status === 401) {
                $('.purchase-event').attr('disabled', false);
                $('.purchase-event').html('Активно');
            }

            if (data.status === 403) {
                $('.purchase-event').attr('disabled', false);
                $('.purchase-event').html('Мало монет');
            }
        });
}

function upgrade(quartal) {
    $('.purchase-quartal').html('<i class="fas fa-spinner fa-spin"></i> Подождите...');
    $('.purchase-quartal').attr('disabled', true);

    let data = quartal.split('_');
    var posting = $.post('/api/buy/quartal', {
        quartal : data[0],
        category : data[1]
    });

    console.log('data[0]',data[0]);

    posting
        .done(function(result){
            console.log(result);
            $(".my-upgrades").removeClass("opened");

            ////////////// Building level #1
            remove_model(data[0]);


            coins = coins - parseInt(result);

            switch (data[1]) {
                case ('1') : {
                    var model = _.find(models_quartals_1, {name : data[0]});
                    break;
                }
                case ('2') : {
                    var model = _.find(models_quartals_2, {name : data[0]});
                    break;
                }
                case ('3') : {
                    var model = _.find(models_quartals_3, {name : data[0]});
                    break;
                }

            }

            console.log(model);

            load_model(model);
            _.forEach(model.animations, function (animation) {
                load_animation(animation.name);
            });
            //////////////

            _.set(city, [data[0]], data[1]);

            // start_confetti();
            $('.quartal-level').html(data[1] + '-й уровень');
            $('.quartal-image').attr('src', "images/upgrades/"+data[0]+".png");
            $('.quartal-name').html(_.get(naming, [data[0], "description"]));
            $('#construction-completed').modal('show');

        })
        .fail(function(data){
            console.log(data);
            if (data.status === 401) {
                $('.purchase-quartal').attr('disabled', false);
                $('.purchase-quartal').html('Приобретен');
            }

            if (data.status === 403) {
                $('.purchase-quartal').attr('disabled', false);
                $('.purchase-quartal').html('Мало монет');
            }
        });
}