import prisma from "./prisma";

export default async function (id: string) {
	return await prisma.link.delete({
		where: {
			id,
		},
	});
}
