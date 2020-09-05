import React, {Suspense} from 'react';
import './App.css';
import NavBar from "./socialNetwork/components/NavBar/NavBar";
import Footer from "./socialNetwork/components/Footer/Footer";
import {withRouter, Route, HashRouter} from "react-router-dom";
import News from "./socialNetwork/components/News/News";
import Settings from "./socialNetwork/components/Settings/Settings";
import UsersContainer from "./socialNetwork/components/Users/UsersContainer";
import ProfileContainer from "./socialNetwork/components/Profile/ProfileContainer";
import HeaderContainer from "./socialNetwork/components/Header/HeaderContainer";
import LoginPage from "./socialNetwork/components/Login/Login";
import Logout from "./socialNetwork/components/Login/Logout";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/appReducer";
import PreloaderCustom from "./socialNetwork/components/common/Preloader/PreloaderCustom";
import store from "./redux/reduxStore";
import Preloader from "./socialNetwork/components/common/Preloader/Preloader";

const MessagesContainer = React.lazy(() => import('./socialNetwork/components/Messages/MessagesContainer'));
const Music = React.lazy(() => import('./socialNetwork/components/Music/Music'));

class App extends React.Component {

    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return (
                <div className="preloader-wrapper">
                    <PreloaderCustom className={"preloader"}/>
                </div>
            );
        } else {
            return (
                <div className="app-wrapper">

                    <HeaderContainer/>
                    <NavBar/>

                    <div className="content">

                        <Suspense fallback={<Preloader/>}>

                            {/* <Route path="/" exact render={() => <div>MainPage</div>}/>*/}

                            <Route exact path={["/profile/:userId?", "/"]} render={() => <ProfileContainer/>}/>

                            <Route path="/messages" render={() => <MessagesContainer/>}/>

                            <Route path="/news" render={() => <News/>}/>

                            <Route path="/music" render={() => <Music/>}/>

                            <Route path="/users" render={() => <UsersContainer/>}/>

                            <Route path="/settings" render={() => <Settings/>}/>

                            <Route path="/login/" render={() => <LoginPage/>}/>

                            <Route path="/logout" render={() => <Logout/>}/>

                        </Suspense>

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

