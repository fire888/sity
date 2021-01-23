//document.getElementById('city').appendChild(renderer.domElement);

manager.onLoad = function ( ) {

    console.log( 'Loading complete!');
    $('#city').show();
    $('#loading_status').hide();
    /*camera.aspect = window.innerWidth / window.innerHeight;
    camera.position.set(712, 338, 524).setLength(1500);

    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio( window.devicePixelRatio );*/

    var event = new Event('resize');
    document.dispatchEvent(event);
    /*setTimeout(function () {
        let r = renderer.info.render;
        console.log( r );
        alert(JSON.stringify(r));
    },2000);*/

    // Add FOV Fog effect to the scene. Same colour as the BG int he stylesheet.
    //scene.fog = new THREE.Fog(0xffffff, 100, 1500);



};


manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {

    $('#loading_text').html('Загрузка города ('+itemsLoaded+' из '+itemsTotal+')');
    console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );

};

manager.onError = function ( url ) {

    console.log( 'Loading failed: ' + url  );

};
