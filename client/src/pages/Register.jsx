import React, { useEffect, useState } from "react";
import { Form, Input,Select,Divider,message } from 'antd';
import { Col,Row,Button } from "react-bootstrap";
import Axios from 'axios';
import '../components/css/register.css'
const { Option } = Select;




function Register() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [typeList, setTypeList] = useState([]);    

    useEffect(() => {          
        Axios.get('http://localhost:3000/set/listTypeUser')
        .then(response => {       
            console.log(response.data)     
            setTypeList(response.data)                
        })
        .catch(error => {
            console.log(error)
        })              
    },[])

    
    const handleSubmit = () => {       
        
        Axios.post("http://localhost:3000/set/register",{
            user:user,
            password:password,            
            typeUser:type,
            name: name
        })        
        .then((response) =>{
            message.success(response.data.message);
            setInterval(() => {       
                window.location.assign("/")
            }, 1000);
            
            
        } )  
        .catch(error => { 
            console.log(error.response.data.message)       
            message.error(error.response.data.message);                                                                         
        })   
    };

    const handleChangeType = (e) => {       
        setType(e)
    }

    return (
        <Row className="justify-content-center" >                     
            <Col sm={4} className='m-5 px-5 prin' align="center">
                <Form onFinish={handleSubmit} >

                    <Form.Item  className='mt-5'>
                        <Divider className='title'>Registrate</Divider>                      
                    </Form.Item>

                    <Form.Item name="name" label="Nombre" rules={[{ required: true }]} >
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}                        
                            type="text"
                            placeholder="Nombre"
                            aria-describedby="inputGroupPrepend"                            
                            required                
                        />
                    </Form.Item>

                    <Form.Item name="user" label="Usuario" rules={[{ required: true }]} >
                        <Input
                            value={user}
                            onChange={(e) => setUser(e.target.value)}                        
                            type="text"
                            placeholder="Usuario"
                            aria-describedby="inputGroupPrepend"                            
                            required                
                        />
                    </Form.Item>

                    <Form.Item name="clave" label="Clave" rules={[{ required: true }]} >
                        <Input.Password
                            type="password"
                            placeholder="Clave"
                            aria-describedby="passwordHelpBlock"                           
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}              
                        />
                    </Form.Item> 

                    <Form.Item name="type" label="Tipo" rules={[{ required: true }]} >
                        <Select
                            placeholder="Seleccione una opción de usuario"                                      
                            onChange={handleChangeType}  
                            required 
                            allowClear                           
                        >
                        {
                            typeList.map((data,index) => 
                                <Option
                                    value={ data.code }
                                    key={index}>                           
                                    { data.description }
                                </Option>
                            )                    
                        }                                                      
                        </Select>
                    </Form.Item>

                    <Form.Item>          
                        <Button className='mt-5' size="sz" variant="outline-light" type="submit" block>Guardar registro</Button>{' '}                      
                    </Form.Item>                                        
                </Form>
            </Col>
        </Row>
        
    )
}

export default Register