#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { HelloServicediscoveryStack } from "../lib/hello-servicediscovery-stack";

const app = new cdk.App();
new HelloServicediscoveryStack(app, "HelloServicediscoveryStack");
