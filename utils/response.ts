export function response(success: boolean, msg: string, data?: any) {
	return JSON.stringify({ success, msg, data });
}
