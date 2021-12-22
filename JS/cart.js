import {
    createApp
} from './vendors/vue3/vue.esm-browser.js';


import {
    getCart,
    //   postCart,
    putCart,
    deletetCart,
    deletetAllCart
} from "./api.esm.js"

import {
    cartComponent
} from "./component.esm.js"


const cartApp = createApp({

    data() {
        return {
            cartList: {}
        }
    },
    created() {
        getCart()
            .then((result) => {

                this.cartList = result.data.data;

                console.log(this.cartList);

            }).catch((err) => {
                console.dir(err)
            });


    },

})

cartApp.component('cart-table', cartComponent)


// cartApp.component('cart-table', {
//     props: ['propCartData'],
//     template: "#cart-table",
//     data() {
//         return {
//             cartData: {}
//         }
//     },
//     watch: {
//         propCartData() {
//             this.cartData = {
//                 ...this.propCartData
//             }
//         },
//     }
// })

cartApp.mount("#vue-shpopping-cart");


// {
//     "final_total": 1000,
//     "id": "-MrVBmPEN1qbFpJunFlX",
//     "item": {
//         "category": "測試分類",
//         "content": "測試的說明",
//         "description": "測試的描述",
//         "id": "-MqiYjhik4spWUVuMLqS",
//         "imageUrl": "https://images.unsplash.com/photo-1516550135131-fe3dcb0bedc7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=621e8231a4e714c2e85f5acbbcc6a730&auto=format&fit=crop&w=1352&q=80",
//         "imagesUrl": ["https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80", "https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1948&q=80", "https://images.unsplash.com/photo-1617093727343-374698b1b08d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"],
//         "is_enabled": 1,
//         "num": 6,
//         "origin_price": 1000,
//         "price": 500,
//         "title": "測試的產品1",
//         "unit": "單位"
//     },
//     "product": {
//         "category": "測試分類",
//         "content": "測試的說明",
//         "description": "測試的描述",
//         "id": "-MqiYjhik4spWUVuMLqS",
//         "imageUrl": "https://images.unsplash.com/photo-1516550135131-fe3dcb0bedc7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=621e8231a4e714c2e85f5acbbcc6a730&auto=format&fit=crop&w=1352&q=80",
//         "imagesUrl": ["https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80", "https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1948&q=80", "https://images.unsplash.com/photo-1617093727343-374698b1b08d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"],
//         "is_enabled": 1,
//         "num": 5,
//         "origin_price": 1000,
//         "price": 500,
//         "title": "測試的產品1",
//         "unit": "單位"
//     },
//     "product_id": "-MrVBmPEN1qbFpJunFlX",
//     "qty": 2,
//     "total": 1000
// }