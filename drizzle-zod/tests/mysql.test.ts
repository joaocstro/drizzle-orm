import test from 'ava';
import {
	bigint,
	binary,
	boolean,
	char,
	customType,
	date,
	datetime,
	decimal,
	double,
	float,
	int,
	json,
	longtext,
	mediumint,
	mediumtext,
	mysqlEnum,
	mysqlTable,
	real,
	serial,
	smallint,
	text,
	time,
	timestamp,
	tinyint,
	tinytext,
	varbinary,
	varchar,
	year,
} from 'drizzle-orm/mysql-core';
import { z } from 'zod';
import { createInsertSchema, createSelectSchema, jsonSchema } from '~/index';
import { assertSchemasEqual } from './utils';

const customInt = customType<{ data: number }>({
	dataType() {
		return 'int';
	},
});

const testTable = mysqlTable('test', {
	bigint: bigint('bigint', { mode: 'bigint' }).notNull(),
	bigintNumber: bigint('bigintNumber', { mode: 'number' }).notNull(),
	binary: binary('binary').notNull(),
	boolean: boolean('boolean').notNull(),
	char: char('char').notNull(),
	charEnum: char('char', { enum: ['a', 'b', 'c'] }).notNull(),
	customInt: customInt('customInt').notNull(),
	date: date('date').notNull(),
	dateString: date('dateString', { mode: 'string' }).notNull(),
	datetime: datetime('datetime').notNull(),
	datetimeString: datetime('datetimeString', { mode: 'string' }).notNull(),
	decimal: decimal('decimal').notNull(),
	double: double('double').notNull(),
	enum: mysqlEnum('enum', ['a', 'b', 'c']).notNull(),
	float: float('float').notNull(),
	int: int('int').notNull(),
	json: json('json').notNull(),
	mediumint: mediumint('mediumint').notNull(),
	real: real('real').notNull(),
	serial: serial('serial').notNull(),
	smallint: smallint('smallint').notNull(),
	text: text('text').notNull(),
	textEnum: text('textEnum', { enum: ['a', 'b', 'c'] }).notNull(),
	tinytext: tinytext('tinytext').notNull(),
	tinytextEnum: tinytext('tinytextEnum', { enum: ['a', 'b', 'c'] }).notNull(),
	mediumtext: mediumtext('mediumtext').notNull(),
	mediumtextEnum: mediumtext('mediumtextEnum', { enum: ['a', 'b', 'c'] }).notNull(),
	longtext: longtext('longtext').notNull(),
	longtextEnum: longtext('longtextEnum', { enum: ['a', 'b', 'c'] }).notNull(),
	time: time('time').notNull(),
	timestamp: timestamp('timestamp').notNull(),
	timestampString: timestamp('timestampString', { mode: 'string' }).notNull(),
	tinyint: tinyint('tinyint').notNull(),
	varbinary: varbinary('varbinary', { length: 200 }).notNull(),
	varchar: varchar('varchar', { length: 200 }).notNull(),
	varcharEnum: varchar('varcharEnum', { length: 200, enum: ['a', 'b', 'c'] }).notNull(),
	year: year('year').notNull(),
});

test('insert schema', (t) => {
	const actual = createInsertSchema(testTable);

	const expected = z.object({
		bigint: z.bigint(),
		bigintNumber: z.number(),
		binary: z.string(),
		boolean: z.boolean(),
		char: z.string(),
		charEnum: z.enum(['a', 'b', 'c']),
		customInt: z.any(),
		date: z.date(),
		dateString: z.string(),
		datetime: z.date(),
		datetimeString: z.string(),
		decimal: z.string(),
		double: z.number(),
		enum: z.enum(['a', 'b', 'c']),
		float: z.number(),
		int: z.number(),
		json: jsonSchema,
		mediumint: z.number(),
		real: z.number(),
		serial: z.number().optional(),
		smallint: z.number(),
		text: z.string(),
		textEnum: z.enum(['a', 'b', 'c']),
		tinytext: z.string(),
		tinytextEnum: z.enum(['a', 'b', 'c']),
		mediumtext: z.string(),
		mediumtextEnum: z.enum(['a', 'b', 'c']),
		longtext: z.string(),
		longtextEnum: z.enum(['a', 'b', 'c']),
		time: z.string(),
		timestamp: z.date(),
		timestampString: z.string(),
		tinyint: z.number(),
		varbinary: z.string(),
		varchar: z.string(),
		varcharEnum: z.enum(['a', 'b', 'c']),
		year: z.number(),
	});

	assertSchemasEqual(t, actual, expected);
});

test('select schema', (t) => {
	const actual = createSelectSchema(testTable);

	const expected = z.object({
		bigint: z.bigint(),
		bigintNumber: z.number(),
		binary: z.string(),
		boolean: z.boolean(),
		char: z.string(),
		charEnum: z.enum(['a', 'b', 'c']),
		customInt: z.any(),
		date: z.date(),
		dateString: z.string(),
		datetime: z.date(),
		datetimeString: z.string(),
		decimal: z.string(),
		double: z.number(),
		enum: z.enum(['a', 'b', 'c']),
		float: z.number(),
		int: z.number(),
		json: jsonSchema,
		mediumint: z.number(),
		real: z.number(),
		serial: z.number(),
		smallint: z.number(),
		text: z.string(),
		textEnum: z.enum(['a', 'b', 'c']),
		tinytext: z.string(),
		tinytextEnum: z.enum(['a', 'b', 'c']),
		mediumtext: z.string(),
		mediumtextEnum: z.enum(['a', 'b', 'c']),
		longtext: z.string(),
		longtextEnum: z.enum(['a', 'b', 'c']),
		time: z.string(),
		timestamp: z.date(),
		timestampString: z.string(),
		tinyint: z.number(),
		varbinary: z.string(),
		varchar: z.string(),
		varcharEnum: z.enum(['a', 'b', 'c']),
		year: z.number(),
	});

	assertSchemasEqual(t, actual, expected);
});
