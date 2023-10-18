import styled from 'styled-components';
import FormLabel from './FormLable';

const _Input = styled.input`
    width: 90%;
    padding: 5px;
`

export default function FormFontSizeInput({ register, value }){
    return(
        <div>
            <FormLabel htmlFor="fontSize">글자 크기</FormLabel>
            <br/><br/>
            <_Input type="number" id='fontSize'
            {...register('fontSize',{
                validate:{ notPositiv: v => v > 0 || '자연수로 입력해주세요'},
            })}
            defaultValue={Number(value.split('px')[0])}/>
        </div>
    )
}