import { Link } from "./types";

export function uniqueLinks(links: Link[]) {
	const ids = links.map((link) => link.id);
	const uniqueIds = [...new Set(ids)];

	return uniqueIds.map((id) => {
		let index = 0;
		links.forEach((link, i) => {
			if (link.id === id) index = i;
		});

		return links[index];
	});
}
