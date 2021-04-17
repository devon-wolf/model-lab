export type UserRequest = {
	username: string,
	email: string,
	isContributor: boolean
}

export type UserRow = {
	id: string,
	username: string,
	email: string,
	is_contributor: boolean
}

export type ContribRequest = {
	userID: string,
	pseudonym?: string
}

export type ContribRow = {
	id: string,
	user_id: string,
	pseudonym: string | null
}

export type DatabaseQuery = {
	rows: Array<UserRow | ContribRow>,
	[key: string]: any
}