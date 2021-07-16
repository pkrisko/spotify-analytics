import * as cdk from '@aws-cdk/core';
import { HttpApi, HttpMethod } from '@aws-cdk/aws-apigatewayv2';
import { LambdaProxyIntegration } from '@aws-cdk/aws-apigatewayv2-integrations';
import { Code, Function, Runtime } from '@aws-cdk/aws-lambda';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const httpApi = new HttpApi(this, 'HttpApi');

    const healthFunction = new Function(
      this,
      'HealthFunction',
      {
        code: Code.fromAsset('../api/src/handlers/health'),
        handler: 'index.handler',
        runtime: Runtime.NODEJS_14_X,
      }
    );
    const healthIntegration = new LambdaProxyIntegration({
      handler: healthFunction,
    });

    httpApi.addRoutes({
      path: '/health',
      methods: [ HttpMethod.GET ],
      integration: healthIntegration,
    });
    // The code that defines your stack goes here
  }
}
