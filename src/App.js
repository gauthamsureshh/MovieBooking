

import NowShowing from "./Components/content"
import Details from "./Components/footer"
import UpcomingMovies from "./Components/header"
import NavBar from "./Components/navBar"



function App(){
  return(
    <>
    <NavBar/>
    <UpcomingMovies/>
    <NowShowing/>
    <Details/>
    </>
  )
}

export default App