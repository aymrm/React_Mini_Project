import { Link } from "react-router-dom"
import styled from 'styled-components';
import ModalController from "./utils/ModalController";
import { useState } from "react";
import SiteSettingModal from "./component/Modal/SiteSettingModal";
import { useDispatch, useSelector } from "react-redux";
import { profileAction } from "./store/profile";

const _Span = styled.span`
    
`

const _Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    padding: 10px;
`

const _Link = styled(Link)`
    color: black;
    text-decoration: none;
    padding: 5px;
`

const _Button = styled.button`
    border-radius: 20px;
`

export default function Header(){
    const { backgroundColor } = useSelector( state => state.siteSetting )
    const { user_name, isLogin } = useSelector( state => state.profile )
    const [ isModalVisible, setModalVisible ] = useState(false);
    const [ modalPosition, setModalPosition ] = useState({ left: 0, top: 0 });

    const dispatch = useDispatch()

    const handleMouseClick = (e) => {
        const { clientX, clientY } = e;
        if(clientX < window.innerWidth/2){
            setModalPosition({ left: clientX + 10, top: clientY + 10 });
        } else {
            setModalPosition({ left: clientX - 100, top: clientY + 20 });
        }
        setModalVisible( prev => !prev )
    }

    const makeColorDarker = (color, amount) => {
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
      
        const darkerR = Math.max(0, r - amount);
        const darkerG = Math.max(0, g - amount);
        const darkerB = Math.max(0, b - amount);
      
        const darkerColor = `#${darkerR.toString(16).padStart(2, '0')}${darkerG.toString(16).padStart(2, '0')}${darkerB.toString(16).padStart(2, '0')}`;
      
        return darkerColor;
    }

    const headerLogout = () => {
        alert('사이트에서 로그아웃 합니다')
        dispatch(profileAction.testLogout())
    }      

    return (
        <>
            <_Nav style={{backgroundColor:makeColorDarker(backgroundColor,20)}}>
                <_Span>
                    <_Link to='/'>메인 페이지</_Link>
                </_Span>
                {
                    isLogin ? <_Span>
                        <_Link to='/profile'>{user_name}</_Link>
                        <_Button onClick={headerLogout}>로그아웃</_Button>
                        <_Button onClick={handleMouseClick}>사이트 설정</_Button>
                    </_Span> : <_Span>
                        <_Link to='/login'>로그인</_Link>
                    </_Span> 
                }
                <SiteSettingModal visible={isModalVisible} position={modalPosition} />
            </_Nav>
        </>
    )
}