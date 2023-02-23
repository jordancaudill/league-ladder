import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Button from '../Button.vue'

describe('Button', () => {
  it('renders properly', () => {
    const wrapper = mount(Button, {
      props: {
        text: 'Save',
        color: 'green',
        type: 'button'

      }
    })
    expect(wrapper.text()).toContain('Save')
  })
})
