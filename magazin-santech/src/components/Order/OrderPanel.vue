<template>
    <v-card>
        <v-card-title>
            <v-container>
                <v-row>
                    <v-col cols="4" lg="4"
                    >
                        <v-menu
                                ref="menu1"
                                v-model="menu1"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                        v-model="Startdate"
                                        label="Знайти від"
                                        hint="MM/DD/YYYY format"
                                        persistent-hint

                                        prepend-icon="mdi-calendar"
                                        v-bind="attrs"

                                        v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                    v-model="Startdate"
                                    locale="ru-ru"
                                    no-title
                                    @input="menu1 = false"
                            ></v-date-picker>
                        </v-menu>

                    </v-col>

                    <v-col cols="4" lg="4"
                    >
                        <v-menu
                                v-model="menu2"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                        v-model="endDate"
                                        label="до"
                                        hint="MM/DD/YYYY format"
                                        persistent-hint
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                    v-model="endDate"
                                    no-title
                                    locale="ru-ru"
                                    @input="menu2 = false"
                            ></v-date-picker>
                        </v-menu>

                    </v-col>
                    <v-col cols="4" lg="4">
                        <v-btn
                                class="mx-2"
                                fab
                                dark
                                color="indigo"
                                @click="saveOrder()"
                        >
                            <v-icon dark>
                                mdi-plus
                            </v-icon>
                        </v-btn>
                        <v-btn
                                class="mx-2"
                                fab
                                dark
                                color="indigo"
                                v-if="Arhive==false"
                                @click="getArhive()"
                        >
                            <v-icon dark>
                                fa-archive
                            </v-icon>
                        </v-btn>
                        <v-btn
                                class="mx-2"
                                fab
                                dark
                                v-if="Arhive==true"
                                @click="getArhive()"
                        >
                            <v-icon dark>
                                fa-archive
                            </v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>


        </v-card-title>
        <v-expansion-panels>
            <v-expansion-panel v-for="(item,i) in GET_AXIOS_ORDERS" :key="i">

                <v-expansion-panel-header>
                    <h4 v-if="item.order.in_stock == false" style="color: red">Накладана за {{item.order.timestamp | moment("dddd, MMMM Do YYYY H:mm")}}</h4>
                    <h4 v-if="item.order.in_stock == true" style="color: green">Накладана за {{item.order.timestamp | moment("dddd, MMMM Do YYYY H:mm")}}</h4>
                </v-expansion-panel-header>

                <v-expansion-panel-content>

                    <v-container class="grey lighten-5">

                        <v-row no-gutters>
                            <v-col cols="12" sm="4">
                                <v-card outlined tile>
                                    <order-modal :order_id="item.id" :orderProp="item.order"></order-modal>
                                </v-card>
                            </v-col>
                        </v-row>

                        <v-row no-gutters>
                            <v-col cols="12" sm="12">
                                <v-card outlined tile id="order-print">
                                    <order-table :orderItem="item.prod"></order-table>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-container>

                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-card>
</template>
<script>
    export default {

        data: vm => ({
            Arhive:false,
            endDate:'',
            Startdate:'',
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            dateFormatted: vm.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
            menu1: false,
            menu2: false,
        }),
        mounted(){
            this.$store.dispatch("GET_AXIOS_ORDERS")
        },
        computed: {
            GET_AXIOS_ORDERS(){
                return this.$store.getters.ORDERS
            },

            computedDateFormatted () {
                return this.formatDate(this.date)
            },
        },

        watch: {
            Arhive(){
                this.$store.dispatch("GET_AXIOS_ORDERS",{
                    endDate:this.endDate,
                    Startdate:this.Startdate,
                    archive: this.Arhive
                })
            },
            Startdate(nv){
                this.$store.dispatch("GET_AXIOS_ORDERS",{
                    endDate:this.endDate,
                    Startdate:this.Startdate,
                    archive: this.Arhive
                })
                console.log(nv)
            },
            endDate(nv){
                this.$store.dispatch("GET_AXIOS_ORDERS",
                    {
                        endDate:this.endDate,
                        Startdate:this.Startdate,
                        archive: this.Arhive
                    })
                console.log(nv)
            },
            GET_AXIOS_ORDERS(nv){
                console.log("GET_AXIOS_ORDERS",nv)
            },
            date (val) {
                this.dateFormatted = this.formatDate(this.date)
            },
        },

        methods: {
            getArhive(){

                this.Arhive == false ?this.Arhive = true:this.Arhive = false;
                console.log(this.Arhive)
            },
            saveOrder(){
                this.$store.dispatch('POST_AXIOS_ORDER',{timestamp:new Date()})
            },

            formatDate (date) {
                if (!date) return null

                const [year, month, day] = date.split('-')
                return `${month}/${day}/${year}`
            },
            parseDate (date) {
                if (!date) return null

                const [month, day, year] = date.split('/')
                return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
            },
        },
    }
</script>