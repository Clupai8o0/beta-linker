import React from "react";
import { WithContext as ReactTags } from "react-tag-input";

type Tag = {
	id: string;
	text: string;
};

const delimiters = [188, 13];

const Tags = ({
	tags,
	setTags,
}: {
	tags: Tag[];
	setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
}) => {
	const handleDelete = (i: number) => {
		setTags(tags.filter((_, index) => index !== i));
	};

	const handleAddition = (tag: Tag) => {
		setTags([...tags, tag]);
	};

	const handleDrag = (tag: Tag, currPos: number, newPos: number) => {
		const newTags = tags.slice();

		newTags.splice(currPos, 1);
		newTags.splice(newPos, 0, tag);

		// re-render
		setTags(newTags);
	};
	return (
		<div>
			<ReactTags
				tags={tags}
				delimiters={delimiters}
				handleAddition={handleAddition}
				handleDelete={handleDelete}
				handleDrag={handleDrag}
				inputFieldPosition="top"
				classNames={{
					tagInputField: "tagInput",
					tag: "tag",
					tags: "tags",
					remove: "ml-2",
				}}
			/>
		</div>
	);
};

export default Tags;
