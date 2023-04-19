export default interface User {
    id?: string,
	name: string,
	lastName: string,
	email: string,
	expenses: [{
		id:string,
		name:string,
		userId:string,
		amount:number,
		status:string,
		_category: {
			id:string,
			name:string
		}
	}]
}