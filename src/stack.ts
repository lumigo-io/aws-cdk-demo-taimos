import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface AppStackProps extends StackProps {
  //
}

export class AppStack extends Stack {
  constructor(scope: Construct, id: string, props: AppStackProps) {
    super(scope, id, props);

    // define resources here...
  }
}
