import React from "react";
import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";

const colors = [
	"#FF8080",
	"#FFA680",
	"#FFE680",
	"#A6FF80",
	"#80FFA6",
	"#80FFFF",
	"#80A6FF",
	"#A680FF",
	"#E680FF",
	"#FF80A6",
	"#B28080",
	"#B2A280",
	"#B2E280",
	"#8AB280",
	"#80B2A6",
	"#80B2E2",
	"#808AB2",
	"#8A80B2",
	"#B280E2",
	"#B280A6",
];

const Card = ({
	id,
	name,
	desc,
	tags,
	github_url,
	website_url,
	image_url,
}: {
	id: string;
	name: string;
	desc: string;
	tags: string;
	github_url: string;
	website_url: string;
	image_url: string;
}) => {
	const router = useRouter();

	const handleDelete = async () => {
		await fetch(`/api/delete-link?id=${id}`, {
			method: "DELETE",
		});
		router.replace("/")
	};

	return (
		<div
			className="border border-gray-700 rounded-lg p-4"
			// initial={{ opacity: 0, x: "-100%" }}
			// whileInView={{ opacity: 1, x: 0, transition: { duration: 0.4 } }}
		>
			<a href={website_url} target="_blank">
				<img
					src={`/screenshots/${image_url}`}
					alt={`${name} website screenshot`}
					className="rounded-lg"
				/>
			</a>

			<div className="text-white mt-3">
				<h1
					className="text-xl font-semibold mb-1"
					style={{
						fontFamily:
							"Montserrat, Impact, Haettenschweiler, Arial Narrow Bold, sans-serif",
					}}
				>
					{name}
				</h1>
				<p className="text-sm opacity-60">{desc}</p>

				<div className="uppercase flex text-[10px] flex-wrap gap-1 mt-2">
					{tags.split(" ").map((tag) => {
						const r = Math.floor(Math.random() * colors.length);
						return (
							<span
								className={`border py-1 px-2 rounded-full`}
								style={{
									color: colors[r],
									borderColor: colors[r],
								}}
							>
								{tag}
							</span>
						);
					})}
				</div>

				<div className="mt-4 flex items-center justify-between">
					<a
						href={github_url}
						target="_blank"
						className="border border-gray-600 py-2 px-4 text-sm rounded-md"
					>
						View Code
					</a>
					<button
						className="bg-red-600 py-2 px-4 rounded-md text-sm"
						onClick={handleDelete}
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default Card;
