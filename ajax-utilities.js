
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

    $(document).on(event, selector, function(e){
        e.preventDefault();

        return self.send(ajaxOptions);
    });
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

