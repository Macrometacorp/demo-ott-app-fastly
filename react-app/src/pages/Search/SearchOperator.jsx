import "./search.scss"
import { useState } from "react"
import { useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { FiChevronDown } from "react-icons/fi"
import useOutsideClick from "../../hooks/useOutsideClick"

const SearchOperator = ({ index, selectSearchOp, onSearchOperatorChange }) => {
    const searchOperator = ["OR", "AND", "NOT"]
    const dropdownVariants = {
        open: { opacity: 1, height: "auto" },
        collapsed: { opacity: 0, height: 0 },
        transition: { duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] },
    }

    const [isOpened, setIsOpened] = useState(false)
    const operatorRef = useRef()

    useOutsideClick(operatorRef, () => {
        if (isOpened) setIsOpened(false)
    })

    return (
        <motion.div className="Search__operator">
            <div className="Search__operator__btn" onClick={() => setIsOpened(!isOpened)}>
                <span>{selectSearchOp.current[index]}</span>
                <FiChevronDown />
            </div>
            <AnimatePresence initial={false}>
                {isOpened && (
                    <motion.ul
                        ref={operatorRef}
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={dropdownVariants}
                    >
                        {searchOperator.map((op, i) => (
                            <motion.li
                                key={i}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    selectSearchOp.current[index] = op
                                    setIsOpened(false)
                                    onSearchOperatorChange()
                                }}
                            >
                                {op}
                            </motion.li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default SearchOperator
