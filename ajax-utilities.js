
var Ajax = function (){
    return this;
};

Ajax.prototype.send = function(params){

    var defaults = {
        method: 'POST',
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

Ajax.prototype.on = function(event, selector, ajaxOptions) {

    var self = this;

    //Return a Deferred so you can be able to hook done(), fail() and always() to Ajax.on()
    return jQuery.Deferred(function(deferred) {

        //Listen for DOM event on selector
        jQuery(document).on(event, selector, function(e) {

            e.preventDefault();

            //When event occurs send request
            self.send(ajaxOptions)
                .done(function(reponse) {
                    //If request succeeds resolve the deferred that is hooked to the Ajax.on() (meaning resolve self)
                    deferred.resolve(reponse);
                })
                .fail(function(response){
                    //If request fails reject the deferred that is hooked to the Ajax.on() (meaning reject self)
                    deferred.reject(response);
                });
        });
    }).promise();
};

Ajax.prototype.onPost = function(event, selector, ajaxUrl, ajaxData) {

    ajaxUrl = typeof ajaxUrl !== 'undefined' ? ajaxUrl : '';
    ajaxData = typeof ajaxData !== 'undefined' ? ajaxData : {};

    this.on(event, selector, { method: 'POST', url: ajaxUrl, data: ajaxData })
        .done(function(data){
            return data;
        })
        .fail(function(){
            return false;
        });
};

Ajax.prototype.post = function(ajaxUrl, ajaxData) {

    ajaxUrl = typeof ajaxUrl !== 'undefined' ? ajaxUrl : '';
    ajaxData = typeof ajaxData !== 'undefined' ? ajaxData : {};

    this.send({ method: 'POST', url: ajaxUrl, data: ajaxData })
        .done(function(data){
            return data;
        })
        .fail(function(){
            return false;
        });
};

