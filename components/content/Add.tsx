"use client";

import { Plus } from "lucide-react";
import { z } from "zod";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

import { formSchema } from "@/lib/form";
import FormLink from "./FormLink";
import { useState } from "react";
import useMediaQuery from "@/hooks/use-media-query";
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
import { Form } from "../ui/form";

const Add = () => {
	const [open, setOpen] = useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
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
							<FormLink onSubmit={onSubmit} />
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
						<FormLink onSubmit={onSubmit} />
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
