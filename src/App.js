import React, {Suspense} from 'react';
import {Redirect, Switch, withRouter, Route, HashRouter} from "react-router-dom";
import {connect, Provider} from "react-redux";
import {compose} from "redux";

import './App.css';
import store from "./BLL/reduxStore/reduxStore";
import {initializeApp} from "./BLL/reducers/appReducer";
import {getIsInitialized} from "./BLL/selectors/appSelectors";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import NewsPage from "./components/pages/NewsPage/NewsPage";
import SettingsPage from "./components/pages/SettingsPage/SettingsPage";
import UsersContainer from "./components/pages/UsersPage/UsersContainer";
import ProfileContainer from "./components/pages/ProfilePage/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import Logout from "./components/Login/Logout";
import Preloader from "./components/common/Preloader/Preloader";


//TODO: React.lazy - reconsider component loading order
//TODO: make 404 NOT FOUND page. Read how it is usually made
//TODO: add errors catching with feedback to user

const MessagesContainer = React.lazy(() => import('./components/pages/MessagesPage/MessagesContainer'));
const Music = React.lazy(() => import('./components/pages/MusicPage/MusicPage'));

class App extends React.Component {

    catchAllUnhandledErrors = (promiseRejectionEvent) => {
        alert("Some error occurred");
    }

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }

    render() {
        if (!this.props.initialized) {
            return (
                <div className="preloader-wrapper">
                    <Preloader custom className={"preloader"}/>
                </div>
            );
        } else {
            return (
                <div className="app-wrapper">

                    <HeaderContainer/>
                    <NavBar/>

                    <div className="content">

                        <Suspense fallback={<Preloader/>}>
                            <Switch>
                                <Route path="/" exact render={() => <Redirect to={"/profile"}/>}/>

                                <Route path={"/profile/:userId?"} render={() => <ProfileContainer/>}/>

                                <Route path="/messages" render={() => <MessagesContainer/>}/>

                                <Route path="/news" render={() => <NewsPage/>}/>

                                <Route path="/music" render={() => <Music/>}/>

                                <Route path="/users" render={() => <UsersContainer/>}/>

                                <Route path="/settings" render={() => <SettingsPage/>}/>

                                <Route path="/login/" render={() => <LoginPage/>}/>

                                <Route path="/logout" render={() => <Logout/>}/>

                                <Route path="*" render={() => <div>404 NOT FOUND</div>}/>
                            </Switch>
                        </Suspense>

                    </div>

                    <Footer/>

                </div>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    initialized: getIsInitialized(state)
})

let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp,}))(App);

const SocialNetworkApp = () => {
    return (
        <HashRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </HashRouter>
    );
}

export default SocialNetworkApp;

