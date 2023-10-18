import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { profileAction } from "../../store/profile";
import { useNavigate } from "react-router-dom";
import constant from "../../lib/constant";
import FormContent from "./FormContent";
import FormSelect from "./FormSelect";
import FormButton from "./FormButton";
import FormNameInput from "./FormNameInput";

export default function TestLoginForm(){
    const { register, handleSubmit, formState: { errors } }= useForm();
    const [ testRole, setTestRole ] = useState('admin');    
    const navi = useNavigate()
    const dispatch = useDispatch()

    const { roleList } = constant

    const onSubmit = (e) => {
        const { name } = e
        dispatch(profileAction.testLogin({ user_name:name, role:testRole }))
        alert(`${name}님 환영합니다`)
        navi('../');
    }

    return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
            <FormNameInput register={register} errors={errors.name} />
            <FormSelect value={testRole} setValue={setTestRole} list={roleList}/>
            <FormButton/>
        </FormContent>
    </form>
    )
}