import searchLinks from "@/db/searchLinks";
import { response } from "@/utils/response";

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const query = searchParams.get("query") || "";
		const links = await searchLinks(query);

		return new Response(
			response(true, "Search query successfully executed", links)
		);
	} catch (e) {
		console.error(e);
		return new Response(response(false, "Could not search", e));
	}
}
