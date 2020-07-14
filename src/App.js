import React from 'react';
import './App.css';
import Header from "./socialNetwork/components/Header/Header";
import NavBar from "./socialNetwork/components/NavBar/NavBar";
import ProfileContent from "./socialNetwork/components/Profile/Profile";
import Footer from "./socialNetwork/components/Footer/Footer";
import Messages from "./socialNetwork/components/Messages/Messages";
import {BrowserRouter, Route} from "react-router-dom";
import News from "./socialNetwork/components/News/News";
import Music from "./socialNetwork/components/Music/Music";
import Settings from "./socialNetwork/components/Settings/Settings";


const App = (props) => {
    return (
        <div className="app-wrapper">

            <Header/>
            <NavBar/>

            <div className="content">

                <Route path="/profile" render={() => <ProfileContent postsData={props.state.postsData}
                                                                     dispatch={props.dispatch}/>}/>

                <Route path="/messages" render={() => <Messages state={props.state}
                                                                dispatch={props.dispatch}/>}/>

                <Route path="/news" render={() => <News/>}/>

                <Route path="/music" render={() => <Music/>}/>

                <Route path="/settings" render={() => <Settings/>}/>

            </div>

            <Footer/>
        </div>
    );
}

export default App;
