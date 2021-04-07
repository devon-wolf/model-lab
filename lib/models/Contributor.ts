import { ContribRequest, ContribRow } from '../../types';
const pool = require('../utils/pool');

module.exports = class Contributor {
	id : string;
	userID : string;
	pseudonym : string | null;

	constructor(row : ContribRow) {
		const {
			id,
			user_id,
			pseudonym
		} = row;

		this.id = id;
		this.userID = user_id;
		this.pseudonym = pseudonym;
	}

	static async insert({ userID, pseudonym } : ContribRequest) {
		const { rows } = await pool.query(
			`INSERT INTO contributors (user_id, pseudonym)
			VALUES ($1, $2)
			RETURNING *`,
			[
				userID,
				pseudonym
			]
		);

		return new Contributor(rows[0]);
	}
}