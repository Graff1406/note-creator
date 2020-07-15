import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { NOTES } from './uriList'

Vue.use(Vuex)

const query = async ( commit, method, data) => {
  try {
    await axios[method](...data)
  } catch(err) {
    console.log(`store -> query. METHOD - ${method}`, err)
  }
}

const store = new Vuex.Store({
  state: {
    notes: [],
    loading: false,
  },
  mutations: {
    M_SET_VAL (state, {prop, data}) {
      state[prop] = data
    }
  },
  actions: {
    async A_GET_NOTES ({ commit }) {
      try {
        commit("M_SET_VAL", { prop: "loading", data: true });
        const { data } = await axios.get(`${NOTES}.json`);
        commit('M_SET_VAL', { prop: 'loading', data: false })
        
        // convert a collection of objects to an array collection from  firbase
        let notes = [];
        if (data)
          notes = Object.keys(data).map(key => {
            return { ...data[key], id: key };
          });
        const lsNotes = JSON.parse(localStorage.getItem("notes")) || [];
        commit("M_SET_VAL", {
          prop: "notes",
          data: [...notes, ...lsNotes].sort((a, b) => b.created_at - a.created_at)
        });
      } catch (err) {
        console.log("store -> A_GET_NOTES", err);
      }
    },
    async A_CREATE_NOTE({ commit }, note) {
      await query(commit, 'post', [`${NOTES}.json`, note])
    },
    async A_UPDATE_NOTE({ commit }, data) {
      await query(commit, 'put', [`${NOTES}/${data.id}.json`, data])
    },
    async A_DELETE_NOTE({ commit }, id) {
      await query(commit, 'delete', [`${NOTES}/${id}.json`])
    }
  },
  getters: {
    notes({ notes }) {
      return notes
    },
    loader({ loading }) {
      return loading
    },
    content({ content }) {
      return content
    }
  }
})

export default store