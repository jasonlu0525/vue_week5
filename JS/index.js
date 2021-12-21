import {
    createApp
} from './vendors/vue3/vue.esm-browser.js';

import {
    getProduct,
    getCart,
    postCart,
    deletetAllCart
} from "./api.esm.js";

// deletetAllCart().then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.dir(err)
// })

const productApp = createApp({
    data() {
        return {
            productList: [],
            pagination: [],
            cartsList: []
        }
    },
    created() {
        // 取得產品 ( 預設是取第一頁 )
        getProduct().then((result) => {
            // 頁碼 物件
            this.pagination = result.data.pagination;
            this.productList = result.data.products
            console.log(result);
        }).catch((err) => {
            console.dir(err);
        })

        // 取得購物車 
        getCart().then((result) => {
            this.cartsList = result.data.data
            console.log(result);
        }).catch((err) => {
            console.dir(err);
        })
    },
    methods: {
        // 觸發換頁
        $on_changePages(pages) {
            console.log(pages);
            getProduct(pages).then((result) => {

                this.pagination = result.data.pagination;
                this.productList = result.data.products
                console.log(result);
            }).catch((err) => {
                console.dir(err);
            })
        },
        // 加入購物車之後 更新 this.cartsList，並且把更新後的 this.cartsList 資料以 props 傳入 shopping-cart 元件
        $on_refreshShoppingCart(newData) {
            console.log(newData);
            getCart().then((result) => {
                this.cartsList = result.data.data
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
        }
    },
    methods: {
        addToCart(productObj) {
            console.log(productObj);
            postCart({
                    data: productObj
                })
                .then((res) => {
                    console.log(res);

                    this.$emit('emit-refresh-carts'); // 加入購物車之後觸發 emit，傳到 ROOT 執行  $on_refreshShoppingCart()
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

// 購物車 offcanvas
productApp.component('shopping-cart', {
    props: ['propShoppingCart'],
    data() {
        return {
            finalTotal: 0
        }
    },
    template: "#shopping-cart",
    watch: {
        propShoppingCart() {
            this.finalTotal = this.propShoppingCart.final_total


        }
    },
})


productApp.mount('#vue-product-list');

// {
//     "final_total": 5,
//     "id": "-MrNH_9-5ElL2v1fImn8",
//     "item": {
//         "category": "1111",
//         "content": "",
//         "description": "",
//         "id": "-MqwIZIVI7x4sz-JDjVY",
//         "imageUrl": "https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1924&q=80",
//         "imagesUrl": ["https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1924&q=80", "https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1924&q=80", "https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1924&q=80", "https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1924&q=80"],
//         "is_enabled": 1,
//         "num": 1,
//         "origin_price": 1,
//         "price": 1,
//         "title": "1111",
//         "unit": "1"
//     },
//     "product": {
//         "category": "1111",
//         "content": "",
//         "description": "",
//         "id": "-MqwIZIVI7x4sz-JDjVY",
//         "imageUrl": "https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1924&q=80",
//         "imagesUrl": ["https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1924&q=80", "https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1924&q=80", "https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1924&q=80", "https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1924&q=80"],
//         "is_enabled": 1,
//         "num": "",
//         "origin_price": 1,
//         "price": 1,
//         "title": "1111",
//         "unit": "1"
//     },
//     "product_id": "-MqwIZIVI7x4sz-JDjVY",
//     "qty": 5,
//     "total": 5
// }