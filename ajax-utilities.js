/**
 * Utility AJAX functions
 * @author V.Radev <mail@radev.info>
 * (Queue code by http://stackoverflow.com/users/1386886/jandy)
 */
var Ajax = function (){
    this.requests = [];
    this.queue = true;
    this.queueRunning = false;
    return this;
};

Ajax.prototype.send = function(params){

    var defaults = {
        method: 'POST',
        url: '',
        data: {},
        beforeSend: function(){}
    };

    params = jQuery.extend(defaults, params);

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

    //If there is request running currently
    if ( this.queueRunning ){
        //Wait 1s and try again
        setTimeout(function(){
            return self.runQueue();
        }, 200);
    }

    //If you have requests
    if( self.requests.length ) {

        this.queueRunning = true;

        //Make the complete() remove the request after its done and continue the queue
        self.requests[0].complete = function() {
            self.requests.shift();
            self.queueRunning = false;
            self.runQueue.apply(self, []);//This will check the queue again when the request is done
        };

        return jQuery.ajax(self.requests[0]);
    }
};
