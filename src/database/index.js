'use babel';
'use strict';

import { join as pathJoin } from 'path';
import { open, verbose } from 'sqlite';
import sqlite3 from 'sqlite3';
import bot from '../bot';
import config from '../config';
import Character from './character';

export var db;
export default db;

export async function init() {
	bot.logger.info('Initializing database...', { file: config.database, verbose: config.databaseVerbose });
	if(config.databaseVerbose) {
		verbose();
	}
	db = await open({
		filename: config.database,
		driver: sqlite3.Database
	});
	await db.migrate({ migrationsPath: pathJoin(__dirname, '../../migrations') });
	await Promise.all([
		Character.convertStorage()
	]);
	bot.logger.info('Database initialized.');
}

export async function close() {
	bot.logger.info('Closing database...');
	await db.close();
	bot.logger.info('Database closed.');
}
