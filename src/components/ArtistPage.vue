<template>
  <div>
    <div v-if="!albumClickedOn">
      <div>
        <h1>{{artist}}</h1>
      </div>

      <v-container>
        <v-row dense>
          <v-col v-for="album in artistInfo" :key="album.albumID" :cols="4">
            <v-card v-on:click="albumClicked(album.albumID, album.album)">
              <v-img :src="album.imageURL" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="auto" width="auto"></v-img>
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
      <Comments :commentsPackage="this.commentsPackage" :loggedInUserName="this.loggedInUserName"></Comments>
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
    clickedAlbumID: '',
    commentsPackage: []
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
      var tracks = [];
      window.console.log(result);
      for (var i = 0; i < result.length; i++) {
        tracks[i] = result[i].name;
      }
      return tracks;
    },
    async albumClicked(albumID, albumName) {
      this.albumClickedOn = true;
      var tracks = await this.getAlbumData(albumID);
      this.commentsPackage = [albumID, this.artist, this.loggedInUserName, tracks, albumName];
    }
  },
  async mounted() {
    await this.getArtistInfo(this.artistID);
  }
};

</script>

