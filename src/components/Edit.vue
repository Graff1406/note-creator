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
      <v-card class="pa-3">
        <v-row no-guttars justify="end" class="pa-3">
          <v-btn
            :color="$text.themeColor.purple"
            @click="$emit('close-dialog')"
            text
          >
            {{ $text.components.edit.btns.close }}
          </v-btn>
        </v-row>
        <v-col cols="12">
          <slot name="edit"></slot>
        </v-col>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: 'Edit',
  props: {
    dialog: Boolean,
    windowSize: {
      type: Object,
      required: true,
      validator(obj) {
        return obj.axis
      }
    },
  }
}
</script>