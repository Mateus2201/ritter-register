import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SidebarComponent from "@/components/sidebar";
import { AuthProvider } from "@/src/contexts/auth-context";

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
		<body className={`${geistSans.variable} ${geistMono.variable} antialiased  `}>
			<AuthProvider>
				<main className="flex-1 bg-dark text-text-white h-min-screen h-screen">
					{children}
				</main>
			</AuthProvider>
		</body>
	</html >
}
