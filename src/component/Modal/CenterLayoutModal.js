import DefaultModal from './DefaultModal';

export default function CenterLayoutModal({visible,position,children}){
    return (
        <DefaultModal visible={visible} position={position}>
            {children}
        </DefaultModal>
    )
}