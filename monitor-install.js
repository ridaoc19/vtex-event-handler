const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const lockFile = path.resolve(__dirname, '.install-lock');
const reactDir = path.resolve(__dirname, 'react');
const nodeModulesReact = `${reactDir}/node_modules`;
const nodeModulesMain = path.resolve(__dirname, 'node_modules');

const log = {
	success: message => console.warn(`\x1b[42m\x1b[30m%s\x1b[0m`, message), // Fondo verde con texto negro
	info: message => console.warn(`\x1b[44m\x1b[37m%s\x1b[0m`, message), // Fondo azul con texto blanco
	warning: message => console.warn(`\x1b[43m\x1b[30m%s\x1b[0m`, message), // Fondo amarillo con texto negro
	error: message => console.warn(`\x1b[41m\x1b[37m%s\x1b[0m`, message), // Fondo rojo con texto blanco
};

// Ejecutar comandos
const execCommand = (command, cwd) => {
	try {
		execSync(command, { cwd, stdio: 'inherit' });
	} catch (error) {
		log.error(`Error ejecutando comando: ${command}`);
		fs.unlinkSync(lockFile);
		process.exit(1);
	}
};

// Verificar si ya está en ejecución
if (fs.existsSync(lockFile)) {
	log.warning('El proceso de instalación ya está en ejecución. Saliendo...');
	process.exit(0);
}

// Crear lock file
fs.writeFileSync(lockFile, 'Instalando...');

try {
	if (!fs.existsSync(nodeModulesReact)) {
		log.info('Instalando dependencias de React...');
		execCommand('yarn install', reactDir);
	}

	if (!fs.existsSync(nodeModulesMain)) {
		log.info('Instalando dependencias del proyecto raíz...');
		execCommand('yarn install', path.resolve(__dirname));
	}

	log.info('Creando esquemas de TypeScript a JSON...');
	// eslint-disable-next-line global-require
	const schema = require('./schema');

	schema();

	log.success('Proceso de instalación y creación de esquemas completado con éxito.');
} finally {
	fs.unlinkSync(lockFile);
	log.info('Lock file eliminado. Proceso finalizado.');
}
