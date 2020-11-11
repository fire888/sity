import * as THREE from 'three'

export const createTown = model => {
    const d = 9.99
    const c = 5

    const group = new THREE.Group()

    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(400, 400),
        new THREE.MeshLambertMaterial({ color: 0x116011 })
    )
    plane.rotation.x = -Math.PI / 2
    plane.position.y = -0.1

    group.add(plane)    

    model.traverse( function(child) {
        if (child instanceof THREE.Mesh) {
            console.log(child)
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });


    for (let i = 0; i < c; i++) {
        for (let j = 0; j < c; j++) {
            const m = model.clone()
            m.position.set(i * d - (d * (c / 2)), 0, j * d - (d * (c / 2)))
            group.add(m)
        }
    }
    return group
}

