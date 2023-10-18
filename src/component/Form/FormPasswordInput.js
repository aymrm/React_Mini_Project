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

export default function FormPasswordInput({register,errors}){
    return(
        <div>
            <FormLabel htmlFor='password'>비밀번호</FormLabel>
            <br/><br/>
            <_Input type="password" id='password' placeholder='비밀번호를 입력해주세요'
            {...register('password',{
                required:'비밀번호를 입력해야 합니다',
                minLength:{ message:'최소 8글자 이상 작성', value:8 },
                // validate:{ useEngNum: v => !/^[A-Za-z0-9]+$/.test(v) || '영어와 숫자로만 이루어져야 합니다'},
            })}></_Input>
            { errors ? <_Error>{errors.message}</_Error>
                : <_Normal>'비밀번호를 입력해주세요'</_Normal>}
        </div>
    )
}