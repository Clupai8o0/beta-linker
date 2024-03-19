import { Loader2, Trash } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "../ui/button";

import { supabase } from "@/lib/supabase";

const Delete = ({ id }: { id: string }) => {
	const router = useRouter();
	const path = usePathname();

	const [deleted, setDeleted] = useState(false);

	const deleteLink = async () => {
		setDeleted(true);
		await supabase.from("links").delete().eq("id", id);
		if (path === `/link/${id}`) return router.replace("/home");
		window.location.reload();
	};

	return (
		<Button variant="destructive" size="icon" onClick={deleteLink}>
			{!deleted ? <Trash /> : <Loader2 className="animate-spin" />}
		</Button>
	);
};

export default Delete;
