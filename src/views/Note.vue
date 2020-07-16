<template>
  <default-layout>
    <v-row no-guttars v-resize="onResize">
      <v-col cols="12">
        <v-row no-guttars align="center">
          <v-col cols="3" class="pa-2 d-flex justify-start">
            <router-link 
              v-if="windowSize.x_equalAndMore_600"
              to="/"
            >
              {{ $text.pages.note.links.home }}
            </router-link>
            <v-btn 
              v-else 
              :color="$text.themeColor.secondary" 
              to="/" 
              class="mx-2" 
              icon
            >
              <v-icon>arrow_back_ios</v-icon>
            </v-btn>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="2" sm="2">
            <v-btn 
              @click="deleteDialog = true" 
              :color="$text.themeColor.purple"
              icon
            >
              <v-icon>delete</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="2" sm="2">
            <edit
              @open-dialog="dialog = !dialog"
              @close-dialog="dialog = !dialog"
              :windowSize="windowSize"
              :dialog="dialog"
            >
              <template v-slot:edit>
                <Create
                  @create-note="saveNote"
                  :note="note"
                  :loading="loading.edit"
                  :window-size="windowSize"
                  :switch-label="$text.components.create.labels.switch"
                  :name-label="$text.components.create.labels.name"
                  :content-label="$text.components.create.labels.content"
                  content-textarea
                  update-data
                />
              </template>
            </edit>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <h2 class="text-all-h2">{{ note.name }}</h2>
        <p class="body">{{ note.content }}</p>
      </v-col>
      <v-col cols="12">
        <v-row no-guttars align="center">
          <v-col cols="4">
            <v-divider></v-divider>
          </v-col>
          <v-col cols="4">
            <h3 class="text-all-h3">{{ $text.pages.note.titles.comments }}</h3>
          </v-col>
          <v-col cols="4">
            <v-divider></v-divider>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <comments :comments="note.comments">
          <template v-slot:create>
            <Create
              @create-note="saveComment"
              :loading="loading.comment"
              :windowSize="windowSize"
              :name-label="$text.components.comment.labels.author"
              :content-label="$text.components.comment.labels.comment"
              content-textarea
            />
          </template>
        </comments>
      </v-col>
    </v-row>
    <v-dialog
      v-model="deleteDialog"
      scrollable 
      persistent
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title>
          {{ $text.pages.note.warnings.deleteNote }}
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click="deleteDialog = false"
            :color="$text.themeColor.secondary"
            text
          >
            {{ $text.pages.note.btns.cancel }}
          </v-btn>
          <v-btn
            @click="deleteNote"
            :loading="loading.delete"
            :color="$text.themeColor.purple"
            text
          >
            {{ $text.pages.note.btns.delete }}
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </default-layout>
</template>

<script>
import { mapActions } from "vuex";
import windowSize from "../mixins/windowSize";
import DefaultLayout from "../layouts/Default";
import Create from "../components/Create";
import Edit from "../components/Edit";
import Comments from "../components/Comments";
export default {
  components: {
    DefaultLayout,
    Create,
    Edit,
    Comments,
  },
  mixins: [windowSize],
  data() {
    return {
      loading: {
        edit: false,
        comment: false,
        delete: false,
      },
      dialog: false,
      deleteDialog: false,
    }
  },
  computed: {
    note() {
      return this.$store.state.notes.length
        ? this.$store.state.notes.find(note => note.id == this.$route.params.id)
        : {};
    },
  },
  async mounted() {
    await this.A_GET_NOTES();
  },
  methods: {
    updateLocalStorage(note) {
      try {
        let done;
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        const saveNotes = notes.map(item => {
          if (item.id === note.id) {
            done = true;
            return note;
          } else return item;
        })
        localStorage.setItem("notes", JSON.stringify(done ? saveNotes : [...saveNotes, note]));
      } catch (err) {
        console.log("LOG: createNote -> note", err);
      }
    },
    removeFromLocalStorage(id) {
      try {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        console.log('LOG: removeFromLocalStorage -> notes', notes)
        if (notes.length)
          localStorage.setItem(
            "notes",
            JSON.stringify(notes.filter(item => item.id !== id))
          );
        // I am returning note a value to determine if there was an entry in localStorage
        return !!notes.filter(item => item.id === id)?.length;
      } catch (err) {
        console.log("LOG: createNote -> note", err);
      }
    },
    updateAppStore(note) {
      // update the storage value locally so that the current record does not change ID. 
      // if you transfer the record from the local storage to firbase then it will change ID 
      // at the current record and this will cause an error
      const data = this.$store.state.notes
        .map(item => {
          if (item.id === note.id) return note;
          else return item;
        })
      this.$store.commit('M_SET_VAL', { prop: 'notes', data });
    },
    async saveNote(note, loading = 'edit') {
      this.loading[loading] = true;
      const clonNote = { ...note, id: this.$route.params.id, };
      if (clonNote.localStorage) {
        this.updateLocalStorage(clonNote);
        await this.A_DELETE_NOTE(clonNote.id);
        this.updateAppStore(clonNote);
      } else {
        const toBeInLs = this.removeFromLocalStorage(clonNote.id);
        delete clonNote.localStorage;
        if (toBeInLs) await this.A_CREATE_NOTE(clonNote);
        else await this.A_UPDATE_NOTE(clonNote);
        this.updateAppStore(clonNote);
      }
      this.loading[loading] = false;
    },
    async saveComment(note) {
      note.author = note.name;
      delete note.name;
      const comments = this.note?.comments 
        ? [...this.note.comments, note] 
        : [note];
      this.note.comments = comments;
      await this.saveNote(this.note, 'comment');
    },
    async deleteNote() {
      this.loading.delete = true;
      const toBeInLs = this.removeFromLocalStorage(this.note.id);
      if (!toBeInLs) await this.A_DELETE_NOTE(this.note.id);
      this.loading.delete = false;
      const data = this.$store.state.notes.filter(item => item.id !== this.note.id);
      this.$store.commit('M_SET_VAL', { prop: 'notes', data});
      this.$router.push('/');
    },
    ...mapActions(['A_GET_NOTES', 'A_UPDATE_NOTE', 'A_DELETE_NOTE', 'A_CREATE_NOTE'])
  }
}
</script>
