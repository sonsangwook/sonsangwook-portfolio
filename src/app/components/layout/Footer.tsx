export function Footer() {
    return (
        <footer className="border-t border-white/10 py-12 bg-black">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-[14px] text-white text-center md:text-left">
                    의도한 레이아웃과 경험은 웹 페이지를 권장합니다
                </p>
                <p className="text-sm text-white/50 text-center md:text-right">
                    &copy; {new Date().getFullYear()} Sangwook Son. All rights reserved.
                </p>
            </div>
        </footer>
    )
}
