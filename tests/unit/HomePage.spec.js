import { shallowMount } from '@vue/test-utils';
import Home from '@/views/Home';


describe('Comments component', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallowMount(Home);
  });
  test("check the method createNote", () => {
    const createNote = jest.fn();
    wrapper.setMethods({ createNote });
    wrapper.find("#data-send-note").trigger("click");
    expect(createNote).toBeCalled();
  });
  test("check the method saveComment", () => {
    const remove = jest.fn();
    wrapper.setMethods({ remove });
    wrapper.find("#data-send-note").trigger("click");
    expect(remove).toBeCalled();
  });
});