export default {
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
    }
  }
}