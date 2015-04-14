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

<script type="text/javascript">

    var a = new Ajax();

    $("a#simpleRequest").on("click", function(e){
        var params = {
            url: 'index.php',
            data: { user: 'Inevitable', password: 'a110rN0th1nG'}
        };
        e.preventDefault();

        a.send(params)
            .done(function(data){
                console.log( data );
            })
            .always(function(){
                console.log( 'SIMPLE REQUEST DONE' );
            });
    });

</script>

</body>
</html>