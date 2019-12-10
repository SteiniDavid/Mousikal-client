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
    artistAlbums: [
      {
        album: "Songs For Groovy Children: The Fillmore East Concerts",
        imageURL:
          "https://i.scdn.co/image/7e269ae7ce69e976f0a4ceed8d56de82c03f4410"
      },
      {
        album:
          "At Last...The Beginning - The Making Of Electric Ladyland: The Early Takes Sampler",
        imageURL:
          "https://i.scdn.co/image/ab67616d0000b273791919fe19e699093629643f"
      },
      {
        album: "Freedom: Atlanta Pop Festival (Live)",
        imageURL:
          "https://i.scdn.co/image/ab67616d0000b2731a9909a62934d5a80a73152e"
      },
      {
        album: "Miami Pop Festival",
        imageURL:
          "https://i.scdn.co/image/ab67616d0000b27366c6ff06b078ac4d76af7e0e"
      },
      {
        album: "People, Hell & Angels",
        imageURL:
          "https://i.scdn.co/image/ab67616d0000b2733dbc906bf1b195a875bcfc97"
      },
      {
        album: "Winterland",
        imageURL:
          "https://i.scdn.co/image/ab67616d0000b27382f614e9a1555d5aa78fbce1"
      }
    ],
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

// album: "Songs For Groovy Children: The Fillmore East Concerts"
// artist: "Jimi Hendrix"
// artistID: "776Uo845nYHJpNaStv1Ds4"
// imageURL: "https://i.scdn.co/image/7e269ae7ce69e976f0a4ceed8d56de82c03f4410"
// __proto__: Object
// 1:
// album: "At Last...The Beginning - The Making Of Electric Ladyland: The Early Takes Sampler"
// artist: "Jimi Hendrix"
// artistID: "776Uo845nYHJpNaStv1Ds4"
// imageURL: "https://i.scdn.co/image/ab67616d0000b273791919fe19e699093629643f"
// __proto__: Object
// 2:
// album: "Both Sides of the Sky"
// artist: "Jimi Hendrix"
// artistID: "776Uo845nYHJpNaStv1Ds4"
// imageURL: "https://i.scdn.co/image/ab67616d0000b2731a9909a62934d5a80a73152e"
// __proto__: Object
// 3:
// album: "Freedom: Atlanta Pop Festival (Live)"
// artist: "Jimi Hendrix"
// artistID: "776Uo845nYHJpNaStv1Ds4"
// imageURL: "https://i.scdn.co/image/ab67616d0000b273f9f9cc10a1a532c3b6bc358a"
// __proto__: Object
// 4:
// album: "Miami Pop Festival"
// artist: "Jimi Hendrix"
// artistID: "776Uo845nYHJpNaStv1Ds4"
// imageURL: "https://i.scdn.co/image/ab67616d0000b27366c6ff06b078ac4d76af7e0e"
// __proto__: Object
// 5:
// album: "People, Hell & Angels"
// artist: "Jimi Hendrix"
// artistID: "776Uo845nYHJpNaStv1Ds4"
// imageURL: "https://i.scdn.co/image/ab67616d0000b2733dbc906bf1b195a875bcfc97"
// __proto__: Object
// 6:
// album: "People, Hell & Angels"
// artist: "Jimi Hendrix"
// artistID: "776Uo845nYHJpNaStv1Ds4"
// imageURL: "https://i.scdn.co/image/ab67616d0000b2734fdf251a3d05164e4a10c020"
// __proto__: Object
// 7:
// album: "Winterland"
// artist: "Jimi Hendrix"
// artistID: "776Uo845nYHJpNaStv1Ds4"
// imageURL: "https://i.scdn.co/image/ab67616d0000b27382f614e9a1555d5aa78fbce1"
// __proto__: Object
// 8:
// album: "Winterland"
// artist: "Jimi Hendrix"
// artistID: "776Uo845nYHJpNaStv1Ds4"
// imageURL: "https://i.scdn.co/image/ab67616d0000b2736a1f03cc603edf684f52dbd2"
</script>

