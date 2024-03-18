import { NextRequest } from "next/server";
import { handleSuccess, handleError } from "@/lib/api";
import { createCookie, createSession } from "@/lib/session";

export async function POST(req: NextRequest) {
	try {
		const { password } = await req.json();
		if (!password) throw new Error("Missing password in body");

		if (password === process.env.PASSWORD)
			return handleSuccess("Password verified", createCookie());
		else return handleError("Password incorrect");
	} catch (e: any) {
		return handleError("Could not verify password", e);
	}
}
