import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

import { formSchema } from "@/lib/form";

const FormLink = ({
	onSubmit,
	name,
	url,
	code,
	desc,
	tags,
}: {
	onSubmit(values: any): void;
	name?: string;
	url?: string;
	code?: string;
	desc?: string;
	tags?: string;
}) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: name || "",
			url: url || "",
			code: code || "",
			desc: desc || "",
			tags: tags || "",
		},
	});

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-4 text-left flex flex-col items-start w-full p-4"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Link Name (Required)</FormLabel>
							<FormControl>
								<Input placeholder="Link name e.g. Project 123..." {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="url"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Link Website URL (Required)</FormLabel>
							<FormControl>
								<Input
									placeholder="Website URL e.g. https://project.com/..."
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="code"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Link Code (Required)</FormLabel>
							<FormControl>
								<Input
									placeholder="Code Link e.g https://gitub.com/..."
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="desc"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea placeholder="Describe your project here" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="tags"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Tags</FormLabel>
							<FormControl>
								<Input placeholder="Tags..." {...field} />
							</FormControl>
							<FormDescription>
								Create tags by separating them with a space
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="mt-2">
					Add Link
				</Button>
			</form>
		</Form>
	);
};

export default FormLink;
