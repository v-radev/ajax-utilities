
//TODO do the thing with ajax in progress globally?
//TODO maybe que stuff when in progress?
//Need this send(), another on(event, selector), another go() which will be abstract on send()
//This send() needs to give me a deffered
//Maybe make another utils with que?

var Ajax = function (){
    return this;
};

Ajax.prototype.send = function(params){

    var defaults = {
        type: 'POST',
        url: '',
        data: {},
        beforeSend: function(){}
    };

    params = $.extend(defaults, params);

    //Overwrite these callback hooks
    params.error = function(){};
    params.success = function(){};
    params.complete = function(){};

    return jQuery.ajax(params);
};

