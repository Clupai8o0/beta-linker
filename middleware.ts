import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	const port = process.env.NEXT_PUBLIC_PORT;
	const url = request.url;

	// if user has cookie
	if (request.cookies.has("session")) {
		// verify that cookie
		const session = request.cookies.get("session");
		const resp = await fetch(
			`${port}api/auth/verify-session`,
			{
				method: "POST",
				headers: {
					Cookie: `session=${session?.value};`,
				},
			}
		);
		const { success } = await resp.json();

		// if user cookie is verified
		if (success) {
			// then auto sign him in using the session
			if (url === `${port}` || url === `${port}app` || url === `${port}home`)
				return NextResponse.next();
			return NextResponse.redirect(new URL("/home", url));
		} else {
			// let him stay in auth
			if (url === `${port}auth` || url === `${port}login`)
				return NextResponse.next();

			// if he was in dashboard and session is not verified
			// take him to login
			return NextResponse.redirect(new URL("/auth", url));
		}
	} else {
		// if user does not have session cookie
		// and if they try to open the dashboard
		// throw them to login
		if (url === `${port}` || url === `${port}app` || url === `${port}home`)
			return NextResponse.redirect(new URL("/auth", url));

		// otherwise leave him at his place
		return NextResponse.next();
	}
}

export const config = {
	matcher: ["/home", "/app", "/", "/auth", "/login"],
};
