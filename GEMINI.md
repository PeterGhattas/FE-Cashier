# Gemini Project Context: Cashier & Driver Management Platform (Frontend)

## Project Overview

This is the frontend for a smart cashier and driver management platform. It's a Next.js application written in TypeScript. The platform provides a Point of Sale (POS) system for shops, along with inventory management and an automated notification system for delivery drivers.

### Key Technologies

*   **Framework**: Next.js 16 (App Router)
*   **Language**: TypeScript
*   **UI**: React 19, shadcn/ui, Tailwind CSS
*   **API Communication**: GraphQL with Apollo Client
*   **Real-time Features**: GraphQL Subscriptions over WebSockets
*   **Authentication**: Firebase Authentication and JWTs (using `jose`)
*   **Notifications**: Firebase Cloud Messaging (FCM)
*   **Code Generation**: `graphql-codegen` for generating TypeScript types and React hooks from GraphQL schemas.

### Architecture

The project follows a component-based architecture typical of React applications. It uses the Next.js App Router for routing and layout management. The UI is built with a combination of custom components and components from the `shadcn/ui` library.

GraphQL operations (queries, mutations, subscriptions) are defined in `.graphql` files located in `src/graphql/operations`. `graphql-codegen` is used to automatically generate TypeScript types and React Apollo hooks from these definitions and the backend schema. This ensures type safety and a better developer experience when working with GraphQL.

The application is likely part of a monorepo, as indicated by the schema path (`../backend/src/schema.gql`) in the `codegen.ts` file.

## Building and Running

### Prerequisites

*   Node.js (v18 or higher)
*   npm or yarn
*   A running instance of the backend GraphQL API.

### Key Commands

The following commands are available in `package.json`:

*   **Run the development server:**
    ```bash
    npm run dev
    ```
    This starts the application on `http://localhost:3001`.

*   **Build for production:**
    ```bash
    npm run build
    ```

*   **Start the production server:**
    ```bash
    npm run start
    ```

*   **Run the linter:**
    ```bash
    npm run lint
    ```

*   **Generate GraphQL types and hooks:**
    ```bash
    npm run codegen
    ```
    This command should be run whenever the GraphQL schema or operations change.

## Development Conventions

*   **Styling**: Use Tailwind CSS for styling. For new UI elements, check if a suitable component is available in `shadcn/ui` before creating a new one.
*   **GraphQL**:
    *   All GraphQL operations should be defined in `.graphql` files under `src/graphql/operations`.
    *   After adding or modifying GraphQL operations, run `npm run codegen` to generate the necessary TypeScript types and React hooks.
    *   Use the generated hooks (e.g., `useMyQueryQuery`, `useMyMutationMutation`) for data fetching and mutations.
*   **Linting**: The project uses ESLint with the `eslint-config-next` preset. Run `npm run lint` to check for code quality issues.
*   **Environment Variables**: The application uses environment variables for configuration. A `.env.local` file should be created based on `.env.example` (if available) to store local configuration. The GraphQL endpoint is configured via the `NEXT_PUBLIC_GRAPHQL_URL` environment variable.
