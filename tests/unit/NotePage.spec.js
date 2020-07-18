import { shallowMount, createLocalVue } from '@vue/test-utils';
import Note from '@/views/Note';
import $text from '@/assets/text.json';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

const router = new VueRouter();

const windowSize = {
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
      return {x_equalAndMore_600: 600}
    },
    note() {
      return {
        id: '123',
        name: 'Avtan',
        content: 'text',
        created_at: 1234,
        comments: []
      }
    }
  }
}

describe('HomePage component', () => {
  let actions;
  let store;
  let state;
  let wrapper;
  beforeAll(() => {
    state = {
      notes: [{
        id: '123',
        name: 'Avtan',
        content: 'text',
        created_at: 1234,
        comments: []
      }]
    };
    store = new Vuex.Store({
      actions,
      state,
    });
    wrapper = shallowMount(Note, { 
      mocks: { $text },
      mixins: [windowSize],
      store, 
      router,
      localVue,
     });
  });
  test("check the prop axis.x", () => {
    expect(typeof wrapper.vm.axis.x).toBe('number');
  });
  test("check the prop loadingCreateNotes", () => {
    expect(typeof wrapper.vm.loading.edit).toBe('boolean');
  });
  test("check the prop notes", () => {
    expect(wrapper.vm.note).toEqual(windowSize.computed.note());
  });
})