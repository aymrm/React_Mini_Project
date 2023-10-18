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

export default function FormNameInput({ register, errors, value }){
    return(
        <div>
            <FormLabel htmlFor='name'>이름</FormLabel>
            <br/><br/>
            <_Input type="text" id='name' placeholder='이름을 입력해주세요'
            {...register('name',{
                required:'이름을 입력해야 합니다',
            })}
            defaultValue={value}/>
            { errors  ? <_Error>{errors.message}</_Error>
                : <_Normal>'이름을 입력해주세요'</_Normal>}
        </div>
    )
}