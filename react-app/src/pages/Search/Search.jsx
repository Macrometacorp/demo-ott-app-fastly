import "./search.scss"
import Poster from "../../components/Poster/Poster"
import { AnimatePresence, motion } from "framer-motion"
import { searchVariants, staggerHalf } from "../../motionUtils"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { selectSearchInputValue } from "../../redux/search/search.selectors"
import { changeSearchInputValue, fetchSearchResultsAsync } from "../../redux/search/search.actions"
import { FaCheck, FaTimes } from "react-icons/fa"
import { useState } from "react"
import { FiChevronDown } from "react-icons/fi"
import { useRef } from "react"
import useOutsideClick from "../../hooks/useOutsideClick"
import SearchOperator from "./SearchOperator"

const Search = (searchResults) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const selectInputValue = useSelector(selectSearchInputValue)
    const [searchHistory, setSearchHistory] = useState([])
    const [searchHistoryExpanded, setSearchHistoryExpanded] = useState(false)

    const searchHistoryRef = useRef()
    const selectSearchOp = useRef([])
    const { results } = searchResults

    const style = { border: `2px solid #1ce783` }
    const dropdownVariants = {
        open: { opacity: 1, height: "auto" },
        collapsed: { opacity: 0, height: 0 },
        transition: { duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] },
    }

    useOutsideClick(searchHistoryRef, () => {
        if (searchHistoryExpanded) setSearchHistoryExpanded(false)
    })

    const addTermToSearchHistory = (searchTerms) => {
        setSearchHistory((prev) => {
            let _history = [...searchTerms, ...prev]

            return _history.filter((item, index, self) => index === self.findIndex((t) => t.value === item.value))
        })
    }

    const prepareSearchFilter = (searchInputs, type) => {
        if (type === "asset") {
            return searchInputs.toString()
        }

        let searchPhrases = ""
        let searchFilters = ""
        searchInputs.forEach((input, index) => {
            if (searchInputs.length - 1 === index) {
                searchPhrases = `${searchPhrases} PHRASE(asset.name, "${input}", "text_en") `
            } else {
                searchPhrases = `${searchPhrases} PHRASE(asset.name, "${input}", "text_en") OR`
            }

            searchFilters = `${searchFilters} POSITION(cast_and_crew, "${input}") ${
                !selectSearchOp.current[index]
                    ? ""
                    : selectSearchOp.current[index] === "NOT"
                    ? "AND NOT"
                    : selectSearchOp.current[index]
            }`
        })

        console.log(JSON.stringify(searchInputs))
        console.log(JSON.stringify(selectSearchOp.current))
        return { searchPhrases, searchFilters }
    }

    const onSearchOperatorChange = () => {
        const queryParams = prepareSearchFilter(selectInputValue, "credits")
        dispatch(fetchSearchResultsAsync(queryParams, "credits"))
    }

    const addSearchTerm = (searchTerm, type) => {
        let searchInputs = ""

        switch (type) {
            case "credits":
                if (typeof selectInputValue === "string") {
                    addTermToSearchHistory([{ value: selectInputValue, type: "asset" }])
                    searchInputs = [searchTerm]
                } else {
                    searchInputs = [...selectInputValue, searchTerm]
                }

                if (searchInputs.length > 1) {
                    selectSearchOp.current = [...selectSearchOp.current, "OR"]
                }
                break
            default:
                if (typeof selectInputValue !== "string") {
                    let _searchHistory = selectInputValue.map((value) => {
                        return { value, type: "credits" }
                    })

                    addTermToSearchHistory(_searchHistory)
                    selectSearchOp.current = []
                } else {
                    addTermToSearchHistory([{ value: selectInputValue, type: "asset" }])
                }
                searchInputs = searchTerm
                break
        }

        const queryParams = prepareSearchFilter(searchInputs, type)
        dispatch(changeSearchInputValue(searchInputs))

        history.push(`/search?q=${searchInputs}`)
        dispatch(fetchSearchResultsAsync(queryParams, type))
    }

    const removeSearchTerm = (searchTerm, index) => {
        selectSearchOp.current.splice(index - 1, 1)
        addTermToSearchHistory([{ value: searchTerm, type: "credits" }])

        const searchInputs = selectInputValue.filter((term) => term !== searchTerm)
        const queryParams = prepareSearchFilter(searchInputs, "credits")
        dispatch(changeSearchInputValue(searchInputs))

        history.push(`/search?q=${searchInputs}`)
        dispatch(fetchSearchResultsAsync(queryParams, "credits"))
    }

    return (
        <div className="Search">
            <div className="Search__flex" style={{ justifyContent: "space-between", alignItems: "center" }}>
                <div className="Search__flex">
                    <h2 className="Search__title">Search results for:&nbsp;</h2>
                    <div className="Search__flex" style={{ flexWrap: "wrap" }}>
                        {typeof selectInputValue !== "string" && selectInputValue.length > 1 ? (
                            selectInputValue.map((term, index) => (
                                <>
                                    <motion.li
                                        key={index}
                                        variants={searchVariants}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="Search__search-term-li"
                                    >
                                        <span>{term}</span>
                                        <FaTimes
                                            className="Search__remove-search-term"
                                            onClick={() => removeSearchTerm(term, index)}
                                        />
                                    </motion.li>
                                    {selectInputValue.length - 1 !== index ? (
                                        <SearchOperator
                                            index={index}
                                            selectSearchOp={selectSearchOp}
                                            onSearchOperatorChange={onSearchOperatorChange}
                                        ></SearchOperator>
                                    ) : (
                                        <></>
                                    )}
                                </>
                            ))
                        ) : (
                            <motion.li
                                variants={searchVariants}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.95 }}
                                className="Search__search-term-li"
                            >
                                <span>{selectInputValue}</span>
                            </motion.li>
                        )}
                    </div>
                </div>
                {searchHistory.length ? (
                    <motion.div className="Search__history">
                        <div
                            className="Search__history__btn"
                            onClick={() => setSearchHistoryExpanded(!searchHistoryExpanded)}
                        >
                            <span>Searched For</span>
                            <FiChevronDown />
                        </div>
                        <AnimatePresence initial={false}>
                            {searchHistoryExpanded && (
                                <motion.ul
                                    ref={searchHistoryRef}
                                    initial="collapsed"
                                    animate="open"
                                    exit="collapsed"
                                    variants={dropdownVariants}
                                >
                                    {searchHistory.map((term, index) => (
                                        <motion.li
                                            key={index}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => {
                                                addSearchTerm(term.value, term.type)
                                                setSearchHistory((prev) => prev.filter((t) => t.value !== term.value))
                                            }}
                                        >
                                            {term.value}
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <></>
                )}
            </div>
            <motion.div className="Search__search-suggestions">
                <motion.div>
                    {results.assets && results.assets.length > 0 ? (
                        <>
                            <h3>Movie / TV</h3>
                            <motion.ul>
                                {results.assets.map((result, index) => (
                                    <motion.li
                                        key={index}
                                        variants={searchVariants}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="Search__text-placeholder"
                                        style={style}
                                    >
                                        <FaCheck
                                            className="Search__add-search-term"
                                            onClick={() =>
                                                addSearchTerm(
                                                    result.title || result.original_title || result.name,
                                                    "asset",
                                                )
                                            }
                                        />
                                        <span className="Search__search-term">
                                            {result.title || result.original_title || result.name}
                                        </span>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </>
                    ) : (
                        <></>
                    )}
                </motion.div>

                <motion.div>
                    {results.cast && results.cast.length > 0 ? (
                        <>
                            <h3>Cast</h3>
                            <motion.ul>
                                {results.cast.map((result, index) => (
                                    <motion.li
                                        key={index}
                                        variants={searchVariants}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="Search__text-placeholder"
                                        style={style}
                                    >
                                        <FaCheck
                                            className="Search__add-search-term"
                                            onClick={() => addSearchTerm(result.name, "credits")}
                                        />
                                        <span className="Search__search-term">{result.name}</span>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </>
                    ) : (
                        <></>
                    )}
                </motion.div>

                <motion.div>
                    {results.crew && results.crew.length > 0 ? (
                        <>
                            <h3>Crew</h3>
                            <motion.ul>
                                {results.crew.map((result, index) => (
                                    <motion.li
                                        key={index}
                                        variants={searchVariants}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="Search__text-placeholder"
                                        style={style}
                                    >
                                        <FaCheck
                                            className="Search__add-search-term"
                                            onClick={() => addSearchTerm(result.name, "credits")}
                                        />
                                        <span className="Search__search-term">{result.name}</span>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </>
                    ) : (
                        <></>
                    )}
                </motion.div>
            </motion.div>
            <motion.div className="Search__wrp" variants={staggerHalf} initial="initial" animate="animate" exit="exit">
                {results.assets && results.assets.length > 0 ? (
                    results.assets.map((result) => <Poster key={result.id} item={result} {...result} />)
                ) : (
                    <h2 className="Search__title">
                        Sorry, we searched everywhere but we did not found any movie or tv-show with that title.
                    </h2>
                )}
            </motion.div>
        </div>
    )
}

export default Search
