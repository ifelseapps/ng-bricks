const rimraf = require('rimraf');
const TypeDoc = require('typedoc');
const typedocParser = require('@ifelseapps/typedoc-json-angular-parser');

async function main() {
  const app = new TypeDoc.Application();
  app.options.addReader(new TypeDoc.TSConfigReader());
  app.bootstrap({
    // typedoc options here
    entryPoints: ['./projects/bricks/src/lib/components/combobox/combobox.component.ts'],
  });

  const project = app.convert();

  if (project) {
    const outputDir = 'docs';
    await app.generateJson(project, outputDir + '/documentation.json');

    const json = require(`../${outputDir}/documentation.json`);
    typedocParser.parse(json, { outputDir: './src/assets/components-api' });
    rimraf(outputDir, () => {});
  }
}

main().catch(console.error);
