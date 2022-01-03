import {
    createApp,
    getCurrentInstance,
    ref
} from './vendors/vue3/vue.esm-browser.js';


import {
    getCart,
    //   postCart,
    putCart,
    deletetCart,
    deletetAllCart
} from "./api.esm.js"

import {
    vue_loading_overlay,
    cartComponent,

    // 刪除模組，用來接收 emit 事件
    on_deleteCart,
    on_changeQty
} from "./component.esm.js"



Object.keys(VeeValidateRules).forEach(rule => {
    if (rule !== 'default') {
        VeeValidate.defineRule(rule, VeeValidateRules[rule]);
    }
});


VeeValidateI18n.loadLocaleFromURL('./zh_TW.json');

// Activate the locale
VeeValidate.configure({
    generateMessage: VeeValidateI18n.localize('zh_TW'),
    validateOnInput: true, // 調整為輸入字元立即進行驗證
});

const cartApp = createApp({

    setup() {
        const cartsList = ref([]);
        const user = ref({
            email: "",
            name: "",
            phone: "",
            county: "",
            address: ""
        });

        console.log(VueLoading);
        getCart()
            .then((result) => {

                cartsList.value = result.data.data;

            }).catch((err) => {
                console.dir(err)
            });

    
        console.log(VueLoading);

        return {
            cartsList,
            user,
            on_deleteCart,
            on_changeQty

        }
    }

});


// const cartApp = createApp({

//     data() {
//         return {
//             vm: this,
//             cartsList: [],
//             user: {}
//         }
//     },
//     created() {
//         console.log(VueLoading);
//         getCart()
//             .then((result) => {

//                 this.cartsList = result.data.data;

//                 console.log(this.cartLists);

//             }).catch((err) => {
//                 console.dir(err)
//             });

//     },
//     methods: {
//         on_deleteCart,
//         on_changeQty
//     },


// });




cartApp.use(vue_loading_overlay);
cartApp.component('VForm', VeeValidate.Form);
cartApp.component('VField', VeeValidate.Field);
cartApp.component('ErrorMessage', VeeValidate.ErrorMessage);


cartApp.component('cart-table', cartComponent)

cartApp.component('shopping-car-submit-form', {
    template: '#shopping-car-submit-form',
    setup(props) {

        const user = ref({
            email: '',
            name: '',
            address: '',
            phone: '',
            county: '',
        })

        function onSubmit() {
            console.log(user);
        }

        function isPhone(value) {
            const phoneNumber = /^(09)[0-9]{8}$/
            return phoneNumber.test(value) ? true : '需要正確的電話號碼'
        }

        return {
            user,
            onSubmit,
            isPhone
        }
    }
})

// cartApp.component('shopping-car-submit-form', {

//     data() {
//         return {
//             user: {
//                 email: '',
//                 name: '',
//                 address: '',
//                 phone: '',
//                 county: '',
//             }
//         }
//     },
//     methods: {
//         onSubmit() {
//             console.log(this.user);
//         },
//         isPhone(value) {
//             const phoneNumber = /^(09)[0-9]{8}$/
//             return phoneNumber.test(value) ? true : '需要正確的電話號碼'
//         }
//     },
//     template: '#shopping-car-submit-form',

// })


cartApp.mount("#vue-shpopping-cart");