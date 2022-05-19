function getOrderList() {
    // let member_id = '2';
    let member_id = $.session.get('member_id');

    let data = {
        controller: 'orderList',
        method: 'getOrderById',
        parameter: {
            member_id: member_id
        }
    };
    let json = JSON.stringify(data);
    $.ajax({
        url: '/CD-Book-Store-System/controller/core.php',
        method: 'POST',
        data: json,
        success: res => {
            console.log(res);

            if (res.length == 0) {
                let html = `
                    <div class="d-flex justify-content-center">
                        <span style="font-size: 50px; margin-top: 25%;">No Order List</span>
                    </div>
                `
                $('#orderList').append(html);
            }

            for (var i = 0; i < res.length; i++) {
                let html = `
                    <div class="mx-auto orderList_card my-5 p-4" id="order-${res[i]['order_id']}">
                        <div class="row">
                            <div class="col-5">
                                <div class="card card_up">
                                <div class="d-flex">
                                    <h5 class="card_title">Order : </h5> 
                                    <h5 class="px-2">${res[i]['order_id']}</h5> 
                                </div>
                                <div class="d-flex">
                                    <h6 class="card_title">State : </h6>
                                    <h6 class="px-2">${res[i]['order_state']}</h6>
                                </div>
                                <div class="d-flex">
                                    <h6 class="card_title">Name : </h6> 
                                    <h6 class="px-2">${res[i]['name']}</h6> 
                                </div>
                                <div class="d-flex">
                                    <h6 class="card_title">Phone : </h6>
                                    <h6 class="px-2">${res[i]['phone_num']}</h6>
                                </div>
                                <div id="deliver-${res[i]['order_id']}"></div>
                                <div class="d-flex">
                                    <h6 class="card_title">Payment : </h6>
                                    <h6 class="px-2">${res[i]['payment']}</h6>
                                </div>
                                </div>
                            </div>
                            <div class="col-7 card" id="product-${res[i]['order_id']}">
                            <h5 class="card_title">Purchase Product : </h5>
                            </div>
                        </div>
                        <hr class="mx-4" style="height: 2px;">
                        <div class="row">
                            <div class="col">
                                <div class="card card_down">
                                <div class="d-flex">
                                    <h6 class="card_title">Subtotal : </h6>
                                    <h6 class="px-2">${res[i]['subtotal']}</h6>
                                </div>
                                <div class="d-flex">
                                    <h6 class="card_title">Deliver : </h6>
                                    <h6 class="px-2">${res[i]['deliver']}</h6>
                                </div>
                                <div class="d-flex">
                                    <h6 class="card_title">Discount : </h6>
                                    <h6 class="px-2">${res[i]['discount']}</h6>
                                </div>
                                <div class="d-flex">
                                    <h6 class="card_title">Total : </h6>
                                    <h6 class="px-2">${res[i]['price']}</h6>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                `
                $('#orderList').append(html);

                if (res[i]['deliver_method'] == 'home delivery') {
                    let deliver = `
                    <div class="d-flex">
                        <h6 class="card_title">Deliver Method : </h6>
                        <h6 class="px-2">${res[i]['deliver_method']}</h6>
                    </div>
                    <div class="d-flex">
                        <h6 class="card_title">Address : </h6>
                        <h6 class="px-2">${res[i]['order_address']}</h6>
                    </div>
                    `
                    $(`#deliver-${res[i]['order_id']}`).append(deliver);
                } else {
                    let deliver = `
                    <div class="d-flex">
                        <h6 class="card_title">Deliver Method : </h6>
                        <h6 class="px-2">${res[i]['deliver_method']}</h6>
                    </div>
                    <div class="d-flex">
                        <h6 class="card_title">Convenience Store Number : </h6>
                        <h6 class="px-2">${res[i]['convenience_store']}</h6>
                    </div>
                    `
                    $(`#deliver-${res[i]['order_id']}`).append(deliver);
                }
                getOrderProduct(res[i]['order_id']);
            }
        }
    });
}

function getOrderProduct(order_id) {
    let data = {
        controller: 'orderProduct',
        method: 'getOrderProductById',
        parameter: {
            order_id: order_id
        }
    };
    let json = JSON.stringify(data);
    $.ajax({
        url: '/CD-Book-Store-System/controller/core.php',
        method: 'POST',
        data: json,
        success: res => {
            // console.log(res);
            for (var i = 0; i < res.length; i++) {
                let product_id = res[i]['product_id'];
                let count_num = res[i]['count_num'];
                let data = {
                    controller: 'product',
                    method: 'searchProductById',
                    parameter: {
                        product_id: product_id
                    }
                };
                let json = JSON.stringify(data);
                $.ajax({
                    url: '/CD-Book-Store-System/controller/core.php',
                    method: 'POST',
                    data: json,
                    success: res1 => {
                        // console.log(res1);
                        let product = `
                        <div class="d-flex">
                            <h6 class="card_title">Name : </h6>
                            <h6 class="px-2" style="width: 120px;">${res1[0]['product_name']}</h6>
                            <h6 class="card_title">Count : </h6>
                            <h6 class="px-2 card_text">${count_num}</h6>
                            <h6 class="card_title">Price : </h6>
                            <h6 class="px-2" style="width: 80px;">${count_num * res1[0]['product_price']}</h6>
                            <div style="margin-top: -32px;">
                                <button class="btn btn-sm green" style="font-size: 12px;" onclick="showCommentModal(${product_id})">Comment</button>
                            </div>
                        </div>
                            
                        `
                        $(`#product-${order_id}`).append(product);

                        let modal = `
                        <div class="modal fade" id="modal-${product_id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Product Comment</h5>
                                    </div>
                                    <div class="modal-body">
                                    <div class="d-flex justify-content-center">
                                    <input class="form-control my-4 comment_input" list="star_list" placeholder="Star For Product" id="star-${product_id}">
                                    <datalist id="star_list">
                                    <option value="1">
                                    <option value="2">
                                    <option value="3">
                                    <option value="4">
                                    <option value="5">
                                    </datalist>
                                    </div>
                                    <div class="d-flex justify-content-center">
                                        <input class="form-control my-4 comment_input" type="text" id="comment-${product_id}" placeholder="Comment">
                                    </div>
                                    </div>
                                    <div class="modal-footer d-flex justify-content-center">
                                        <button type="button" class="btn green" data-bs-dismiss="modal" onclick="insertComment(${product_id});">Comment</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `
                        $('#modal_list').append(modal);
                    }
                });
            }
        }
    });
}

function showCommentModal(order_id) {
    $(`#modal-${order_id}`).modal('show');
}