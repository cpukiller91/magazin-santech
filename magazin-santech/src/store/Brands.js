
import Axios from 'axios'

export default ({
    state: {
        BRANDS:[],
        BRAND:[]
    },
    mutations: {
        BRAND(state, payload){
            state.BRAND = payload
        },
        BRANDS(state, payload){
            state.BRANDS = payload
        },
    },
    actions: {
        GET_AXIOS_BRANDS: async (context,data) => {
            let GET_SKU_PRODUCT =  await Axios.get('/brands',data);

            if(GET_SKU_PRODUCT.data.length > 0){
                console.log("GET_AXIOS_PRODUCTS+++__",GET_SKU_PRODUCT)
                context.commit("PRODUCTS",GET_SKU_PRODUCT.data)
            }

        },

        GET_BRAND: async (context,data) => {
            let diagnostic =  await Axios.get('/brands',data);
            context.commit("BRAND",diagnostic.data)
            return diagnostic.data
        },

        UPDATE_AXIOS_BRAND: async (context,data) => {
            let diagnostic =  await Axios.put('/brands/'+data.id,data);
        },

        SAVE_AXIOS_BRANDS: async (context,data) => {
            let diagnostic =  await Axios.post('/brands',data);

            //const yahooOnly = diagnostic.data.products.filter( element => element.SD00000006.main.balance == 254);
            // diagnostic.data.products.forEach((element,index) => {
            //   if(index > 3){
            //     console.log("diagnostic",element)
            //   }
            //
            // })
            // for (const [key, value] of Object.entries(diagnostic.data.products)) {
            //   console.log(`${key}: ${value}`,value);
            // }
            // var size = Object.keys(diagnostic.data.products).length;
            // console.log( typeof diagnostic.data.products,size)

        }
    },
    getters: {
        BRANDS: state => {
            return state.BRANDS;
        },
        BRAND: state => {
            return state.BRAND;
        }
    },
    modules: {
    }
})
