import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import LoadingPresentation from '../components/organisms/Loading/LoadingPresentation';

export default {
  title: 'Organisms/Loading',
  component: LoadingPresentation,
} as ComponentMeta<typeof LoadingPresentation>;

const Template: ComponentStory<typeof LoadingPresentation> = (args) => <LoadingPresentation {...args} />;

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
