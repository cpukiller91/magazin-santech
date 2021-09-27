<template>
    <v-row justify="center">
        <v-dialog
                v-model="dialog"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-container class="grey lighten-5" style="float: right">
                    <v-btn
                            v-if="orderProp.archive == false"
                            color="primary"
                            dark
                            v-bind="attrs"
                            v-on="on"
                            @click="addItemOrderModal">
                        <v-icon>fa-cart-plus</v-icon>
                    </v-btn>

                    <v-btn  @click="OrderPrint">
                        <v-icon>fa-print</v-icon>
                    </v-btn>

                    <v-btn v-if="orderProp.in_stock == false && orderProp.archive == false"  @click="OrderPlus">
                        <v-icon>fa-plus-square-o</v-icon>
                    </v-btn>

                    <v-btn v-if="orderProp.in_stock == true && orderProp.archive == false"  @click="OrderMinus">
                        <v-icon>fa-minus-square-o</v-icon>
                    </v-btn>

                    <v-btn  v-if="orderProp.archive == false" @click="OrderArchive">
                        <v-icon>fa-archive</v-icon>
                    </v-btn>

                    <v-btn
                            v-if="orderProp.archive == false"
                            color="error"
                            dark
                            @click="OrderDelete"
                    >
                        <v-icon>fa-trash</v-icon>
                    </v-btn>
                </v-container>
            </template>

            <v-card>
                <v-toolbar
                        dark
                        color="primary"
                >
                    <v-btn
                            icon
                            dark
                            @click="dialog = false"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Карточка товара</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn
                                dark
                                text
                                @click="saveOrderItem()"
                        >
                            Сохранить
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>

                <v-divider></v-divider>

                <v-container fluid>

                <v-row>

                    <v-col
                            cols="2"
                    >
                        <v-text-field
                                v-model="sku"
                                color="blue darken-2"
                                label="Код товара"
                                required
                        ></v-text-field>


                    </v-col>

                    <v-col
                            cols="4"
                    >
                        <v-text-field
                            v-model="name"
                                color="purple darken-2"
                                label="Назва товару"
                                required
                        ></v-text-field>
                    </v-col>
                    <v-col
                            cols="3"
                    >
                        <v-select
                                :items="items"
                                label="Група товаров"
                        ></v-select>
                    </v-col>

                    <v-col
                            cols="1"
                    >
                        <v-text-field
                            v-model="order.price_euro"
                            color="purple darken-2"

                            label="€"
                            required
                        ></v-text-field>
                    </v-col>

                    <v-col
                            cols="1"
                    >
                        <v-text-field
                                v-model="order.price_dolar"
                                color="purple darken-2"

                                label="$"
                                required
                        ></v-text-field>
                    </v-col>

                    <v-col
                            cols="1"
                    >
                        <v-text-field
                                v-model="order.price_grn"
                                color="purple darken-2"
                                label="₴"

                                required
                        ></v-text-field>
                    </v-col>

                </v-row>

                <v-row>

                    <v-col
                            cols="2"
                    >
                        <v-select
                                v-model="operation"
                                :items="oType"
                                label="Тип операції"
                        ></v-select>
                    </v-col>

                    <v-col
                            cols="4"
                    >
                        <v-text-field

                                color="purple darken-2"
                                label="Залишок"
                                required
                        ></v-text-field>
                    </v-col>
                    <v-col
                            cols="2"
                    >
                        <v-select
                                v-model="order.type_count"
                                :items="countT"
                                label="Тип фасування"
                        ></v-select>
                    </v-col>

                    <v-col
                            cols="1"
                    >
                        <v-text-field
                                v-model="order.count"
                                color="purple darken-2"
                                label="Кількість"
                                @keyup="summ"
                                @keydown="summ"
                                required
                        ></v-text-field>
                    </v-col>

                    <v-col
                            cols="1"
                    >
                        <v-text-field
                                v-model="order.summa_euro"
                                color="purple darken-2"
                                label="Сума в €"

                                required
                        ></v-text-field>
                    </v-col>

                    <v-col
                            cols="1"
                    >
                        <v-text-field
                                v-model="order.summa_dolar"
                                color="purple darken-2"
                                label="Сума в $"
                                required
                        ></v-text-field>
                    </v-col>

                    <v-col
                            cols="1"
                    >
                        <v-text-field
                                v-model="order.summa_grn"
                                color="purple darken-2"
                                label="Сума в ₴"
                                required
                        ></v-text-field>
                    </v-col>

                </v-row>

                <v-row>

                    <v-col cols="3">
                        <barcode :value="sku">Show this if the rendering fails.</barcode>
                    </v-col>
                    <v-col cols="9">
                        <v-textarea
                            v-model="description"
                                color="teal"
                        >
                            <template v-slot:label>
                                <div>
                                    Опис товару <small>(не обовязково)</small>
                                </div>
                            </template>
                        </v-textarea>
                    </v-col>
                </v-row>

                </v-container>
            </v-card>
        </v-dialog>

    </v-row>
</template>
<script>
    export default {
        props: {
            order_id: Number,
            orderProp: Object,
            in_stock: Boolean,

        },
        data: () => ({

            order:{
                order: 0,
                type_count:'Одиниць',
                count:0,
                product:null,

                price_euro:0.5,
                price_dolar:0.7,
                price_grn:0.10,

                summa_euro:0,
                summa_dolar:0,
                summa_grn:0,
            },
            sku:"SD00023120",
            name:"",
            description:"",

            //cType:"Одиниць",
            operation:"Отримати",
            oType:["Отримати","Видати"],
            countT:['Одиниць',"Упаковок","Грамм","Кілограм","Метрів","Літрів"],
            items:['1',"2"],
            dialog: false,
            notifications: false,
            sound: true,
            widgets: false,

        }),
        mounted() {
           //this.order.product = this.orderProp.id
            //this.$store.dispatch("GET_SKU_PRODUCT")
        },
        watch:{
            SKU_PRODUCT(nv){
                this.description = nv.description
                this.name = nv.name
                this.order.product = nv.id
                //console.log("SKU_PRODUCT",nv, typeof nv.description)
            },
            dialog(nv){
                this.$store.dispatch("GET_SKU_PRODUCT",{
                    params:{
                        sku:this.sku
                    }
                })
            },
            sku(nv){
                this.$store.dispatch("GET_SKU_PRODUCT",{
                    params:{
                        sku:nv
                    }
                })
            },
            // order(nv){
            //     console.log("sasasa",nv)
            // }
        },
        computed:{
            GET_AXIOS_ORDERS(){
                return this.$store.getters.ORDERS
            },
            SKU_PRODUCT(){
                return this.$store.getters.SKU_PRODUCT
            }
        },
        methods:{
            summ(){
                this.order.summa_euro =  Math.round(this.order.price_euro * this.order.count* 10) / 10
                this.order.summa_dolar = Math.round(this.order.price_dolar * this.order.count* 10) / 10
                this.order.summa_grn = Math.round(this.order.price_grn * this.order.count* 10) / 10

            },
            addItemOrderModal(){
                this.order.order = this.orderProp.id
                console.log("-ds-ds-dsd-",this.order)
                // this.$store.dispatch("GET_SKU_PRODUCT",{
                //     params:{
                //         sku:this.sku
                //     }
                // })
                // console.log("addItemOrderModal")
            },
            OrderPlus(){
                this.$store.dispatch("SET_AXIOS_ORDER_In_Stock",{
                    id:this.orderProp.id
                })
            },
            OrderMinus(){
                this.$store.dispatch("SET_AXIOS_ORDER_Out_Stock",{
                    id:this.orderProp.id
                })
            },
            OrderPrint(){
                this.$htmlToPaper('order-print');
                console.log("Print")
            },
            OrderArchive(){
                this.$store.dispatch("SET_AXIOS_ORDER_ARCHIVE",{
                    id:this.orderProp.id
                })
                console.log("OrderArchive")
            },
            OrderDelete(){
                this.$store.dispatch("DELETE_AXIOS_ORDER",{
                    id:this.orderProp.id
                })
            },
            saveOrderItem(){
                this.order.order = this.orderProp.id
                console.log("<>>><",this.order)
                this.$store.dispatch('POST_AXIOS_ORDER_ITEM',this.order)

                //'/order-lists'
                this.dialog = false
            }
        }
    }
</script>