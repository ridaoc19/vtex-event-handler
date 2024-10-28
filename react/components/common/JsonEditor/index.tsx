import Ajv from 'ajv';
import { JsonEditor as Editor } from 'jsoneditor-react';
import React from 'react';
import './global.css';

import generateJSON from '../../../../__generated__/schema.json';
import { KeyMessage, MapMessage } from '../../../typings/message';

const JsonEditor: React.FC<{ jsonData?: MapMessage[KeyMessage.modalData]['data']; jsonSchema?: unknown }> = ({
	jsonData,
	jsonSchema,
}) => {
	let title = 0;
	let data = {};
	let schema = {};
	if (jsonData) {
		const { 'gtm.uniqueEventId': uniqueEventId, ...cleanedJsonData } = jsonData;
		title = uniqueEventId;
		data = cleanedJsonData;
		schema = generateJSON.definitions.TotalMapEvents.properties[jsonData.event];
	}
	const ajv = new Ajv({ allErrors: true, verbose: true });
	return (
		<div className='json-editor-container'>
			<p>uniqueEventId: {title}</p>
			<Editor
				value={jsonSchema || data}
				mode='view'
				indentation={2}
				enableSort={false}
				enableTransform={false}
				history
				ajv={ajv}
				schema={schema}
			/>
		</div>
	);
};

export default JsonEditor;
