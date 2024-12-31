/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "sst-auth-test",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: {
          region: "us-east-1",
          profile: "rc",
        },
      },
    };
  },
  async run() {
     const secrets = {
      GithubClientID: new sst.Secret("GithubClientID"),
      GithubClientSecret: new sst.Secret("GithubClientSecret"),
    };
     const authTable = new sst.aws.Dynamo("AuthTable", {
       fields: {
         pk: "string",
         sk: "string",
       },
       ttl: "expiry",
       primaryIndex: {
         hashKey: "pk",
         rangeKey: "sk",
       },
    });
    const auth = new sst.aws.Auth("Auth", {
      authorizer: {
        link: [secrets.GithubClientID, secrets.GithubClientSecret, authTable],
        handler: "./src/auth.handler",
        url: true,
      },
    });
  },
});
