import { shallowMount } from '@vue/test-utils';
import Create from '@/components/Create';

const props = { 
  updateData: false,
  switchLabel: 'label',
  note: {name: 'Avtan'},
  windowSize: {axis: 0},
 };

describe('Create component', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallowMount(Create, { propsData: props });
  });
  test("check the method sendNote", () => {
    const sendNote = jest.fn();
    wrapper.setMethods({ sendNote });
    wrapper.find("#data-send-note").trigger("click");
    expect(sendNote).toBeCalled();
  });
  test("check the prop updateData", () => {
    expect(wrapper.props().updateData).toBeFalsy();
  });
  test("check the prop switchLabel", () => {
    expect(typeof wrapper.props().switchLabel).toBe('string');
  });
  test("check the prop note", () => {
    expect(wrapper.props().note).toEqual(props.note);
  });
  test("check the prop theme", () => {
    expect(wrapper.props().windowSize).toEqual(props.windowSize);
  });
});
