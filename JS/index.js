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




        const loader = getCurrentInstance().appContext.config.globalProperties.$loading.show();

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


const detailModal = {
    data() {
        return {
            detailModal: '',
            singleProductData: {}


            // {
            //     "category": "測試分類",
            //     "content": "測試的說明",
            //     "description": "測試的描述",
            //     "id": "-MrhCXn8N0VBiu74YuNa",
            //     "imageUrl": "https://images.unsplash.com/photo-1516550135131-fe3dcb0bedc7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=621e8231a4e714c2e85f5acbbcc6a730&auto=format&fit=crop&w=600&q=80",
            //     "imagesUrl": ["https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1924&q=80", "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80", "https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1948&q=80", "https://images.unsplash.com/photo-1617093727343-374698b1b08d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80", "https://images.unsplash.com/photo-1511914265872-c40672604a80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1867&q=80"],
            //     "is_enabled": 1,
            //     "num": 3,
            //     "origin_price": 1000,
            //     "price": 500,
            //     "title": "測試的產品",
            //     "unit": "單位"
            // }



        }
    },
    mounted() {
        this.detailModal = new bootstrap.Modal(document.querySelector('#detailModal'))
    },

    template: `
<div class="modal fade" id="detailModal" data-bs-backdrop="static" data-bs-keyboard="false"  tabindex="-1" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-lg  modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header bg-dark text-white ">
                <h5 class="modal-title"> {{ singleProductData.title}} </h5>
                <button type="button" class="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-lg-6">
                        <img :src="singleProductData.imageUrl">
                    </div>
                    <div class="col-lg-6 d-flex flex-column justify-content-between">
                    <div>
                        <span class="badge bg-primary mb-3"> {{singleProductData.category}} </span>
                                <p class="mb-3">{{singleProductData.description}}</p>
                                <p> NT$ {{singleProductData.price}} <del>{{singleProductData.origin_price}}</del> </p>
                    
                    </div>
                             
                    <button type="button" class="btn btn-primary" @click="$parent.addToCart( { product_id :singleProductData.id,qty:1,singleProductData})">加入購物車</button>
                    
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>`

};

// 購物清單
productApp.component('product-list', {
    props: ['propProductData'],
    emits: ['emit-refresh-carts'],
    template: '#productList',
    components: {
        detailModal
    },
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
    watch: {
        propProductData() {
            this.productData = [...this.propProductData]
        }
    },
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