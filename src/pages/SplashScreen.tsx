import { Link } from "react-router"
import { motion } from "framer-motion"

const SplashScreen = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex h-dvh cursor-pointer flex-col items-center justify-center gap-8 bg-cyan-400/90"
    >
      <Link to="/home" className="relative w-1/2 rounded-3xl border-2 p-5">
        <h1 className="text-center text-5xl leading-snug tracking-wider text-balance text-white">
          Happy! Order Now
        </h1>
        <p className="pt-2 text-center text-white">Click to create order</p>
      </Link>
      <Link to="/orders" className="bg-cyan-600 rounded-3xl px-6 py-2 cursor-pointer">
        <p className="text-white">Order History</p>
      </Link>
    </motion.main>
  )
}

export default SplashScreen
