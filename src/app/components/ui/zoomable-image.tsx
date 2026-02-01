"use client"

import { useState } from "react"
import Image, { ImageProps } from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { createPortal } from "react-dom"

interface ZoomableImageProps extends Omit<ImageProps, "onClick"> {
    className?: string
}

export function ZoomableImage({ className, alt, ...props }: ZoomableImageProps) {
    const [isZoomed, setIsZoomed] = useState(false)

    return (
        <>
            <div
                className={`cursor-zoom-in ${className}`}
                onClick={() => setIsZoomed(true)}
            >
                <Image
                    alt={alt}
                    {...props}
                />
            </div>

            {isZoomed && createPortal(
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsZoomed(false)}
                        className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out backdrop-blur-sm"
                    >
                        <button
                            className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors z-[110]"
                            onClick={() => setIsZoomed(false)}
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full h-full flex items-center justify-center pointer-events-none"
                        >
                            <div className="relative w-full h-full max-w-7xl max-h-[90vh]">
                                <Image
                                    alt={alt}
                                    {...props}
                                    fill
                                    className="object-contain"
                                    quality={100}
                                    sizes="100vw"
                                    priority
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>,
                document.body
            )}
        </>
    )
}
