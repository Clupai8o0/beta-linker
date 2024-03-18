import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const createSession = () => {
	return jwt.sign(
		{
			truth: true,
		},
		process.env.SECRET || "",
		{
			expiresIn: "3 days",
		}
	);
};

export const createCookie = () => {
	const today = new Date();
	cookies().set("session", createSession(), {
		secure: true,
		httpOnly: true,
		expires: today.setDate(today.getDate() + 3),
	});
};

export const verifySession = (session: string) => {
	try {
		const data: any = jwt.verify(session, process.env.SECRET || "");
		return { success: true, data };
	} catch (e: any) {
		return { success: false, data: e };
	}
};
