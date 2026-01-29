export function Footer() {
    return (
        <footer className="border-t border-white/10 py-12 bg-black">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-sm text-white/50 text-left">
                    &copy; {new Date().getFullYear()} Sangwook Son. All rights reserved.
                </p>
            </div>
        </footer>
    )
}
