import {
    getCart,
    postCart,
    putCart,
    deletetCart,
    deletetAllCart
} from "./api.esm.js"






// 購物車模組，在 cart.html、index.html 皆會使用到
const cartComponent = {
    props: ['propShoppingCart'],
    data() {
        return {
            parent: this.$parent,
            finalTotal: 0
        }
    },
    template: "#shopping-cart",
    watch: {
        propShoppingCart() {
            this.finalTotal = this.propShoppingCart.final_total
        }
    },

}

// 購物車 - 刪除單筆資料
const $on_deleteCart = (deleteMsg, a) => {
    console.log(deleteMsg.data.id);
    console.log(a);
    deletetCart(deleteMsg.data.id)
        .then((res) => {
            swal("成功!", `已刪除產品${deleteMsg.data.title}`, "success")
            console.log(res);
            return getCart();
        })
        .catch((err) => {
            console.log(err);
        })
        .then((result) => {
            console.log(result);
            deleteMsg.parent.cartsList = result.data.data
        })
}

// 購物車 - 修改單筆資料的數量
const $on_changeQty = (qtyObj) => {
    console.log(qtyObj);
    if (qtyObj.data.qty === 0) {
        swal('發生錯誤 !', '不能將數字改為 0 ', 'error');
        return;
    }
    putCart(qtyObj.data.product_id, {
            "data": qtyObj.data
        }).then((result) => {
            swal('成功修改數量 !', `已將該數量改成  ${result.data.data.qty} `, `${result.data.success ? 'success' :''}`)

            return getCart();

        }).catch((err) => {
            console.dir(err);
        })
        .then((result) => {
            // 購物車物件抓 this.parent.cartsList
            qtyObj.parent.cartsList = result.data.data
        })
}



export {

    cartComponent,

    // 工具 funciotn
    $on_deleteCart, // 刪除購物車
    $on_changeQty // 修改購物車數量

}