import styled from "styled-components";

const _Box = styled.div`
    position:absolute;
    background-color: aliceblue;
    width:60px;
    height:30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
`

export default function LayoutBox({ id, position, setPosition, handleMouseDown, handleMouseUp, dragging, setDragging, handleContextMenu, mode, rect }) {
    const handleMouseMove = (e) => {
        if(mode === 'MOVE'){            
            if(dragging){
                e.preventDefault();
                setPosition(id,{
                    left: e.clientX  - rect.left - 31,
                    top: e.clientY  - rect.top - 16 + window.scrollY,
                });
            }
        }
    }

    const handleMouseUpInternal = (e) => {
        setDragging(false);
        handleMouseUp(e);
    };

    const handleMouseDownInternal = (e) => {
        handleMouseDown(e);
        setDragging(true);
    }

    const handleContextMenuInternal = (e) => {
        e.preventDefault();
        handleContextMenu(e);
    }

    return (
        <_Box
            key={id}
            id={id}
            style={position}
            onMouseDown={handleMouseDownInternal}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpInternal}
            onContextMenu={handleContextMenuInternal}
        ></_Box>
    );
}