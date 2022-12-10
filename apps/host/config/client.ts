import { GraphQLClient } from 'graphql-request';

const HYGRAPH_CONTENT_API =
  'https://api-ap-northeast-1.hygraph.com/v2/clbdh25vy1rlo01ujgtr649sr/master';

const client = new GraphQLClient(HYGRAPH_CONTENT_API);

export default client;
