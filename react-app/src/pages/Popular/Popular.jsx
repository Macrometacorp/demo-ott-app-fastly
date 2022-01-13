import "./popular.scss"
import Row from "../../components/Row/Row"
import Credits from "../../components/Credits/Credits"
import { useRetrieveData } from "../../hooks/useRetrieveData"
import { motion } from "framer-motion"
import { defaultPageFadeInVariants } from "../../motionUtils"

const Popular = () => {
    const rows = useRetrieveData("popular")

    return (
        <motion.div
            className="Popular"
            variants={defaultPageFadeInVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            {rows && rows.map((props) => <Row key={props.id} {...props} />)}
            <Credits />
        </motion.div>
    )
}

export default Popular
