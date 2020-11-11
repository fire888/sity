

export function KeyBoard (eventEmitter) {
    
    const emitter = eventEmitter

    const keys = {
        'up': false,
        'left': false,
        'right': false,
        's': false,
        'm': false,
        'w': false,
    }

    const keyUpdate = function ( keyCode, isDown ) {
        switch( keyCode ) {
            case 38:
                keys['up'] = isDown
                break
            case 37:
                keys['left'] = isDown
                break
            case 39:
                keys['right'] = isDown
                break
            case 83:
                keys['s'] = isDown
                break
            case 77:
                keys['m'] = isDown
                break
            case 87:
                keys['w'] = isDown
                break
        }
        emitter.emit('keyEvent')(keys)
    }

    document.addEventListener( 'keydown', 
        function (event) { keyUpdate( event.keyCode, true )}.bind(this) )
    document.addEventListener( 'keyup', 
        function(event) { keyUpdate( event.keyCode, false )}.bind(this) )

    const buttLeft = document.querySelector('.butt-left')
    buttLeft.addEventListener('mousedown', 
        function() { keyUpdate( 37, true ) })
    buttLeft.addEventListener('mouseup', 
        function() { keyUpdate( 37, false ) })   
    buttLeft.addEventListener('touchstart',
        function() { keyUpdate( 37, true ) })
    buttLeft.addEventListener('touchend', 
        function() { keyUpdate( 37, false ) })       
    
    const buttRight = document.querySelector('.butt-right')
    buttRight.addEventListener('mousedown', 
        function() { keyUpdate( 39, true ) })
    buttRight.addEventListener('mouseup', 
        function() { keyUpdate( 39, false ) })
    buttRight.addEventListener('touchstart', 
        function() { keyUpdate( 39, true ) })
    buttRight.addEventListener('touchend', 
        function() { keyUpdate( 39, false ) })         
        
    const buttUp = document.querySelector('.butt-front')
    buttUp.addEventListener('mousedown', 
        function() { keyUpdate( 38, true ) })
    buttUp.addEventListener('mouseup', 
        function() { keyUpdate( 38, false ) })
    buttUp.addEventListener('touchstart', 
        function() { keyUpdate( 38, true ) })
    buttUp.addEventListener('touchend', 
        function() { keyUpdate( 38, false ) })


    const arr = [buttLeft, buttRight, buttUp]
    let toggle = false
    const clickCam = () => {
        eventEmitter.emit('clickCam')() 
        toggle = !toggle
        toggle 
            ? arr.forEach(item => item.classList.remove('hidden'))
            : arr.forEach(item => item.classList.add('hidden'))
    } 
    const buttSwitchCam = document.querySelector('.butt-camera')
    buttSwitchCam.addEventListener('mouseup', clickCam)

    eventEmitter.subscribe('setLanguage')(() => buttSwitchCam.classList.remove('hidden'))
}

