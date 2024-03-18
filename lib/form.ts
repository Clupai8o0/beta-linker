import { z } from "zod";

export const formSchema = z.object({
	name: z.string().min(2, {
		message: "Link name must be at least 2 characters long",
	}),
	url: z.string().url({
		message: "Must be a url",
	}),
	code: z.string().url({
		message: "Must be a url",
	}),
	desc: z.string().optional(),
	tags: z.string().optional(),
});