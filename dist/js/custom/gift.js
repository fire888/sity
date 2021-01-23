var c = document.getElementById('container');
var box = document.getElementById('box');



$('#container').click(function () {
    var end = Date.now() + (3 * 1000);
    var colors = ['#25DAC5', '#FF495C'];
    $('#box').removeClass('rubberBands');
    $('#box').hide();
    $('#gift').modal('show');
    $( "#container" ).animate({
        top: '-=1050px'
    }, 5000, "linear", function() {
        $( "#container" ).hide();
    });
    (function frame() {
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: {
                x: 0
            },
            colors: colors
        });
        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: {
                x: 1
            },
            colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
});
