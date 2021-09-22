
import Axios from 'axios'

export default ({
    state: {
        PRODUCT_PROPS:[],
    },
    mutations: {
        PRODUCT_PROPS(state, payload) {
            state.PRODUCT_PROPS = payload
        }

    },
    actions: {
        GET_AXIOS_PRODUCT_PROPS: async (context,data) => {
            let GET_SKU_PRODUCT =  await Axios.get('/product-options',data);
            return GET_SKU_PRODUCT.data;
            // if(GET_SKU_PRODUCT.data.length > 0){
            //     //console.log("GET_AXIOS_PRODUCTS+++__",GET_SKU_PRODUCT)
            //     //context.commit("PRODUCTS",GET_SKU_PRODUCT.data)
            // }

        },
        SET_AXIOS_PRODUCT_PROPS: async (context,data) => {
            let SET_AXIOS_PRODUCT_PROPS =  await Axios.post('/product-options',data);
            return SET_AXIOS_PRODUCT_PROPS.data;


        },
        PUT_AXIOS_PRODUCT_PROPS: async (context,data) => {
            let SET_AXIOS_PRODUCT_PROPS =  await Axios.put('/product-options/'+data.id,data);
            return SET_AXIOS_PRODUCT_PROPS.data;


        }

    },
    getters: {
        PRODUCT_PROPS: state => {
            return state.PRODUCT_PROPS;
        }
    }
})
