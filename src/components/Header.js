import React from 'react';
import LogoUrl from '../logo.svg';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';
import {Button} from 'antd';

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

export default function () {
    const [isLogin, setIsLogin] = React.useState(false);
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
                    isLogin === true ?
                        <>
                            user A
                            <StyledButton type="primary" onClick={()=>setIsLogin(false)}>注销</StyledButton>
                        </>:
                        <>
                            <StyledButton type="primary" onClick={()=>setIsLogin(true)}>登录</StyledButton>
                            <StyledButton type="primary">注册</StyledButton>
                        </>
                }
                {/*<StyledLink to='/login' exact activeClassName="active">登录</StyledLink>*/}
                {/*<StyledLink to='/register' exact activeClassName="active">注册</StyledLink>*/}
            </Login>

        </Header>
    );
}

