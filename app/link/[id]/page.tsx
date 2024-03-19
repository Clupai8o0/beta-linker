"use client";

import Image from "next/image";
import { Pen, Trash } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import NextLink from "next/link";

import Navbar from "@/components/content/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { getImgUrl, supabase } from "@/lib/supabase";
import { Link } from "@/lib/types";
import { generateKey } from "@/lib/utils";
import { transition, variants, variants2 } from "@/lib/animation";
import { color } from "@/lib/constants";
import Edit from "@/components/content/EditLink";
import Delete from "@/components/content/DeleteLink";

function LinkPage({ params }: { params: { id: string } }) {
	const { id } = params;

	const [imgLoading, setImgLoading] = useState(true);
	const [link, setLink] = useState<Link>();
	const [notFound, setNotFound] = useState(false);

	const getLink = async () => {
		const { data } = await supabase.from("links").select("*").eq("id", id);
		if (data && data.length !== 0) setLink(data[0]);
		else setNotFound(true);
	};

	useEffect(() => {
		getLink();
	}, []);

	return (
		<div className="flex flex-col items-center w-full max-w-7xl">
			<Navbar noSearchBar />

			{!notFound ? (
				<main className="max-w-2xl w-full mt-8 px-6 md:px-0 mb-8">
					{link ? (
						<div>
							<motion.div
								variants={variants}
								initial={"hidden"}
								exit={"hidden"}
								animate={"visible"}
								transition={transition()}
							>
								<div className="relative w-full h-64 md:h-96 overflow-hidden rounded-md">
									{imgLoading && <Skeleton className="w-full h-64 md:h-96" />}
									<Image
										src={getImgUrl(link?.image_url || "")}
										alt="Link image"
										className="object-cover"
										fill={true}
										onLoadingComplete={() => setImgLoading(false)}
									/>
								</div>
							</motion.div>

							<div className="flex flex-col mt-8">
								<motion.h1
									className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
									variants={variants}
									initial={"hidden"}
									exit={"hidden"}
									animate={"visible"}
									transition={transition(0.4)}
								>
									{link?.name}
								</motion.h1>

								<motion.div
									className="flex flex-wrap gap-2 mt-2"
									variants={variants}
									initial={"hidden"}
									exit={"hidden"}
									animate={"s_visible"}
									transition={transition(0.6)}
								>
									{link?.tags.split(" ").map((tag) => (
										<motion.div variants={variants2}>
											<Badge
												style={{ background: color() }}
												key={generateKey()}
											>
												{tag}
											</Badge>
										</motion.div>
									))}
								</motion.div>

								<motion.p
									className="leading-7 [&:not(:first-child)]:mt-4 dark:text-gray-100"
									variants={variants}
									initial={"hidden"}
									exit={"hidden"}
									animate={"visible"}
									transition={transition(0.8)}
								>
									{link?.desc}
								</motion.p>
							</div>

							<motion.div
								className="flex justify-between mt-4"
								variants={variants}
								initial={"hidden"}
								exit={"hidden"}
								animate={"visible"}
								transition={transition(1)}
							>
								<div className="flex gap-2">
									<NextLink href={link?.website_url || ""}>
										<Button variant="default">Visit</Button>
									</NextLink>
									<NextLink href={link?.github_url || ""}>
										<Button variant="secondary">View Code</Button>
									</NextLink>
								</div>
								<div className="flex gap-2">
									<Edit link={link} />
									<Delete id={link?.id || ""} />
								</div>
							</motion.div>
						</div>
					) : (
						<div className="flex flex-col gap-6">
							<Skeleton className="w-full h-64 md:h-96" />
							<Skeleton className="w-3/4 h-8" />
							<Skeleton className="w-2/3 h-8" />
							<Skeleton className="w-5/6 h-8" />
						</div>
					)}
				</main>
			) : (
				<main className="w-full h-[70vh] flex justify-center items-center flex-col gap-4">
					<h1 className="h1">Sorry, we couldn't find this link</h1>
					<p className="p">Try something else</p>
					<NextLink href="/home">
						<Button>Go back</Button>
					</NextLink>
				</main>
			)}
		</div>
	);
}

export default LinkPage;
