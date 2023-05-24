# AWS CDK Crash Course: Building and monitoring AWS CDK apps

This repository contains a demo application that demonstrates how to develop and deploy non-trivial cloud applications on AWS using AWS Lambda, Amazon ECS, the AWS Cloud Development Kit (CDK) 2 and other AWS services. 

The focus of this demo is on observability, and we will be using Lumigo as our observability tool of choice. With just one line of code in the CDK, we can get our cloud applications monitored seamlessly with Lumigo.

## Prerequisites
Before you can use this demo project, ensure that you have the following installed:

- [Node.js](https://nodejs.org/) version 16 or later.
- An AWS account.
- AWS CLI version 2 latest version installed.
- AWS CDK installed.

You also need to configure your [AWS CLI credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html).

## Getting Started
To get started, follow these steps:

1. Clone this repository locally.
2. Install the dependencies using `yarn install --frozen-lockfile`.
3. Configure Lumigo by adding a secret to SecretsManager and reference it in the main.ts.
4. Configure your AWS account id as the target environment
5. Deploy the stack using `cdk deploy <stackname>`. This command uses the AWS CDK to create all the necessary resources for our stack.
6. Verify the deployed stack by checking the output from the `cdk deploy` command.
7. You can then trigger the Lambda function by sending an event to EventBridge. You should see the logs being sent to Lumigo, which provides observability into the AWS resources used by the stack.

## Project Structure
The project is structured as follows:

- `src/main.ts`: This file contains the main entry point of the application.
- `src/stack.ts`: This file contains the AWS resources to be created using the AWS CDK.
- `src/stack.Handler.ts`: This file contains the source code for the Lambda function.
- `src/ecs.ts`: This file defines the Amazon ECS cluster and task definitions using AWS CDK.
- `ecs-app/`: This directory contains the Spring Boot app and the Dockerfile used to build the Amazon ECS container image.

## Conclusion
By following this crash course, you should now have a good understanding of how to develop and deploy non-trivial cloud applications on AWS while getting them monitored seamlessly with Lumigo.
You can use this project as a reference to get started with your own projects that require observability in AWS.