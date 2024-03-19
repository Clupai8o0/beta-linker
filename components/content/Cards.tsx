import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { linkState } from "@/atoms/linksAtom";
import { notFoundState } from "@/atoms/notFoundAtom";

import Card from "./Card";
import SkeletonCards from "./SkeletonCards";

import { supabase } from "@/lib/supabase";
import { generateKey } from "@/lib/utils";

const Cards = () => {
	const [links, setLinks] = useRecoilState(linkState);
	const notFound = useRecoilValue(notFoundState);

	const getLinks = async () => {
		const { data } = await supabase.from("links").select();
		setLinks(data || []);
	};

	useEffect(() => {
		getLinks();
	}, []);

	return !notFound ? (
		<main className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
			{links.length !== 0 ? (
				links.map((link) => <Card link={link} key={generateKey()} />)
			) : (
				<SkeletonCards />
			)}
		</main>
	) : (
		<main className="w-full h-[70vh] flex justify-center items-center flex-col gap-4">
			<h1 className="h1">Sorry, no results found...</h1>
			<p className="p">Try searching something else</p>
		</main>
	);
};

export default Cards;
