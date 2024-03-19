"use client";

import { Pen } from "lucide-react";
import { z } from "zod";
import useMediaQuery from "@/hooks/use-media-query";
import { useState } from "react";
import { useRouter } from "next/navigation";

import FormLink from "./FormLink";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { toast } from "sonner";

import { formSchema } from "@/lib/form";
import { supabase } from "@/lib/supabase";
import { Link } from "@/lib/types";

const Edit = ({ link }: { link: Link }) => {
	const [open, setOpen] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	const router = useRouter();
	const isDesktop = useMediaQuery("(min-width: 768px)");

	async function onSubmit({
		name,
		code,
		url,
		desc,
		tags,
	}: z.infer<typeof formSchema>) {
		setSubmitted(true);

		// if the website url is different -> regenerate the screenshot
		let image_url = link.image_url;
		if (url !== link.website_url) {
			const resp = await fetch(
				`${process.env.NEXT_PUBLIC_PORT}api/app/add-image`,
				{
					method: "POST",
					headers: {
						"Content-Type": "Application/JSON",
					},
					body: JSON.stringify({
						website_url: url,
					}),
				}
			);
			const { data: path } = await resp.json();
			image_url = path;

			// deleting existing image
			await fetch(`${process.env.NEXT_PUBLIC_PORT}api/app/delete-image`, {
				method: "DELETE",
				headers: {
					"Content-Type": "Application/JSON",
				},
				body: JSON.stringify({
					image_url: link.image_url,
				}),
			});
		}

		await supabase
			.from("links")
			.update({
				name,
				website_url: url,
				github_url: code,
				desc,
				tags,
				image_url,
			})
			.eq("id", link.id);

		setSubmitted(false);
		setOpen(false);
		toast("Link has been updated", {
			description: `Link name - ${name}`,
		});
		
    window.location.reload()
	}

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button variant="ghost" size="icon">
						<Pen />
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-lg">
					<DialogHeader>
						<DialogTitle>Edit Link</DialogTitle>
						<DialogDescription>
							Edit the title, description, tags and links for your beta link
						</DialogDescription>

						<ScrollArea className="h-[400px] rounded-md border">
							<FormLink
								onSubmit={onSubmit}
								submitted={submitted}
								setSubmitted={setSubmitted}
								{...link}
                url={link.website_url}
                code={link.github_url}
							/>
						</ScrollArea>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		);
	} else {
		return (
			<Drawer open={open} onOpenChange={setOpen}>
				<DrawerTrigger asChild>
					<Button variant="ghost" size="icon">
						<Pen />
					</Button>
				</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader className="text-left">
						<DrawerTitle>Edit Link</DrawerTitle>
						<DrawerDescription>
							Edit the title, description, tags and links for your beta link
						</DrawerDescription>
					</DrawerHeader>
					<ScrollArea className="h-[400px] rounded-md border mx-4">
						<FormLink
							onSubmit={onSubmit}
							submitted={submitted}
							setSubmitted={setSubmitted}
							{...link}
							url={link.website_url}
							code={link.github_url}
						/>
					</ScrollArea>
					<DrawerFooter className="pt-4">
						<DrawerClose asChild>
							<Button variant="secondary">Cancel</Button>
						</DrawerClose>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		);
	}
};

export default Edit;
