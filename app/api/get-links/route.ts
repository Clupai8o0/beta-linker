import { response } from "@/utils/response";
import getLinks from "@/db/getLinks";

export async function GET() {
	return new Response(
		response(true, "Successfully gotten links from prisma db", await getLinks())
	);
}
