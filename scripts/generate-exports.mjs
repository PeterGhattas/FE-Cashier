import { readdirSync, writeFileSync, statSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const operationsDir = join(__dirname, '../src/graphql/operations');

// Check if operations directory exists
if (!existsSync(operationsDir)) {
  console.log('⚠ Operations directory does not exist yet. Run codegen first.');
  process.exit(0);
}

// Get all module directories
const allFiles = readdirSync(operationsDir);
const modules = allFiles.filter(file => {
  const fullPath = join(operationsDir, file);
  return statSync(fullPath).isDirectory();
});

if (modules.length === 0) {
  console.log('⚠ No module directories found. Run codegen first.');
  process.exit(0);
}

console.log(`Found ${modules.length} modules: ${modules.join(', ')}\n`);

// Track modules with generated files
const modulesWithExports = [];

// Generate index.ts for each module
modules.forEach(module => {
  const moduleDir = join(operationsDir, module);
  const files = readdirSync(moduleDir).filter(f => f.endsWith('.generated.ts'));

  if (files.length === 0) {
    console.log(`⚠ No generated files in ${module}, skipping...`);
    return;
  }

  // Create exports for each generated file
  const exports = files.map(file => {
    const baseName = file.replace('.generated.ts', '');
    return `export * from './${baseName}.generated';`;
  }).join('\n');

  const indexPath = join(moduleDir, 'index.ts');
  writeFileSync(indexPath, exports + '\n');
  console.log(`✓ Generated ${module}/index.ts with ${files.length} exports`);

  modulesWithExports.push(module);
});

// Generate root barrel export only for modules that have exports
const rootExports = modulesWithExports.length > 0
  ? modulesWithExports.map(module => {
      return `export * from '../operations/${module}';`;
    }).join('\n')
  : '// No modules generated yet';

const rootIndexPath = join(__dirname, '../src/graphql/generated/index.ts');
const rootIndexDir = dirname(rootIndexPath);

// Ensure the generated directory exists
mkdirSync(rootIndexDir, { recursive: true });

const rootIndexContent = `// Auto-generated barrel export file
// Re-exports all modules for convenience

// Base schema types
export * from './schema';

// Module exports
${rootExports}
`;

writeFileSync(rootIndexPath, rootIndexContent);

if (modulesWithExports.length > 0) {
  console.log(`\n✓ Generated root index.ts with exports from ${modulesWithExports.length} modules`);
  console.log('✓ All barrel exports generated successfully!');
} else {
  console.log(`\n⚠ No modules had generated files to export`);
}