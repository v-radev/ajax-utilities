
//TODO do the thing with ajax in progress globally?
//TODO maybe que stuff when in progress?
//Need this send(), another on(event, selector), another go() which will be abstract on send()
//This send() needs to give me a deffered

var Ajax = {};

Ajax.prototype.send = function(params){

    var defaults = {
        type: 'POST',
        url: '',
        data: {},
        beforeSend: function(){}
    };

    //TODO
    //if (AJAX_IN_PROGRESS) return;
    //AJAX_IN_PROGRESS = true;

    params = $.extend({}, params);

    //Overwrite these callback hooks
    params.error = function(){};
    params.success = function(){};
    params.complete = function(){};

    return jQuery.ajax(params);

    //TODO test overwriting error, success, complete

};