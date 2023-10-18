import styled from 'styled-components';
import FormLabel from './FormLable';

const _ColorInput = styled.input`
    margin: 0px 10px;
`

export default function FormColorInput({ register, value}){
    return(
        <div>
            <FormLabel htmlFor="color"> 글자 색 </FormLabel>
            <br/><br/>
            <_ColorInput type="color" id='color' defaultValue={value} {...register('color')}></_ColorInput>
        </div>
    )
}