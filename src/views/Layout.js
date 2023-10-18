import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { centerAction } from '../store/center';
import CenterLayoutModal from '../component/Modal/CenterLayoutModal';
import LayoutBox from '../component/LayoutBox';
import { v4 } from 'uuid';

const _Nav = styled.nav`
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
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

export default function Layout() {
    const [ dragging , setDragging ] = useState(false);
    const [ mode, setMode ] = useState('');
    const [ selectedBox, setSelectedBox ] = useState();
    const [ selectedProfile, setSelectedProfile ] = useState();
    const [ selectedBoxSize, setSelectedBoxSize ] = useState();
    const [ rect, setRect ] = useState(null)
    const { lay_out } = useSelector( state => state.center )
    const layOutRef = useRef(null);
    const dispatch = useDispatch()

    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const handleResize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    useEffect(()=>{
        const layOutDom = layOutRef.current;
        if(layOutDom){
            const rectDom = layOutDom.getBoundingClientRect()
            const { width, height, left, top } = rectDom
            setRect({ width, height, left, top})
            dispatch(centerAction.setRect({ width, height, left, top}))
        }
    },[windowSize])
    
    const [ isModalVisible, setModalVisible ] = useState(false);
    const [ modalPosition, setModalPosition ] = useState({ left: 0, top: 0 });

    const handleContextClick = (e) => {
        const { clientX, clientY } = e;
        setModalPosition({ left: clientX + 10, top: clientY + window.scrollY });
    }

    const handleMouseDown = (e) => {
        setSelectedBox(e.target)
        setDragging(true);
    };
    
    const handleMouseUp = (e) => {
        const id = e.target.id
        const profile = lay_out.detail.find( e => e.id === id )
        const { offsetWidth, offsetHeight } = e.target
        setSelectedBoxSize({width:offsetWidth,height:offsetHeight})
        setSelectedProfile(profile);
        setDragging(false);
    };

    const addBox = (e) => {
        const newBoxId = v4();
        dispatch(centerAction.newLayoutBox({
            id: newBoxId,
            detail: { 
                position: {left:e.clientX - rect.left - 31, top:e.clientY - rect.top - 16 + window.scrollY},
                size: { width:62, height:32}
            },
        }))
    };

    const delBox = () => {
        if (selectedBox){
            dispatch(centerAction.delLayoutBox( selectedBox.id ))
        }
    };

    const boxSetPosition = (id,position) => {
        dispatch(centerAction.layoutSetPosition({id,position}))
    }
  
    const layoutClick = (e) => {
        e.preventDefault()
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

    const handleLayoutContext = (e) => {
        e.preventDefault()
        if(e.target.id === ''){
            setModalVisible( false )
        } else {
            setModalVisible( true )
        }
    }

    const modeChange = (newMode) => {
        if (mode === newMode) {
            setMode(null)
        } else {
            setMode(newMode)
        }
        setSelectedBox(null)
    }
  
    return (
        <>
            <_Container>
                <_Nav>
                    <button style={{backgroundColor: mode === 'ADD' ? 'skyblue' : 'white'}}
                    onClick={()=>modeChange('ADD')}>추가</button>
                    <button style={{backgroundColor: mode === 'DEL' ? 'skyblue' : 'white'}}
                    onClick={()=>modeChange('DEL')}>제거</button>
                    <button style={{backgroundColor: mode === 'MOVE' ? 'skyblue' : 'white'}}
                    onClick={()=>modeChange('MOVE')}>이동</button>
                </_Nav>
                <_Layout ref={layOutRef} onMouseUp={handleMouseUp} onClick={layoutClick} onContextMenu={handleLayoutContext}>
                    {lay_out.detail.map((box,index) => (
                        <LayoutBox key={index} id={box.id}
                        position={box.detail.position}
                        setPosition={boxSetPosition}
                        handleMouseDown={handleMouseDown}
                        handleMouseUp={handleMouseUp}
                        dragging={dragging}
                        setDragging={setDragging}
                        handleContextMenu={handleContextClick}
                        mode={mode}
                        rect={rect}/>
                    ))}
                </_Layout>
                <CenterLayoutModal visible={isModalVisible} position={modalPosition}>
                    { selectedProfile && <>
                        <div> id : {selectedProfile.id}</div>
                        <div> position = left :{selectedProfile.detail.position.left} top : {selectedProfile.detail.position.top}</div>
                    </>
                    }
                </CenterLayoutModal>
            </_Container>
        </>
    );
}
