"use client";

import { Plus } from "lucide-react";
import { z } from "zod";
import useMediaQuery from "@/hooks/use-media-query";
import { useState } from "react";

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

const Add = () => {
	const [open, setOpen] = useState(false);
	const [submitted, setSubmitted] = useState(false)
	const isDesktop = useMediaQuery("(min-width: 768px)");

	async function onSubmit({ name, code, url, desc, tags}: z.infer<typeof formSchema>) {
		setSubmitted(true);

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

		await supabase.from("links").insert({
			name,
			website_url: url,
			github_url: code,
			desc,
			tags,
			image_url: path
		}).select();


		setSubmitted(false)
		setOpen(false)
		toast("Link has been created", {
			description: `Link name - ${name}`
		})
	}

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button variant="ghost" size="icon">
						<Plus />
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-lg">
					<DialogHeader>
						<DialogTitle>Add Link</DialogTitle>
						<DialogDescription>
							Add the title, description, tags and links for your beta link
						</DialogDescription>

						<ScrollArea className="h-[400px] rounded-md border">
							<FormLink onSubmit={onSubmit} submitted={submitted} setSubmitted={setSubmitted} />
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
						<Plus />
					</Button>
				</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader className="text-left">
						<DrawerTitle>Add Link</DrawerTitle>
						<DrawerDescription>
							Add the title, description, tags and links for your beta link
						</DrawerDescription>
					</DrawerHeader>
					<ScrollArea className="h-[400px] rounded-md border mx-4">
						<FormLink
							onSubmit={onSubmit}
							submitted={submitted}
							setSubmitted={setSubmitted}
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

export default Add;
