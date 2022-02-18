import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Route, Switch, Redirect, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import Navbar from "./components/Navbar/Navbar"
import Homepage from "./pages/Homepage/Homepage"
import Movies from "./pages/Movies/Movies"
import TVSeries from "./pages/TVSeries/TVSeries"
import Popular from "./pages/Popular/Popular"
import MyList from "./pages/MyList/MyList"
import Search from "./pages/Search/Search"
import Category from "./pages/Category/Category"
import DetailModal from "./components/DetailModal/DetailModal"
import SplashAnimation from "./components/SplashAnimation/SplashAnimation"
import PlayAnimation from "./components/PlayAnimation/PlayAnimation"
import { selectSearchResults } from "./redux/search/search.selectors"
import { checkUserSession } from "./redux/auth/auth.actions"

const App = () => {
    const searchResults = useSelector(selectSearchResults)
    const dispatch = useDispatch()
    const location = useLocation()

    useEffect(() => {
        dispatch(checkUserSession())
    }, [dispatch])

    return (
        <div className="App">
            <Navbar />
            <DetailModal />
            <AnimatePresence exitBeforeEnter>
                <Switch location={location} key={location.pathname}>
                    <Route exact path="/">
                        <Redirect to="/browse" />
                    </Route>
                    <Route path="/splash" component={SplashAnimation} />
                    <Route path="/play" component={PlayAnimation} />
                    <Route path="/search" render={() => searchResults && <Search results={searchResults} />} />
                    <Route exact path="/browse" render={() => <Homepage />} />
                    <Route exact path="/browse/:categoryName" render={(props) => <Category {...props} />} />
                    <Route exact path="/tvseries" render={() => <TVSeries />} />
                    <Route exact path="/tvseries/:categoryName" render={(props) => <Category {...props} />} />
                    <Route exact path="/movies" render={() => <Movies />} />
                    <Route exact path="/movies/:categoryName" render={(props) => <Category {...props} />} />
                    <Route exact path="/popular" render={() => <Popular />} />
                    <Route exact path="/popular/:categoryName" render={(props) => <Category {...props} />} />
                    <Route exact path="/mylist" render={() => <MyList />} />
                    <Route path="*">
                        <Redirect to="/" />
                    </Route>
                </Switch>
            </AnimatePresence>
        </div>
    )
}

export default App
