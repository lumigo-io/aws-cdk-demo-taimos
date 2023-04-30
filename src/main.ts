import { App } from 'aws-cdk-lib';
import { AppStack } from './stack';

const app = new App();

new AppStack(app, 'aws-cdk-demo-taimos-hoegertn', {
  env: {
    account: '538118019757',
    region: 'eu-central-1',
  },
});

app.synth();