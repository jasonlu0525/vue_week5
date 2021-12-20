  const productRequest = axios.create({

      baseURL: "https://vue3-course-api.hexschool.io/v2/api/jason"
  })

  export const getproduct = () => productRequest.get('/products')

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





  // Add a response interceptor