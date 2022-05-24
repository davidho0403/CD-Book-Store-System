<?php

session_start();

if (isset($_SESSION['member_id']) && isset($_SESSION['email'])) {
?>

    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <!-- Bootstrap Icon -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.6.0/font/bootstrap-icons.css" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous" />
        <!-- Custom CSS -->
        <link rel="stylesheet" href="style.css" />
        <title>Member CS</title>
    </head>
    <body>
        <div class="container-full">
            <div class="row wrap">
                <div class="col-xl-3 product-info-wrap">
                    <div class="product-info-area">
                        <div class="col-12 head-wrap">
                            <h1 class="product-order-id">Order #<a id="order_id"></a></h1>
                            <div class="product-order-state"><i class="bi" id="state_icon"></i><a id="order_state"></a></div>
                        </div>
                        <div class="row body-wrap" id="product_component_area">
                        </div>
                    </div>
                </div>
                <div class="col-xl-9 msg-wrap">
                    <div class="msg-content-area" id="msg-content-area"></div>
                    <div class="row send-area">
                        <div class="col-12 send-area-wrap">
                            <div class="input-wrap">
                                <input type="text" id="msg-content" class="input-box" />
                            </div>
                            <div class="send-btn-wrap" id="send-btn">
                                <i class="bi bi-arrow-right-circle-fill send-btn"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Google api jQuery -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <!-- JavaScript Bundle with Popper -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
        <!-- Navbar js -->
        <script src="/CD-Book-Store-System/view/src/script/member.js"></script>
        <script src="../../src/script/searchProduct.js"></script>
        <!-- Custom js -->
        <script src="main.js"></script>
    </body>

    </html>


<?php

} else {
    header("Location: /CD-Book-Store-System/view/login");
}
?>