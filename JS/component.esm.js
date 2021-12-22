

// import {
//     getCart,
//     postCart,
//     putCart,
//     deletetCart,
//     deletetAllCart
// } from "./api.esm.js"






// 購物車模組，在 cart.html、index.html 皆會使用到
const cartComponent = {
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
    // updated() {
    //     this.finalTotal = this.propShoppingCart.final_total
    // },
}

// const $on_deleteCart = (qtyObj,appnedData="cartsList") =>{
//     console.log(qtyObj);
//             if (qtyObj.qty === 0) {
//                 return
//             }
//             putCart(qtyObj.product_id, {
//                     "data": qtyObj
//                 }).then((result) => {
//                     swal('成功修改數量 !',`已將該數量改成  ${result.data.data.qty} `,`${result.data.success ? 'success' : " "}`)

//                     return getCart();

//                 }).catch((err) => {
//                     console.dir(err);
//                 })
//                 .then((result) => {
//                     this[appnedData] = result.data.data
                   
//                 })
// }


export {

    cartComponent,

    // 工具 funciotn
   // $on_deleteCart,


}