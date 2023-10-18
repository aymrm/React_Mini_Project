import { useDispatch, useSelector } from 'react-redux';
import DefaultModal from './DefaultModal';
import { siteSettingAction } from '../../store/siteSetting';
import FormContent from '../Form/FormContent';
import { useForm } from 'react-hook-form';
import FormColorInput from '../Form/FormColorInput';
import FormBackgroundColorInput from '../Form/FormBackgroundColorInput';
import FormFontSizeInput from '../Form/FormFontSizeInput';
import styled from 'styled-components';

const _Div = styled.div`
    display: flex;
    justify-content: space-around;
`

export default function SiteSettingModal({visible,position}){
    const { register, handleSubmit, reset, formState: { errors } }= useForm();
    const { backgroundColor, fontSize, color } = useSelector( state => state.siteSetting )

    const dispatch = useDispatch()

    const onSubmit = (e) => {
        const { backgroundColor, fontSize, color } = e
        dispatch(siteSettingAction.siteSetting({ backgroundColor, fontSize, color }))
        alert('사이트 설정을 수정했습니다')
    }
    
    const setReset = () => {
        dispatch(siteSettingAction.returnDefaultSetting())
        reset()
        alert('기본 설정으로 되돌렸습니다')
    }


    return (
        <DefaultModal visible={visible} position={position}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormContent>
                    <FormBackgroundColorInput register={register} value={backgroundColor}/>
                    <FormFontSizeInput register={register} value={fontSize}/>
                    <FormColorInput register={register} value={color}/>
                    <_Div>
                        <button type='submit'> 변경 </button>
                        <button type='button' onClick={setReset}> 기본 </button>
                    </_Div>
                </FormContent>
            </form>
        </DefaultModal>
    )
}