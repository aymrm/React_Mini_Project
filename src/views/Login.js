import React, { useState } from "react";
import FormNav from "../component/Form/FormNav";
import TestLoginForm from "../component/Form/TestLoginForm";
import LoginForm from "../component/Form/LoginForm";
import styled from 'styled-components';
import LoginModal from "../component/Modal/LoginModal";
import ModalController from "../utils/ModalController";

const _Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const _FormBox = styled.div`
    position: relative;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    width: 300px;
    height: 450px;
`

export default function Login(){
    const [ isTest, setIsTest ] = useState(true);
    const [ isModalVisible, setModalVisible ] = useState(false);
    const [ modalPosition, setModalPosition ] = useState({ left: 0, top: 0 });

    const { handleMouseEnter, handleMouseLeave } = ModalController(setModalVisible,setModalPosition)
    
    return (
        <_Container>
            <_FormBox>
                <FormNav hook={setIsTest}/>
                { isTest ? <TestLoginForm/> :
                <LoginForm handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave}/>}
            </_FormBox>
            <LoginModal visible={isModalVisible} position={modalPosition}/>
        </_Container>    
    );
}