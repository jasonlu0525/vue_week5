import {
    createApp
} from './vendors/vue3/vue.esm-browser.js';

import {
    getProduct,
    getCart,
    postCart
} from "./axios.esm.js";


console.log(axios.baseUrl);


/*

category:"2222"
description:""
id:"-MqdftLK5julnz4IKj1Z"
imagesUrl:Array[2]
is_enabled:1
num:13
origin_price:2222
price:1
title:"44444"
unit:"11"


*/


const productApp = createApp({
    data() {
        return {
            productList: [],
            pagination: []
        }
    },
    created() {
        getProduct().then((result) => {
            this.pagination = result.data.pagination;
            this.productList = result.data.products
            console.log(result);
        }).catch((err) => {
            console.dir(err);
        })
    },
    methods: {
        $emit_changePages(pages) {
            console.log(pages);
            getProduct(pages).then((result) => {

            console.log(result.data.pagination, result.data.products);
                this.pagination = result.data.pagination;
                this.productList = result.data.products
                console.log(result);
            }).catch((err) => {
                console.dir(err);
            })
        }
    },

})
// pagination:Object
// category:""
// current_page:1
// has_next:true
// has_pre:false
// total_pages:2


// 購物清單
productApp.component('product-list', {
    props: ['propProductData'],
    data() {
        return {
            productData: [],
            qty: 0,
            cartsObj: []
        }
    },
    methods: {
        addToCart(productObj) {
            console.log(productObj);
            postCart({
                    data: productObj
                })
                .then((res) => {
                    swal("感謝您 ", `${res.data.message}，目前購物車內已有 ${res.data.data.qty} 件該產品`, 'success')
                    console.log("成功加入購物車 !", res);
                })
                .catch((err) => {
                    swal("發生錯誤 !", "請再試一次", 'error')
                    console.dir(err);
                })


        }
    },
    template: '#productList',
    created() {
        getCart()
            .then((res) => {
                this.cartsObj = res.data.data
                console.log(res);
            })
            .catch((err) => {
                console.dir(err);
            })
    },
    updated() {
        this.productData = [...this.propProductData]
    
    }


})

// 頁碼
productApp.component('pagination', {
    props: ['propPagination'],
    data() {
        return {

        }
    },
   
    template: "#pagination"

});


productApp.mount('#vue-product-list');