import prisma from "./prisma";

export default async function (
	id: string,
	name: string,
	desc: string,
	tags: string,
	github_url: string,
	website_url: string,
	image_url: string
) {
	await prisma.link.create({
		data: { id, name, desc, tags, github_url, website_url, image_url },
	});
}
