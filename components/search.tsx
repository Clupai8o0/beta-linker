"use client"

import React from "react";

const SearchBar = ({
	classNames,
	query,
	setQuery,
	setLinks,
}: {
	classNames?: string;
	query: string;
	setQuery: React.Dispatch<React.SetStateAction<string>>;
	setLinks: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
	const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const res = await fetch(`/api/search-links?query=${query}`);
		const links = (await res.json()).data;
		setLinks(links);
	};

	return (
		<form className={classNames} onSubmit={handleSearch}>
			<label
				htmlFor="search"
				className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white hidden"
			>
				Search
			</label>

			<div className="relative">
				<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<svg
						aria-hidden="true"
						className="w-5 h-5 text-gray-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						></path>
					</svg>
				</div>
				<input
					type="text"
					className="block w-full p-4 pl-10 text-sm border rounded-lg bg-transparent border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
					placeholder="Search Mockups, Logos..."
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<button
					type="submit"
					className="text-white absolute right-2.5 bottom-2.5 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
				>
					Search
				</button>
			</div>
		</form>
	);
};

export default SearchBar;
