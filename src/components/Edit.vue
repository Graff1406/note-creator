<template>
  <div>
    <v-row justify="end" class="mx-1">
      <v-btn
        @click="$emit('open-dialog')"
        :color="$text.themeColor.purple"
        dark
        icon
      >
        <v-icon>edit</v-icon>
      </v-btn>
    </v-row>
    <v-dialog
      v-model="dialog"
      :fullscreen="!windowSize.x_equalAndMore_600"
      persistent
      max-width="500px"
      :transition="
        !windowSize.x_equalAndMore_600
          ? 'dialog-bottom-transition'
          : 'dialog-transition'
      "
    >
      <v-card>
        <v-toolbar :color="$text.themeColor.purple" dark>
          {{ $text.components.edit.title }}
          <v-spacer></v-spacer>
          <v-btn
            @click="$emit('close-dialog')"
            outlined
          >
            {{ $text.components.edit.btns.close }}
          </v-btn>
        </v-toolbar>
        <v-col cols="12">
          <slot name="edit"></slot>
        </v-col>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="warning" color="success" shaped>
      {{ $text.components.edit.warnings.warningEdited }}
    </v-snackbar>
  </div>
</template>
<script>
export default {
  name: 'Edit',
  props: {
    dialog: Boolean,
    warningEdited: Boolean,
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
      warning: this.warningEdited
    }
  },
  watch: {
    warningEdited(v) {
      if(v) this.warning = v;
    },
    warning(v) {
      if (!v) this.$emit('update:warning-edited', false);
    }
  }
}
</script>