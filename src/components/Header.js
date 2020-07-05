import React from 'react';
import LogoUrl from '../logo.svg';
import {NavLink,useHistory} from 'react-router-dom';
import styled from 'styled-components';
import {Button} from 'antd';
import {useStores} from "../stores";
import {observer} from "mobx-react";

const Header = styled.header`
    background-color:#001529;
    color:white;
    padding:10px;
    display:flex;
    align-items: center;
`;

const Logo = styled.img`
    height:30px;
`;

const StyledNav = styled.nav`
    flex:1;
`;

const StyledLink = styled(NavLink)`
    color:#fff;
    margin-left:10px;
    &.active {
        border-bottom: 1px solid #fff;
    }
`;

const StyledButton = styled(Button)`
    color:white;
    margin-left:10px;
`;

const Login = styled.div`
    
`;

const Component = observer((props) => {
    const {AuthStore, UserStore} = useStores();
    const history = useHistory();
    const handleLogin = () => {
        history.push('/login')
    };

    const handleLogout = () => {
        AuthStore.logout();
        history.push('/')
    };

    const handleRegister = () => {
        history.push('/register')
    };

    return (
        <Header>
            <Logo src={LogoUrl}/>
            <StyledNav>
                <StyledLink to='/' exact activeClassName="active">首页</StyledLink>
                <StyledLink to='/history' exact activeClassName="active">上传历史</StyledLink>
                <StyledLink to='/about' exact activeClassName="active">关于我</StyledLink>
            </StyledNav>
            <Login>
                {
                    UserStore.currentUser ?
                        <>
                            {UserStore.currentUser.attributes.username}
                            <StyledButton type="primary" onClick={handleLogout}>注销</StyledButton>
                        </> :
                        <>
                            <StyledButton type="primary" onClick={handleLogin}>登录</StyledButton>
                            <StyledButton type="primary" onClick={handleRegister}> 注册 </StyledButton>
                        </>
                }
            </Login>
        </Header>
    );
});

export default Component;

