// Importing the required modules
import path from 'path';
import { Duration, aws_ec2, aws_ecr_assets, aws_ecs, aws_ecs_patterns } from 'aws-cdk-lib';
import { Construct } from 'constructs';

// Defining the EcsAppProps interface
export interface EcsAppProps {
  //
}

// The following Typescript code defines an Amazon ECS application stack using AWS CDK.
// The stack creates a VPC, an Application Load Balanced Fargate service,
// a target group, and other related resources.
export class EcsApp extends Construct {

  // Declaring a public property for the Application Load Balancer Fargate service
  public readonly service: aws_ecs_patterns.ApplicationLoadBalancedFargateService;

  constructor(scope: Construct, id: string, _props: EcsAppProps) {
    super(scope, id);

    // Creating a new VPC with only public subnets
    const vpc = new aws_ec2.Vpc(this, 'Vpc', {
      maxAzs: 3,
      natGateways: 0,
      subnetConfiguration: [{
        name: 'public',
        subnetType: aws_ec2.SubnetType.PUBLIC,
        mapPublicIpOnLaunch: true,
      }],
    });

    // Adding an Application Load Balanced Fargate service
    this.service = new aws_ecs_patterns.ApplicationLoadBalancedFargateService(this, 'Resource', {
      vpc,
      assignPublicIp: true,
      circuitBreaker: {
        rollback: true,
      },
      taskImageOptions: {
        // This port matches the default port bound by the containerized Spring Boot application you
        // find in <repo_root>/ecs-app
        containerPort: 8080,
        // Specifying the Docker image to use and its location
        image: aws_ecs.ContainerImage.fromAsset(path.join(__dirname, '..', 'ecs-app'), {
          // Ensure that the architecture used to build the image is compatible with the one running the ECS cluster.
          // If you are using an ARM-based machine, e.g., an Apple M1, make sure you have Docker Buildkit available,
          // so that you can build an AMD64 image on your ARM64 architecture.
          platform: aws_ecr_assets.Platform.LINUX_AMD64,
        }),
      },
      healthCheckGracePeriod: Duration.minutes(5),
    });

    // Configuring a health check for the target group associated with the Application Load Balancer Fargate service
    this.service.targetGroup.configureHealthCheck({
      healthyThresholdCount: 2,
      unhealthyThresholdCount: 2,
      interval: Duration.seconds(15),
      timeout: Duration.seconds(10),
    });

    // Setting a deregistration delay for the target group to make deployments faster
    this.service.targetGroup.setAttribute('deregistration_delay.timeout_seconds', '10');
  }
}
