<?php

require_once "medoo.min.php";

$db = new medoo([
    'database_type' => 'mysql',
    'database_name' => 'test-db',
    'server' => 'localhost',
    'username' => 'root',
    'password' => 'password123',
    'charset' => 'utf8'
]);

//AJAX request
if ( !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest' )
{
    $db->insert('users', ['username' => uniqid()]);
    usleep(350000);
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
<a id="postRequest" href="#">Send post request</a>

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

    $("a#postRequest").on("click", function(e){

        e.preventDefault();

        a.post('index.php', { user: 'Roku', password: 'a110rN0th1nG'})
            .done(function(data){
                console.log( data );
            })
            .always(function(){
                console.log( 'POST REQUEST DONE' );
            });
    });


</script>

</body>
</html>