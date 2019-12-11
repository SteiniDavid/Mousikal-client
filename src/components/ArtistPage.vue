<template>
  <div>
    <div v-if="!albumClickedOn">
      <div>
        <h1>{{artist}}</h1>
      </div>

      <v-container>
        <v-row dense>
          <v-col v-for="album in artistInfo" :key="album.albumID" :cols="4">
            <v-card v-on:click="albumClicked(album.albumID, album.imageURL, album.album)">
              <v-img
                :src="album.imageURL"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="auto"
                width="auto"
              ></v-img>
              <v-card-actions>
                <v-card-title>
                  <span class="title font-weight-light">{{album.album}}</span>
                </v-card-title>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div v-if="albumClickedOn">
      <Comments
        :loggedInUserName="this.loggedInUserName"
        :albumURL="clickedOnInfo[0]"
        :albumName="clickedOnInfo[1]"
        :tracks="this.tracks"
        :artistName="this.artist"
      ></Comments>
    </div>
  </div>
</template>

<script>
import Comments from "@/components/Comments.vue";

import _ from "lodash";
import { getArtistAlbums } from "../api/spotify/spotify";
import { getAlbumTracks } from "../api/spotify/spotify";

export default {
  components: {
    Comments
  },
  props: {
    artistID: String,
    loggedInUserName: String
  },
  data: () => ({
    artist: "",
    artistInfo: [],
    albumClickedOn: false,
    clickedAlbumID: "",
    clickedOnInfo: [],
    tracks: []
  }),
  methods: {
    async getArtistInfo(id) {
      var r = await getArtistAlbums(id);
      this.artistInfo = r;
      this.extractInfo();
    },
    extractInfo() {
      this.artist = this.artistInfo[0].artist;
      this.artistInfo = _.uniqBy(this.artistInfo, "imageURL");
      this.artistInfo = _.uniqBy(this.artistInfo, "album");
    },
    async getAlbumData(albumID) {
      //This is where the api request to get the info of a given album is made.
      //This should set and create the tracklist array and the album cover, maybe some
      //other data to show would be cool.
      let result = await getAlbumTracks(albumID);
      for (var i = 0; i < result.length; i++) {
        this.tracks[i] = result[i].name;
      }
    },
    albumClicked(albumID, imageURL, albumName) {
      this.albumClickedOn = true;
      this.getAlbumData(albumID);
      this.clickedOnInfo[0] = imageURL;
      this.clickedOnInfo[1] = albumName;
    }
  },
  async mounted() {
    await this.getArtistInfo(this.artistID);
  }
};
</script>

