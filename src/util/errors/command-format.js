'use babel';
'use strict';

import FriendlyError from './friendly';
import * as usage from '../command-usage';

export default class CommandFormatError extends FriendlyError {
	constructor(command, server = null) {
		super(`Invalid command format. Use ${usage.long(`help ${command.name}`, server)} for information.`);
		this.name = 'CommandFormatError';
	}
}
