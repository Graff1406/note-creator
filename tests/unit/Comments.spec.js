import { shallowMount } from '@vue/test-utils';
import Comments from '@/components/Comments';

const comments = [{ author: 'Avtan', content: 'text', created_at: 133456 }];

describe('Comments component', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallowMount(Comments, { propsData: comments });
  });
  test("check the prop comments", () => {
    expect(wrapper.props().comments).toBe(comments);
  });
});
