import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="en">
<body className="flex bg-white text-black">
<Sidebar />
<div className="flex-1">
<Header />
<main className="p-6">{children}</main>
</div>
</body>
</html>
);
}