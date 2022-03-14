interface Window {
	JSUTILS: any
	JSUTILSAPI: any
}
interface paramType {
	key?: string
	type?: string
	value?: string
}

interface jsUtilsApiType {
    name?: string
    parameter?: string
    description?: string
    link?: string
    returns?: string
    todo?: string
    type?: string
    version?: string
    example?: string
	param?: paramType[]
}
interface resultType {
    status?: string
    msg?: string
}