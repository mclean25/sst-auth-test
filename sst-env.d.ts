/* This file is auto-generated by SST. Do not edit. */
/* tslint:disable */
/* eslint-disable */
/* deno-fmt-ignore-file */
import "sst"
export {}
declare module "sst" {
  export interface Resource {
    "Auth": {
      "type": "sst.aws.Auth"
      "url": string
    }
    "AuthTable": {
      "name": string
      "type": "sst.aws.Dynamo"
    }
    "GithubClientID": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "GithubClientSecret": {
      "type": "sst.sst.Secret"
      "value": string
    }
  }
}
