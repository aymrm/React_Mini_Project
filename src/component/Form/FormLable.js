import styled from 'styled-components';

const _Label = styled.label`
    font-weight: bold;
`

export default function FormLabel({htmlFor,children}) {
    return <_Label htmlFor={htmlFor}>{children}</_Label>
}