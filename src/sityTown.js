import * as THREE from 'three'

export const createTown = model => {
    const d = 9.99
    const c = 5

    model.traverse( function(child) {
        if (child instanceof THREE.Mesh) {
            console.log(child)
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    const group = new THREE.Group()
    for (let i = 0; i < c; i++) {
        for (let j = 0; j < c; j++) {
            const m = model.clone()
            m.position.set(i * d - (d * (c / 2)), 0, j * d - (d * (c / 2)))
            group.add(m)
        }
    }
    return group
}

