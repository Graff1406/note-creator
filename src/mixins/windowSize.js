/* eslint-disable prettier/prettier */
export default {
  data() {
    return {
      axis: {
        x: 0,
        y: 0
      }
    }
  },
  computed: {
    windowSize() {
        return {
        x_equalAndMore_600: this.axis.x >= 600,
        axis: this.axis
      }
    }
  },
  mounted() {
    this.onResize()
  },
  methods: {
    onResize() {
      this.axis = { x: window.innerWidth, y: window.innerHeight }
    }
  }
}
