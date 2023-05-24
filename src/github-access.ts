import { GithubActionsIdentityProvider, GithubActionsRole } from 'aws-cdk-github-oidc';
import { Duration, Stack, StackProps, aws_iam as iam, CfnOutput } from 'aws-cdk-lib';
import * as st from 'cdk-iam-floyd';
import { Construct } from 'constructs';

export interface GitHubAccessStackProps extends StackProps {
  //
}

// The following TypeScript code defines a GitHubAccessStack stack that creates
// an AWS Identity and Access Management (IAM) role for deploying an AWS
// CloudFormation stack from GitHub Actions using the aws-cdk-github-oidc library.
export class GitHubAccessStack extends Stack {
  constructor(scope: Construct, id: string, props: GitHubAccessStackProps) {
    super(scope, id, props);

    // Create a new GithubActionsIdentityProvider instance from the current GitHub account
    const provider = GithubActionsIdentityProvider.fromAccount(this, 'Provider');

    // Create a new GithubActionsRole instance with a filter for the main branch of a specific repository,
    // and add an inline policy to allow assuming roles whose name starts with "cdk". (Bootstrap roles)
    const deployRole = new GithubActionsRole(this, 'GitHubDeployRole', {
      provider: provider,
      owner: 'lumigo-io',
      repo: 'aws-cdk-demo-taimos',
      roleName: 'LumigoWebinarDemoDeployRole',
      filter: 'ref:refs/heads/main',
      description: 'This role deploys to AWS from GitHub Actions',
      maxSessionDuration: Duration.hours(1),
      inlinePolicies: {
        CDK: new iam.PolicyDocument({
          statements: [new st.Sts().allow().toAssumeRole().onRole('cdk*')],
        }),
      },
    });

    // Output the ARN of the created GitHubActionsRole
    new CfnOutput(this, 'GitHubAdminRoleArn', { value: deployRole.roleArn });
  }
}
