// eslint-disable-next-line import/order
const tsj = require('ts-json-schema-generator');
const path = require('path');
const fs = require('fs');

const config = {
	path: path.join(__dirname, './react/typings/message.ts'),
	tsconfig: path.join(__dirname, './react/tsconfig.json'),
	type: 'TotalMapEvents',
	expose: 'none',
};

const schemaPath = path.join(__dirname, './__generated__/schema.json');

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function removeExistingSchema() {
	if (fs.existsSync(schemaPath)) {
		fs.unlinkSync(schemaPath);
		process.stdout.write('Esquema anterior eliminado.\n');
	}
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function writeSchema(schema) {
	const schemaString = JSON.stringify(schema, null, 2);

	fs.writeFileSync(schemaPath, schemaString);
	process.stdout.write('Nuevo esquema generado y guardado.\n');
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function generateSchema() {
	return tsj.createGenerator(config).createSchema(config.type);
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function main() {
	process.stdout.write('Iniciando proceso de generación del esquema...\n');
	removeExistingSchema();
	const output = generateSchema();

	writeSchema(output);
	process.stdout.write('Proceso de generación de esquema finalizado.\n');
}

module.exports = main;
