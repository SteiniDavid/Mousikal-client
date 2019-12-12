<template>
  <div align="center">
    <br>
    <div v-if="loggedIn">
      <span class="headline">Logged in as {{this.loggedInUserName}}</span>
      <v-btn style="float:right;" class="mr-4" @click="logOut">Logout</v-btn>
    </div>

    <br>

    <div class="LoginRegistration" v-if="!loggedIn">
      <h1>Registration and Login</h1>
      <br />
      <v-container>
        <v-layout row>
          <v-spacer></v-spacer>
          <v-row>
            <v-card max-width="1000" min-width="400">
              <v-card-title>Register</v-card-title>
              <v-container>
                <v-text-field
                  clearable
                  dense
                  filled
                  outlined
                  v-model="name_register"
                  label="Name"
                  required
                ></v-text-field>
                <v-text-field
                  clearable
                  dense
                  filled
                  outlined
                  v-model="password_register"
                  :type="'password'"
                  label="Password"
                  required
                ></v-text-field>
                <v-text-field clearable dense filled outlined v-model="age" label="Age" required></v-text-field>
                <v-text-field
                  clearable
                  dense
                  filled
                  outlined
                  v-model="favoriteAlbum"
                  label="Favorite Album"
                  required
                ></v-text-field>
              </v-container>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="mr-4" @click="registerAccount">Register</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-row>

          <v-spacer></v-spacer>

          <v-row>
            <v-card max-width="1000" min-width="400">
              <v-card-title>Login</v-card-title>
              <v-container>
                <v-text-field
                  clearable
                  dense
                  filled
                  outlined
                  v-model="name_login"
                  label="Name"
                  required
                ></v-text-field>
                <v-text-field
                  clearable
                  dense
                  filled
                  outlined
                  v-model="password_login"
                  :type="'password'"
                  label="Password"
                  required
                ></v-text-field>
              </v-container>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="mr-4" @click="loginAccount">Login</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-row>
        </v-layout>
        <br />
        <v-alert type="error" v-if="loggedInError">Error logging in</v-alert>
      </v-container>
    </div>
    <v-btn class="mr-4" @click="pushUserInfo">registerthat shit</v-btn>
    <Search :loggedInUserName="this.loggedInUserName" />
  </div>
</template>

<script>
import { createAccount } from "../api/account/Account";
import { login } from "../api/account/Account";
import { getStatus } from "../api/account/Account";
import { addUserInfo } from "../api/account/User";
import { setToken } from "../config/Token";
import Search from "@/components/Search.vue";

export default {
  name: "LoginRegister",

  components: {
    Search
  },
  data: () => ({
    name_register: "",
    password_register: "",
    name_login: "",
    password_login: "",
    error: "",
    loggedIn: false,
    loggedInUserName: "",
    favoriteAlbum: "",
    age: "",
    loggedInError: false
  }),
  methods: {
    async registerAccount() {
      const namePass = {
        name: this.name_register,
        pass: this.password_register
      };
      await createAccount(namePass).then(
        (this.loggedIn = true),
        (this.loggedInUserName = this.name_register),
        await login(namePass).then(
          (this.loggedIn = true),
          (this.loggedInUserName = this.name_register)
        )
      );
    },
    async loginAccount() {
      const namePass = {
        name: this.name_login,
        pass: this.password_login
      };
      if (await login(namePass)) {
        window.console.log("logged in");
        this.loggedIn = true;
        this.loggedInUserName = this.name_login;
        this.loggedInError = false;
      } else {
        window.console.log("failed");
        this.loggedInError = true;
      }
    },
    async logOut() {
      setToken("");
      window.location.reload();
    },
    handleBack() {
      window.location.reload();
    }
  },
  async created() {
    try {
      let res = await getStatus();
      this.loggedIn = true;
      this.loggedInUserName = res.user.name;
    } catch (err) {
      this.loggedIn = false;
      this.loggedInUserName = "Anonymous";
    }
  }
};
</script>
