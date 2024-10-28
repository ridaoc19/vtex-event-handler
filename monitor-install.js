const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const lockFile = path.resolve(__dirname, '.install-lock');
const reactDir = path.resolve(__dirname, 'react');
const nodeModulesReact = `${reactDir}/node_modules`;
const nodeModulesMain = path.resolve(__dirname, 'node_modules');

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const execCommand = (command, cwd) => {
	try {
		execSync(command, { cwd, stdio: 'inherit' });
	} catch (error) {
		process.stderr.write(`Error ejecutando comando: ${command}\n`);
		fs.unlinkSync(lockFile); // Eliminar el lock file si ocurre un error
		process.exit(1);
	}
};

if (fs.existsSync(lockFile)) {
	process.stdout.write('El proceso de instalación ya está en ejecución. Saliendo...\n');
	process.exit(0);
}

fs.writeFileSync(lockFile, 'Instalando...');

try {
	if (!fs.existsSync(nodeModulesReact)) {
		process.stdout.write('Instalando dependencias de React...\n');
		execCommand('yarn install', reactDir);
	}

	if (!fs.existsSync(nodeModulesMain)) {
		process.stdout.write('Instalando dependencias del proyecto raíz...\n');
		execCommand('yarn install', path.resolve(__dirname));
	}

	process.stdout.write('Creando esquemas de TypeScript a JSON...\n');
	// eslint-disable-next-line global-require
	const schema = require('./schema');

	schema();
} finally {
	fs.unlinkSync(lockFile);
	process.stdout.write('Proceso de instalación y creación de esquemas completado con éxito.\n');
}
