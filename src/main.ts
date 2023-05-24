import { Lumigo } from '@lumigo/cdk-constructs-v2';
import { App, SecretValue } from 'aws-cdk-lib';
import { GitHubAccessStack } from './github-access';
import { AppStack } from './stack';

const app = new App();

new GitHubAccessStack(app, 'aws-cdk-demo-taimos-github', {
  env: {
    account: '538118019757',
    region: 'eu-central-1',
  },
});

new AppStack(app, 'aws-cdk-demo-taimos-hoegertn', {
  env: {
    account: '538118019757',
    region: 'eu-central-1',
  },
});

new Lumigo({ lumigoToken: SecretValue.secretsManager('LumigoToken') }).traceEverything(app);

app.synth();
