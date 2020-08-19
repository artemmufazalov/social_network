import React from 'react';
import './App.css';
import NavBar from "./socialNetwork/components/NavBar/NavBar";
import Footer from "./socialNetwork/components/Footer/Footer";
import {withRouter, Route} from "react-router-dom";
import News from "./socialNetwork/components/News/News";
import Music from "./socialNetwork/components/Music/Music";
import Settings from "./socialNetwork/components/Settings/Settings";
import MessagesContainer from "./socialNetwork/components/Messages/MessagesContainer";
import UsersContainer from "./socialNetwork/components/Users/UsersContainer";
import ProfileContainer from "./socialNetwork/components/Profile/ProfileContainer";
import HeaderContainer from "./socialNetwork/components/Header/HeaderContainer";
import LoginPage from "./socialNetwork/components/Login/Login";
import Logout from "./socialNetwork/components/Login/Logout";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/appReducer";
import PreloaderCustom from "./socialNetwork/components/common/Preloader/PreloaderCustom";

class App extends React.Component {

    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized){
            return (
                <div className="preloader-wrapper">
                    <PreloaderCustom className={"preloader"}/>
                </div>
            );
        }
        else{
            return (
                <div className="app-wrapper">

                    <HeaderContainer/>
                    <NavBar/>

                    <div className="content">

                        <Route path="/" exact render={() => <div>MainPage</div>}/>

                        <Route path="/profile/:userId?" render={() => <ProfileContainer/>}/>

                        <Route path="/messages" render={() => <MessagesContainer/>}/>

                        <Route path="/news" render={() => <News/>}/>

                        <Route path="/music" render={() => <Music/>}/>

                        <Route path="/users" render={() => <UsersContainer/>}/>

                        <Route path="/settings" render={() => <Settings/>}/>

                        <Route path="/login/:componentName?/:userId?" render={() => <LoginPage/>}/>

                        <Route path="/logout" render={() => <Logout/>}/>
                    </div>

                    <Footer/>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
})

export default compose(
    withRouter,
    connect(mapStateToProps, {initializeApp,}))(App);

