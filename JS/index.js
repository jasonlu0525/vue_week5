

const {
    ref,
    getCurrentInstance
} = Vue

import {
    // 產品
    getProduct,
    // 購物車
    getCart,
    postCart,

} from "./api.esm.js";


import {
    vue_loading_overlay,
    cartComponent,
    on_deleteCart,
    on_changeQty
} from "./component.esm.js"




// const productApp = Vue.createApp({
//     data() {
//         return {
//             productList: [],
//             pagination: [],
//             cartsList: [],

//         }
//     },

//     created() {

//         console.log(VueLoading);
//          const loader=   this.$loading.show();

//         // 取得產品 ( 預設是取第一頁 )
//         getProduct().then((result) => {
//             // 頁碼 物件
//             loader.hide();
//             this.pagination = result.data.pagination;
//             this.productList = result.data.products
//             console.log(result);
//         }).catch((err) => {
//             console.dir(err);
//         })

//         // 取得購物車 
//         getCart().then((result) => {
//             this.cartsList = result.data.data
//             console.log(result);
//         }).catch((err) => {
//             console.dir(err);
//         })
//     },
//     methods: {

//         // 觸發換頁
//         $on_changePages(pages) {
//             console.log(pages);
//             getProduct(pages).then((result) => {

//                 this.pagination = result.data.pagination;
//                 this.productList = result.data.products
//                 console.log(result);
//             }).catch((err) => {
//                 console.dir(err);
//             })
//         },
//         // 加入購物車之後 更新 this.cartsList，並且把更新後的 this.cartsList 資料以 props 傳入 shopping-cart 元件
//         $on_refreshShoppingCart(newData) {
//             console.log(newData);
//             getCart().then((result) => {
//                 this.cartsList = result.data.data
//                 console.log(result);
//             }).catch((err) => {
//                 console.dir(err);
//             })
//         },
//         // 修改購物車數量
//         on_changeQty,
//         // 刪除單筆資料 (外部引入模組)
//         on_deleteCart,

//     }
// })

const productApp = Vue.createApp({
  //  emits:['emit-refresh-carts'],
    setup(props) {

        const productList = ref([]);
        const pagination = ref([]);
        const cartsList = ref([]);

  
      const loader =  getCurrentInstance().appContext.config.globalProperties.$loading.show();

        // 取得產品 ( 預設是取第一頁 )
        getProduct().then((result) => {
            // 頁碼 物件
        loader.hide();
            pagination.value = result.data.pagination;
            productList.value = result.data.products
            console.log(result);
        }).catch((err) => {
            console.dir(err);
        })

        // 取得購物車 
        getCart().then((result) => {
           cartsList.value = result.data.data
            console.log(result);
        }).catch((err) => {
            console.dir(err);
        })

        // 觸發換頁
        function on_changePages(pages) {
            console.log(pages);
            getProduct(pages).then((result) => {

                pagination.value = result.data.pagination;
                productList.value = result.data.products
                console.log(result);
            }).catch((err) => {
                console.dir(err);
            })
        }
        // 加入購物車之後 更新 this.cartsList，並且把更新後的 this.cartsList 資料以 props 傳入 shopping-cart 元件
        function on_refreshShoppingCart(newData) {
            console.log(newData);
            getCart().then((result) => {
                cartsList.value = result.data.data
                console.log(result);
            }).catch((err) => {
                console.dir(err);
            })
        }
        // 修改購物車數量


        return {
            productList,
            pagination,
            cartsList,
            on_changePages,
            on_refreshShoppingCart,
            on_changeQty,
            // 刪除單筆資料 (外部引入模組)
            on_deleteCart,
        }

    }

})






// 購物清單
productApp.component('product-list', {
    props: ['propProductData'],
    emits:['emit-refresh-carts'],
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

                    this.$emit('emit-refresh-carts'); // 加入購物車之後觸發 emit，傳到 ROOT 執行  on_refreshShoppingCart()
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

    watch: {
        propProductData() {
            this.productData = [...this.propProductData]
        }
    },

    // updated() {
    //     this.productData = [...this.propProductData]

    // }


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
productApp.component('shopping-cart', cartComponent)

// 啟用 vue-loading-overlay 套件
productApp.use(vue_loading_overlay);

productApp.mount('#vue-product-list');