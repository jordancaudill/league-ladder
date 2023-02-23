import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Button from '../Button.vue'

describe('Button', () => {
  it('should render properly', () => {
    const wrapper = mount(Button, {
      props: {
        text: 'Save',
        color: 'green',
        type: 'button'

      }
    })
    expect(wrapper.text()).toContain('Save')
  });
  // it('should be gray and show a loading indicator when loading === true', () => {
  // });
  // it('should show feedback text below the button', () => {
  // });
})
