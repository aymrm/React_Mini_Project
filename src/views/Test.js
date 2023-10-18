import React, { useState } from 'react';
import ModalController from '../utils/ModalController';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { centerAction } from '../store/center';
import CenterLayoutModal from '../component/Modal/CenterLayoutModal';
import LayoutBox from '../component/LayoutBox';

const _Nav = styled.nav`

`

const _Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const _Layout = styled.div`
    position: relative;
    width:350px;
    height: 500px;
    background-color: skyblue;
    border-radius: 20px;
`

export default function Test() {
    const [ dragging , setDragging ] = useState(false);
    const [ mode, setMode ] = useState('');
    const [ selectedBox, setSelectedBox ] = useState();
    const { lay_out } = useSelector( state => state.center )
    const dispatch = useDispatch()
    

    const [ isModalVisible, setModalVisible ] = useState(false);
    const [ modalPosition, setModalPosition ] = useState({ left: 0, top: 0 });

    const { handleMouseEnter, handleMouseLeave, handleMouseClick } = ModalController(setModalVisible,setModalPosition)
    

    const handleMouseDown = (e) => {
        setSelectedBox(e.target)
        setDragging(true);
    };

    const handleMouseUp = (e) => {
        setDragging(false);
    };

    const addBox = (e) => {
        const newBoxId = lay_out.length + 1;
        dispatch(centerAction.newLayoutBox({
            id: newBoxId,
            position: { left:e.clientX - 110 , top:e.clientY - 120 },
        }))
    };

    const delBox = () => {
        dispatch(centerAction.delLayoutBox( selectedBox.id ))
    };

    const boxSetPosition = (id,position) => {
        dispatch(centerAction.layoutSetPosition({id,position}))
    }
  
    const layoutClick = (e) => {
        setModalVisible(false)
        switch(mode){
            case 'ADD' :
                addBox(e)
                setMode(null)
                return;
            case 'DEL' :
                delBox()
                setMode(null)
                return;
        }

    }
  
    return (
        <>
            <_Container>
                <_Nav>
                    <button onClick={()=>setMode('ADD')}>추가</button>
                    <button onClick={()=>setMode('DEL')}>제거</button>
                </_Nav>
                <_Layout onMouseUp={handleMouseUp} onClick={layoutClick}>
                    {lay_out.map((box,index) => (
                        <LayoutBox key={index} id={box.id}
                        position={box.position}
                        setPosition={boxSetPosition}
                        handleMouseDown={handleMouseDown}
                        handleMouseUp={handleMouseUp}
                        dragging={dragging}
                        setDragging={setDragging}
                        handleContextMenu={handleMouseClick}/>
                    ))}
                </_Layout>
                <CenterLayoutModal visible={isModalVisible} position={modalPosition}>
                    기능 구현중
                </CenterLayoutModal>
            </_Container>
        </>
    );
}