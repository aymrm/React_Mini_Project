import styled from 'styled-components';
import FormLabel from './FormLable';

const _RadioInput = styled.input`
    margin: 0px 10px;
`

const _Error = styled.p`
    color: red;
`

const _Normal = styled.p`
    color: green;
`

export default function FormGenderInput({ register, errors, value}){
    return(
        <div>
            <FormLabel htmlFor="gender"> 성별 </FormLabel>
            <br/><br/>
            <div>
                <FormLabel htmlFor='male'>남자</FormLabel>
                <_RadioInput type="radio" id='male' value='male' defaultChecked={value === 'male'} {...register('gender')}></_RadioInput>
                <FormLabel htmlFor='female'>여자</FormLabel>
                <_RadioInput type="radio" id='female' value='female' defaultChecked={value === 'female'} {...register('gender')}></_RadioInput>
                <FormLabel htmlFor='other'>미정</FormLabel>
                <_RadioInput type="radio" id='other' value='other' defaultChecked={value === 'other'} {...register('gender')}></_RadioInput>
            </div>
            { errors ? <_Error>{errors.message}</_Error>
                : errors===undefined ? <_Normal>'성별을 확인 해주세요'</_Normal>
                    : <_Normal>'정상적으로 입력하셨습니다'</_Normal> }
        </div>
    )
}