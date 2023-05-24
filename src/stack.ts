// Importing the required modules
import {
  Duration, Stack, StackProps, aws_events, aws_events_targets,
  aws_lambda, aws_lambda_event_sources, aws_lambda_nodejs, aws_sqs,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { EcsApp } from './ecs';

// Defining the AppStackProps interface
export interface AppStackProps extends StackProps {
  //
}

// The following Typescript code defines an AWS CDK Stack that
// creates an SQS queue, an Amazon ECS application, and an AWS Lambda
// function that consumes messages from the queue.
export class AppStack extends Stack {

  constructor(scope: Construct, id: string, props: AppStackProps) {
    super(scope, id, props);

    // Creating a new SQS queue object using the `aws_sqs.Queue` class
    const queue = new aws_sqs.Queue(this, 'Queue');

    // Setting up an Amazon CloudWatch Events rule to forward all events from the lumigo-test source to our SQS queue
    new aws_events.Rule(this, 'EBToQueueRule', {
      eventPattern: {
        source: ['lumigo-test'],
      },
      targets: [new aws_events_targets.SqsQueue(queue)],
    });

    // Creating a new AWS Lambda function to consume messages from the SQS queue
    const lambda = new aws_lambda_nodejs.NodejsFunction(this, 'Handler', {
      runtime: aws_lambda.Runtime.NODEJS_18_X,
      timeout: Duration.seconds(10),
    });

    // Adding the SQS queue as an event source for the Lambda function
    lambda.addEventSource(new aws_lambda_event_sources.SqsEventSource(queue, { batchSize: 1 }));

    // Creating an Amazon ECS application
    const ecsApp = new EcsApp(this, 'EcsApp', {});

    // Adding an environment variable to the Lambda function that specifies the HTTP target as the load balancer DNS name of our ECS service
    lambda.addEnvironment('HTTP_TARGET', 'http://' + ecsApp.service.loadBalancer.loadBalancerDnsName);
  }
}
