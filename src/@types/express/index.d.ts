// sobreescrevendo o request do express para ter o user_id como atributo
declare namespace Express {
	export interface Request {
		user_id: string;
	}
}
