# AWS CDK Crash Course: Building and monitoring AWS CDK apps

This repository contains a demo application that demonstrates how to develop and deploy non-trivial cloud applications on AWS using AWS Lambda, Amazon ECS, the AWS Cloud Development Kit (CDK) 2 and other AWS services. 

The focus of this demo is on observability, and we will be using [Lumigo](https://lumigo.io)as our observability tool of choice. By adopting the [Lumigo CDK Constructs](https://github.com/lumigo-io/lumigo-cdk-constructs), with [just one line of code](https://github.com/lumigo-io/aws-cdk-demo-taimos/blob/439eff3cbb067781170a99046e57c0f8841f63d0/src/main.ts#L22) in our CDK application, we get our Cloud applications monitored seamlessly with Lumigo.

The application in this repository has been coded live in [this Webinar](https://youtu.be/it7-SAae_OU), accompanied by much commentary on Infrastructure as Code, tips and tricks to make awesome containerized applications, design of CDK constructs and more!

## Prerequisites
Before you can use this demo project, ensure that you have the following installed:

- [Node.js](https://nodejs.org/) version 16 or later. (We like a lot [nvm](https://github.com/nvm-sh/nvm) to install and manage multiple Node.js versions in our dev environments.)
- An AWS account.
- [AWS CLI version 2](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) latest version installed.
- AWS CDK 2 [installed](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html) and [bootstrapped](https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping.html) in your AWS account.
- A local Docker daemon for the AWS CDK to build your containers. If you do not have one, a good choice for getting started is [Docker Desktop](https://www.docker.com/products/docker-desktop/).

You also need to configure your [AWS CLI credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html).

## Getting Started
To get started, follow these steps:

1. Clone this repository locally.
2. Install the dependencies using `yarn install --frozen-lockfile`.
3. [Create a Lumigo account](https://platform.lumigo.io/auth/signup) and follow the onboarding process.
6. After you have access to your Lumigo project, [retrieve the Lumigo token](https://docs.lumigo.io/docs/lumigo-tokens) and store it in an AWS SecretsManager secret:

   ```sh
   aws secretsmanager create-secret --name LumigoToken --secret-string <LumigoToken>
   ```

4. Configure this CDK demo application by adding something like the following in [`main.ts`](./src/main.ts):

   ```typescript
   new AppStack(app, 'aws-cdk-demo-mine' /* stack_name */, {
     env: {
       account: '<account_id>',
       region: '<your_preferred_zone>',
     },
   });
   ```

   **Important:** Make sure that the AWS CDK is [bootstrapped](https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping.html) for the selected region in the account you choose.

4. Ensure you have [AWS CLI credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) configured for the AWS account id you are going to use.
6. Deploy the stack using `cdk deploy <stack_name>`. This command uses the AWS CDK to create all the necessary resources for our stack. If you use multiple AWS accounts and have different [profiles](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html#cli-configure-files-using-profiles) for your AWS CLI, pass the right one to the CDK by doing `cdk deploy <stack_name> --profile <profile_name> `
7. Verify the deployed stack by checking the output from the `cdk deploy` command.
8. Trigger the Lambda function by sending an event to EventBridge. You should see the logs being sent to Lumigo, which provides observability into the AWS resources used by the stack.

## Project Structure
The project is structured as follows:

- [`src/main.ts`](./src/main.ts): This file contains the main entry point of the application.
- [`src/stack.ts`](./src/stack.ts): This file contains the AWS resources to be created using the AWS CDK.
- [`src/stack.Handler.ts`](./src/stack.Handler.ts): This file contains the source code for the Lambda function.
- [`src/ecs.ts`](./src/ecs.ts): This file defines the Amazon ECS cluster and task definitions using AWS CDK.
- [`ecs-app/`](./ecs-app/): This directory contains the Spring Boot app and the Dockerfile used to build the Amazon ECS container image.

## Conclusion
We hope you enjoy this demo, and that it will improve your understanding of how you can develop and deploy non-trivial cloud applications on AWS, and get them monitored seamlessly with Lumigo.
