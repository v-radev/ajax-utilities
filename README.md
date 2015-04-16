AJAX helping methods with queue.
Logic behind the queue:
The first sent request is being handled and a deferred promise from jQuery.ajax is returned.
At that point any other request coming will see that there is an active request and will be added to the queue array with a return of a promise.
The deferred from that promise will be added to the queue array of that request.
After the first request is done the complete() callback will run the queue again, which will pick up the next request from the array.
After the request is completed it will notify the previously added to the array deferred.

I strongly encourage you to use the deferred callbacks (done, fail, always) instead of the default ones (success, error, complete) with this AJAX utilities.
But if you decide to use the default have in mind that success() and error() are overwritten in send() and if you are using the queue, complete() will be too.
Use at your own risk.
