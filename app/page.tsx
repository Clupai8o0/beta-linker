"use client";

import { RecoilRoot } from "recoil";

import Cards from "@/components/content/Cards";
import Navbar from "@/components/content/Navbar";

export default function Home() {
	return (
		<RecoilRoot>
			<div className="flex flex-col items-center w-full max-w-7xl">
				<Navbar />
				<Cards />
			</div>
		</RecoilRoot>
	);
}
