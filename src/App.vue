<template>
  <v-app>
    <v-app-bar app color="green darken-1" dark>
      <v-spacer></v-spacer>
      <v-toolbar-title class="headline">Mousikal</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content class="">
      <br/>
      <LoginRegister/>
    </v-content>
  </v-app>
</template>

<script>
import LoginRegister from "./components/LoginRegister";

export default {
  name: "App",

  components: {
    LoginRegister
  },

  data: () => ({
    //
  })
};
</script>
