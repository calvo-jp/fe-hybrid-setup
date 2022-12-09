import { GraphQLClient } from 'graphql-request';

const hygraphContentApi = process.env.NEXT_PUBLIC_HYGRAPH_CONTENT_API as string;

const client = new GraphQLClient(hygraphContentApi);

export default client;
