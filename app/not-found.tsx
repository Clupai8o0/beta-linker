"use client";

import Link from "next/link";
import Navbar from "@/components/content/Navbar";
import { Button } from "@/components/ui/button";

function NotFoundPage() {
	return (
		<div className="flex flex-col items-center justify-center w-full max-w-7xl gap-y-6">
			<Navbar noSearchBar />

			<main className="flex flex-col items-center justify-center w-full h-[70vh] gap-6">
				<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
					Page Not Found
				</h1>
				<p className="leading-7">Sorry, this page doesn't exist</p>

				<div>
					<Link href="/home">
						<Button>Go back</Button>
					</Link>
				</div>
			</main>
		</div>
	);
}

export default NotFoundPage;
