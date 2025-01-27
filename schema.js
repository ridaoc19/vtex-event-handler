// eslint-disable-next-line import/order
const tsj = require('ts-json-schema-generator');
const path = require('path');
const fs = require('fs');

// Configuración
const config = {
	path: path.join(__dirname, './react/typings/message.ts'),
	tsconfig: path.join(__dirname, './react/tsconfig.json'),
	type: 'TotalMapEvents',
	expose: 'none',
};

const generatedDir = path.join(__dirname, './__generated__'); // Ruta de la carpeta __generated__
const schemaPath = path.join(generatedDir, 'schema.json');

const log = {
	success: message => console.warn(`\x1b[32m%s\x1b[0m`, message),
	info: message => console.warn(`\x1b[34m%s\x1b[0m`, message),
	warning: message => console.warn(`\x1b[33m%s\x1b[0m`, message),
	error: message => console.warn(`\x1b[31m%s\x1b[0m`, message),
};

// Verificar y crear la carpeta __generated__ si no existe
function ensureGeneratedDirExists() {
	if (!fs.existsSync(generatedDir)) {
		fs.mkdirSync(generatedDir);
		log.success('Carpeta __generated__ creada.');
	} else {
		log.info('Carpeta __generated__ ya existe.');
	}
}

// Eliminar el archivo de esquema existente
function removeExistingSchema() {
	if (fs.existsSync(schemaPath)) {
		fs.unlinkSync(schemaPath);
		log.warning('Esquema anterior eliminado.');
	} else {
		log.info('No se encontró un esquema previo para eliminar.');
	}
}

// Escribir el esquema generado en el archivo
function writeSchema(schema) {
	const schemaString = JSON.stringify(schema, null, 2);

	fs.writeFileSync(schemaPath, schemaString);
	log.success('Nuevo esquema generado y guardado en __generated__.');
}

// Generar el esquema utilizando ts-json-schema-generator
function generateSchema() {
	log.info('Generando el esquema...');

	return tsj.createGenerator(config).createSchema(config.type);
}

// Función principal del proceso
function main() {
	log.info('Iniciando proceso de generación del esquema...');
	ensureGeneratedDirExists(); // Asegurar que la carpeta exista
	removeExistingSchema(); // Eliminar el esquema existente, si aplica
	const output = generateSchema(); // Generar el nuevo esquema

	writeSchema(output); // Guardar el esquema generado
	log.success('Proceso de generación de esquema finalizado.');
}

module.exports = main;
