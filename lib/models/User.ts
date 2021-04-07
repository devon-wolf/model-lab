import { UserRow, UserRequest } from '../../types';
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
}