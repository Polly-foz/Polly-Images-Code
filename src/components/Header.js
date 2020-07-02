import React from 'react';
import LogoUrl from '../logo.svg';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';

const Header = styled.header`
    background-color:#001529;
    color:white;
    padding:10px;
    display:flex;
    align-items: center;
`

const Logo = styled.img`
    height:30px;
`

const StyledLink = styled(NavLink)`
    color:#fff;
    margin-left:10px;
    &.active {
        border-bottom: 1px solid #fff;
    }
`

export default function() {
    return (
        <Header>
            <Logo src={LogoUrl}/>
            <nav>
                <StyledLink to='/' exact activeClassName="active">首页</StyledLink>
                <StyledLink to='/history' exact activeClassName="active">上传历史</StyledLink>
                <StyledLink to='/about' exact activeClassName="active">关于我</StyledLink>
                <StyledLink to='/login' exact activeClassName="active">登录</StyledLink>
                <StyledLink to='/register' exact activeClassName="active">注册</StyledLink>
            </nav>

        </Header>
    );
}

