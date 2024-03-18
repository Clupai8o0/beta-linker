import { Link } from "lucide-react";
import { motion } from "framer-motion";
import NextLink from "next/link";

import { Separator } from "../ui/separator";
import { ModeToggle } from "./ModeToggle";

import Add from "./Add";
import SearchBar from "./SearchBar";
import { transition, variants } from "@/lib/animation";

const Navbar = ({ noSearchBar }: { noSearchBar?: boolean }) => {
	return (
		<motion.header
			className="w-full flex flex-col"
			variants={variants}
			initial={"_hidden"}
			animate={"visible"}
			exit={"_hidden"}
			transition={transition()}
		>
			<nav className="flex w-full justify-between items-center px-6 py-6 gap-6">
				<NextLink href="/home">
					<h1 className="font-semibold hidden md:flex items-center">
						<Link className="mr-2" /> Beta-Linker
					</h1>
					<h1 className="font-semibold text-xl md:hidden">
						<Link />
					</h1>
				</NextLink>

				{!noSearchBar && <SearchBar />}

				<div className="flex gap-2">
					<ModeToggle />
					<Add />
				</div>
			</nav>

			<Separator />
		</motion.header>
	);
};

export default Navbar;
