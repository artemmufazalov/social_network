import React from 'react';
import './App.css';
import Header from "./socialNetwork/components/Header/Header";
import NavBar from "./socialNetwork/components/NavBar/NavBar";
import Footer from "./socialNetwork/components/Footer/Footer";
import {Route} from "react-router-dom";
import News from "./socialNetwork/components/News/News";
import Music from "./socialNetwork/components/Music/Music";
import Settings from "./socialNetwork/components/Settings/Settings";
import MessagesContainer from "./socialNetwork/components/Messages/MessagesContainer";
import UsersContainer from "./socialNetwork/components/Users/UsersContainer";
import ProfileContainer from "./socialNetwork/components/Profile/ProfileContainer";

const App = () => {
    return (
        <div className="app-wrapper">

            <Header/>
            <NavBar/>

            <div className="content">

                <Route path="/" exact render={() => <div>MainPage</div>}/>

                <Route path="/profile/:userId?" render={() => <ProfileContainer/>}/>

                <Route path="/messages" render={() => <MessagesContainer/>}/>

                <Route path="/news" render={() => <News/>}/>

                <Route path="/music" render={() => <Music/>}/>

                <Route path="/users" render={() => <UsersContainer/>}/>

                <Route path="/settings" render={() => <Settings/>}/>

            </div>

            <Footer/>
        </div>
    );
}

export default App;
