var arrayProducts = [];
var main = {
    init: function(){
        main.getDataProduct();
        main.getTotalProduct();
        main.eventAddCart();
    },
    getDataProduct : function(){
        $.ajax({
            type: "GET",
            url: "/data.json",
            success: function (data) {
                if(data.length > 0){
                    arrayProducts = data;
                    // in ra tất cả các sản phẩm - truyền id của sản phẩm đang chọn vào vào src
                    let listHTMLProducts = '';
                    for (let i = 0; i < data.length; i++) {
                        listHTMLProducts += `
                        <div class="pro" onclick="window.location.href='sproduct.html?id=`+data[i].id+`'">
                            <img class="imgs" src="assets/imgs/products/`+data[i].img+`" alt="">
                            <div class="des" > <!-- describe: miêu tả -->
                                <span>OWEN</span>
                                                    <!-- thêm id vào url -->
                                <h5 >`+data[i].name+`</h5>
                                <div class="star">
                                    <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                    <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                    <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                    <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                    <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                </div>
                                <div class="price">
                                    <p>`+data[i].price+`$</p>
                                    <a class="addCart" href="javascript:void(0)" data-id="`+data[i].id+`"><i class="fa-solid fa-cart-shopping" style="color: #B197FC;"></i></a>
                                </div>
                            </div>

                        </div>`
                    }
                    $('div.all-pro').append(listHTMLProducts);
                    main.eventAddCart();

                    // in ra các sản phẩm mới
                    let listHTMLNewProducts = '';
                    let listNewProducts = data.filter(x => x.status == 1); //lọc ra các status = 1
                    for (let i = 0; i < listNewProducts.length; i++) {
                        listHTMLNewProducts += `
                        <div class="pro" onclick="window.location.href='sproduct.html?id=`+listNewProducts[i].id+`'">
                            <img class="imgs" src="assets/imgs/products/`+listNewProducts[i].img+`" alt="">
                            <div class="des"> <!-- describe: miêu tả -->
                                <span>OWEN</span>
                                <h5>`+listNewProducts[i].name+`</h5>
                                <div class="star">
                                    <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                    <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                    <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                    <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                </div>
                                <div class="price">
                                    <p>`+listNewProducts[i].price+`</p>
                                    <a class="addCart" href="javascript:void(0)" data-id="`+listNewProducts[i].id+`"><i class="fa-solid fa-cart-shopping" style="color: #B197FC;"></i></a>
                                </div>
                            </div>
                        </div>`
                    }
                    if (listNewProducts.length > 0) {
                        $('div.new-pro').append(listHTMLNewProducts);
                        main.eventAddCart();
                    }
                    else{
                        $('div.new-pro').append('<h5>Chưa có sản phẩm mới</h5>')
                    }

                    document.getElementsByClassName('pro').forEach(element => {
                        element.addEventListener('click', function(event) {
                            event.preventDefault();
                            event.stopPropagation();
                        });
                    });

                }else{
                    alert('không tồn tại dữ liệu');
                }
            }
            
        })
        
    },
    //in ra sản phẩm đang chọn (main product)
    getProductDetails : function(){
        $.ajax({
            type: "GET",
            url: "data.json",
            success: function (data) {
                if(data.length > 0){
                    const queryString = window.location.search;
                    const urlParams = new URLSearchParams(queryString);
                    const product = urlParams.get('id');
                    var getProduct = data.find(x => x.id == product);
                    if(getProduct != null && typeof getProduct !='undefined'){
                        document.getElementById('MainImg').src = 'assets/imgs/products/'+getProduct.img;
                        var HTMLProduct = 
                        `
                            <h6>OWEN /</h6>
                            <h4>${getProduct.name}</h4>
                            <h2>$${getProduct.price}</h2>
                            
                        `
                        var HTMLProductDetails = 
                        `
                            <p>${getProduct.details}</p>
                            
                        `

                    }
                    $('div.single-pro-details').prepend(HTMLProduct); //apend vào đầu 
                    $('div.single-pro-details').append(HTMLProductDetails);    
                    main.categoryProducts(data, getProduct.category, getProduct.id);
                }else{
                    alert('không tồn tại dữ liệu');
                }
            },
            error: function (err) {
                console.log(err)
            }
        })
    },
    // sản phẩm tương tự
    categoryProducts : function(data, category, id){
        if(data.length > 0){
            let listCategoryProduct = data.filter(x => x.category == category && x.id != id);
            if(listCategoryProduct.length > 0){
                var listCategoryHTMLProduct = '';
                for (let i = 0; i < listCategoryProduct.length; i++) {
                    listCategoryHTMLProduct += 
                    `
                        <div class="pro" onclick="window.location.href='sproduct.html?id=`+listCategoryProduct[i].id+`'">
                            <img class="imgs" src="assets/imgs/products/`+listCategoryProduct[i].img+`" alt="">
                            <div class="des"> <!-- describe: miêu tả -->
                                <span>Adidas</span>
                                <a href="#">
                                    <h5>`+listCategoryProduct[i].name+`</h5>
                                <a/>
                                <div class="star">
                                    <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                    <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                    <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                    <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                </div>
                                <div class="price">
                                    <p>$`+listCategoryProduct[i].price+`</p>
                                    <a class="addCart" href="javascript:void(0)" data-id="`+listCategoryProduct[i].id+`"><i class="fa-solid fa-cart-shopping" style="color: #B197FC;"></i></a>
                                </div>
                            </div>
                        </div>
                    `
                }
            }
            if (listCategoryProduct.length > 0) {
                $('div.spTuongTu').append(listCategoryHTMLProduct);
                main.eventAddCart();
            }
            else{
                $('div.spTuongTu').append('<h5>Không có sản phẩm tương tự</h5>')
            }
        }
    },
    eventAddCart : function(){
        $('.addCart').unbind(); //xóa toàn bộ sự kiện của class addCart.
        $('.addCart').click(function(event){
            event.preventDefault(); // Ngăn chặn hành vi mặc định (điều hướng).
            event.stopPropagation(); // Ngăn chặn sự kiện click lan ra các thẻ cha. (vì thẻ cha div class = 'des' có sự kiện chuyển trang sproduct)
            let getProductById = arrayProducts.find(x => x.id == $(this).data("id"))
            var x = localStorage.getItem("cart");
            if(typeof x != 'undefined' && x != null){
                let listCartLocal = JSON.parse(x);
                let getIndex = listCartLocal.findIndex(x => x.id == getProductById.id);
                if(getIndex != -1){
                    listCartLocal[getIndex].quantity += 1;
                }else{
                    getProductById.quantity = 1;
                    listCartLocal.push(getProductById);
                }
                localStorage.setItem("cart", JSON.stringify(listCartLocal));
                main.getTotalProduct();
            }else{
                let arrayCart = [];
                getProductById.quantity = 1;
                arrayCart.push(getProductById);
                localStorage.setItem("cart", JSON.stringify(arrayCart));
                main.getTotalProduct();
            };
            alert('Đã thêm vào giỏ hàng')
        })
    },
    eventAddCartOnSproduct : function(){
        $('#addCartButton').click(function(){
            $.ajax({
                type: "GET",
                url: "data.json",
                success: function (data) {
                    alert('Đã thêm vào giỏ hàng');
                    //lấy id trên url
                    const queryString = window.location.search;
                    const urlParams = new URLSearchParams(queryString);
                    const product = urlParams.get('id');
                    
                    var getProduct = data.find(x => x.id == product);
                    console.log(getProduct);
                    
                    var x = localStorage.getItem("cart");
                    var button = document.getElementById('addCartButton');
                    var quantityProduct = parseInt(button.parentElement.querySelector('input').value, 10);
                    console.log(quantityProduct);
                    if(typeof x != 'undefined' && x != null){
                        let listCartLocal = JSON.parse(x);
                        let getIndex = listCartLocal.findIndex(x => x.id == getProduct.id);
                        if(getIndex != -1){
                            //if sản phẩm đã có trong giỏ rồi:
                            listCartLocal[getIndex].quantity = parseInt(listCartLocal[getIndex].quantity, 10) + quantityProduct;        
                            localStorage.setItem("cart", JSON.stringify(listCartLocal));
                            main.getTotalProduct();
                        }else{
                            //else sản phẩm chưa có trong giỏ, thêm mới:
                            getProduct.quantity = quantityProduct;
                            listCartLocal.push(getProduct);
                            localStorage.setItem("cart", JSON.stringify(listCartLocal));
                            main.getTotalProduct();
                            main.showListCart();
                            main.totalCart();
                        }
                    }else{
                        let arrayCart = [];
                        getProduct.quantity = quantityProduct;
                        arrayCart.push(getProduct);
                        localStorage.setItem("cart", JSON.stringify(arrayCart));
                        main.getTotalProduct();
                    };
                }
        })
    })},
    //cập nhật số hàng trong giỏ
    getTotalProduct : function(){
        var x = localStorage.getItem("cart");
        if(typeof x != 'undefined' && x != null){
            let listCartLocal = JSON.parse(x);
            let total = 0;
            for (let i = 0; i < listCartLocal.length; i++) {
                total += listCartLocal[i].quantity;
            }
            $('span.totalProduct').html(total); //html: xóa nội dung cũ, thay bằng nội dung truyền vào.
        }
    },
    showListCart : function(){
        var x = localStorage.getItem("cart");
        if(typeof x != 'undefined' && x != null){
            let listCart = JSON.parse(x);
            var listCartHTML = '';
            for (let i = 0; i < listCart.length; i++) {
                listCartHTML += 
                `
                <tr>
                    <td><i class="fa-solid fa-x" id="delete-all"></i></td>
                    <td><img src="assets/imgs/products/`+listCart[i].img+`" alt=""></td>
                    <td>`+listCart[i].name+`</td>
                    <td>`+listCart[i].price+`</td>
                    <td>
                        <div class="quantity-selector">
                        <button id="decrease">-</button>
                        <input id="count" type="number" value="${listCart[i].quantity}" min="0">
                        <button id="increase">+</button>
                        </div>
                    </td>
                    <td>`+listCart[i].quantity*listCart[i].price+`</td>
                </tr>
                `
            }
            $('#cart table tbody').html(listCartHTML);
        }

    },
    totalCart: function () {
        var x = localStorage.getItem("cart");
        if (typeof x != 'undefined' && x != null) {
            let listCart = JSON.parse(x);
            let totalCart = 0;
            for (let i = 0; i < listCart.length; i++) {
                totalCart += listCart[i].quantity * listCart[i].price;
            }
            let HTMLTotalCart = `
                <tr>
                    <td>Tổng thu</td>
                    <td>$${totalCart}</td>
                </tr>
                <tr>
                    <td>Phí chuyển hàng</td>
                    <td>Miễn phí</td>
                </tr>
                <tr>
                    <td>Mã giảm giá</td>
                    <td>Không có mã giảm giá</td>
                </tr>
                <tr>
                    <td>Tổng</td>
                    <td>$${totalCart}</td>
                </tr>
            `;
        $('table.totalCart').html(HTMLTotalCart);
            //main.discountFunction(totalCart);
        }
    },
    
    // discountFunction: function (totalCart) {
    //     $.ajax({
    //         type: "GET",
    //         url: "/discount.json",
    //         success: function (discount) {
    //             var discount_button = $('.coupon div button');
    //             var discount_input = $('.coupon div input');
    //             var keys = [];
    //             var values = {};
    
    //             // Lấy các key và giá trị tương ứng từ discount.json
    //             discount.forEach(function (obj) {
    //                 for (var key in obj) {
    //                     if (obj.hasOwnProperty(key)) {
    //                         keys.push(key);
    //                         values[key] = obj[key];
    //                     }
    //                 }
    //             });
    
    //             discount_button[0].addEventListener('click', function () {
    //                 var discount_data = discount_input[0].value;
    //                 var temp = '';
    
    //                 // Kiểm tra mã giảm giá
    //                 for (let i = 0; i < keys.length; i++) {
    //                     if (keys[i] == discount_data) {
    //                         temp = keys[i];
    //                         break;
    //                     }
    //                 }
    
    //                 if (temp) {
    //                     var discount_value = values[temp];
    //                     totalCart = totalCart - (totalCart * discount_value);
    //                     alert('Mã giảm giá hợp lệ. Tổng số tiền sau giảm giá: $' + totalCart);
                        
    //                     let HTMLTotalCart = `
    //                         <tr>
    //                             <td>Tổng thu</td>
    //                             <td>$${totalCart}</td>
    //                         </tr>
    //                         <tr>
    //                             <td>Phí chuyển hàng</td>
    //                             <td>Miễn phí</td>
    //                         </tr>
    //                         <tr>
    //                             <td>Mã giảm giá</td>
    //                             <td>${discount_data}</td>
    //                         </tr>
    //                         <tr>
    //                             <td>Tổng</td>
    //                             <td>$${totalCart}</td>
    //                         </tr>
    //                     `;
    //                     $('table.totalCart').html(HTMLTotalCart);
    //                 } else {
    //                     alert('Mã giảm giá không hợp lệ.');
    //                 }
    //             });
    //         },
    //         error: function (jqXHR, textStatus, errorThrown) {
    //             console.error('Error:', textStatus, errorThrown);
    //         }
    //     });
    // },
    
    eventChangeProductQuantity: function(){
        $.ajax({
            type: "GET",
            url: "data.json",
            success: function (data) {
                /*chỗ này phải sử dụng delegation cho table để gán sự kiện cho các element, nếu k sẽ gặp lỗi 'sự kiện
                chỉ kích hoạt 1 lần' khi hàm success của ajax được kích hoạt. Khi tăng hoạt giảm số lượng product, thì
                product đó k còn là product cũ, nên k đc gắn sự kiện nữa. Nên ta phải gắn sự kiện vào phần tử cha
                k bị thay đổi
                */ 
                $('.product-table').on('click', '#decrease', function(){
                    var row = $(this).closest('tr');
                    var img = row.find('td').eq(1);
                    var imgSrc = img.find('img').attr('src');
                    var imgName = imgSrc.split('/').pop();
                    var getProduct = data.find(x => x.img == imgName);
                    
                    var x = localStorage.getItem("cart");
                    var listCartLocal = JSON.parse(x);
                
                    for (var i = 0; i < listCartLocal.length; i++) {
                        if(listCartLocal[i].id == getProduct.id){  
                            if(listCartLocal[i].quantity > 0){ 
                                listCartLocal[i].quantity--;
                            }
                            if(listCartLocal[i].quantity == 0){
                                var check = confirm('Xóa sản phẩm này?');
                                if(check){
                                    listCartLocal.splice(i, 1); 
                                }else{
                                    listCartLocal[i].quantity = 1;
                                }
                            }
                            break;
                        }
                    }
                    
                    localStorage.setItem("cart", JSON.stringify(listCartLocal));
                    main.getTotalProduct();
                    main.showListCart();
                    main.totalCart();
                });
                
                $('.product-table').on('click', '#increase', function(){
                    let row = $(this).closest('tr'); 
                    let img = row.find('td').eq(1);
                    let imgSrc = img.find('img').attr('src');
                    console.log(imgSrc);
                    let imgName = imgSrc.split('/').pop();
                    var getProduct = data.find(x => x.img == imgName);
                    
                    var x = localStorage.getItem("cart");
                    let listCartLocal = JSON.parse(x);
    
                    for (let i = 0; i < listCartLocal.length; i++) {
                        if(listCartLocal[i].id == getProduct.id){  
                            listCartLocal[i].quantity++;
                            break;
                        }
                    }   
                    localStorage.setItem("cart", JSON.stringify(listCartLocal));
                    main.getTotalProduct();
                    main.showListCart();
                    main.totalCart();
                });
                
                $('.product-table').on('click', '#count', function(){
                    var getCountProducts = parseInt(document.getElementById('count').value);
                    let row = $(this).closest('tr'); 
                    let img = row.find('td').eq(1);
                    let imgSrc = img.find('img').attr('src');
                    let imgName = imgSrc.split('/').pop();
                    var getProduct = data.find(x => x.img == imgName);
                    
                    var x = localStorage.getItem("cart");
                    let listCartLocal = JSON.parse(x);
    
                    for (let i = 0; i < listCartLocal.length; i++) {
                        if(listCartLocal[i].id == getProduct.id){
                            if(listCartLocal[i].quantity != 0){
                                listCartLocal[i].quantity = getCountProducts;
                                
                            }else{
                                var check = confirm('Xóa sản phẩm này?');
                                if(check){
                                    listCartLocal.splice(i, 1); 
                                }else{
                                    listCartLocal[i].quantity = 1;
                                }
                            }
                            break;
                        }
                    }   
                    localStorage.setItem("cart", JSON.stringify(listCartLocal));
                    main.getTotalProduct();
                    main.showListCart();
                    main.totalCart();
                })
            }
        })
    },

    //delete - all products
    deleteAllProducts : function(){
            $.ajax({
                type: "GET",
                url: "data.json",
                success: function (data) {
                    $('.product-table').on('click', '#delete-all', function(){
                        let row = $(this).closest('tr');                        
                        let img = row.find('td').eq(1);                      
                        let imgSrc = img.find('img').attr('src');                       
                        let imgName = imgSrc.split('/').pop();                      
                        var getProduct = data.find(x => x.img == imgName);
                        var x = localStorage.getItem("cart");
                        let listCartLocal = JSON.parse(x);
                        for(let i = 0; i < listCartLocal.length; i++){
                            if(listCartLocal[i].id == getProduct.id){
                                var checkDelete = confirm('Xóa sản phẩm này?');
                                if(checkDelete){
                                    listCartLocal.splice(i, 1);
                                }
                                break;
                            }
                        }
                        localStorage.setItem("cart", JSON.stringify(listCartLocal));
                        main.getTotalProduct();
                        main.showListCart();
                        main.totalCart();
                    })
            }
        })
    }
    
}



