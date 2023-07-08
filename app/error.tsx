"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div className="w-full h-[70vh] flex justify-center items-center flex-col gap-4 text-white">
			<h2 className="text-xl">Something went wrong!</h2>
			<button
				onClick={
					// Attempt to recover by trying to re-render the segment
					() => reset()
				}
				className="bg-white text-black uppercase px-6 py-2"
			>
				Try again
			</button>
		</div>
	);
}
