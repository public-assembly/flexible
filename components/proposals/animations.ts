import { Variants } from "framer-motion"

export const easing = [0.6, -0.05, 0.01, 0.99]
export const variants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.23,
      delayChildren: 0.2,
      ease: "easeOut",
      duration: 0.7,
    },
  },
}
