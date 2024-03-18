import { atom } from "recoil";
import { Link } from "@/lib/types";

export const linkState = atom<Link[]>({
	default: [],
	key: "linkState",
});
