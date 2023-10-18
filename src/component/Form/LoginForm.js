import { useForm } from "react-hook-form";
import FormContent from "./FormContent";
import FormNameInput from "./FormNameInput";
import FormPasswordInput from "./FormPasswordInput";
import styled from 'styled-components';

const _Div = styled.div`
    text-align: center;
`

const _Button = styled.button`
    background-color: #007bff;
    color: #fff;
    padding: 5px 10px;
    border: none;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`

export default function LoginForm({handleMouseEnter,handleMouseLeave}){
    const { register, handleSubmit, formState: { errors } }= useForm();
    
    return (
        <form onSubmit={handleSubmit(()=>alert('테스트 로그인으로 접속해주세요'))}>
            <FormContent>
                <FormNameInput register={register} errors={errors.name}/>
                <FormPasswordInput register={register} errors={errors.password}/>
                <_Div>
                    <_Button type="submit"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >로그인</_Button>
                </_Div>
            </FormContent>
        </form>
    )   
}