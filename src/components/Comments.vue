<template>
  <v-container>

     <v-row>
      <v-col class="md-6">TESTING
        <v-img src=""></v-img>
      </v-col>
      <v-col class="md-2">
        <v-row v-for="track in tracks" :key="track">
          <h4>{{track.name}} {{track.duration_ms}}</h4>
        </v-row>
      </v-col>
    </v-row>

    <v-layout text-center wrap justify-center>
      <v-flex xs6 mb-5>
        <div v-if="loggedInUserName!='Anonymous'">
          <h2 class="headline font-weight-bold mb-3">Make a comment</h2>
          <v-layout justify-center>
            <v-textarea outlined name="comment-box" label="Make a comment" value v-model="comment"></v-textarea>
          </v-layout>
          <v-btn class="white--text" color="deep-purple accent-4" @click="submitComment">Submit</v-btn>
        </div>
      </v-flex>

      <v-layout justify-center v-for="comment in albumComments" :key="comment.date">
        <v-card class="mx-6 mb-6" color="green" dark max-width="600" min-width="500">
          <v-card-title>
            <v-icon large left>mdi-comment</v-icon>
            <span class="title font-weight-light">Comment</span>
          </v-card-title>

          <v-card-text
            class="headline font-weight-bold"
            v-if="comment.edit!=true"
          >{{comment.commentBody}}</v-card-text>
          <div v-else>
            <v-textarea
              outlined
              name="comment-box"
              label="Make a comment"
              value
              v-model="comment.editVersion"
            ></v-textarea>
            <v-btn
              class="white--text"
              color="deep-purple accent-4"
              @click="submitEdit(comment.date)"
            >Submit</v-btn>
            <v-btn
              class="white--text"
              color="deep-purple accent-4"
              @click="cancelEdit(comment.date)"
            >Cancel</v-btn>
          </div>

          <v-card-actions>
            <v-list-item class="grow">
              <v-list-item-avatar color="grey darken-3">
                <v-img
                  class="elevation-6"
                  src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                ></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{comment.user}}</v-list-item-title>
              </v-list-item-content>

              <v-row align="center" justify="end" v-if="comment.user == userName">
                <v-icon
                  class="mr-1"
                  @click="editComment(comment.date)"
                  v-if="comment.edit!=true"
                >mdi-pencil</v-icon>
                <span
                  class="subheading mr-2"
                  @click="editComment(comment.date)"
                  v-if="comment.edit!=true"
                >Edit</span>
                <span class="mr-1"></span>
                <v-icon class="mr-1" @click="deleteComment(comment.date)">mdi-delete</v-icon>
                <span class="subheading" @click="deleteComment(comment.date)">Delete</span>
              </v-row>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import { createComment } from "../api/comment/Comment";
import { getAlbumComments } from "../api/comment/Comment";
import { updateComments } from "../api/comment/Comment";

// import axios from 'axios';

export default {
  props: {
    loggedInUserName: String,
    albumURL: String,
    albumName: String,
    tracks: [],
    artistName: String
  },
  data: () => ({
    userName: "bob",
    comment: "",
    albumID: "",
    albumComments: [],
    tracks: [],
    albumName: ""
  }),
  methods: {
    async submitComment() {
      //checking if albumID exists
      //let result = await axios.get('');
      let comments = await createComment({
        user: this.userName,
        commentBody: this.comment,
        albumID: this.albumID
      });
      this.albumComments.unshift({
        user: this.userName,
        commentBody: this.comment,
        albumID: this.albumID,
        date: new Date().getTime()
      });
      this.comment = "";
      return comments;
      //console.log(comments);
    },
    async fetchAlbumComments() {
      let comments = await getAlbumComments({ albumID: this.albumID });
      //this.albumComments = comments;

      this.albumComments = [];

      comments.forEach(comment => {
        this.albumComments.push({
          ...comment,
          edit: false,
          editVersion: ""
        });
      });

      return comments;
    },
    async deleteComment(date) {
      this.albumComments = this.albumComments.filter(
        comment => comment.date !== date
      );

      var tmp = [];
      this.albumComments.forEach(comment => {
        tmp.push({
          albumID: comment.albumID,
          user: comment.user,
          commentBody: comment.commentBody,
          date: comment.date
        });
      });

      await updateComments(tmp);
    },
    async editComment(date) {
      var commentIndex = this.albumComments.findIndex(
        comment => comment.date == date
      );
      this.albumComments[commentIndex].edit = true;
      this.albumComments[commentIndex].editVersion = this.albumComments[
        commentIndex
      ].commentBody;
    },
    cancelEdit(date) {
      var commentIndex = this.albumComments.findIndex(
        comment => comment.date == date
      );
      this.albumComments[commentIndex].edit = false;
    },
    async submitEdit(date) {
      var commentIndex = this.albumComments.findIndex(
        comment => comment.date == date
      );

      this.albumComments[commentIndex].commentBody = this.albumComments[
        commentIndex
      ].editVersion;
      this.albumComments[commentIndex].edit = false;

      var tmp = [];
      this.albumComments.forEach(comment => {
        tmp.push({
          albumID: comment.albumID,
          user: comment.user,
          commentBody: comment.commentBody,
          date: comment.date
        });
      });

      await updateComments(tmp);
    }
  },
  mounted() {
    window.console.log("using this");
    this.fetchAlbumComments();
    //this.showAlbumData();
  }
};

//Check if json object with albumID exists
//If it doesnt exist create it
//Once created push onto it the comment with username, comment, dateCreated
</script>

