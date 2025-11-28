import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { parse, visit } from "graphql";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the schema file
const schemaPath = join(__dirname, "../../backend/src/schema.gql");
const schemaContent = readFileSync(schemaPath, "utf-8");
const schemaAST = parse(schemaContent);

// Output directory for generated operations
const outputDir = join(__dirname, "../src/graphql/operations");

// Helper to categorize operations by module
function getModuleName(operationName) {
  const name = operationName.toLowerCase();

  // Auth module
  if (
    name.includes("login") ||
    name.includes("register") ||
    name.includes("logout") ||
    name.includes("auth") ||
    name.includes("token") ||
    name === "me"
  ) {
    return "auth";
  }

  // Users module
  if (name.includes("user") && !name.includes("presence")) {
    return "users";
  }

  // Stores module
  if (name.includes("store") && !name.includes("stock")) {
    return "stores";
  }

  // Products module
  if (name.includes("product")) {
    return "products";
  }

  // Stock/Inventory module
  if (
    name.includes("stock") ||
    name.includes("restock") ||
    name.includes("inventory")
  ) {
    return "stock";
  }

  // Sales module
  if (name.includes("sale") || name.includes("invoice")) {
    return "sales";
  }

  // Chat/Messages module
  if (
    name.includes("message") ||
    name.includes("chat") ||
    name.includes("typing")
  ) {
    return "chat";
  }

  // Notifications module
  if (name.includes("notification") || name.includes("topic")) {
    return "notifications";
  }

  // Files module
  if (name.includes("file") || name.includes("upload")) {
    return "files";
  }

  // Audit module
  if (name.includes("audit")) {
    return "audit";
  }

  // Presence module
  if (
    name.includes("presence") ||
    name.includes("online") ||
    name.includes("offline")
  ) {
    return "presence";
  }

  // Default fallback
  return "common";
}

// Helper to get all fields for a type recursively
function getFieldsForType(typeName, schema, visited = new Set(), depth = 0) {
  // If we've hit max depth or circular reference, get only scalar fields
  if (depth > 3 || visited.has(typeName)) {
    return getScalarFieldsOnly(typeName, schema);
  }
  visited.add(typeName);

  const typeDefinitions = schema.definitions.filter(
    (def) => def.kind === "ObjectTypeDefinition" && def.name.value === typeName
  );

  if (typeDefinitions.length === 0) return "";

  const type = typeDefinitions[0];
  const fields = type.fields || [];

  return fields
    .map((field) => {
      const fieldType = getBaseType(field.type);

      // Skip Upload scalar
      if (fieldType === "Upload") return null;

      // Scalar fields
      if (isScalar(fieldType)) {
        return `    ${field.name.value}`;
      }

      // Object types - recurse but limit depth
      const nestedFields = getFieldsForType(
        fieldType,
        schema,
        new Set(visited),
        depth + 1
      );
      if (nestedFields) {
        return `    ${field.name.value} {\n${nestedFields}\n    }`;
      }

      return `    ${field.name.value}`;
    })
    .filter(Boolean)
    .join("\n");
}

// Get only scalar fields for a type (used for circular references)
function getScalarFieldsOnly(typeName, schema) {
  const typeDefinitions = schema.definitions.filter(
    (def) => def.kind === "ObjectTypeDefinition" && def.name.value === typeName
  );

  if (typeDefinitions.length === 0) return "";

  const type = typeDefinitions[0];
  const fields = type.fields || [];

  return fields
    .filter((field) => {
      const fieldType = getBaseType(field.type);
      return isScalar(fieldType) && fieldType !== "Upload";
    })
    .map((field) => `      ${field.name.value}`)
    .join("\n");
}

function getBaseType(type) {
  if (type.kind === "NonNullType" || type.kind === "ListType") {
    return getBaseType(type.type);
  }
  return type.name.value;
}

function isScalar(typeName) {
  const scalars = [
    "String",
    "Int",
    "Float",
    "Boolean",
    "ID",
    "DateTime",
    "JSON"
  ];
  return scalars.includes(typeName);
}

// Generate queries, mutations, and subscriptions
const queries = [];
const mutations = [];
const subscriptions = [];

visit(schemaAST, {
  ObjectTypeDefinition(node) {
    if (node.name.value === "Query") {
      node.fields.forEach((field) => {
        const fieldName = field.name.value;
        const returnType = getBaseType(field.type);
        const args = field.arguments || [];

        const argsString = args
          .map((arg) => {
            const argType = getBaseType(arg.type);
            const required = arg.type.kind === "NonNullType";

            // Check if it's a list type
            const isListType =
              arg.type.kind === "NonNullType"
                ? arg.type.type.kind === "ListType"
                : arg.type.kind === "ListType";

            // Generate sample values - always use actual argument name
            let sampleValue;
            if (required || isListType) {
              sampleValue = `$${arg.name.value}`;
            } else {
              sampleValue = null;
            }

            return sampleValue ? `${arg.name.value}: ${sampleValue}` : null;
          })
          .filter(Boolean)
          .join(", ");

        const variables = args
          .filter(
            (arg) =>
              arg.type.kind === "NonNullType" || arg.type.kind === "ListType"
          )
          .map((arg) => {
            const isListType =
              arg.type.kind === "NonNullType"
                ? arg.type.type.kind === "ListType"
                : arg.type.kind === "ListType";

            const isList = isListType;
            const baseType = getBaseType(arg.type);
            const required = arg.type.kind === "NonNullType";

            // Handle list types
            if (isList) {
              const innerType =
                arg.type.kind === "NonNullType"
                  ? arg.type.type.type
                  : arg.type.type;
              const innerRequired = innerType.kind === "NonNullType";
              const innerBaseType = getBaseType(innerType);
              return `$${arg.name.value}: [${innerBaseType}${
                innerRequired ? "!" : ""
              }]${required ? "!" : ""}`;
            }

            // Always use actual argument name for variable
            const argType = baseType;
            const gqlType = required ? `${argType}!` : argType;
            return `$${arg.name.value}: ${gqlType}`;
          })
          .join(", ");

        const hasVariables = variables.length > 0;
        const hasArgs = argsString.length > 0;

        // Check if return type is a scalar - if so, don't add field selection
        let query;
        if (isScalar(returnType)) {
          query = `query ${capitalize(fieldName)}${
            hasVariables ? `(${variables})` : ""
          } {
  ${fieldName}${hasArgs ? `(${argsString})` : ""}
}`;
        } else {
          const fields = getFieldsForType(returnType, schemaAST);
          query = `query ${capitalize(fieldName)}${
            hasVariables ? `(${variables})` : ""
          } {
  ${fieldName}${hasArgs ? `(${argsString})` : ""} {
${fields}
  }
}`;
        }

        queries.push({ name: fieldName, content: query });
      });
    }

    if (node.name.value === "Mutation") {
      node.fields.forEach((field) => {
        const fieldName = field.name.value;
        const returnType = getBaseType(field.type);
        const args = field.arguments || [];

        const argsString = args
          .map((arg) => `${arg.name.value}: $${arg.name.value}`)
          .join(", ");

        const variables = args
          .map((arg) => {
            const isListType =
              arg.type.kind === "NonNullType"
                ? arg.type.type.kind === "ListType"
                : arg.type.kind === "ListType";

            const isList = isListType;
            const baseType = getBaseType(arg.type);
            const required = arg.type.kind === "NonNullType";

            // Handle list types
            if (isList) {
              const innerType =
                arg.type.kind === "NonNullType"
                  ? arg.type.type.type
                  : arg.type.type;
              const innerRequired = innerType.kind === "NonNullType";
              const innerBaseType = getBaseType(innerType);
              return `$${arg.name.value}: [${innerBaseType}${
                innerRequired ? "!" : ""
              }]${required ? "!" : ""}`;
            }

            return `$${arg.name.value}: ${baseType}${required ? "!" : ""}`;
          })
          .join(", ");

        const hasVariables = variables.length > 0;

        // Check if this is a create, update, or delete mutation
        const isCreateUpdateDelete =
          fieldName.startsWith("create") ||
          fieldName.startsWith("update") ||
          fieldName.startsWith("delete") ||
          fieldName.startsWith("remove");

        // For scalar return types, don't add field selection
        // For create/update/delete mutations, only return _id
        // For other mutations, return all fields
        let queryContent;
        if (isScalar(returnType)) {
          queryContent = `mutation ${capitalize(fieldName)}${
            hasVariables ? `(${variables})` : ""
          } {
  ${fieldName}${argsString ? `(${argsString})` : ""}
}`;
        } else if (isCreateUpdateDelete) {
          queryContent = `mutation ${capitalize(fieldName)}${
            hasVariables ? `(${variables})` : ""
          } {
  ${fieldName}${argsString ? `(${argsString})` : ""} {
    _id
  }
}`;
        } else {
          const fields = getFieldsForType(returnType, schemaAST);
          queryContent = `mutation ${capitalize(fieldName)}${
            hasVariables ? `(${variables})` : ""
          } {
  ${fieldName}${argsString ? `(${argsString})` : ""} {
${fields}
  }
}`;
        }

        mutations.push({ name: fieldName, content: queryContent });
      });
    }

    if (node.name.value === "Subscription") {
      node.fields.forEach((field) => {
        const fieldName = field.name.value;
        const returnType = getBaseType(field.type);
        const args = field.arguments || [];

        const argsString = args
          .map((arg) => {
            const argType = getBaseType(arg.type);
            const required = arg.type.kind === "NonNullType";

            // Check if it's a list type
            const isListType =
              arg.type.kind === "NonNullType"
                ? arg.type.type.kind === "ListType"
                : arg.type.kind === "ListType";

            // Generate sample values - always use actual argument name
            let sampleValue;
            if (required || isListType) {
              sampleValue = `$${arg.name.value}`;
            } else {
              sampleValue = null;
            }

            return sampleValue ? `${arg.name.value}: ${sampleValue}` : null;
          })
          .filter(Boolean)
          .join(", ");

        const variables = args
          .filter(
            (arg) =>
              arg.type.kind === "NonNullType" || arg.type.kind === "ListType"
          )
          .map((arg) => {
            const isListType =
              arg.type.kind === "NonNullType"
                ? arg.type.type.kind === "ListType"
                : arg.type.kind === "ListType";

            const isList = isListType;
            const baseType = getBaseType(arg.type);
            const required = arg.type.kind === "NonNullType";

            // Handle list types
            if (isList) {
              const innerType =
                arg.type.kind === "NonNullType"
                  ? arg.type.type.type
                  : arg.type.type;
              const innerRequired = innerType.kind === "NonNullType";
              const innerBaseType = getBaseType(innerType);
              return `$${arg.name.value}: [${innerBaseType}${
                innerRequired ? "!" : ""
              }]${required ? "!" : ""}`;
            }

            // Always use actual argument name for variable
            const argType = baseType;
            const gqlType = required ? `${argType}!` : argType;
            return `$${arg.name.value}: ${gqlType}`;
          })
          .join(", ");

        const hasVariables = variables.length > 0;
        const hasArgs = argsString.length > 0;

        // Generate subscription
        let subscription;
        if (isScalar(returnType)) {
          subscription = `subscription ${capitalize(fieldName)}${
            hasVariables ? `(${variables})` : ""
          } {
  ${fieldName}${hasArgs ? `(${argsString})` : ""}
}`;
        } else {
          const fields = getFieldsForType(returnType, schemaAST);
          subscription = `subscription ${capitalize(fieldName)}${
            hasVariables ? `(${variables})` : ""
          } {
  ${fieldName}${hasArgs ? `(${argsString})` : ""} {
${fields}
  }
}`;
        }

        subscriptions.push({ name: fieldName, content: subscription });
      });
    }
  }
});

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Create output directory
mkdirSync(outputDir, { recursive: true });

// Organize operations by module
const moduleOperations = {};

// Group queries by module
queries.forEach(({ name, content }) => {
  const module = getModuleName(name);
  if (!moduleOperations[module]) {
    moduleOperations[module] = {
      queries: [],
      mutations: [],
      subscriptions: []
    };
  }
  moduleOperations[module].queries.push({ name, content });
});

// Group mutations by module
mutations.forEach(({ name, content }) => {
  const module = getModuleName(name);
  if (!moduleOperations[module]) {
    moduleOperations[module] = {
      queries: [],
      mutations: [],
      subscriptions: []
    };
  }
  moduleOperations[module].mutations.push({ name, content });
});

// Group subscriptions by module
subscriptions.forEach(({ name, content }) => {
  const module = getModuleName(name);
  if (!moduleOperations[module]) {
    moduleOperations[module] = {
      queries: [],
      mutations: [],
      subscriptions: []
    };
  }
  moduleOperations[module].subscriptions.push({ name, content });
});

// Write operations organized by module
Object.entries(moduleOperations).forEach(
  ([
    module,
    {
      queries: moduleQueries,
      mutations: moduleMutations,
      subscriptions: moduleSubscriptions
    }
  ]) => {
    const moduleDir = join(outputDir, module);
    mkdirSync(moduleDir, { recursive: true });

    // Write query files for this module
    moduleQueries.forEach(({ name, content }) => {
      const filename = join(moduleDir, `${name}.graphql`);
      writeFileSync(filename, content);
      console.log(`✓ Generated ${module}/queries: ${name}.graphql`);
    });

    // Write mutation files for this module
    moduleMutations.forEach(({ name, content }) => {
      const filename = join(moduleDir, `${name}.graphql`);
      writeFileSync(filename, content);
      console.log(`✓ Generated ${module}/mutations: ${name}.graphql`);
    });

    // Write subscription files for this module
    moduleSubscriptions.forEach(({ name, content }) => {
      const filename = join(moduleDir, `${name}.graphql`);
      writeFileSync(filename, content);
      console.log(`✓ Generated ${module}/subscriptions: ${name}.graphql`);
    });
  }
);

console.log(
  `\n✓ Generated ${queries.length} queries, ${
    mutations.length
  } mutations, and ${subscriptions.length} subscriptions across ${
    Object.keys(moduleOperations).length
  } modules`
);
console.log('✓ Run "npm run codegen" to generate TypeScript hooks');
