import { GithubActionsIdentityProvider, GithubActionsRole } from 'aws-cdk-github-oidc';
import { Duration, Stack, StackProps, aws_iam as iam, CfnOutput } from 'aws-cdk-lib';
import * as st from 'cdk-iam-floyd';
import { Construct } from 'constructs';

export interface GitHubAccessStackProps extends StackProps {
  //
}

export class GitHubAccessStack extends Stack {
  constructor(scope: Construct, id: string, props: GitHubAccessStackProps) {
    super(scope, id, props);

    const provider = GithubActionsIdentityProvider.fromAccount(this, 'Provider');

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

    new CfnOutput(this, 'GitHubAdminRoleArn', { value: deployRole.roleArn });
  }
}