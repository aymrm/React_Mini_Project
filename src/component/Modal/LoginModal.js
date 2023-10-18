import DefaultModal from './DefaultModal';

export default function LoginModal({visible,position}){
    return (
        <DefaultModal visible={visible} position={position}>
            기능 구현중입니다 {<br/>}
            테스트 로그인으로 접속해주세요
        </DefaultModal>
    )
}