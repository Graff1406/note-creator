<template>
  <v-form ref="form">
    <v-row no-guttars>
      <v-col cols="12" class="py-0">
        <v-text-field
          v-model="name"
          :rules="[v => !!v || 'Field can\'t be empty']"
          :label="nameLabel"
          filled
          required
        />
      </v-col>
      <v-col cols="12" class="py-0">
        <v-textarea
          v-if="contentTextarea"
          v-model="content"
          :rules="[v => !!v || 'Field can\'t be empty']"
          :label="contentLabel"
          rows="3"
          filled
          required
        />
        <v-text-field
          v-else
          v-model="content"
          :rules="[v => !!v || 'Field can\'t be empty']"
          :label="contentLabel"
          filled
          required
        />
        <v-switch
          v-if="!!switchLabel"
          v-model="localStorage"
          :label="switchLabel"
          :color="$text.themeColor.purple"
        ></v-switch>
        <p class="caption grey--text text--lighten-2">{{ $text.components.create.warnings.firbase }}</p>
      </v-col>
      <v-col cols="12" class="py-0">
        <v-btn
          @click="sendNote"
          :color="$text.themeColor.purple"
          :block="!windowSize.x_equalAndMore_600"
          :loading="loading"
          id="data-send-note"
          dark
        >
          {{ $text.layouts.default.btns.submit }}
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>
<script>
export default {
  name: 'Create',
  props: {
    updateData: Boolean,
    loading: Boolean,
    contentTextarea: Boolean,
    switchLabel: String,
    note: Object,
    nameLabel: {
      type: String,
      required: true
    },
    contentLabel: {
      type: String,
      required: true
    },
    windowSize: {
      type: Object,
      required: true,
      validator(obj) {
        return obj.axis
      }
    },
  },
  data() {
    return {
      name: this.note?.name || '',
      content: this.note?.content || '',
      localStorage: this.note?.localStorage || false,
      rules: [v => !!v || "Field can't be empty"],
    }
  },
  methods: {
    sendNote() {
      const note = this.localStorage
        ? { name: this.name, content: this.content, localStorage: true }
        : { name: this.name, content: this.content };
      if (this.$refs.form.validate()) {
        this.$emit("create-note", { ...note, created_at: Date.now() });
        if (!this.updateData) this.$refs.form.reset();
      } else console.log("didn't pass validate");
    }
  }
}
</script>