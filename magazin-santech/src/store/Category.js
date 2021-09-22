
import Axios from 'axios'

export default ({
    state: {
        CATEGORY:[],
        CATEGORYS:[]
    },
    mutations: {
        CATEGORY(state, payload){
            state.CATEGORY = payload
        },
        CATEGORYS(state, payload){
            state.CATEGORYS = payload
        },
    },
    actions: {
        GET_AXIOS_CATEGORYS: async (context,data) => {
            let GET_SKU_PRODUCT =  await Axios.get('/categories',data);

            if(GET_SKU_PRODUCT.data.length > 0){
                console.log("GET_AXIOS_PRODUCTS+++__",GET_SKU_PRODUCT)
                context.commit("PRODUCTS",GET_SKU_PRODUCT.data)
            }

        },

        GET_CATEGORY: async (context,data) => {
            let GET_CATEGORY =  await Axios.get('/categories',data);
            context.commit("CATEGORY",GET_CATEGORY.data)
            return GET_CATEGORY.data

        },

        UPDATE_AXIOS_CATEGORY: async (context,data) => {
            let diagnostic =  await Axios.put('/categories/'+data.id,data);
        },

        SAVE_AXIOS_CATEGORY: async (context,data) => {
            let diagnostic =  await Axios.post('/categories',data);

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
        CATEGORY: state => {
            return state.CATEGORY;
        }
    },
    modules: {
    }
})
