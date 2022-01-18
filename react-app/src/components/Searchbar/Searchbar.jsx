import "./searchbar.scss"
import { useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import {
    changeSearchInputValue,
    clearSearchInputValue,
    fetchSearchResultsAsync,
} from "../../redux/search/search.actions"
import { FiSearch } from "react-icons/fi"
import { RiCloseFill } from "react-icons/ri"
import useOutsideClick from "../../hooks/useOutsideClick"

let filterTimeout

const Searchbar = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [searchInputToggle, setSearchInputToggle] = useState(false)
    const [searchInput, setSearchInput] = useState("")
    const searchbarRef = useRef()
    const searchInputRef = useRef()

    useOutsideClick(searchbarRef, () => {
        if (searchInputToggle) {
            setSearchInput("")
            setSearchInputToggle(false)
        }
    })

    const handleSearchInputToggle = () => {
        searchInputRef.current.focus()
        setSearchInputToggle(!searchInputToggle)
    }

    const clearSearchInputToggle = () => {
        setSearchInput("")
        dispatch(clearSearchInputValue())
        history.push("/browse")
    }

    const handleSearchInput = (event) => {
        clearTimeout(filterTimeout)

        const { value } = event.target

        setSearchInput(value)

        filterTimeout = setTimeout(() => {
            dispatch(changeSearchInputValue(value))

            if (value.trim().length > 0) {
                history.push(`/search?q=${value.trim()}`)
                dispatch(fetchSearchResultsAsync(value.trim()))
            } else history.push("/browse")
        }, 500)
    }

    return (
        <div className="Searchbar" ref={searchbarRef}>
            <input
                type="text"
                placeholder="Search titles, people"
                value={searchInput}
                onChange={handleSearchInput}
                ref={searchInputRef}
                className={`Searchbar--search ${searchInputToggle && "Searchbar--active"}`}
            />
            <div className="Searchbar--toggler" onClick={handleSearchInputToggle}>
                <FiSearch size="1.5em" />
            </div>
            <div
                className={`Searchbar--clear ${searchInputToggle && searchInput.length && "typing"}`}
                onClick={clearSearchInputToggle}
            >
                <RiCloseFill />
            </div>
        </div>
    )
}

export default Searchbar
