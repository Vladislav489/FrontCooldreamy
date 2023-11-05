import {toast} from 'react-toastify';
import {VscError} from 'react-icons/vsc';
import {AiOutlineCheckCircle,  AiOutlineInfoCircle} from 'react-icons/ai';
import Avatar from '@/components/Avatar/Avatar';
import {GrFormClose} from 'react-icons/gr';



type notificationType = 'ERROR' | 'SUCCESS' | 'INFO' | 'AVATAR'


type notificationObjType = {
    icon: React.ReactNode,
    themeColor: string
}

type switchFuncType = (type: notificationType, avatar?: string) => notificationObjType

const switchType:switchFuncType = (type, avatar) => {
    switch(type) {
        case 'ERROR':
            return {
                icon: <VscError color='var(--red)'/>,
                themeColor: 'var(--red)'
            }
        case 'SUCCESS':
            return {
                icon: <AiOutlineCheckCircle color='var(--green)'/>,
                themeColor: 'var(--green)'
            }
        case 'INFO':
            return {
                icon: <AiOutlineInfoCircle color='var(--blue)'/>,
                themeColor: 'var(--blue)'
            }
        case 'AVATAR':
            return {
                icon: <Avatar round size={50} image={avatar}/>,
                themeColor: 'var(--violet)'
            }
    }
}


const notify = (text: string | React.ReactNode | number, type: notificationType = 'SUCCESS', avatar?: string) => {
    toast(text, {
        icon: switchType(type, avatar).icon,
        position: window?.innerWidth <= 768 ? 'top-right' : 'bottom-right',
        autoClose: 2500,
        // autoClose: false,
        hideProgressBar: false,
        // closeOnClick: true,
        closeOnClick: false,
        // pauseOnHover: true,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        draggable: true,
        theme: "dark",
        className: 'notify',
        progressStyle: {
            backgroundColor: switchType(type).themeColor
        } ,
        style: {
            borderRadius: 10,
            backgroundColor: '#fff',
            padding: 15,
            fontSize: 20,
            lineHeight: '24px',
            color: 'var(--text)',
        },
    })
}

export default notify;