import NavbarWrapper from "@repo/ui/components/wrapper/NavbarWrapper";
import MobileBottomNavWrapper from "@repo/ui/components/wrapper/MobileBottomNavWrapper";

export default function mainRoutesLayout({ children }) {
	return (
		<>
			<NavbarWrapper
				lang={process.env.LANGUAGE}
				server={process.env.BACKEND_URL}
			/>
			{children}
			<MobileBottomNavWrapper
				lang={process.env.LANGUAGE}
				server={process.env.BACKEND_URL}
			/>
		</>
	);
}
