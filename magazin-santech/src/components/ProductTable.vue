<template>
    <v-card>
        <v-card-title>
            Список товарів
            <v-spacer></v-spacer>
            <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    :keyup="searchData()"

                    single-line
                    hide-details
            ></v-text-field>
        </v-card-title>
        <v-data-table
                :headers="headers"
                :items="desserts"
                :search="search"
        ></v-data-table>
    </v-card>

</template>
<script>
    export default {
        data: () => ({
            search:"",
            headers: [
                {
                    text: 'SKU',
                    align: 'start',
                    sortable: false,
                    value: 'sku',
                },
                { text: 'Назва товару', value: 'name' },
                // { text: 'Fat (g)', value: 'fat' },
                // { text: 'Carbs (g)', value: 'carbs' },
                // { text: 'Protein (g)', value: 'protein' },
                // { text: 'Iron (%)', value: 'iron' },
            ],
            desserts: [],
            dialog: false,
            notifications: false,
            sound: true,
            widgets: false,

        }),

        watch:{
            GET_AXIOS_PRODUCTS(nv){
                this.desserts = nv
                //console.log("watch - GET_AXIOS_PRODUCTS",nv)
            },
            search(nv){
                // console.log("watch - GET_AXIOS_PRODUCTS", nv.length)
                // this.$store.dispatch("GET_AXIOS_PRODUCTS",{
                //     params:{
                //         name: nv.length > 0 ? nv:null
                //     }
                // })
            }
        },

        computed:{
            GET_AXIOS_PRODUCTS(){
                return this.$store.getters.PRODUCTS
            }
        },

        mounted() {
            //this.$store.dispatch("GET_PRODUCT")
            this.$store.dispatch("GET_AXIOS_PRODUCTS")
        },

        methods:{
            searchData(){
                console.log("watch - GET_AXIOS_PRODUCTS")
                // this.$store.dispatch("GET_AXIOS_PRODUCTS",{
                //     params:{
                //         name: this.search > 0 ? this.search:null
                //     }
                // })
            }
        }
    }
</script>