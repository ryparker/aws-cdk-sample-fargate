import { App, Stack } from "aws-cdk-lib";
import { Vpc } from "aws-cdk-lib/aws-ec2";
import {
  Cluster,
  FargateTaskDefinition,
  ContainerImage,
  FargateService,
} from "aws-cdk-lib/aws-ecs";

const app = new App();
const stack = new Stack(app, "sample", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});

const vpc = Vpc.fromLookup(stack, "VPC", {
  isDefault: true,
});

const cluster = new Cluster(stack, "FargateCPCluster", {
  vpc,
  enableFargateCapacityProviders: true,
});

const taskDefinition = new FargateTaskDefinition(stack, "TaskDef");

taskDefinition.addContainer("web", {
  image: ContainerImage.fromRegistry("amazon/amazon-ecs-sample"),
});

new FargateService(stack, "FargateService", {
  cluster,
  taskDefinition,
});
