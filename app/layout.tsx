import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SidebarComponent from "@/components/sidebar";
import { AuthProvider } from "@/src/contexts/auth-context";
import { Share_Tech } from "next/font/google";

const shareTech = Share_Tech({
	variable: "--font-share-tech",
	subsets: ["latin"],
	weight: "400",
});

export const metadata: Metadata = {
	title: "Ritter Cadastros",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <html lang="pt-BR">
		<body className={`${shareTech.variable} ${shareTech.variable} antialiased  `}>
			<main className="flex bg-white">
				<AuthProvider>
					{children}
				</AuthProvider>
			</main>
		</body>
	</html >
}
