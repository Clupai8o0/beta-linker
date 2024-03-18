import { supabase } from "@/lib/supabase";

export async function generateMetadata({
	params: { id },
}: {
	params: { id: string };
}) {
	const { data } = await supabase.from("links").select("name").eq("id", id);

	if (data) return { title: `Link - ${data[0].name}` };
	else return { title: "Link - Error" };
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
