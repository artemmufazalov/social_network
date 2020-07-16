import React from 'react';
import './App.css';
import Header from "./socialNetwork/components/Header/Header";
import NavBar from "./socialNetwork/components/NavBar/NavBar";
import ProfileContent from "./socialNetwork/components/Profile/Profile";
import Footer from "./socialNetwork/components/Footer/Footer";
import {Route} from "react-router-dom";
import News from "./socialNetwork/components/News/News";
import Music from "./socialNetwork/components/Music/Music";
import Settings from "./socialNetwork/components/Settings/Settings";
import MessagesContainer from "./socialNetwork/components/Messages/MessagesContainer";


const App = (props) => {
    return (
        <div className="app-wrapper">

            <Header/>
            <NavBar/>

            <div className="content">

                <Route path="/" exact render={()=><div>MainPage</div>}/>

                <Route path="/profile" render={() => <ProfileContent store={props.store}/>}/>

                <Route path="/messages" render={() => <MessagesContainer store={props.store}/>}/>

                <Route path="/news" render={() => <News/>}/>

                <Route path="/music" render={() => <Music/>}/>

                <Route path="/settings" render={() => <Settings/>}/>

            </div>

            <Footer/>
        </div>
    );
}

export default App;
