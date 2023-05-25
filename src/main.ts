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

////
//// To deploy your application in your own account, uncomment
//// the code below and customize the settings to fit your setup 
////
// new AppStack(app, 'aws-cdk-demo-mine', {
//  env: {
//    account: <aws_account_id>, // TODO: Replace this with the actual account id
//    region: <aws_region>, // TODO: Replace this with the actual region id
//  },
// });

// TODO Ensure you have created an AWS SecretsManager service with your Lumigo token
new Lumigo({ lumigoToken: SecretValue.secretsManager('LumigoToken') }).traceEverything(app);

app.synth();
