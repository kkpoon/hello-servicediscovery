import { Duration, Stack, StackProps } from "aws-cdk-lib";
import { HttpNamespace, NonIpInstance } from "aws-cdk-lib/aws-servicediscovery";
import * as sqs from "aws-cdk-lib/aws-sqs";
import { Construct } from "constructs";

export class HelloServicediscoveryStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const queue = new sqs.Queue(this, "test-service-discovery-queue", {
      visibilityTimeout: Duration.seconds(300),
    });

    const namespace = new HttpNamespace(this, "MyService1", {
      name: "myservice1",
      description: "myservice1 namespace",
    });

    const service = namespace.createService("TestServiceDiscoveryQueueService");

    new NonIpInstance(this, "TestSQSInstance", {
      service: service,

      // the properties below are optional
      customAttributes: {
        arn: queue.queueArn,
      },
      instanceId: "test-service-discovery-queue",
    });
  }
}
