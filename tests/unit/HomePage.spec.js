import { shallowMount, createLocalVue } from '@vue/test-utils';
import Home from '@/views/Home';
import $text from '@/assets/text.json';
import Vuex from 'vuex';

const localVue = createLocalVue();

localVue.use(Vuex);

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
      state
    });
    wrapper = shallowMount(Home, { 
      mocks: { $text },
      mixins: [windowSize],
      store, 
      localVue,
     });
  });
  test("check the prop axis.x", () => {
    expect(typeof wrapper.vm.axis.x).toBe('number');
  });
  test("check the mounted hoock", () => {
    expect(typeof Home.mounted).toBe('function');
  });
  test("check the prop loadingCreateNotes", () => {
    expect(typeof wrapper.vm.loadingCreateNotes).toBe('boolean');
  });
  test("check the prop notes", () => {
    expect(wrapper.vm.notes).toEqual(state.notes);
  });
})