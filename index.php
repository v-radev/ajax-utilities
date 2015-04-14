<?php

//AJAX request
if ( !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest' )
{
    echo json_encode($_POST);
    return;
}

?>
<!doctype html>
<html lang="en-US">
<head>
    <meta charset="UTF-8">
    <title>Test AJAX calls</title>

    <script type="text/javascript" src="jquery-1.11.2.js"></script>
    <script type="text/javascript" src="ajax-utilities.js"></script>
</head>
<body>


<a id="simpleRequest" href="#">Send simple request</a>
<a id="onRequest" href="#">Send on request</a>
<a id="onPotsRequest" href="#">Send on post request</a>
<a id="potsRequest" href="#">Send post request</a>

<script type="text/javascript">

    var a = new Ajax(),
        params = {
            url: 'index.php',
            data: { user: 'Inevitable', password: 'a110rN0th1nG'}
    };

    $("a#simpleRequest").on("click", function(e){

        e.preventDefault();

        a.send(params)
            .done(function(data){
                console.log( data );
            })
            .always(function(){
                console.log( 'SIMPLE REQUEST DONE' );
            });
    });

    a.on('click', 'a#onRequest', params)
        .done(function(data){
            console.log( data );
        })
        .always(function(){
            console.log( 'ON REQUEST DONE' );
        });

    //TODO test the new methods

</script>

</body>
</html>