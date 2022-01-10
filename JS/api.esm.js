// 產品內容

const productRequest = axios.create({

    baseURL: "https://vue3-course-api.hexschool.io/v2/api/jason/products"
})

const getProduct = (pages = 1) => productRequest.get(`?page=${pages}`)


// 購物車內容

const cartRequest = axios.create({

    baseURL: "https://vue3-course-api.hexschool.io/v2/api/jason/cart"
})

const getCart = (data) => cartRequest.get('')
const postCart = (data) => cartRequest.post('', data)
const deletetCart = (id) => cartRequest.delete(`/${id}`)
const deletetAllCart = () => cartRequest.delete('s')
const putCart = (id, data) => cartRequest.put(`/${id}`, data)


const payMentRequest = axios.create({

    baseURL: "https://vue3-course-api.hexschool.io/v2/api/jason/order"
})

const postPayMent = (data) => payMentRequest.post('', data);

export {
    // 產品
    getProduct,
    // 購物車
    getCart,
    postCart,
    putCart,
    deletetCart,
    deletetAllCart,
    postPayMent
}