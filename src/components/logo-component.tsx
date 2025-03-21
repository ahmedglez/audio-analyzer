/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Link from "next/link";

const Logo = () => {
	const [isSmallScreen, setIsSmallScreen] = useState(false);

	useEffect(() => {
		const handleResize = () => setIsSmallScreen(window.innerWidth < 640);
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<Link href="/" className="flex items-center space-x-2">
			<img src="/logo.svg" alt="Logo" className="size-12" />
			{!isSmallScreen && <h1 className="font-bold">Audio Analyzer</h1>}
		</Link>
	);
};

export default Logo;
