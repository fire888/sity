/*if (getUrlParam('type').includes('onboarding') === true) {
    setTimeout(function () {
        introJs().start();



    },3000)
}*/

introJs.fn.oncomplete(function() {
    console.log("Finished");

    var posting = $.post('/api/webhooks', { event: "hide_introduction" });
    posting
        .done(function(data){

        })
        .fail(function(err){
            if (err.status === 500) {


            };

        });

    /*$( "#container" ).animate({
        top: '+=1050px'
    }, 3000, "linear", function() {
    });*/
});