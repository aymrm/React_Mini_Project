import styled from 'styled-components';
import FormLabel from './FormLable';

const _Input = styled.input`
    width: 90%;
    padding: 5px;
`

const _Error = styled.p`
    color: red;
`

const _Normal = styled.p`
    color: green;
`

export default function FormAgeInput({ register, errors, value}){
    return(
        <div>
            <FormLabel htmlFor="age">나이</FormLabel>
            <br/><br/>
            <_Input type="number" id='age'
            {...register('age',{
                validate:{ notPositiv: v => v > 0 || '나이를 입력해주세요'},
            })}
            defaultValue={value}/>
            { errors ? <_Error>{errors.message}</_Error>
                : errors===undefined ? <_Normal>'나이를 입력해주세요'</_Normal>
                    : <_Normal>'정상적으로 입력하셨습니다'</_Normal> }
        </div>
    )
}