
import Axios from 'axios'

export default ({
    state: {
        SKU_PRODUCT:[],
        PRODUCTS:[],
        PRODUCT:[]
    },
    mutations: {
        SKU_PRODUCT(state, payload){
            state.SKU_PRODUCT = payload
        },
        PRODUCTS(state, payload){
            state.PRODUCTS = payload
        },
        PRODUCT(state, payload){
            state.PRODUCT = payload
        },
    },
    actions: {
        GET_AXIOS_PRODUCTS: async (context,data) => {
            let GET_SKU_PRODUCT =  await Axios.get('/products',data);

            if(GET_SKU_PRODUCT.data.length > 0){
                console.log("GET_AXIOS_PRODUCTS+++__",GET_SKU_PRODUCT)
                context.commit("PRODUCTS",GET_SKU_PRODUCT.data)
            }

        },
        GET_SKU_PRODUCT: async (context,data) => {
            let GET_SKU_PRODUCT =  await Axios.get('/products',data);

            if(GET_SKU_PRODUCT.data.length > 0){
                console.log("GET_SKU_PRODUCT_Action",GET_SKU_PRODUCT)
                context.commit("SKU_PRODUCT",GET_SKU_PRODUCT.data[0])
            }

        },

        GET_PRODUCT_ORDER_LIST: async (context,data) => {
            let GET_PRODUCT_ORDER_LIST =  await Axios.get('/products',data);

            if(GET_PRODUCT_ORDER_LIST.data.length > 0){
                //console.log("GET_PRODUCT_ORDER_LIST_ACTION",GET_PRODUCT_ORDER_LIST.data[0])
                context.commit("PRODUCT",GET_PRODUCT_ORDER_LIST.data[0])
                //return true
            }
            //return false
        },

        ROOT_CATEGORY(state, getters, rootState, rootGetters) {
            return rootGetters['CATEGORY']
        },

        GET_PRODUCT: async (context,data) => {
            let diagnostic = await Axios.get('http://localhost:8080/sandi.json', {
                params: {
                    //"products.SD00000006.main.balance": 254
                }
            });

            var i = 0;
            var iCategory = 0, importCategory = false, brands = false, attributes = false
            var limit = 800
            var curentPage = 14

            var size = Object.keys(diagnostic.data.products).length;
            var page = size / limit
            var step = limit * curentPage
            if(attributes){

                for (const [key, value] of Object.entries(diagnostic.data.attributes)) {

                    var filter = {
                        title: value.uk,
                        ref_id: key
                    }

                    let properpties = await Axios.get('/properpties', {params: filter});

                    if (properpties.data.length == 0) {

                        context.dispatch("SAVE_AXIOS_ATTRIBUTES", {
                            title: value.uk,
                            ref_id: key,

                        })

                    }else {
                        context.dispatch("UPDATE_AXIOS_ATTRIBUTES", {
                            id: properpties.data[0].id,
                            title: value.uk,
                            ref_id: key,

                        })
                    }
                    console.log(value.uk)
                }
            }

            if(brands){
                for (const [key, value] of Object.entries(diagnostic.data.brands)) {
                    var filter = {
                        name: value.name,
                        ref_id: key,
                    }
                    let count = await Axios.get('/brands', {params: filter});
                    console.log("brands", filter,count)

                    if (count.data.length == 0) {
                        context.dispatch("SAVE_AXIOS_BRANDS", {
                            name: value.name,
                            image: value.image,
                            ref_id: key,

                        })

                    }else {
                        //filter.push({id:count.data[0].id})
                        context.dispatch("UPDATE_AXIOS_BRAND", {
                            id: count.data[0].id,
                            ref_id: key,
                            name: value.name.uk,
                            image: value.image,
                        })
                    }
                }
            }

            if (importCategory) {

                console.log("Category", diagnostic.data)

                for (const [key, value] of Object.entries(diagnostic.data.categories)) {
                    var filter = {
                        name: value.name.uk
                    }
                    let count = await Axios.get('/categories', {params: filter});

                    if (count.data.length == 0) {
                        context.dispatch("SAVE_AXIOS_CATEGORY", {
                            parent_ref: value.parent_ref,
                            name: value.name.uk,
                            image_src: value.image,
                            ref_id:key
                        })

                    } else {
                        //filter.push({id:count.data[0].id})
                        context.dispatch("UPDATE_AXIOS_CATEGORY", {
                            id: count.data[0].id,
                            parent_ref: value.parent_ref,
                            name: value.name.uk,
                            image_src: value.image,
                            ref_id:key
                        })

                        console.log("Category update", {
                            id: count.data[0].id,
                            parent_ref: value.parent_ref,
                            name: value.name.uk,
                            image_src: value.image,
                        })
                        //console.log(filter)
                        //console.log(`${key}:`, value, count.data[0].id, value, count.data.length);
                    }


                }
            }

            for (const [key, value] of Object.entries(diagnostic.data.products)) {

                var filter = {
                    sku:key
                }

                if(i <= step) {
                    if (i > step - limit ){

                        let count = await Axios.get('/products', {params: filter});

                        var CATEGORY = await context.dispatch("GET_CATEGORY",{
                            params:{
                               ref_id:value.main.category
                            }
                        })
                        var GET_BRAND = await context.dispatch("GET_BRAND",{
                            params:{
                                ref_id:value.main.brand
                            }
                        })

                        console.log("GET_BRAND",value.main.brand)
                        var product_id

                        if (count.data.length == 0) {

                            var SAVE_AXIOS_PRODUCT = await context.dispatch("SAVE_AXIOS_PRODUCT", {
                                sku: key,
                                name: value.main.name.uk,
                                vendorCode: value.main.vendorCode,
                                description: value.main.description.uk,

                                image_prew:  value.images.main,
                                category: CATEGORY[0]?CATEGORY[0].id:null,
                                brand: GET_BRAND[0]?GET_BRAND[0].id:null,

                            })
                            //console.log(SAVE_AXIOS_PRODUCT.id)
                            product_id = SAVE_AXIOS_PRODUCT
                        }
                        else {
                            //filter.push({id:count.data[0].id})
                            product_id = count.data[0].id
                            context.dispatch("UPDATE_AXIOS_PRODUCT", {
                                category: CATEGORY[0]?CATEGORY[0].id:null,
                                brand: GET_BRAND[0]?GET_BRAND[0].id:null,
                                id: product_id,
                                image_prew:  value.images.main,
                                sku: key,
                                name: value.main.name.uk,
                                vendorCode: value.main.vendorCode,
                                description: value.main.description.uk
                            })


                        }
                        // console.log(filter)
                        console.log(
                            "product_id__",product_id,
                            value.images.main,
                            value.main.category,
                            value.main.brand,
                        );
                        for (const [key, attp] of Object.entries(value.attributes)) {

                            var GET_AXIOS_ATTRIBUTE_NAME = await context.dispatch("GET_AXIOS_ATTRIBUTE_NAME", {
                                params: {
                                    ref_id: key
                                }
                            })

                            //------------------NAME-Option------------------

                            console.log( "properpty",GET_AXIOS_ATTRIBUTE_NAME[0].id)

                            var GET_AXIOS_PRODUCT_PROPS = await context.dispatch("GET_AXIOS_PRODUCT_PROPS", {
                                params: {
                                    //properpty: GET_AXIOS_ATTRIBUTE_NAME[0].id,
                                    //value: attp.uk,
                                    ref_id: key,
                                    product: product_id
                                }
                            })
                            // console.log( "properpty",
                            //     GET_AXIOS_ATTRIBUTE_NAME[0].id,
                            //     GET_AXIOS_PRODUCT_PROPS)

                            //
                            if (GET_AXIOS_PRODUCT_PROPS.length == 0) {

                                var SET_AXIOS_PRODUCT_PROPS = await context.dispatch("SET_AXIOS_PRODUCT_PROPS",{
                                    properpty: GET_AXIOS_ATTRIBUTE_NAME[0].id,
                                    value: attp.uk,
                                    ref_id: key,
                                    product: product_id
                                })
                                console.log("GET_AXIOS_PRODUCT_PROPS INSERT", SET_AXIOS_PRODUCT_PROPS)
                            }
                            // else{
                            //     context.dispatch("PUT_AXIOS_PRODUCT_PROPS",{
                            //         id:GET_AXIOS_PRODUCT_PROPS[0].id,
                            //         properpty: GET_AXIOS_ATTRIBUTE_NAME[0].id,
                            //         value: attp.uk,
                            //         ref_id: key,
                            //         product: product_id
                            //     })
                            //     console.log("GET_AXIOS_PRODUCT_PROPS UPDATE", GET_AXIOS_PRODUCT_PROPS[0].id)
                            // }

                        }
                    }
                    //filter.delete();
                }else{
                    break;
                }


                i++;
            }


        },

        UPDATE_AXIOS_PRODUCT: async (context,data) => {
            let diagnostic =  await Axios.put('/products/'+data.id,data);
        },

        SAVE_AXIOS_PRODUCT: async (context,data) => {
            let diagnostic =  await Axios.post('/products',data);
            return diagnostic.data
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
        SKU_PRODUCT: state => {
            return state.SKU_PRODUCT;
        },
        PRODUCTS: state => {
            return state.PRODUCTS;
        },
        PRODUCT: state => {
            return state.PRODUCT;
        }
    },
    modules: {
    }
})
