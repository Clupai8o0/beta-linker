"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import validator from "valid-url";

import Input from "@/components/input";
import Tags from "@/components/tags";

function Add() {
	const router = useRouter();
	const [name, setName] = useState("");
	const [isNameValid, setIsNameValid] = useState("");

	const [website_url, setWebsite_url] = useState("");
	const [isWebsiteUrlValid, setIsWebsiteUrlValid] = useState("");
	const [github_url, setGithub_url] = useState("");
	const [isGithubUrlValid, setIsGithubUrlValid] = useState("");

	const [desc, setDesc] = useState("");
	const [isDescValid, setIsDescValid] = useState("");

	const [tags, setTags] = useState<any[]>([]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		let isValid = true;
		e.preventDefault();

		if (name.length === 0) {
			setIsNameValid("Project name cannot be empty");
			isValid = false;
		}
		if (website_url.length === 0) {
			setIsWebsiteUrlValid("Website URL cannot be empty");
			isValid = false;
		}
		if (github_url.length === 0) {
			setIsGithubUrlValid("Code URL cannot be empty");
			isValid = false;
		}
		if (desc.length === 0) {
			setIsDescValid("Description cannot be empty");
			isValid = false;
		}

		if (!validator.isWebUri(website_url)) {
			setIsWebsiteUrlValid("Incorrect format for website URL");
			isValid = false;
		}
		if (!validator.isWebUri(github_url)) {
			setIsGithubUrlValid("Incorrect format for code URL");
			isValid = false;
		}
		if (isValid) {
			await fetch(`/api/add-link`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name,
					website_url,
					github_url,
					desc,
					tags: tags.map((tag) => tag.text),
				}),
			});
			router.push("/");
		}
	};

	useEffect(() => {
		setIsNameValid("");
	}, [name]);
	useEffect(() => {
		setIsWebsiteUrlValid("");
	}, [website_url]);
	useEffect(() => {
		setIsGithubUrlValid("");
	}, [github_url]);
	useEffect(() => {
		setIsDescValid("");
	}, [desc]);

	return (
		<form className="flex flex-col gap-6 p-4 mt-5" onSubmit={handleSubmit}>
			<Input
				name="project name"
				type="text"
				isValid={isNameValid}
				placeholder="Project name e.g. Digi Convertor..."
				setValue={setName}
				value={name}
			/>
			<Input
				name="website url"
				type="text"
				isValid={isWebsiteUrlValid}
				placeholder="Website link e.g. https://digi-convertor.vercel.app/"
				setValue={setWebsite_url}
				value={website_url}
			/>
			<Input
				name="Code Link"
				type="text"
				isValid={isGithubUrlValid}
				placeholder="Github Link e.g. https://github.com/Clupai8o0/..."
				setValue={setGithub_url}
				value={github_url}
			/>

			<div>
				<label
					className={`block mb-2 text-sm font-medium ${
						isDescValid.length === 0 ? "text-white" : "text-red-500"
					}`}
					style={{ fontFamily: "Montserrat" }}
				>
					Description
				</label>
				<textarea
					rows={4}
					className={`block p-2.5 w-full text-sm rounded-lg border bg-transparent focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500 ${
						isDescValid.length === 0
							? "border-gray-600 placeholder-gray-400 text-white"
							: "border-red-500 placeholder-red-800 text-red-500"
					}`}
					placeholder="Describe your project here"
					value={desc}
					onChange={(e) => setDesc(e.target.value)}
				></textarea>
				<p
					className={`mt-2 text-sm text-red-500 transition-all duration-300 ease-in-out ${
						isDescValid.length === 0 ? "hidden" : ""
					}`}
				>
					{isDescValid}
				</p>
			</div>

			<div>
				<label
					className="block mb-2 text-sm font-medium text-white"
					style={{ fontFamily: "Montserrat" }}
				>
					Tags
				</label>
				<Tags tags={tags} setTags={setTags} />
			</div>

			<button
				type="submit"
				className="bg-blue-500 px-6 py-3 text-white mt-4 rounded-md"
			>
				Submit
			</button>
		</form>
	);
}

export default Add;
