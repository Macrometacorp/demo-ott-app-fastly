import "./playAnimation.scss"
import { useEffect } from "react"
import { useHistory } from "react-router-dom"

const PlayAnimation = () => {
    let history = useHistory()

    useEffect(() => {
        setTimeout(() => {
            history.push("/browse")
        }, 4200)
    }, [history])

    return (
        <div className="PlayAnimation__wrp">
            <span className="PlayAnimation__text">MACROMETA</span>
        </div>
    )
}

export default PlayAnimation
