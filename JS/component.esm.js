import {
    getCart,
    postCart,
    putCart,
    deletetCart,
    deletetAllCart
} from "./api.esm.js"


const {
    getCurrentInstance,
} = Vue;



//啟用 vue-loading-overlay

const vue_loading_overlay = VueLoading.Plugin;




// 購物車模組，在 cart.html、index.html 皆會使用到




// 購物車 - 刪除單筆資料
const on_deleteCart = (deleteMsg, a) => {
    console.log(deleteMsg.data.id);
    console.log(a);
    const loader = deleteMsg.parent.appContext.config.globalProperties.$loading.show();

    deletetCart(deleteMsg.data.id)
        .then((res) => {
            loader.hide();
            swal("成功!", `已刪除產品${deleteMsg.data.title}`, "success")
            console.log(res);
            return getCart();
        })
        .catch((err) => {
            console.log(err);
        })
        .then((result) => {
            console.log(result);
            console.log(deleteMsg.parent);
            deleteMsg.parent.setupState.cartsList = result.data.data
        })
}

// 購物車 - 修改單筆資料的數量
const on_changeQty = (qtyObj) => {
    console.log(qtyObj);
    if (qtyObj.data.qty === 0) {
        swal('發生錯誤 !', '不能將數字改為 0 ', 'error');
        return;
    }
    console.log(qtyObj.parent);
    const loader = qtyObj.parent.appContext.config.globalProperties.$loading.show();
    putCart(qtyObj.data.product_id, {
            "data": qtyObj.data
        }).then((result) => {
            loader.hide()
            swal('成功修改數量 !', `已將該數量改成  ${result.data.data.qty} `, `${result.data.success ? 'success' :''}`)

            return getCart();

        }).catch((err) => {
            console.dir(err);
        })
        .then((result) => {
            console.log(result, qtyObj.parent);
            // 購物車物件抓 this.parent.cartsList
            console.log(qtyObj.parent.setupState);
            qtyObj.parent.setupState.cartsList = result.data.data
            // qtyObj.parent.data.cartsList = result.data.data
        })
}


const cartComponent = {
    props: ['propShoppingCart'],
    emits: ["emit-changeQty", "emit-deleteCart","emit-change-qty","emit-delete-cart"],
    template: "#shopping-cart",

    setup(props, {
   
    }) {
        const {
            propShoppingCart
        } = props;

console.log(propShoppingCart);

        const parent = getCurrentInstance().parent;

        console.log(parent);



        return {
            parent,
     
        }

    }
}



export {
    //啟用 vue-loading-overlay 
    vue_loading_overlay,

    cartComponent,

    // 工具 funciotn
    on_deleteCart, // 刪除購物車
    on_changeQty // 修改購物車數量

}