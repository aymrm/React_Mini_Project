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

export default function FormProfileImageInput({register,errors,value}){
    return(
        <div>
            <FormLabel htmlFor='profile_image'>비밀번호</FormLabel>
            <br/><br/>
            <_Input type="file" id='profile_image'
            {...register('profile_image',{
                validate:{ maxExceeded : v => v.size > 10 * 1024 * 1024 || '10mb 이하의 이미지 파일을 사용해 주세요' }
            })}></_Input>
            { errors ? <_Error>{errors.message}</_Error>
                : errors===undefined ? <_Normal>'비밀번호를 입력해주세요'</_Normal>
                    : <_Normal>'정상적으로 입력하셨습니다'</_Normal> }
        </div>
    )
}