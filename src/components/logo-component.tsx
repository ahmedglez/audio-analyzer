/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Link from "next/link";

import { siteConfig } from "@/config";

const Logo = () => {
	const [isSmallScreen, setIsSmallScreen] = useState(false);

	useEffect(() => {
		const handleResize = () => setIsSmallScreen(window.innerWidth < 640);
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault();
		window.location.reload();
	};

	return (
		<Link
			href="/"
			className="flex cursor-pointer items-center space-x-2"
			onClick={handleClick}
		>
			<img src="/logo.svg" alt="Logo" className="size-12 dark:invert" />
			{!isSmallScreen && <h1 className="font-bold">{siteConfig.title}</h1>}
		</Link>
	);
};

export default Logo;
