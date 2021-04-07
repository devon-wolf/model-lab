import { UserRow } from '../../types';
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
}