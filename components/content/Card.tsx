import { motion } from "framer-motion";
import { Pen, Trash } from "lucide-react";
import { useState } from "react";
import NextLink from "next/link";
import Image from "next/image";

import { transition, variants } from "@/lib/animation";
import {
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Card as ScCard,
} from "../ui/card";
import { Button } from "../ui/button";
import { color } from "@/lib/constants";
import { Skeleton } from "../ui/skeleton";
import { Badge } from "../ui/badge";

import { generateKey } from "@/lib/utils";
import { Link } from "@/lib/types";
import { getImgUrl } from "@/lib/supabase";

const Card = ({
	id,
	desc,
	github_url,
	image_url,
	name,
	tags,
	website_url,
}: Link) => {
	const [imgLoading, setImgLoading] = useState(true);

	return (
		<motion.div
			variants={variants}
			initial={"hidden"}
			whileInView={"visible"}
			transition={transition(0.4)}
			viewport={{
				once: true,
				amount: 0.2,
			}}
		>
			<ScCard className="w-full shadow-md">
				<CardHeader>
					<NextLink href={`/link/${id}`} target="_blank">
						<div className="relative w-full h-48 overflow-hidden rounded-md">
							{imgLoading && <Skeleton className="w-full h-48" />}
							<Image
								src={getImgUrl(image_url)}
								alt="Link image"
								className="object-cover"
								fill={true}
								onLoad={() => setImgLoading(false)}
								priority={false}
								sizes="(max-width: 768px) 80vw, (max-width: 1024px) 40vw, 30vw"
							/>
						</div>
					</NextLink>
				</CardHeader>
				<CardContent>
					<CardTitle>{name}</CardTitle>
					<CardDescription className="truncate">{desc}</CardDescription>
					<div className="flex gap-2 mt-2">
						{tags.split(" ").map((tag, i) =>
							i < 3 ? (
								<Badge style={{ background: color() }} key={generateKey()}>
									{tag}
								</Badge>
							) : (
								""
							)
						)}
					</div>
				</CardContent>
				<CardFooter className="flex justify-between">
					<div className="flex gap-2">
						<NextLink href={website_url} target="_blank">
							<Button>Visit</Button>
						</NextLink>
						<NextLink href={github_url} target="_blank">
							<Button variant="ghost">View Code</Button>
						</NextLink>
					</div>
					<div className="flex gap-2">
						<Button variant="outline" size="icon">
							<Pen />
						</Button>
						<Button variant="destructive" size="icon">
							<Trash />
						</Button>
					</div>
				</CardFooter>
			</ScCard>
		</motion.div>
	);
};

export default Card;
