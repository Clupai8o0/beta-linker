import React from "react";
import Link from "next/link";
import SearchBar from "./search";

const Nav = () => {
	return (
		<nav className="border-b border-gray-700 flex justify-between p-4">
			<div>
				<Link href="/">
					<svg
						width="36"
						height="36"
						viewBox="0 0 36 36"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12 33V12C12 10.4087 12.6321 8.88258 13.7574 7.75736C14.8826 6.63214 16.4087 6 18 6H18.75C20.1424 6 21.4777 6.55312 22.4623 7.53769C23.4469 8.52226 24 9.85761 24 11.25C24 12.6424 23.4469 13.9777 22.4623 14.9623C21.4777 15.9469 20.1424 16.5 18.75 16.5M18.75 16.5H18M18.75 16.5C20.085 16.5 21.3901 16.8959 22.5001 17.6376C23.6101 18.3793 24.4753 19.4335 24.9862 20.6669C25.4971 21.9003 25.6308 23.2575 25.3703 24.5669C25.1099 25.8762 24.467 27.079 23.523 28.023C22.579 28.967 21.3762 29.6099 20.0669 29.8703C18.7575 30.1308 17.4003 29.9971 16.1669 29.4862C14.9335 28.9753 13.8793 28.1101 13.1376 27.0001C12.3959 25.8901 12 24.585 12 23.25V22.5"
							stroke="white"
							stroke-width="3"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</Link>
			</div>

			<div className="hidden md:flex w-2/3">
				<SearchBar classNames="w-full" />
			</div>

			<div>
				<Link href="/add">
					<button>
						<img src="/add.svg" alt="add new link button" />
					</button>
				</Link>
			</div>
		</nav>
	);
};

export default Nav;
