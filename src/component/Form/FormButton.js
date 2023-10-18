import styled from 'styled-components';

const _Div = styled.div`
    text-align: center;
`

const _Button = styled.button`
    background-color: #007bff;
    color: #fff;
    padding: 5px 10px;
    border: none;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`

export default function FormButton(){
    return (
        <_Div>
            <_Button type="submit">테스트 로그인</_Button>
        </_Div>
    )
}