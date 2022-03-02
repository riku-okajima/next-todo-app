import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import ToastMessagePresentation from '../components/organisms/ToastMessage/ToastMessagePresentation';

export default {
  title: 'Organisms/ToastMessage',
  component: ToastMessagePresentation,
} as ComponentMeta<typeof ToastMessagePresentation>;

const Template: ComponentStory<typeof ToastMessagePresentation> = (args) => <ToastMessagePresentation {...args} />;

export const Error = Template.bind({});
Error.args = {
  toastMessage: {
    severity: 'error',
    message: 'error',
  },
};
export const Warning = Template.bind({});
Warning.args = {
  toastMessage: {
    severity: 'warning',
    message: 'warning',
  },
};
export const Info = Template.bind({});
Info.args = {
  toastMessage: {
    severity: 'info',
    message: 'info',
  },
};
export const Success = Template.bind({});
Success.args = {
  toastMessage: {
    severity: 'success',
    message: 'success',
  },
};
