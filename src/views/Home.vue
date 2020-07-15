<template>
  <default-layout>
    <v-row no-guttars v-resize="onResize">
      <v-col cols="12">
        <v-row no-guttars align="center">
          <v-col cols="4">
            <v-divider></v-divider>
          </v-col>
          <v-col cols="4">
            <h2 class="text-all-h2">{{ $text.pages.main.titles.create }}</h2>
          </v-col>
          <v-col cols="4">
            <v-divider></v-divider>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <Create
          @create-note="createNote"
          :loading="loadingCreateNotes"
          :windowSize="windowSize"
          :name-label="$text.components.create.labels.name"
          :content-label="$text.components.create.labels.content"
          :switch-label="$text.components.create.labels.switch"
        />
      </v-col>
      <v-col cols="12">
        <v-row no-guttars align="center">
          <v-col cols="4">
            <v-divider></v-divider>
          </v-col>
          <v-col cols="4">
            <h2 class="text-all-h2">{{ $text.pages.main.titles.notes }}</h2>
          </v-col>
          <v-col cols="4">
            <v-divider></v-divider>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <NoteList :notes="notes" :windowSize="windowSize" />
      </v-col>
      <v-col v-if="!notes.length" cols="12">
        <v-row no-guttars justify="center">
          <!-- <v-btn
            v-if="notes.length"
            @click="loadImages"
            :color="$text.themeColor.secondary"
            :loading="loadingImages"
            id="load-images"
            icon
          >
            <v-icon>refresh</v-icon>
          </v-btn> -->
          <v-alert :value="true" type="info" prominent text>
            {{ $text.alerts.notFound }}
          </v-alert>
        </v-row>
      </v-col>
    </v-row>
  </default-layout>
</template>

<script>
import { mapActions } from "vuex";
import NoteList from "../components/NoteList";
import windowSize from "../mixins/windowSize";
import DefaultLayout from "../layouts/Default";
import Create from "../components/Create";
export default {
  components: {
    NoteList,
    DefaultLayout,
    Create
  },
  mixins: [windowSize],
  data() {
    return {
      loadingCreateNotes: false,
    }
  },
  computed: {
    notes() {
      return this.$store.state.notes;
    },
  },
  async mounted() {
    await this.A_GET_NOTES();
  },
  methods: {
    saveToLocalStorage(note) {
      try {
        const id = Math.random()
          .toString(36)
          .substr(2, 9);
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        localStorage.setItem(
          "notes",
          JSON.stringify([{ ...note, id }, ...notes])
        );
        this.$store.commit("M_SET_VAL", {
          prop: "notes",
          data: [{ ...note, id }, ...this.$store.state.notes]
        });
      } catch (err) {
        console.log('LOG: createNote -> note', err)
      }
    },
    async remove({id}) {
      await this.A_DELETE_NOTE(id);
    },
    async createNote({ name, content, localStorage, created_at }) {
      this.loadingCreateNotes = !this.loadingCreateNotes;
      if (localStorage) this.saveToLocalStorage({ name, content, created_at, localStorage });
      else await this.A_CREATE_NOTE({ name, content, created_at });
      this.loadingCreateNotes = !this.loadingCreateNotes;
      this.A_GET_NOTES();
    },
    ...mapActions(['A_GET_NOTES', 'A_CREATE_NOTE'])
  }
}
</script>
