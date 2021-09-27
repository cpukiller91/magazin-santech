<template>
    <v-simple-table>
        <template v-slot:default>
            <thead>
            <tr>
                <th class="text-left">
                    Назва товару
                </th>
                <th class="text-left">
                    Тип фасування
                </th>
                <th class="text-left">
                    Кількість
                </th>

                <th class="text-left">
                    €
                </th>
                <th class="text-left">
                    $
                </th>
                <th class="text-left">
                    ₴
                </th>

                <th class="text-left">
                    Сумма €
                </th>
                <th class="text-left">
                    Сумма $
                </th>
                <th class="text-left">
                    Сумма ₴
                </th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            <tr
                    v-for="item in orderItem"
                    :key="item.id"
            >
                <td>{{ item.product.name }}</td>
                <td>{{ item.type_count }}</td>

                <td>{{ item.count }}</td>

                <td>{{ item.price_euro }}</td>
                <td>{{ item.price_dolar }}</td>
                <td>{{ item.price_grn }}</td>

                <td>{{ Math.round(item.price_euro * item.count * 10) / 10 }}</td>
                <td>{{  Math.round(item.price_dolar * item.count * 10) / 10 }}</td>
                <td>{{  Math.round(item.price_grn * item.count * 10) / 10 }}</td>
                <td> <v-btn

                        color="error"
                        dark
                        @click="OrderListDelete(item.id)"
                >
                    <v-icon>fa-trash</v-icon>
                </v-btn></td>
            </tr>
            </tbody>
        </template>
    </v-simple-table>
</template>
<script>
    export default {
        props: {
            orderItem: Array
        },
        mounted(){
        //this.init()
            //console.log("Table->",this.orderItem.id)
            // this.$store.dispatch("GET_AXIOS_ORDER_ITEM",{
            //     params:{
            //         "order.id": this.orderItem.id
            //     }
            // })
        },
        computed:{
            ORDERS_LIST(){
                return this.$store.getters.ORDERS_LIST
            }
        },
        watch:{
            ORDERS_LIST(nv){
                //this.init()
                console.log("namePORDERS_LISTroduct",nv)
            }
        },
        methods:{

            OrderListDelete(delID){
                this.$store.dispatch("DELETE_AXIOS_ORDER_ITEM",{id:delID})
                console.log("OrderListDelete",delID)
            }
        },
        data: vm => ({

            LIST:[]
        })
    }
</script>