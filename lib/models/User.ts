import { UserRow, UserRequest, DatabaseQuery } from '../../types';
const pool = require('../utils/pool');

module.exports = class User {
	id : string;
	username : string;
	email : string;
	isContributor : boolean;

	constructor(row : UserRow) {
		const {
			id,
			username,
			email,
			is_contributor
		} = row;

		this.id = id;
		this.username = username;
		this.email = email;
		this.isContributor = is_contributor;
	}

	static async insert({ username, email, isContributor } : UserRequest) {
		const { rows } = await pool.query(
			`INSERT INTO users (username, email, is_contributor)
			VALUES ($1, $2, $3)
			RETURNING *`,
			[
				username,
				email,
				isContributor
			]
		);

		return new User(rows[0]);
	}

	static async select() {
		const { rows } = await pool.query('SELECT * FROM users');

		const users = rows.map((row : UserRow) => new User(row));

		return users;
	}

	static async selectByID(id : string) {
		const { rows } = await pool.query('SELECT * FROM users WHERE id=$1', [id]);

		return new User(rows[0]);
	}

	static async update({ id, username, email, isContributor } : User) {
		const { rows } = await pool.query(
			`UPDATE users
			SET username=$1,
			email=$2,
			is_contributor=$3
			WHERE id=$4
			RETURNING *`,
			[
				username,
				email,
				isContributor,
				id
			]
		);

		return new User(rows[0]);
	}

	static async delete(id : string) {
		const { rows } = await pool.query(`
		DELETE FROM users WHERE id=$1
		RETURNING *`, [id]);

		return new User(rows[0]);
	}
}