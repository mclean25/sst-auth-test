import { Resource } from "sst";
import { auth } from "sst/aws/auth";
import { GithubAdapter } from "@openauthjs/openauth/adapter/github";
import { session } from "./session.js";
import { object, string } from "valibot";
import { createSubjects } from "@openauthjs/core";
import { handle } from "hono/aws-lambda";
import { authorizer } from "@openauthjs/openauth";
import { DynamoStorage } from "@openauthjs/openauth/storage/dynamo";

export const subjects = createSubjects({
  user: object({
    email: string(),
  }),
});

export const app = authorizer({
  subjects,
  storage: DynamoStorage({
    table: Resource.AuthTable.name
  }),
  providers: {
    github: GithubAdapter({
      clientID: Resource.GithubClientID.value,
      clientSecret: Resource.GithubClientSecret.value,
      scopes: ["user"],
    }),
  },
  success: async (ctx, value, input) => {
    if (value.provider === "github") {
      return ctx.subject("user", {
        email: value.tokenset.access,
      });
    }
  },
});

export const handler = handle(app);
