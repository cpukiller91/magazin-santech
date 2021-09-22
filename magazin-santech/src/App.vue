<template>

    <v-app id="inspire">
      <v-navigation-drawer
              v-model="drawer"
              app
      >
        <v-container fluid>
        <order-modal></order-modal>
        </v-container>
        <!--  -->
      </v-navigation-drawer>

      <v-app-bar app>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Магазин Сантехніки</v-toolbar-title>
      </v-app-bar>

      <v-main>
        <!-- Provides the application the proper gutter -->
        <v-container fluid>

          <!-- If using vue-router -->
          <router-view></router-view>
        </v-container>
      </v-main>
    </v-app>


</template>

<script>

export default {
  name: 'App',

  data: () => ({
    drawer: false
    //
  }),
};
</script>
