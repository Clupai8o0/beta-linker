import prisma from "./prisma";

export default async function getLinks() {
	return await prisma.link.findMany();
}
