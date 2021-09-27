
import Axios from 'axios'

export default ({
    state: {
        ORDERS: [],
        ORDERS_LIST: [],
        ORDER_ITEM: []
    },
    mutations: {
        ORDERS(state, payload){
            state.ORDERS = payload
        },
        ORDERS_LIST(state, payload){
            state.ORDERS_LIST = payload
        },
    },
    actions: {
        GET_AXIOS_ORDERS: async (context,data) => {
            let LIST = []
            let GET_AXIOS_ORDERS =  await Axios.get('/orders',{
                params:{
                    "_sort":"id:DESC"
                },

            });


            GET_AXIOS_ORDERS.data.forEach( async (order) => {
                let GET_AXIOS_ORDER_ITEM =  await Axios.get('/order-lists',{
                    params:{
                        "order.id": order.id,

                    }
                });

                LIST.push({order,prod:GET_AXIOS_ORDER_ITEM.data})
                //console.log("order--------",order.id)
                // context.dispatch("GET_AXIOS_ORDER_ITEM",{
                //     params:{
                //         "order.id": order.id
                //     }
                // })
            })

            context.commit("ORDERS",LIST)



        },
        GET_AXIOS_ORDER_ITEM: async (context,data) => {
            let GET_AXIOS_ORDER_ITEM =  await Axios.get('/order-lists',data);
            context.commit("ORDERS_LIST",GET_AXIOS_ORDER_ITEM.data)
            console.log("GET_AXIOS_ORDER_ITEM__",GET_AXIOS_ORDER_ITEM.data)
            // if(GET_SKU_PRODUCT.data.length > 0){
            //     console.log("GET_AXIOS_PRODUCTS+++__",GET_SKU_PRODUCT)
            //     context.commit("PRODUCTS",GET_SKU_PRODUCT.data)
            // }

        },
        SET_AXIOS_ORDER_ARCHIVE: async (context,data) => {
            let SET_AXIOS_ORDER_ARCHIVE =  await Axios.put('/orders/'+data.id,{
                archive:true
            });
            // context.commit("ORDERS",GET_AXIOS_ORDERS.data)
            context.dispatch("GET_AXIOS_ORDERS")
            console.log("SET_AXIOS_ORDER_ARCHIVE",SET_AXIOS_ORDER_ARCHIVE.data)


        },
        SET_AXIOS_ORDER_In_Stock: async (context,data) => {
            let SET_AXIOS_ORDER_ARCHIVE =  await Axios.put('/orders/'+data.id,{
                in_stock:true
            });
            // context.commit("ORDERS",GET_AXIOS_ORDERS.data)
            context.dispatch("GET_AXIOS_ORDERS")
            console.log("SET_AXIOS_ORDER_In_Stock",SET_AXIOS_ORDER_ARCHIVE.data)


        },
        SET_AXIOS_ORDER_Out_Stock: async (context,data) => {
            let SET_AXIOS_ORDER_ARCHIVE =  await Axios.put('/orders/'+data.id,{
                in_stock:false
            });
            // context.commit("ORDERS",GET_AXIOS_ORDERS.data)
            context.dispatch("GET_AXIOS_ORDERS")
            console.log("SET_AXIOS_ORDER_Out_Stock",SET_AXIOS_ORDER_ARCHIVE.data)


        },

        GET_ORDER_LIST: async (context,data) => {
            let GET_ORDER_LIST =  await Axios.get('/order-lists/', data);
            context.commit("GET_ORDER_LIST",GET_ORDER_LIST.data)
            return GET_ORDER_LIST.data
            //console.log("ORDER_ITEM",GET_AXIOS_ORDER_ITEM.data)
            // if(GET_SKU_PRODUCT.data.length > 0){
            //     console.log("GET_AXIOS_PRODUCTS+++__",GET_SKU_PRODUCT)
            //     context.commit("PRODUCTS",GET_SKU_PRODUCT.data)
            // }

        },
        POST_AXIOS_ORDER: async (context,data) => {
            let POST_AXIOS_ORDER = await Axios.post('/orders',data);
            console.log("POST_AXIOS_ORDER",data)
            context.dispatch("GET_AXIOS_ORDERS")
            return POST_AXIOS_ORDER;
        },
        DELETE_AXIOS_ORDER: async (context,data) => {
            let DELETE_AXIOS_ORDER = await Axios.delete('/orders/'+data.id);
            console.log("DELETE_AXIOS_ORDER",DELETE_AXIOS_ORDER)
            context.dispatch("GET_AXIOS_ORDERS")
            return DELETE_AXIOS_ORDER;
        },

        DELETE_AXIOS_ORDER_ITEM: async (context,data) => {
            let DELETE_AXIOS_ORDER_ITEM = await Axios.delete('/order-lists/'+data.id);
            console.log("DELETE_AXIOS_ORDER_ITEM",DELETE_AXIOS_ORDER_ITEM)
            context.dispatch("GET_AXIOS_ORDERS")
            return DELETE_AXIOS_ORDER_ITEM;
        },

        POST_AXIOS_ORDER_ITEM: async (context,data) => {
            let POST_AXIOS_ORDER_ITEM = await Axios.post('/order-lists',data);
            console.log("POST_AXIOS_ORDER_ITEM",POST_AXIOS_ORDER_ITEM)
            context.dispatch("GET_AXIOS_ORDERS")
            return POST_AXIOS_ORDER_ITEM;
        }

    },
    getters: {
        ORDERS: state => {
            return state.ORDERS;
        },
        ORDERS_LIST: state => {
            return state.ORDERS_LIST;
        },
    },
    modules: {

    }
})