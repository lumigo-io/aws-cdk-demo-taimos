import { awscdk } from 'projen';
import { GithubWorkflow } from 'projen/lib/github';
import { JobPermission } from 'projen/lib/github/workflows-model';

const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.77.0',
  minNodeVersion: '18.0.0',
  defaultReleaseBranch: 'main',
  name: 'aws-cdk-demo-taimos',
  projenrcTs: true,
  deps: [
    'cdk-iam-floyd',
    'aws-cdk-github-oidc',
    '@lumigo/cdk-constructs-v2',
  ],
  devDeps: [
    '@types/aws-lambda',
    'esbuild',
  ],
});

// Deployment setup from GitHub -> AWS
const deploy = new GithubWorkflow(project.github!, 'deploy');
deploy.on({
  push: {
    branches: ['main'],
  },
  workflowDispatch: {},
});
deploy.addJob('deploy', {
  name: 'Deploy changes to AWS',
  runsOn: ['ubuntu-latest'],
  permissions: { idToken: JobPermission.WRITE, contents: JobPermission.READ },
  steps: [{
    name: 'Checkout',
    uses: 'actions/checkout@v2',
  }, {
    name: 'AWS Credentials',
    uses: 'aws-actions/configure-aws-credentials@master',
    with: {
      'role-to-assume': 'arn:aws:iam::538118019757:role/LumigoWebinarDemoDeployRole',
      'role-session-name': 'GitHubAction',
      'aws-region': 'eu-central-1',
    },
  }, {
    name: 'Install packages',
    run: 'yarn install --frozen-lockfile',
  }, {
    name: 'CDK Synth',
    run: 'npx projen build',
  }, {
    name: 'CDK Diff',
    run: 'npx cdk --app cdk.out diff aws-cdk-demo-taimos-hoegertn',
  }, {
    name: 'CDK Deploy',
    run: 'npx cdk --app cdk.out --require-approval never deploy aws-cdk-demo-taimos-hoegertn',
  }],
});

project.synth();