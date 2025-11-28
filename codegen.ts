import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  // Point to your backend's auto-generated schema file
  schema: '../backend/src/schema.gql',

  // Auto-generated operations from the script
  documents: 'src/graphql/operations/**/*.graphql',

  // Generate types and hooks organized by module
  generates: {
    // 1. Base schema types (shared across all modules)
    './src/graphql/generated/schema.ts': {
      plugins: ['typescript'],
      config: {
        skipTypename: false,
        enumsAsTypes: false,
      },
    },

    // 2. Generate module-specific files using near-operation-file preset
    'src/graphql/operations/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.ts',
        baseTypesPath: '~@/graphql/generated/schema',
        folder: '',
      },
      plugins: ['typescript-operations', 'typescript-react-apollo'],
      config: {
        withHooks: true,
        withHOC: false,
        withComponent: false,
        skipTypename: false,
        enumsAsTypes: false,
        withSuspenseQuery: false,
        addDocBlocks: false,
        noGraphQLTag: false,
      },
    },
  },

  // Watch mode for development
  watch: false,

  // Ignore if no operations exist yet
  ignoreNoDocuments: true,

  // Allow partial outputs even when there are validation errors
  allowPartialOutputs: true,

  // Configure the ~ prefix to resolve to src
  config: {
    mappers: {},
  },
};

export default config;
