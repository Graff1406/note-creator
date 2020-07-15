<template>
  <v-row no-gutters>
    <v-col
      v-for="({name, content, id}, i) in notes"
      :key="`image-${i}`"
      cols="12"
      class="py-2"
    >
      <v-card link :to="`/${id}`">
        <v-card-title primary-title>
          {{name}}
        </v-card-title>
        <v-card-text>
          {{content}}
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'NoteList',
  props: {
    notes: {
      type: Array,
      default(arr) {
        return arr || []
      }
    },
    windowSize: {
      type: Object,
      required: true,
      validator(obj) {
        return obj.axis
      }
    },
  },
}
</script>
