
//TODO do the thing with ajax in progress

var Ajax = {};

Ajax.prototype.send = function(){


    //TODO this thing can be an object or single parameters
    jQ.ajax({
        type: 'POST',
        url: '/index.php?action=ajax_widget_request',
        data: dataForm,
        cache: false,
        contentType: false,
        processData: false,
        success: function(data){
        },
        complete: function () {

        }
    });


};