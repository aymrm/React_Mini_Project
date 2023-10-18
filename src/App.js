import React from 'react';
import {Outlet} from 'react-router-dom'
import Header from './Header';
import ChatBot from './component/ChatBot';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const _Main = styled.div`
    /* background-color: #82ff31; */
`

export default function App(){
    const siteSetting = useSelector(state => state.siteSetting)
    return (
        <>
            <div style={siteSetting}>
                <Header/>
                <br/>
                <Outlet/>
                <ChatBot/>
            </div>
        </>
    )
}