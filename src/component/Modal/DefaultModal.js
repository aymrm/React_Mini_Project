import styled from 'styled-components';

const _Modal = styled.div`
    position: absolute;
    background-color: white;
    border: 1px solid #ccc;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    padding: 10px;
    z-index: 1000;
`

export default function DefaultModal({visible,position,children}){
    return (
        <>
            {visible && <_Modal style={position}>{children}</_Modal>}
        </>
    )
}