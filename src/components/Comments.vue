<template>
  <v-row no-guttars>
    <v-col cols="12" class="d-flex justify-start py-0">
      <p class="body-1">{{ `Qantity: ${comments.length}` }}</p>
    </v-col>
    <v-col
      v-for="{ id, author, content, created_at } in comments"
      :key="id"
      cols="12"
    >
      <v-card outlined>
        <v-card-text>
          <p class="captoin ma-0">{{ created_at | createAtFilter }}</p>  
          <p class="title ma-0">{{ content }}</p>
          <p class="body ma-0">{{ author }}</p>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12">
      <slot name="create"></slot>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'Comments',
  props: {
    comments: {
      type: Array,
      default(arr) {
        return arr || []
      }
    },
  },
  data() {
    return {
      comment: {
        author: '',
        content: ''
      },
      loadingCreateNotes: false,
    }
  },
  filters: {
    createAtFilter(val) {
      const date = new Date(val);
      const time = `${date.getMinutes()}:${date.getHours()}.${date.getSeconds()}`;
      const day = date.getDay() < 10 ? `0${date.getDay()}` : `${date.getDay()}`;
      const month = date.getMonth() < 10 ? `0${date.getMonth()}` : `${date.getMonth()}`;
      return `${day}/${month}/${date.getFullYear()}  ${time}`;
    }
  }
}
</script>