import { Duration, Stack, StackProps, aws_events, aws_events_targets, aws_lambda, aws_lambda_event_sources, aws_lambda_nodejs, aws_sqs } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { EcsApp } from './ecs';

export interface AppStackProps extends StackProps {
  //
}

export class AppStack extends Stack {
  constructor(scope: Construct, id: string, props: AppStackProps) {
    super(scope, id, props);

    const queue = new aws_sqs.Queue(this, 'Queue');

    new aws_events.Rule(this, 'EBToQueueRule', {
      eventPattern: {
        source: ['lumigo-test'],
      },
      targets: [new aws_events_targets.SqsQueue(queue)],
    });

    const lambda = new aws_lambda_nodejs.NodejsFunction(this, 'Handler', {
      runtime: aws_lambda.Runtime.NODEJS_18_X,
      timeout: Duration.seconds(10),
    });
    lambda.addEventSource(new aws_lambda_event_sources.SqsEventSource(queue, { batchSize: 1 }));

    const ecsApp = new EcsApp(this, 'EcsApp', {});

    lambda.addEnvironment('HTTP_TARGET', 'http://' + ecsApp.service.loadBalancer.loadBalancerDnsName);
  }
}
