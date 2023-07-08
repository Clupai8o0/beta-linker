import "./globals.css";
import type { Metadata } from "next";

import Nav from "@/components/nav";

export const metadata: Metadata = {
	title: "Beta Linker",
	description:
		"Links to all the various sites of mine that I use to get inspiration",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<link rel="shortcut icon" href="/logo.svg" type="image/svg" />
			</head>

			<body>
				<Nav />
				{children}
			</body>
		</html>
	);
}
