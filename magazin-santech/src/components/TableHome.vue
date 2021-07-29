<template>
  <v-data-table
          :headers="headers"
          :items="desserts"
          sort-by="calories"
          class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
              flat
      >


        <template>
          <v-container fluid>
            <v-combobox
                    style="width: 600px; padding-top:30px;"
                    v-model="model"
                    :filter="filter"
                    :hide-no-data="!search"
                    :items="items"
                    :search-input.sync="search"
                    hide-selected
                    label="Search for an option"
                    multiple
                    small-chips
                    solo
            >
              <template v-slot:no-data>
                <v-list-item>
                  <span class="subheading">Create</span>
                  <v-chip
                          :color="`${colors[nonce - 1]} lighten-3`"
                          label
                          small
                  >
                    {{ search }}
                  </v-chip>
                </v-list-item>
              </template>
              <template v-slot:selection="{ attrs, item, parent, selected }">
                <v-chip
                        v-if="item === Object(item)"
                        v-bind="attrs"
                        :color="`${item.color} lighten-3`"
                        :input-value="selected"
                        label
                        small
                >
          <span class="pr-2">
            {{ item.text }}
          </span>
                  <v-icon
                          small
                          @click="parent.selectItem(item)"
                  >
                    $delete
                  </v-icon>
                </v-chip>
              </template>
              <template v-slot:item="{ index, item }">
                <v-text-field
                        v-if="editing === item"
                        v-model="editing.text"
                        autofocus
                        flat
                        background-color="transparent"
                        hide-details
                        solo
                        @keyup.enter="edit(index, item)"
                ></v-text-field>
                <v-chip
                        v-else
                        :color="`${item.color} lighten-3`"
                        dark
                        label
                        small
                >
                  {{ item.text }}
                </v-chip>
                <v-spacer></v-spacer>
                <v-list-item-action @click.stop>
                  <v-btn
                          icon
                          @click.stop.prevent="edit(index, item)"
                  >
                    <v-icon>{{ editing !== item ? 'mdi-pencil' : 'mdi-check' }}</v-icon>
                  </v-btn>
                </v-list-item-action>
              </template>
            </v-combobox>
          </v-container>
        </template>

        <v-spacer></v-spacer>
        <v-text-field
                style="width: 300px; padding-top:30px;"
                v-model="sku"
                v-on:keyup="SKU"
                v-on:keyup.enter="SKUSend"
                ref="sku"
                label="Штрих код"
                required
        ></v-text-field>
        <v-divider
                class="mx-4"
                inset
                vertical
        ></v-divider>

        <v-dialog
                v-model="dialog"
                max-width="700px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"

            >
              Новий товар
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
                          md="12"
                  >
                    <v-text-field
                            v-model="editedItem.title"
                            label="Назва Товару"
                    ></v-text-field>
                  </v-col>
                  <v-col
                          cols="12"
                          sm="6"
                          md="5"
                  >
                    <v-text-field
                            v-model="editedItem.sku"
                            label="Sku"
                    ></v-text-field>
                  </v-col>

                  <v-col
                          cols="12"
                          sm="6"
                          md="5"
                  >
                    <v-text-field
                            v-model="editedItem.price"
                            label="Ціна"
                    ></v-text-field>
                  </v-col>
                  <v-spacer></v-spacer>

                  <div id="SKUprint" @click="print" v-if="editedItem.sku">
                      <barcode :value="editedItem.sku">Show this if the rendering fails.</barcode>
                  </div>

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
                Закрити
              </v-btn>
              <v-btn
                      color="blue darken-1"
                      text
                      @click="save"
              >
                Зберегти
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="700px">
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
    </template>
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
</template>

<script>
  import * as Printjs from "print-js";
  import VueBarcode from 'vue-barcode';
  export default {
    components: {
      'barcode': VueBarcode
    },
    data: () => ({
      delID:null,
      title:null,
      sku:null,
      activator: null,
      attach: null,
      colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
      editing: null,
      editingIndex: -1,
      items: [
        { header: 'Select an option or create one' }
      ],
      nonce: 1,
      menu: false,
      model: [],
      x: 0,
      search: null,
      y: 0,

      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'SKU',
          align: 'start',
          sortable: false,
          value: 'sku',
        },
        { text: 'Назва Товару', value: 'title' },
        { text: 'Категорія', value: 'categories' },
        { text: 'Ціна', value: 'price' },
        // { text: 'Protein (g)', value: 'protein' },
        { text: 'Дії', value: 'actions', sortable: false },
      ],
      desserts: [],
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
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Новий товар' : 'Відреагувати товар'
      },
    },
    sockets: {
      connect: function () {
        console.log('socket connected');

        this.sockets.subscribe('product', (productData) => {

          // productData.forEach((element) => {
          //   console.log(element)
          //
          // })
          this.desserts = productData;
          console.log(productData)
          //this.msg = data.message;
        });

        this.sockets.subscribe('categories', (categoriesData) => {

          categoriesData.forEach((element) => {
            console.log("->",element)
            this.items.push({id:element.id,text:element.title,color: element.color});
          })
          // this.categories = categoriesData;
          console.log("categoriesData",this.items)
          //this.msg = data.message;
        });

      },
      customEmit: function (data) {
        //data.emit("test","dsdssd")
        //io.emit("customEmit", "sdsdds")
        console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
      }
    },
    mounted(){
      this.focusInput();
      this.$socket.emit('test', "dsds")

    },
    watch: {
      model (val, prev) {
        if (val.length === prev.length) return

        this.model = val.map(v => {
          if (typeof v === 'string') {
            v = {
              text: v,
              color: this.colors[this.nonce - 1],
            }
            this.$http.post('/categories/', {

              title: v.text,
              color: this.colors[this.nonce - 1]

            })
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
            console.log("parent add")
            this.items.push(v)

            this.nonce++
          }

          return v
        })
      },
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      print(){
        printJS({
          printable: "SKUprint",
          type: "HTML"
        });
        //this.$htmlToPaper('SKUprint');
        console.log("print")
      },
      focusInput() {
        this.$refs.sku.focus();
      },
      SKUSend(){

        console.log("Sku Send->",this.sku);
        this.editedItem.sku = this.sku;
        //
        this.dialog = true;
      },
      SKU(){
        console.log("Sku",this.sku);

      },
      initialize () {
        // this.desserts = [
        //   {
        //     sku: 212121221,
        //     title:"Frozen Yogurt",
        //     categories:"Category1"
        //   }
        //
        // ]
      },
      edit (index, item) {

        if (!this.editing) {


          this.editing = item
          this.editingIndex = index
        } else {
          console.log("edit",item)

          this.$http.put('/categories/'+item.id, {
            title: item.text
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

          this.editing = null
          this.editingIndex = -1
        }
      },
      filter (item, queryText, itemText) {
        if (item.header) return false

        const hasValue = val => val != null ? val : ''

        const text = hasValue(itemText)
        const query = hasValue(queryText)

        return text.toString()
                .toLowerCase()
                .indexOf(query.toString().toLowerCase()) > -1
      },
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.delID = item.id;
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.$http.delete('/products/'+this.delID)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
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
          this.$http.put('/products/'+this.editedItem.id, {
            sku: this.editedItem.sku,
            title: this.editedItem.title,
            price: this.editedItem.price
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
          console.log("Edit",this.editedItem)

          //Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          console.log("New")
          this.$http.post('/products', {
            sku: this.editedItem.sku,
            title: this.editedItem.title,
            price: this.editedItem.price
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
          //this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>
