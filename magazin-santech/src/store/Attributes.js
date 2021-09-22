
import Axios from 'axios'

export default ({
    state: {
        ATTRIBUTES:[],
        ATTRIBUTE_NAME:[]
    },
    mutations: {
        ATTRIBUTES(state, payload){
            state.ATTRIBUTES = payload
        },
        ATTRIBUTE_NAME(state, payload){
            state.ATTRIBUTE_NAME = payload
        },
    },
    actions: {
        GET_AXIOS_ATTRIBUTES: async (context,data) => {
            let GET_SKU_PRODUCT =  await Axios.get('/properpties',data);

            if(GET_SKU_PRODUCT.data.length > 0){
                console.log("GET_AXIOS_PRODUCTS+++__",GET_SKU_PRODUCT)
                //context.commit("PRODUCTS",GET_SKU_PRODUCT.data)
            }

        },

        GET_AXIOS_ATTRIBUTE_NAME: async (context,data) => {
            let GET_AXIOS_ATTRIBUTE_NAME =  await Axios.get('/properpties',data);
            context.commit("ATTRIBUTE_NAME",GET_AXIOS_ATTRIBUTE_NAME.data)
            return GET_AXIOS_ATTRIBUTE_NAME.data
        },

        UPDATE_AXIOS_ATTRIBUTES: async (context,data) => {
            let diagnostic =  await Axios.put('/properpties/'+data.id,data);
        },

        SAVE_AXIOS_ATTRIBUTES: async (context,data) => {
            let diagnostic =  await Axios.post('/properpties',data);

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
        ATTRIBUTES: state => {
            return state.ATTRIBUTES;
        }
    },
    modules: {
    }
})
