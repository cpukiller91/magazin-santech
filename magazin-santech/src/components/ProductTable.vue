
<template>

    <v-card>
        <v-tabs
                v-model="tab"

                centered
                dark
                icons-and-text
        >
            <v-tabs-slider></v-tabs-slider>

            <v-tab href="#tab-1">
                <v-icon>fa fa-barcode</v-icon> База номенклатури
            </v-tab>

            <v-tab href="#tab-2">
                <v-icon>fa fa-object-group</v-icon> Накладні
            </v-tab>
            <v-tab href="#tab-3">
                <v-icon>fa fa-shopping-basket</v-icon>Наявність на складі
            </v-tab>

        </v-tabs>

        <v-tabs-items v-model="tab">
            <v-tab-item :value="'tab-1'">
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
                    >
                        <!--template v-slot:top>
                            <v-toolbar
                                    flat
                            >
                                <v-toolbar-title>My CRUD</v-toolbar-title>
                                <v-divider
                                        class="mx-4"
                                        inset
                                        vertical
                                ></v-divider>
                                <v-spacer></v-spacer>
                                <v-dialog
                                        v-model="dialog"
                                        max-width="500px"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                                color="primary"
                                                dark
                                                class="mb-2"
                                                v-bind="attrs"
                                                v-on="on"
                                        >
                                            New Item
                                        </v-btn>
                                    </template>
                                    <v-card>
                                        <v-card-title>
                                            <span class="text-h5">{{ formTitle }}</span>
                                        </v-card-title>

                                        <v-card-text>
                                            <v-container>
                                                <v-row>
                                                    <v-col
                                                            cols="12"
                                                            sm="6"
                                                            md="4"
                                                    >
                                                        <v-text-field
                                                                v-model="editedItem.name"
                                                                label="Dessert name"
                                                        ></v-text-field>
                                                    </v-col>
                                                    <v-col
                                                            cols="12"
                                                            sm="6"
                                                            md="4"
                                                    >
                                                        <v-text-field
                                                                v-model="editedItem.calories"
                                                                label="Calories"
                                                        ></v-text-field>
                                                    </v-col>
                                                    <v-col
                                                            cols="12"
                                                            sm="6"
                                                            md="4"
                                                    >
                                                        <v-text-field
                                                                v-model="editedItem.fat"
                                                                label="Fat (g)"
                                                        ></v-text-field>
                                                    </v-col>
                                                    <v-col
                                                            cols="12"
                                                            sm="6"
                                                            md="4"
                                                    >
                                                        <v-text-field
                                                                v-model="editedItem.carbs"
                                                                label="Carbs (g)"
                                                        ></v-text-field>
                                                    </v-col>
                                                    <v-col
                                                            cols="12"
                                                            sm="6"
                                                            md="4"
                                                    >
                                                        <v-text-field
                                                                v-model="editedItem.protein"
                                                                label="Protein (g)"
                                                        ></v-text-field>
                                                    </v-col>
                                                </v-row>
                                            </v-container>
                                        </v-card-text>

                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn
                                                    color="blue darken-1"
                                                    text
                                                    @click="close"
                                            >
                                                Cancel
                                            </v-btn>
                                            <v-btn
                                                    color="blue darken-1"
                                                    text
                                                    @click="save"
                                            >
                                                Save
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                                <v-dialog v-model="dialogDelete" max-width="500px">
                                    <v-card>
                                        <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                            <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                                            <v-spacer></v-spacer>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </v-toolbar>
                        </template-->
                        <template v-slot:item.actions="{ item }">
                            <v-icon
                                    small
                                    class="mr-2"
                                    @click="editItem(item)"
                            >
                                mdi-pencil
                            </v-icon>
                            <v-icon
                                    small
                                    @click="deleteItem(item)"
                            >
                                mdi-delete
                            </v-icon>
                        </template>
                        <template v-slot:no-data>
                            <v-btn
                                    color="primary"
                                    @click="initialize"
                            >
                                Reset
                            </v-btn>
                        </template>
                    </v-data-table>
                </v-card>
            </v-tab-item>
            <v-tab-item :value="'tab-2'">
                <order-panel></order-panel>
            </v-tab-item>
            <v-tab-item :value="'tab-3'">
                <status-table></status-table>
            </v-tab-item>
        </v-tabs-items>
    </v-card>



</template>
<script>
    export default {
        data: () => ({
            tab: null,
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',

            editedIndex: -1,
            editedItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0,
            },
            defaultItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0,
            },

            search:"",
            headers: [
                {
                    text: 'SKU',
                    align: 'start',
                    sortable: false,
                    value: 'sku',
                },
                { text: 'Назва товару', value: 'name' },
                { text: 'Actions', value: 'actions', sortable: false },
                // { text: 'Carbs (g)', value: 'carbs' },
                // { text: 'Protein (g)', value: 'protein' },
                // { text: 'Iron (%)', value: 'iron' },
            ],
            desserts: [],
            dialog: false,
            dialogDelete: false,
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
            },
            formTitle () {
                return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
            },
        },

        mounted() {
            //this.$store.dispatch("GET_PRODUCT")
            this.$store.dispatch("GET_AXIOS_PRODUCTS")
        },
        created () {
            this.initialize()
        },
        methods:{
            initialize () {

            },
            searchData(){
                console.log("watch - GET_AXIOS_PRODUCTS")
                // this.$store.dispatch("GET_AXIOS_PRODUCTS",{
                //     params:{
                //         name: this.search > 0 ? this.search:null
                //     }
                // })
            },
            editItem (item) {
                this.editedIndex = this.desserts.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem (item) {
                this.editedIndex = this.desserts.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialogDelete = true
            },

            deleteItemConfirm () {
                this.desserts.splice(this.editedIndex, 1)
                this.closeDelete()
            },

            close () {
                this.dialog = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
            },

            closeDelete () {
                this.dialogDelete = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
            },

            save () {
                if (this.editedIndex > -1) {
                    Object.assign(this.desserts[this.editedIndex], this.editedItem)
                } else {
                    this.desserts.push(this.editedItem)
                }
                this.close()
            },
        }
    }
</script>