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
 export type DatabaseQuery = {
	 rows: Array<UserRow>,
	 [key: string]: any
 }