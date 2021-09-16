import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Header, HeaderProps } from './Header'

// This tells Storybook how to list your stories and provide information
export default {
  title: 'Component/Header',
  component: Header,
  argTypes: {
    variant: { control: 'select' },
  },
} as Meta

// With named export we define component's story
export const Default: Story<HeaderProps> = args => <Header {...args} />
// Define default arguments for the Default story
Default.args = {
  id: 'Header',
}
