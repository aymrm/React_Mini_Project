import styled from 'styled-components';
import FormLabel from './FormLable';
import { useDispatch } from 'react-redux';

const _ColorInput = styled.input`
    margin: 0px 10px;
`

export default function FormBackgroundColorInput({ register, value}){
    const dispatch = useDispatch()
    return(
        <div>
            <FormLabel htmlFor="backgroundColor"> 배경 색 </FormLabel>
            <br/><br/>
            <_ColorInput type="color" id='backgroundColor' defaultValue={value} {...register('backgroundColor')}></_ColorInput>
        </div>
    )
}