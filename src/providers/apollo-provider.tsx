'use client';

import { ApolloProvider } from '@apollo/client/react';
import { useMemo } from 'react';
import apolloClient from '@/lib/apollo-client';

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  // Ensure client is only created on client-side
  const client = useMemo(() => apolloClient, []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}