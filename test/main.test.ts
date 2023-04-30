import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { AppStack } from '../src/stack';

test('Snapshot', () => {
  const app = new App();
  const stack = new AppStack(app, 'test', {
    env: {
      account: '123456789012',
      region: 'eu-central-1',
    },
  });

  const template = Template.fromStack(stack);
  expect(template.toJSON()).toMatchSnapshot();
});