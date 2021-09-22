<template>
    <v-row justify="center">
        <v-dialog
                v-model="dialog"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                        color="primary"
                        dark
                        v-bind="attrs"
                        v-on="on"
                >
                    Open Dialog
                </v-btn>
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
                                @click="dialog = false"
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

                                color="purple darken-2"
                                label="€"
                                required
                        ></v-text-field>
                    </v-col>

                    <v-col
                            cols="1"
                    >
                        <v-text-field

                                color="purple darken-2"
                                label="$"
                                required
                        ></v-text-field>
                    </v-col>

                    <v-col
                            cols="1"
                    >
                        <v-text-field

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
                                v-model="cType"
                                :items="countT"
                                label="Тип фасування"
                        ></v-select>
                    </v-col>

                    <v-col
                            cols="1"
                    >
                        <v-text-field

                                color="purple darken-2"
                                label="Кількість"
                                required
                        ></v-text-field>
                    </v-col>

                    <v-col
                            cols="1"
                    >
                        <v-text-field

                                color="purple darken-2"
                                label="Сума в €"
                                required
                        ></v-text-field>
                    </v-col>

                    <v-col
                            cols="1"
                    >
                        <v-text-field

                                color="purple darken-2"
                                label="Сума в $"
                                required
                        ></v-text-field>
                    </v-col>

                    <v-col
                            cols="1"
                    >
                        <v-text-field

                                color="purple darken-2"
                                label="Сума в ₴"
                                required
                        ></v-text-field>
                    </v-col>

                </v-row>

                <v-row>
                    <v-col cols="12">
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
        data: () => ({

            sku:"SD00023120",
            name:"",
            description:"",

            cType:"Одиниць",
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
            //this.$store.dispatch("GET_SKU_PRODUCT")
        },
        watch:{
            SKU_PRODUCT(nv){
                this.description = nv.description
                this.name = nv.name
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
            }
        },
        computed:{
            SKU_PRODUCT(){
                return this.$store.getters.SKU_PRODUCT
            }
        },
        methods:{

        }
    }
</script>