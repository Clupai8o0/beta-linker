import { createClient as supabaseCreateClient } from "@supabase/supabase-js";

export const supabase = supabaseCreateClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL || "",
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export const getImgUrl = (url: string) => {
	const { data } = supabase.storage.from("links").getPublicUrl(url);
	return data?.publicUrl || "";
};
