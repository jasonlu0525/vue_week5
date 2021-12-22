// 產品內容

const productRequest = axios.create({

    baseURL: "https://vue3-course-api.hexschool.io/v2/api/jason/products"
})

const getProduct = (pages = 1) => productRequest.get(`?page=${pages}`)

productRequest.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log(response);
    return response
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});



// 購物車內容

const cartRequest = axios.create({

    baseURL: "https://vue3-course-api.hexschool.io/v2/api/jason"
})

const getCart = (data) => cartRequest.get('/cart')
const postCart = (data) => cartRequest.post('/cart', data)
const deletetCart = (id) => cartRequest.delete(`/cart/${id}`)
const deletetAllCart = () => cartRequest.delete('/carts')
const putCart = (id, data) => cartRequest.put(`/cart/${id}`, data)
cartRequest.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log(response);
    return response
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});



export {
    // 產品
    getProduct,
    // 購物車
    getCart,
    postCart,
    putCart,
    deletetCart,
    deletetAllCart
}