import { handleSuccess, handleError } from "@/lib/api";
import { supabase } from "@/lib/supabase";

export async function DELETE(req: Request) {
	const { image_url } = await req.json();

	try {
		await supabase.storage.from("links").remove(image_url);

		return handleSuccess("Successfully deleted image");
	} catch (e) {
		return handleError("Could not delete image", e);
	}
}
