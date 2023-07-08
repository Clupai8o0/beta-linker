"use client";

import Card from "@/components/card";
import SearchBar from "@/components/search";
import React, { useEffect, useState } from "react";

export default function Home() {
	const [query, setQuery] = useState("");
	const [links, setLinks] = useState<any[]>([]);

	const getLinks = async () => {
		const res = await fetch("/api/get-links", {
			method: "GET",
		});
		const data = await res.json();
		console.log(data)
		setLinks(data.data);
	};

	useEffect(() => {
		getLinks();
	}, []);

	return (
		<main>
			<SearchBar
				classNames="md:hidden my-4 px-4"
				query={query}
				setQuery={setQuery}
				setLinks={setLinks}
			/>

			<div className="p-4 flex flex-col gap-4">
				{links.map((link: any) => (
					<Card key={link.id} {...link} />
				))}
			</div>
		</main>
	);
}
