import React, { useEffect, useState } from "react";
import { Button,Form, InputGroup,Col,Row } from "react-bootstrap";
import { Form as FormAs,Checkbox as  CheckboxAs,Layout,Divider,message  } from "antd";
import { RiLockPasswordLine,RiUserSharedLine } from "react-icons/ri";
import Axios from 'axios';
import * as Cookies from "js-cookie";
import Crypto from 'crypto-js'
import verify from '../components/verify'
import lg from '../images/lg.jpg'
import { FaRegUserCircle,FaSignInAlt } from 'react-icons/fa'
import { IoLogoInstagram } from "react-icons/io";
import { TiSocialTwitterCircular,TiSocialFacebookCircular } from "react-icons/ti";
import { Link } from "react-router-dom";

const { Footer } = Layout;


function Login() {
    const [validated, setValidated] = useState(false);
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('');
    const [check, setCheck] = useState(false);

    useEffect(() => {   
        const original = verify()
        if (original !==''){
            Axios.post("http://localhost:3000/set/verifyUser",{
                user: original,                                
            }).then(() => window.location.assign("/home"))       
        }
                    
    },[])
    
    const handleSubmit = (event) => {           
        event.preventDefault();
        setValidated(true);
        Axios.post("http://localhost:3000/set/login",{
            password: password,
            user: user,                 
        })
        .then((response) =>{
            if(response.status !== 200){
                console.log(response)   
            } else {
                const user = response.data[0].user
                const hash = Crypto.AES.encrypt(user,'MiPrecioso')
                if(check){
                    localStorage.setItem('persistentUser',hash)
                }                                                                                
                Cookies.set("session", hash);                                
                window.location.assign("/home")                
            }                                    
        })         
        .catch(error => { 
            message.error(error.response.data.message);
            console.log(error)                                                                                 
        })   
    };

    return (        
        <div>  
            <Row>    
                <Col sm={6} className='mt-5' align="center">
                    <img alt="Logeo"
                        src={lg}
                    />
                </Col>          
                <Col sm={6}>
                    <Form className='mt-5 login' noValidate validated={validated} onSubmit={handleSubmit}> 
                        <Form.Group as={Col} className='title-login'>
                            <Form.Text className="text-center">
                                <FaRegUserCircle style={{ 'fontSize':'36px'}}/>
                            </Form.Text>
                        </Form.Group>    
                        <div className='sub-login mt-5'>
                            <Form.Group as={Col}>                                                            
                                <InputGroup>
                                    <InputGroup.Prepend>    
                                        <InputGroup.Text id="inputGroupPrepend"><RiUserSharedLine/></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        value={user}
                                        onChange={(e) => setUser(e.target.value)}                        
                                        type="text"
                                        placeholder="Username"
                                        aria-describedby="inputGroupPrepend"
                                        size="sm"
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please choose a username.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            
                            <Form.Group as={Col}>                                
                                <InputGroup>
                                    <InputGroup.Prepend>    
                                        <InputGroup.Text id="inputGroupPrepend"><RiLockPasswordLine/></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        aria-describedby="passwordHelpBlock"
                                        size="sm"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} 
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please choose a password.
                                    </Form.Control.Feedback>  
                                    <Form.Text className="text-muted" style={{ width: '100%' }}>
                                        <Form.Row >                                            
                                            <Col sm={6} style={{ textAlign:'initial' }}>
                                                <FormAs.Item                                                    
                                                    valuePropName='check'   
                                                    onChange={() => setCheck(!check)}                                                                                                                                      
                                                    >
                                                    <CheckboxAs>{' '}Remember me</CheckboxAs>
                                                </FormAs.Item>  
                                            </Col>
                                            <Col sm={6} style={{ textAlign:'end' }}>
                                                Forgot password
                                            </Col>
                                        </Form.Row>                                        
                                    </Form.Text>                                                                                                  
                                </InputGroup>    
                            </Form.Group>
                            <Form.Group as={Col}>                                                                                                                                                                           
                            </Form.Group>  
                            <Form.Group  as={Col} className="text-right mt-5">
                                <Button variant="outline-info" block type="submit" className='login-button'><FaSignInAlt/> USER LOGIN</Button>                                                                        
                            </Form.Group> 
                            <Form.Group  className="mt-4">
                                <Divider>
                                    <Link to='register'>  
                                        Registrate 
                                    </Link>
                                </Divider>                              
                            </Form.Group> 
                            <Form.Group  as={Col} className="text-center mt-5">
                                <TiSocialFacebookCircular className="facebook"/>    
                                <IoLogoInstagram className="instagram"/>    
                                <TiSocialTwitterCircular className="twitter"/>                                                                                 
                            </Form.Group>   
                        </div>                                                                                                                    
                    </Form>      
                </Col>                         
            </Row>   
            <Footer style={{ textAlign: 'center' }}>                            
                <strong>Name</strong> by Rosa Morales.                                     
            </Footer>                                    
        </div>
    )
}

export default Login