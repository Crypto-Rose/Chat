import React from 'react';
import { BrowserRouter as Router,Redirect,Route,Switch } from 'react-router-dom';
import { Container } from 'react-bulma-components';
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import 'react-bulma-components/dist/react-bulma-components.min.css';

function App() {

    return(  
        <Container fluid >
            <Router>
                <Switch>
                    <Route path='/login' component={Login}/>
                    <Route path='/home' component={Home}/>                                       
                    <Route path='/register' component={Register} />                        
                    <Redirect from="/" to="login"/>
                </Switch>
            </Router>  
        </Container>                                                                                                                              
    )    
}

export default App;
