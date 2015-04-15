/**
 * Utility AJAX functions
 * @author V.Radev <mail@radev.info>
 * (Queue code by http://stackoverflow.com/users/1386886/jandy)
 */
var Ajax = function (){
    this.requests = [];
    this.queue = true;
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
    //If queue is disabled overwrite complete()
    if ( !this.queue ){
        params.complete = function(){};
    }

    //If queue is enabled
    if ( this.queue ){
        this.queueRequest(params);
        return this.runQueue();
    } else {
        return jQuery.ajax(params);
    }
};

Ajax.prototype.on = function(event, selector, ajaxOptions) {

    var that = this;

    //Return a Deferred so you can be able to hook done(), fail() and always() to Ajax.on()
    return jQuery.Deferred(function(deferred) {

        //Listen for DOM event on selector
        jQuery(document).on(event, selector, function(e) {

            e.preventDefault();

            //When event occurs send request
            that.send(ajaxOptions)
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

    return this.on(event, selector, { method: 'POST', url: ajaxUrl, data: ajaxData });
};

Ajax.prototype.post = function(ajaxUrl, ajaxData) {

    ajaxUrl = typeof ajaxUrl !== 'undefined' ? ajaxUrl : '';
    ajaxData = typeof ajaxData !== 'undefined' ? ajaxData : {};

    return this.send({ method: 'POST', url: ajaxUrl, data: ajaxData });
};

Ajax.prototype.queueRequest = function(params) {
    this.requests.push(params);
};

Ajax.prototype.runQueue = function() {
    var self = this;

    //If you have requests
    if( self.requests.length ) {
        //Make the complete() remove the request after its done and continue the queue
        self.requests[0].complete = function() {
            self.requests.shift();
            self.runQueue.apply(self, []);
            console.log( 'Removing request and running queue again' );//TODO
        };

        return jQuery.ajax(self.requests[0]);
    }
    else {
        console.log( 'Checking que after 1s is passed' );//TODO
        //After 1s check queue for new requests
        self.queueTimeout = setTimeout(function() {
            self.runQueue.apply(self, []);
        }, 1000);
    }
};

Ajax.prototype.stopQueue = function() {
    this.requests = [];
    clearTimeout(this.queueTimeout);
};


//TODO after runQueue is executed once it should not be executed again on request
//TODO if a timeout is set once it should not be set again