import { awscdk } from 'projen';

const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.77.0',
  defaultReleaseBranch: 'main',
  name: 'aws-cdk-demo-taimos',
  projenrcTs: true,
  deps: [],
  devDeps: [
    '@types/aws-lambda',
    'esbuild',
  ],
});

project.synth();