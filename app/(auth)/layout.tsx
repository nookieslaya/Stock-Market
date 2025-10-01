import React from 'react'
import Link from "next/link";
import Image from "next/image";


const Layout = ({children}: { children: React.ReactNode }) => {
    return (
        <main className="auth-layout">
            <section className="auth-left-section scrollbar-hide-default">
                <Link href="/" className="auth-logo">
                    <Image src='/assets/icons/logo.svg' alt='Logo' width={140} height={32} className="h-8 w-auto"/>
                </Link>
                <div className="pb-4 lg:pb-8 flex-1">{children}</div>
            </section>
            <section className="auth-right-section">
                <div className="z-10 relative lg:mt-4 lg:mb-15">
                    <blockquote className="auth-blockquote">
                        Signalist turned my watchlist into a winning list.
                    </blockquote>
                    <div className="flex items-center justify-between">
                        <cite className=" auth-tesimonial-author"> - Ethan S.</cite>
                        <div className="p max-md:text-xs text-gray-500">
                            Retail Investor
                        </div>
                    </div>
                    <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Image src="/assets/icons/star.svg" alt="Star" key={star} width={20} height={20}
                                   className="w-5 h-5"/>
                        ))}
                    </div>
                </div>
                <div className="flex-1 relative">
                    <Image src="/assets/images/dashboard.png" alt='Dashboard' width={1440} height={1150}
                           className="auth-dashboard-preview absolute top-0"/>

                </div>
            </section>
        </main>
    )
}
export default Layout
