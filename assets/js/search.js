//sự kiện hover icon search
var iconSearch = document.querySelector('.search-navbar div a i');
var inputSearch = document.querySelector('.search-input');
var searchNavbar = document.querySelector('.search-navbar');

//các phần tử bị xóa trong trang index, shop,...
var remove = document.querySelector('#just-delete');

iconSearch.addEventListener('mouseover', function(){
    Object.assign(inputSearch.style,{
        display: "block"
    });
    Object.assign(searchNavbar.style,{
        border: "2px solid black",
        padding: "0 10px",
        borderRadius: "10px"
    });
});
searchNavbar.addEventListener('onblur', function(){
    Object.assign(inputSearch.style,{
        display: "none"
    });
    Object.assign(searchNavbar.style,{
        border: "none",
        padding: "0",
        borderRadius: "0"
    });
});


//sự kiện click icon search 
iconSearch.addEventListener('click', function(){
    var searchValue = inputSearch.value;
    remove.remove();
    var url = "data.json";
    
    fetch(url)
    .then(function (response) {
        response.json().then(function (data) {
            let listCategoryProduct = [];
            var listCategoryHTMLProduct = '';  
            data.forEach(function(item) {
                if(item.name.toLowerCase().includes(searchValue.toLowerCase().trim())){
                    listCategoryProduct.push(item);
                }
            });
            if (listCategoryProduct.length > 0) {
                listCategoryProduct.forEach(function(item) {
                    listCategoryHTMLProduct +=
                        `
                            <div class="pro" onclick="window.location.href='sproduct.html?id=${item.id}'">
                                <img class="imgs" src="assets/imgs/products/${item.img}" alt="">
                                <div class="des"> <!-- describe: miêu tả -->
                                    <span>Adidas</span>
                                    <a href="#">
                                        <h5>${item.name}</h5>
                                    </a>
                                    <div class="star">
                                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                    </div>
                                    <div class="price">
                                        <p>$${item.price}</p>
                                        <a class="addCart" href="javascript:void(0)" data-id="${item.id}"><i class="fa-solid fa-cart-shopping" style="color: #B197FC;"></i></a>
                                    </div>
                                </div>
                            </div>
                        `
                });
                document.getElementById('search-pro').innerHTML = listCategoryHTMLProduct;
            }
            else { 
                document.getElementById('search-pro').innerHTML = '<h3 class="no-product">Không có sản phẩm nào</h3>';
            }
        });
    })
    .catch(function (error) {
        console.error('Fetch Error:', error);
    });
});


