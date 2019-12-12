<template>
  <v-container>
    <div v-if="!artistClickedOn">
      <h1>Search</h1>
      <form>
        <v-text-field filled outlined rounded clearable label="Search" @input="update"></v-text-field>
      </form>
      <div v-for="result in searchResults" :key="result.id">
        <v-list-item two-line v-on:click="artistClicked(result.artistID)">
          <v-list-item-title>{{result.name}}</v-list-item-title>
        <v-img :src='(result.imageURL != null) ? result.imageURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPq_uNbIZWifDjx7OwmUf10m2QcSAIjWByP7UkburP3vNnJ4_8&s"' max-height=75 max-width=75></v-img>
        </v-list-item>
        <br>
      </div>
    </div>
    <div v-if="artistClickedOn">
      <ArtistPage :artistID="this.artistID" :loggedInUserName="this.loggedInUserName" contain></ArtistPage>
    </div>

  </v-container>
</template>

<script>
import ArtistPage from "@/components/ArtistPage.vue";

import _ from "lodash";
import {
  getArtist,
  getArtistAlbums,
  getAlbumTracks
} from "../api/spotify/spotify";
export default {
  components: {
    ArtistPage
  },
  props: {
    loggedInUserName: String
  },
  data: () => ({
    searchResults: [],
    artistID: "776Uo845nYHJpNaStv1Ds4",
    artistClickedOn: false
  }),
  methods: {
    update: _.debounce(async function(e) {
      if (typeof e !== "undefined" && e != "undefined" && e != null) {
        var r = await getArtist(e);
        this.searchResults = r;
        window.console.log(r);
        window.console.log(e);
      }
    }, 200),
    async getAlbum() {
      var r = await getArtistAlbums();
      window.console.log(r);
    },
    artistClicked(id) {
      this.artistClickedOn = true;
      document.getElementById("backButton").hidden = false;
      this.artistID = id;
    },
    async getTracks() {
      var r = await getAlbumTracks();
      window.console.log(r);
    }
  }
};
</script>