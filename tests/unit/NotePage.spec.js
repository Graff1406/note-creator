import { shallowMount } from '@vue/test-utils';
import Note from '@/views/Note';


describe('Comments component', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallowMount(Note);
  });
  test("check the method sendNote", () => {
    const saveNote = jest.fn();
    wrapper.setMethods({ saveNote });
    wrapper.find("#data-send-note").trigger("click");
    expect(saveNote).toBeCalled();
  });
  test("check the method saveComment", () => {
    const saveComment = jest.fn();
    wrapper.setMethods({ saveComment });
    wrapper.find("#data-send-note").trigger("click");
    expect(saveComment).toBeCalled();
  });
});