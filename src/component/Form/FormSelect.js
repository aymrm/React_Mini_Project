import styled from 'styled-components';

const _Select = styled.select`
    height: 30px;
    width: 94%;
`

export default function FormSelect({value,setValue,list}){
    return (
        <_Select value={value} onChange={ e => setValue(e.target.value)}>
                {list.map( e => <option value={e.role} key={e.id}>{e.name}</option>)}
        </_Select>
    )
}