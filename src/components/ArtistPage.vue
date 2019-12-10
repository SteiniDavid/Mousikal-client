<template>
  <div>
    <div v-if="!albumClickedOn">
      <div>
        <h1>{{artist}}</h1>
      </div>

      <v-container>
        <v-row dense>
          <v-col v-for="album in artistInfo" :key="album.albumID" :cols="4">
            <v-card v-on:click="albumClicked(album.albumID)">
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
                <!-- <v-spacer></v-spacer> -->

                <!-- <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>-->
                <!-- </v-btn> -->
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div v-if="albumClickedOn">
      <Comments :commentsPackage="this.commentsPackage"></Comments>
    </div>
  </div>
</template>

<script>
import Comments from "@/components/Comments.vue";

import _ from "lodash";
import { getArtistAlbums } from "../api/spotify/spotify";
export default {
  components: {
    Comments
  },
  props: {
    artistID: String
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
    albumClicked(albumID) {
      this.albumClickedOn = true;
      this.commentsPackage = [albumID, this.artist, 'Takoda'];
    }
  },
  async mounted() {
    await this.getArtistInfo(this.artistID);
  }
};

</script>

