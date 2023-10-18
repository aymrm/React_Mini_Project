import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { profileAction } from "../store/profile";
import FormContent from "../component/Form/FormContent";
import FormNameInput from "../component/Form/FormNameInput";
import FormAgeInput from "../component/Form/FormAgeInput";
import FormGenderInput from "../component/Form/FormGender";
import styled from "styled-components";

const _Container = styled.div`
    width:600px;
    background-color: #f0f0f0;
    padding: 15px 0px 15px 30px;
    border: 1px solid #ccc;
    border-radius: 15px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
`

export default function Profile(){
    const { register, handleSubmit, formState: { errors } }= useForm();
    const { user_name, age, gender, role } = useSelector( state => state.profile )

    const dispatch = useDispatch()

    const onSubmit = (e) => {
        const { name, age, gender } = e
        dispatch(profileAction.profileSetting({ user_name:name, age, gender }))
        alert('프로필을 수정했습니다')
    }

    return (
        <_Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormContent height='500px'>
                    <div> 권한: {role} </div>
                    <FormNameInput register={register} errors={errors.name} value={user_name}/>
                    <FormAgeInput register={register} errors={errors.age} value={age}/>
                    <FormGenderInput register={register} errors={errors.gender} value={gender}/>
                    <div className="button-container">
                        <button type="submit">수정</button>
                    </div>
                </FormContent>
            </form>
        </_Container>
    )
}