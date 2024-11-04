require('dotenv/config');
const { Client } = require('@planetscale/database');
const { drizzle } = require('drizzle-orm/planetscale-serverless');
const { mysql: schema } = require('./schema.cjs');
import { describe, expect } from 'vitest';

if (!process.env['PLANETSCALE_CONNECTION_STRING']) {
	throw new Error('PLANETSCALE_CONNECTION_STRING is not defined');
}

describe('planetscale', async (it) => {
	it('drizzle(string)', async () => {
		const db = drizzle(
			process.env['PLANETSCALE_CONNECTION_STRING'],
		);

		await db.$client.execute('SELECT 1;');

		expect(db.$client).toBeInstanceOf(Client);
	});

	it('drizzle(string, config)', async () => {
		const db = drizzle(
			process.env['PLANETSCALE_CONNECTION_STRING'],
			{
				schema,
			},
		);

		await db.$client.execute('SELECT 1;');

		expect(db.$client).toBeInstanceOf(Client);
		expect(db.query.User).not.toStrictEqual(undefined);
	});

	it('drizzle({connection: string, ...config})', async () => {
		const db = drizzle({
			connection: process.env['PLANETSCALE_CONNECTION_STRING'],
			schema,
		});

		await db.$client.execute('SELECT 1;');

		expect(db.$client).toBeInstanceOf(Client);
		expect(db.query.User).not.toStrictEqual(undefined);
	});

	it('drizzle({connection: params, ...config})', async () => {
		const db = drizzle({
			connection: {
				url: process.env['PLANETSCALE_CONNECTION_STRING'],
			},
			schema,
		});

		await db.$client.execute('SELECT 1;');

		expect(db.$client).toBeInstanceOf(Client);
		expect(db.query.User).not.toStrictEqual(undefined);
	});

	it('drizzle(client)', async () => {
		const client = new Client({
			url: process.env['PLANETSCALE_CONNECTION_STRING'],
		});
		const db = drizzle(client);

		await db.$client.execute('SELECT 1;');

		expect(db.$client).toBeInstanceOf(Client);
	});

	it('drizzle(client, config)', async () => {
		const client = new Client({
			url: process.env['PLANETSCALE_CONNECTION_STRING'],
		});
		const db = drizzle(client, {
			schema,
		});

		await db.$client.execute('SELECT 1;');

		expect(db.$client).toBeInstanceOf(Client);
		expect(db.query.User).not.toStrictEqual(undefined);
	});

	it('drizzle({client, ...config})', async () => {
		const client = new Client({
			url: process.env['PLANETSCALE_CONNECTION_STRING'],
		});
		const db = drizzle({
			client,
			schema,
		});

		await db.$client.execute('SELECT 1;');

		expect(db.$client).toBeInstanceOf(Client);
		expect(db.query.User).not.toStrictEqual(undefined);
	});
});