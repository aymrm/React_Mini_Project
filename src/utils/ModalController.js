export default function ModalController(setModalVisible,setModalPosition){
    const handleMouseEnter = (e) => {
        const { clientX, clientY } = e;
        setModalPosition({ left: clientX + 10, top: clientY + window.scrollY });
        setModalVisible(true);
    };
  
    const handleMouseLeave = () => {
        setModalVisible(false);
    };

    const handleMouseClick = (e) => {
        const { clientX, clientY } = e;
        setModalPosition({ left: clientX + 10, top: clientY + window.scrollY });
        setModalVisible( prev => !prev )
    }

    return { handleMouseEnter, handleMouseLeave, handleMouseClick } 
}