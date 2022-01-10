const {
    ref,
    getCurrentInstance
} = Vue

import {
    getCart,
    //   postCart,
    postPayMent
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



const cartApp = Vue.createApp({

    setup() {
        const cartsList = ref([]);


        const loader = getCurrentInstance().appContext.config.globalProperties.$loading.show();

        getCart()
            .then((result) => {
                loader.hide();
                cartsList.value = result.data.data;

            }).catch((err) => {
                console.dir(err)
            });

        function on_clear_cart() {
            cartsList.value.carts = [];
        }


        return {
            cartsList,

            on_deleteCart,
            on_changeQty,

            on_clear_cart

        }
    }

});

cartApp.use(vue_loading_overlay);
cartApp.component('VForm', VeeValidate.Form);
cartApp.component('VField', VeeValidate.Field);
cartApp.component('ErrorMessage', VeeValidate.ErrorMessage);


cartApp.component('cart-table', cartComponent)

cartApp.component('shopping-car-submit-form', {
    props: ['propCartData'],
    template: '#shopping-car-submit-form',
    setup(props, {
        emit
    }) {
        const {
            propCartData
        } = props;

        console.log(propCartData);

        const user = ref({
            email: '',
            name: '',
            address: '',
            tel: '',

        })
        const message = ref('');

        const current = getCurrentInstance().appContext.config.globalProperties
        // getCurrentInstance() is only avaliable in setup and lifecycle hooks  https://github.com/vuejs/composition-api/issues/455
        console.log(getCurrentInstance());

        function onSubmit(values,{
            resetForm
        }) {


            const loader = current.$loading.show();




            postPayMent({
                    data: {
                        user: user.value,
                        message: message.value
                    }

                }).then((res) => {
                    console.log(res);
                    if (res.data.success) {

                        swal(res.data.message, `訂單標號 : ${res.data.orderId} <br> 訂單建立時間 : ${( res.data.create_at*1000).toLocaleString()}`, 'success')
                        emit('emit-clear-cart');
                    }
                })
                .catch((err) => {
                    console.dir(err);
                    loader.hide();
                    swal(`${err.response.data.message}`, ``, 'error');
                }).then(() => {
                    loader.hide();
                    // the onSubmit handler receives an additional FormActions object in the second argument 
                    //that allows you do some actions on the form after submissions
                    resetForm(); // 內建方法
                });
        }

        function isPhone(value) {
            const phoneNumber = /^(09)[0-9]{8}$/
            return phoneNumber.test(value) ? true : '需要正確的電話號碼'
        }

        return {
            propCartData,
            user,
            message,
            onSubmit,
            isPhone
        }
    }
})

cartApp.mount("#vue-shpopping-cart");