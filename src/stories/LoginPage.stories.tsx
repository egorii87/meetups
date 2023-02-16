import { ComponentStory, ComponentMeta } from '@storybook/react';
import { LoginPage } from 'pages';
import { withRouter } from 'storybook-addon-react-router-v6';

export default {
  title: 'Pages/LoginPage',
  component: LoginPage,
  decorators: [withRouter],
} as ComponentMeta<typeof LoginPage>;

const Template: ComponentStory<typeof LoginPage> = () => (
  <div
    style={{
      width: '100%',
      maxWidth: '550px',
      margin: '0 auto',
    }}
  >
    <LoginPage />
  </div>
);

export const Default = Template.bind({});
