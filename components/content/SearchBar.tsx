"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Link } from "@/lib/types";
import { Dispatch, SetStateAction } from "react";
import { supabase } from "@/lib/supabase";
// import { createClient } from "@/lib/supabase";
import { uniqueLinks } from "@/lib/unique";

import { useSetRecoilState } from 'recoil'
import { linkState } from "@/atoms/linksAtom";

const formSchema = z.object({
	search: z.string(),
});

const SearchBar = () => {
	const setLinks = useSetRecoilState(linkState)

	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			search: "",
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof formSchema>) {
		const { search } = values;
		// todo: get all elements when search is empty
		// todo: search with each letter change

		if (search.length === 0) {
			const { data } = await supabase.from("links").select("*");
			setLinks(data || []);
			return;
		}

		// -> separate into list
		const keywords = search.split(" ");

		// -> search each individual keyword
		const result: Link[] = [];
		await Promise.all(keywords.map(async (keyword) => {
			const { data: nameData } = await supabase
				.from("links")
				.select("*")
				.ilike("name", `%${keyword}%`);
			const { data: descData } = await supabase
				.from("links")
				.select("*")
				.ilike("desc", `%${keyword}%`);
			const { data: tagsData } = await supabase
				.from("links")
				.select("*")
				.ilike("tags", `%${keyword}%`);

			result.push(...(nameData || []));
			result.push(...(descData || []));
			result.push(...(tagsData || []));
		}))

		// -> join the string getting rid of duplicates
		const uniqueResult = uniqueLinks(result);
		setLinks(uniqueResult);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-x-2 flex">
				<FormField
					control={form.control}
					name="search"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input placeholder="Search..." {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="hidden md:block">
					Search
				</Button>
			</form>
		</Form>
	);
};

export default SearchBar;
