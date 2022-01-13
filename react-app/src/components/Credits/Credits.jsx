import "./credits.scss"
import { motion } from "framer-motion"
import { creditsFadeInUpVariants } from "../../motionUtils"
import { GITHUB_BASE_URL } from "../../requests"

const Credits = () => {
    return (
        <motion.footer
            variants={creditsFadeInUpVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="Credits"
        >
            <span>Developed by</span>
            <motion.a
                whileTap={{ scale: 0.9 }}
                className="Credits__linkwrp"
                href={GITHUB_BASE_URL}
                target="_blank"
                rel="noreferrer"
            >
                <span> Macrometa</span>
            </motion.a>
        </motion.footer>
    )
}

export default Credits
