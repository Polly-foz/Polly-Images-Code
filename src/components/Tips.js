import React from 'react'
import styled from "styled-components";

const Tips = styled.div`
    background: orange;
    padding: 10px;
    border-radius: 4px;
    color: white;
    margin: 30px 0;
`

const Component = ({children})=>{
    return (<Tips>{children}</Tips>)
}

export default Component
