import { readFileSync, writeFileSync } from 'fs';
import { parse, visit } from 'graphql';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the schema file
const schemaPath = join(__dirname, '../../backend/src/schema.gql');
const schemaContent = readFileSync(schemaPath, 'utf-8');
const schemaAST = parse(schemaContent);

// Output file for generated types
const outputFile = join(__dirname, '../src/lib/types.ts');

// Types to skip (GraphQL internals and operation types)
const SKIP_TYPES = ['Query', 'Mutation', 'Subscription', '__Schema', '__Type', '__Field', '__InputValue', '__EnumValue', '__Directive'];

// Collect all type definitions
const objectTypes = [];
const enumTypes = [];
const inputTypes = [];

// Helper to get base type name
function getBaseType(type) {
  if (type.kind === 'NonNullType' || type.kind === 'ListType') {
    return getBaseType(type.type);
  }
  return type.name.value;
}

// Helper to check if type is nullable
function isNullable(type) {
  return type.kind !== 'NonNullType';
}

// Helper to check if type is a list
function isList(type) {
  if (type.kind === 'NonNullType') {
    return isList(type.type);
  }
  return type.kind === 'ListType';
}

// Helper to check if type is a scalar
function isScalar(typeName) {
  const scalars = ['String', 'Int', 'Float', 'Boolean', 'ID', 'DateTime', 'JSON', 'Upload'];
  return scalars.includes(typeName);
}

// Convert GraphQL type to TypeScript type
function convertType(typeName) {
  const typeMap = {
    'String': 'string',
    'Int': 'number',
    'Float': 'number',
    'Boolean': 'boolean',
    'ID': 'string',
    'DateTime': 'string',
    'JSON': 'any',
    'Upload': 'File',
  };
  return typeMap[typeName] || typeName;
}

// Generate TypeScript type annotation for a field
function generateFieldType(field, allTypes) {
  const baseTypeName = getBaseType(field.type);
  const nullable = isNullable(field.type);
  const list = isList(field.type);

  let tsType;

  if (isScalar(baseTypeName)) {
    tsType = convertType(baseTypeName);
  } else if (allTypes.has(baseTypeName)) {
    // It's a custom object type
    tsType = baseTypeName;
  } else {
    // Unknown type, use any
    tsType = 'any';
  }

  // Apply list wrapper if needed
  if (list) {
    tsType = `${tsType}[]`;
  }

  // Apply null/undefined wrapper if needed
  if (nullable) {
    tsType = `${tsType} | null`;
  }

  return tsType;
}

// Visit the schema and collect types
visit(schemaAST, {
  ObjectTypeDefinition(node) {
    if (!SKIP_TYPES.includes(node.name.value)) {
      objectTypes.push(node);
    }
  },
  EnumTypeDefinition(node) {
    enumTypes.push(node);
  },
  InputObjectTypeDefinition(node) {
    inputTypes.push(node);
  },
});

// Create a set of all type names for reference
const allTypeNames = new Set([
  ...objectTypes.map(t => t.name.value),
  ...enumTypes.map(t => t.name.value),
  ...inputTypes.map(t => t.name.value),
]);

// Generate interfaces
const interfaceStrings = objectTypes.map(type => {
  const typeName = type.name.value;
  const fields = type.fields || [];

  const fieldStrings = fields.map(field => {
    const fieldName = field.name.value;
    const fieldType = generateFieldType(field, allTypeNames);
    const optional = isNullable(field.type) ? '?' : '';

    return `  ${fieldName}${optional}: ${fieldType}`;
  });

  const description = type.description?.value ? `/**\n * ${type.description.value}\n */\n` : '';

  return `${description}export interface ${typeName} {\n${fieldStrings.join('\n')}\n}`;
});

// Generate enums
const enumStrings = enumTypes.map(type => {
  const typeName = type.name.value;
  const values = type.values || [];

  const valueStrings = values.map(value => {
    const valueName = value.name.value;
    return `  ${valueName} = '${valueName}'`;
  });

  const description = type.description?.value ? `/**\n * ${type.description.value}\n */\n` : '';

  return `${description}export enum ${typeName} {\n${valueStrings.join(',\n')}\n}`;
});

// Generate input types as interfaces
const inputTypeStrings = inputTypes.map(type => {
  const typeName = type.name.value;
  const fields = type.fields || [];

  const fieldStrings = fields.map(field => {
    const fieldName = field.name.value;
    const fieldType = generateFieldType(field, allTypeNames);
    const optional = isNullable(field.type) ? '?' : '';

    return `  ${fieldName}${optional}: ${fieldType}`;
  });

  const description = type.description?.value ? `/**\n * ${type.description.value}\n */\n` : '';

  return `${description}export interface ${typeName} {\n${fieldStrings.join('\n')}\n}`;
});

// Generate the output file
const output = `/**
 * Auto-generated TypeScript types from GraphQL schema
 * DO NOT EDIT MANUALLY - This file is auto-generated
 * Run 'npm run codegen' to regenerate
 */

// ============================================
// Enums
// ============================================

${enumStrings.join('\n\n')}

// ============================================
// Input Types
// ============================================

${inputTypeStrings.join('\n\n')}

// ============================================
// Object Types
// ============================================

${interfaceStrings.join('\n\n')}
`;

// Write the output file
writeFileSync(outputFile, output);

console.log(`✓ Generated TypeScript types for:`);
console.log(`  - ${enumTypes.length} enums`);
console.log(`  - ${inputTypes.length} input types`);
console.log(`  - ${objectTypes.length} object types`);
console.log(`✓ Output written to: ${outputFile}`);