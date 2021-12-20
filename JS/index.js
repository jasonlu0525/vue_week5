import {
    createApp
} from './vendors/vue3/vue.esm-browser.js';

import {
    getproduct
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
            productList: []
        }
    },
    created() {
        getproduct().then((result) => {
            this.productList = result.data.products
            console.log(result);
        }).catch((err) => {
            console.dir(err);
        });


    }

})

productApp.mount('#vue-product-list');


console.log(getproduct);