import React,{Suspense,lazy} from 'react';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import {Switch, Route} from 'react-router-dom';
import Loading from "./components/Loading";

const Home = lazy(()=>import('./pages/Home'))
const History = lazy(()=>import('./pages/History'))
const About = lazy(()=>import('./pages/About'))

function App() {
    return (
        <div className="App">
            <Header/>
            <Suspense fallback={<Loading/>}>
              <Switch>
                <Route path="/" exact><Home/></Route>
                <Route path="/history" exact><History/></Route>
                <Route path="/about" exact><About/></Route>
              </Switch>
            </Suspense>


            <Footer/>
        </div>
    );
}

export default App;
