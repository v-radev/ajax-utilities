/**
 * Utility AJAX functions
 * @author V.Radev <mail@radev.info>
 */
var Ajax = function (){
    this.requests = [];
    this.queue = true;
    this.queueRunning = false;
    return this;
};

Ajax.prototype.send = function(params){

    var self = this,
        defaults = {
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
    if ( !self.queue ){
        params.complete = function(){};
    }

    //If queue is enabled
    if ( self.queue ){
        self.queueRequest(params);
        return self.runQueue();
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
    var obj = {};
    obj.params = params;
    obj.active = false;
    this.requests.push(obj);
};

Ajax.prototype.runQueue = function() {
    var self = this,
        i,
        deferred;

    //If there is request running currently
    if ( self.queueRunning ){

        deferred = $.Deferred();

        //Loop all requests
        for (i = 0; i < self.requests.length; i++) {
            //If the request is not active
            if ( self.requests[i].hasOwnProperty('active') && !self.requests[i].active ){
                //If the request has not been handled by this loop
                if ( !self.requests[i].hasOwnProperty('handled') || !self.requests[i].handled ){
                    //Add the deferred to the request
                    self.requests[i].deferred = deferred;
                    //Mark request as handled
                    self.requests[i].handled = true;
                }
            }
        }

        //Return a promise so you can be able to hook done(), fail() and always()
        return deferred.promise();
    }//END if queue is running

    //If you have requests
    if( self.requests.length ) {
        //Queue is running
        self.queueRunning = true;
        //Set this request to active
        self.requests[0].active = true;

        //Modify the complete()
        self.requests[0].params.complete = function() {
            //Remove this request
            self.requests.shift();
            //Make queue available
            self.queueRunning = false;
            //Continue queue
            self.runQueue.apply(self, []);//This will check the queue again when the request is done
        };

        //If request has a deferred
        if ( self.requests[0].hasOwnProperty('deferred') ){
            //Run request and notify the deferred
            jQuery.ajax(self.requests[0].params)
                .done(function(data) {
                    self.requests[0].deferred.resolve(data);
                })
                .fail(function(data){
                    self.requests[0].deferred.reject(data);
                });
            return;
        }

        return jQuery.ajax(self.requests[0].params);
    }//END if requests
};//END runQueue()
