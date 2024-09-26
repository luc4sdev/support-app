import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";


export const metadata: Metadata = {
    title: "Support App",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {


    return (
        <div>
            <div className="lg:grid min-h-screen lg:grid-cols-app dark:bg-zinc-900">
                <Sidebar />
                <main className="max-w-[100vw] px-4 pb-12 pt-24 lg:col-start-2 lg:px-8 lg:pt-8">
                    <Header />
                    {children}
                </main>
            </div>
            <ToastContainer stacked />
        </div>
    );
}