import styled from 'styled-components';

const _Div = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 380px;
`

export default function FormContent({children,height}){
    return (
        <_Div style={ height ? {height} : null }> {children} </_Div>
    )
}