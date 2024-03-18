"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { transition, variants } from "@/lib/animation";

const FormSchema = z.object({
	password: z.string().min(1, {
		message: "Password cannot be empty",
	}),
});

function AuthPage() {
	const router = useRouter();
	const [submitted, setSubmitted] = useState(false);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			password: "",
		},
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		setSubmitted(true);
		const resp = await fetch(
			`${process.env.NEXT_PUBLIC_PORT}api/auth/verify-password`,
			{
				method: "POST",
				headers: {
					"Content-Type": "Application/JSON",
				},
				body: JSON.stringify({
					password: data.password,
				}),
			}
		);
		const { success } = await resp.json();

		// if password is correct
		if (!success) {
			form.reset();
			form.setError(
				"password",
				{
					message: "Incorrect password",
				},
				{
					shouldFocus: true,
				}
			);
			setSubmitted(false);
		} else {
			router.replace("/home");
		}
	}

	return (
		<main className="flex justify-center items-center w-full max-w-7xl min-h-screen">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-2/3 lg:w-1/3 space-y-6"
				>
					<motion.div
						variants={variants}
						initial={"hidden"}
						animate={"visible"}
						transition={transition(0)}
					>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											placeholder="Password..."
											{...field}
											type="password"
										/>
									</FormControl>
									<FormDescription>
										Type the password to enter the site
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</motion.div>
					<motion.div
						variants={variants}
						initial={"hidden"}
						animate={"visible"}
						transition={transition(0.2)}
					>
						<Button type="submit" disabled={submitted}>
							{submitted && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
							Submit
						</Button>
					</motion.div>
				</form>
			</Form>
		</main>
	);
}

export default AuthPage;
