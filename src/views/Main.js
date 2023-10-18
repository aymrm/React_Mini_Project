import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import styled from "styled-components"

const _BodyContainer = styled.div`
    height:530px;
    display: flex;
    justify-content: center;
`

export default function Main(){
    const { user_name } = useSelector( state => state.profile )
    return (
    <>
        <_BodyContainer>
            <Outlet/>
        </_BodyContainer>
    </>)
}