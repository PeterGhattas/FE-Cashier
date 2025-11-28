import { ApolloClient, InMemoryCache, ApolloLink, split, HttpLink } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { createUploadLink } from 'apollo-upload-client';
import Cookies from 'js-cookie';

// Auto-detect protocol based on environment
const getGraphQLUrls = () => {
  const baseUrl = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:3000/graphql';

  // If running in browser and page is HTTPS, upgrade protocols
  if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
    // Ensure HTTP URL uses HTTPS
    const httpUri = baseUrl.replace(/^http:/, 'https:');

    // Convert HTTP URL to WSS URL
    const wsUri = process.env.NEXT_PUBLIC_GRAPHQL_WS_URL
      ? process.env.NEXT_PUBLIC_GRAPHQL_WS_URL.replace(/^ws:/, 'wss:')
      : httpUri.replace(/^https:/, 'wss:');

    return { httpUri, wsUri };
  }

  // For HTTP or server-side, use URLs as-is
  const httpUri = baseUrl;
  const wsUri = process.env.NEXT_PUBLIC_GRAPHQL_WS_URL || baseUrl.replace(/^http:/, 'ws:');

  return { httpUri, wsUri };
};

const { httpUri, wsUri } = getGraphQLUrls();

// HTTP Link with upload support
const uploadLink = createUploadLink({
  uri: httpUri,
  headers: {
    'apollo-require-preflight': 'true',
  },
});

// Middleware to add authentication token to requests
const authLink = new ApolloLink((operation, forward) => {
  // Get the authentication token from cookies if it exists
  const token = Cookies.get('accessToken');

  // Add the authorization header and CSRF protection to the request
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
      'apollo-require-preflight': 'true',
    },
  }));

  return forward(operation);
});

// WebSocket Link for subscriptions (client-side only)
const wsLink = typeof window !== 'undefined'
  ? new GraphQLWsLink(
      createClient({
        url: wsUri,
        connectionParams: () => {
          const token = Cookies.get('accessToken');
          return {
            authorization: token ? `Bearer ${token}` : '',
          };
        },
        shouldRetry: () => true,
        retryAttempts: Infinity,
        on: {
          connected: () => console.log('WebSocket connected'),
          closed: () => console.log('WebSocket closed'),
          error: (error) => console.error('WebSocket error:', error),
        },
      })
    )
  : null;

// Split link: send subscriptions to WebSocket, queries/mutations to HTTP
const splitLink = typeof window !== 'undefined' && wsLink
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink,
      authLink.concat(uploadLink)
    )
  : authLink.concat(uploadLink);

const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

export default apolloClient;