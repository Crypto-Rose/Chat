import React, { useCallback, useEffect, useState } from 'react';
import { Player, ControlBar,PlayToggle,BigPlayButton } from 'video-react';
import { Row, Col,Layout,Divider,Typography,Input,Button,PageHeader,Menu } from 'antd';
import Axios from 'axios';
import "video-react/dist/video-react.css";
import verify from '../components/verify'
import moment from  'moment';
import 'moment/locale/es';
import * as Cookies from "js-cookie";
import { HomeOutlined, BarChartOutlined, SmileOutlined,CheckCircleTwoTone } from '@ant-design/icons';
const { Header, Footer, Content,Sider  } = Layout;
const { Paragraph } = Typography;
const { TextArea } = Input;
const original = verify()
const { SubMenu } = Menu;


function Home(){

    const [listComment, setListComment] = useState([])
    const [comments, setComments] = useState([])

    const initial = useCallback(
        () => {        
            Axios.get("http://localhost:3000/set/comments")
            .then(response => {                               
                setListComment(response.data)                
            })      
        },
        [],
    );

    useEffect(() => {          
        initial()
    },[initial])

    const handleChange = () => {        
        Axios.post("http://localhost:3000/set/saveComments",{
            user: original,
            comment: comments
        })
        .then(resp => {  
            setComments('')                          
            initial()
        })      
        .catch(err => {
            console.log(err)                
        })
    }

    useEffect(() => {
        const interval = setInterval(() => {       
        initial()
        }, 5000);
        return () => clearInterval(interval);
    }, [initial]);

    const back = () => {
        localStorage.removeItem('persistentUser')
        Cookies.remove('session')
        window.location.assign("/")
    }

    return(                
        <Layout>
            
            <Layout>
                <Header>                
                    <PageHeader                        
                        className="site-page-header"                        
                        title="Clases Virtuales"
                        subTitle="Programación"
                        extra={[
                            
                        ]}
                        style={{
                            color: 'black !important'
                        }}
                        >
                    </PageHeader>

                </Header>
                <Layout>
                    <Content>
                        <Player
                            autoPlay
                            poster="/assets/poster.png"
                            src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"  
                            width="10%"                    
                            >
                            <ControlBar autoHide={false}>
                                <PlayToggle />
                            </ControlBar>
                            <BigPlayButton position="center" />
                        </Player> 
                    </Content> 
                    <Sider
                        theme='dark'
                        width={300}
                        breakpoint="lg"
                        collapsedWidth="80"                                                                             
                        >
                        <div className="logo" >                    
                        </div>
                        <Menu theme="dark" mode="inline" >
                            <Menu.Item key="1" icon={<HomeOutlined />}>
                            { ' ' }Inicio
                            </Menu.Item>                           
                            <SubMenu key="sub1" icon={<BarChartOutlined />} title="Temas">
                                <Menu.Item key="5">Tema 1</Menu.Item>
                                <Menu.Item key="5">Tema 2</Menu.Item>                                
                                <Menu.Item key="5">Tema 3</Menu.Item>
                            </SubMenu>
                            <Menu.Item key="4" icon={<SmileOutlined />} onClick={back}>                                                              
                                { ' ' }Salir                                 
                            </Menu.Item>
                        </Menu>
                    </Sider>   
                </Layout>                
                <Footer>                   
                    <Divider orientation="left">Chat estudiantil</Divider>
                    {
                        listComment.map((data,index) => 
                        <div key={data.code} style={
                            data.user === original 
                            ? {textAlign:'init' }
                            : {textAlign:'end' }
                            }>                           
                            <Row>
                                <Col span={20}>
                                    <b>{ moment(data.date_register).format('lll') } </b></Col>                                                             
                            </Row>
                            <Row> 
                                <Col span={20}> 
                                    <Paragraph ellipsis={{ rows: 4, expandable: true, symbol: 'more' }}>
                                        {data.comment}
                                    </Paragraph>                                   
                                </Col>   
                                <Col span={4}>                                                                     
                                    {
                                        data.type === '2'
                                        ? <Input    
                                            placeholder="Moderador"
                                            bordered={false}
                                            prefix={<CheckCircleTwoTone twoToneColor="#52c41a"/>} /> 
                                        : ' '
                                    }
                                </Col>                                                          
                            </Row>    
                            <Row>
                                <Col span={20}>
                                    <i>{ data.username }   </i>
                                    <hr/>
                                </Col>                              
                            </Row>                                              
                        </div>                                                
                        )                    
                    } 
                    <Row>                        
                        <Col span={18} className='mt-3'>
                            <label>Deja tu opinión: </label>
                            <TextArea
                                showCount
                                rows={6}
                                maxLength={1000}
                                value={ comments }
                                onChange={
                                    (e) => {
                                        setComments(e.target.value)
                                    }
                                }
                                />
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    onClick={
                                        handleChange
                                    }>
                                    Enviar
                                </Button>                               
                        </Col>
                    </Row>
                    
                </Footer>                             
            </Layout>
            
        </Layout>                                  
    )
}

export default Home