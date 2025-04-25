import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SidebarComponent from "@/components/sidebar";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
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
		<body className={`${geistSans.variable} ${geistMono.variable} antialiased `}>
			{/* <aside>
				<SidebarComponent />
			</aside> */}
			<main className="flex-1 bg-background text-offWhite">
				{children}
			</main>
		</body>
	</html >
}
