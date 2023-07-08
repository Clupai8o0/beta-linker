import prisma from "./prisma";

export default async function searchLinks(query: string) {
	return await prisma.link.findMany({
		where: {
			OR: [
				{
					name: {
						contains: query,
					},
				},
				{
					desc: {
						contains: query,
					},
				},
				{
					tags: {
						contains: query,
					},
				},
			],
		},
	});
}
