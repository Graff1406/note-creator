import { shallowMount } from '@vue/test-utils';
import Create from '@/components/Create.vue';
import $text from '@/assets/text.json';

const propsData = { 
  updateData: false,
  switchLabel: 'label',
  note: {name: 'Avtan'},
  // windowSize: {axis: 0},
};

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

describe('Create component', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallowMount(Create, { 
      propsData, 
      mocks: { $text },
      mixins: [windowSize],
    });
  });
  test("check the prop updateData", () => {
    expect(wrapper.props().updateData).toBeFalsy();
  });
  test("check the prop switchLabel", () => {
    expect(typeof wrapper.props().switchLabel).toBe('string');
  });
  test("check the prop note", () => {
    expect(wrapper.props().note).toEqual(propsData.note);
  });
  test("check the prop axis.x", () => {
    expect(wrapper.vm.axis.x).toBe(0);
  });
  test("check the method sendNote", () => {
    const sendNote = jest.fn();
    wrapper.setMethods({ sendNote });
    wrapper.find("#data-send-note").trigger("click");
    expect(sendNote).toBeCalled();
  });
});
