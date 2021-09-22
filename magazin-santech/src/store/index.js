import Vue from 'vue'
import Vuex from 'vuex'
import Products from "./Products";
import Category from "./Category";
import Brands from "./Brands";
import Attributes from "./Attributes";
import ProductProps from "./ProductProps";

Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    Products,
    Category,
    Brands,
    Attributes,
    ProductProps
  }
})
