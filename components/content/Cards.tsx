import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { linkState } from "@/atoms/linksAtom";

import Card from "./Card";
import SkeletonCards from "./SkeletonCards";
import { supabase } from "@/lib/supabase";

const Cards = () => {
	const [links, setLinks] = useRecoilState(linkState);

	const getLinks = async () => {
		const { data } = await supabase.from("links").select();
		setLinks(data || []);
	};

	useEffect(() => {
		getLinks();
	}, []);

	return (
		<main className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
			{links.length !== 0 ? (
				links.map((link) => <Card {...link} />)
			) : (
				<SkeletonCards />
			)}
		</main>
	);
};

export default Cards;
