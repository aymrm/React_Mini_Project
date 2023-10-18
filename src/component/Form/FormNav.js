import styled from 'styled-components';

const _Span = styled.span`
    border: 1px solid #ccc;
    padding: 7px;
`

const _Nav = styled.nav`
    display: flex;
    justify-content: space-around;
    margin: 10px;
`

export default function FormNav({hook}){
    return (
    <_Nav>
        <_Span onClick={()=>hook(false)}>로그인</_Span>
        <_Span onClick={()=>hook(true)}>테스트 로그인</_Span>
    </_Nav>
    )
}