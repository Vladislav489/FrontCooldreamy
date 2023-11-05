import styles from './UserImages.module.scss';
import UserImageItem from '../UserImageItem/UserImageItem';
import {BsCamera} from 'react-icons/bs';
import {FC, useEffect, useState, useRef} from 'react';
import ImageCropModal from '../../modals/ImageCropModal/ImageCropModal';
import { createFile } from '@/helpers/cropImage';
import FancyboxWrapper from '@/components/FancyboxWrapper/FancyboxWrapper';
import { IUser } from '@/models/IUser';
import { useAppSelector } from '@/hooks/useTypesRedux';
import ApiService from '@/service/apiService';
import PromptModal from '@/popups/PromptModal/PromptModal';
import IconButton from '@/components/IconButton/IconButton';
import { BsTrash } from 'react-icons/bs';
import notify from '@/helpers/notify';

const service = new ApiService;
const UserImages:FC<IUser> = ({
    profile_photo
}) => {
    const {locale, token, userData} = useAppSelector(s => s)
    const [deleteModal, setDeleteModal] = useState(false)
    const [imageCropModal, setImageCropModal] = useState(false)
    const ref = useRef<HTMLInputElement>(null)
    const [imgToDelete, setImgToDelete] = useState<string | number | null>(null)
    const [uploadedFile, setUploadedFile] = useState<File | null>(null)

    const [photoList, setPhotoList] = useState<any[]>([])
    
    useEffect(() => {
        if(profile_photo && profile_photo?.length > 0) {
            setPhotoList(profile_photo)
        }
    }, [profile_photo])

    const closeCropModal = () => {
        setUploadedFile(null)
        setImageCropModal(false)
    }

    const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files !== null ) {
            setUploadedFile(e.target.files[0])
        }
    }

    useEffect(() => {
        if(uploadedFile) {
            setImageCropModal(true)
        }
    }, [uploadedFile])

    

    const onUpload = (image: any) => {
        if(image) {
            const data = new FormData()
            createFile(image).then(res => {
                data.append('category_id', '2')
                data.append('image', res)
            })
        }
    }


    const onDeleteImage = () => {  
        if(imgToDelete && token && userData?.id) {
            service.deleteProfileImage({
                token,
                body: {
                    user_id: userData?.id,
                    image_id: imgToDelete
                }
            }).then(res => {
                if(res === 200) {
                    notify('Image is deleted', 'SUCCESS')
                    setPhotoList(s => s.filter(i => i?.id !== imgToDelete))
                } else {
                    notify(locale?.global?.notifications?.error_default, 'ERROR')
                }
            }).finally(() => {
                setImgToDelete(null)
                setDeleteModal(false)
            })
        }
    }



    return (
        <FancyboxWrapper>
            <PromptModal
                text='Do you really want to delete the picture?'
                open={deleteModal}
                onAccept={onDeleteImage}
                onCancel={() => {
                    setDeleteModal(false)
                    setImgToDelete(null)
                }}
                onReject={() => {
                    setDeleteModal(false)
                    setImgToDelete(null)
                }}
                />
            <div className={`${styles.wrapper} horizontal-scroll`}>
                <ImageCropModal
                    uploadedFile={uploadedFile}
                    open={imageCropModal}
                    onClose={closeCropModal}
                    onSave={onUpload}
                    />
                <div
                    className={styles.add}>
                    <input value={''} ref={ref} id='upload-photo' type="file" accept='.png, .jpg, .jpeg' onChange={uploadFile}/>
                    <label htmlFor='upload-photo' className={styles.label}>
                        <div className={styles.icon}><BsCamera/></div>
                        <div className={styles.text}>{locale?.profilePage.images.add_btn}</div>
                    </label>
                </div>
                {
                    photoList?.map((item, index) => (
                        <div key={index} className={styles.pic}>
                             <div className={styles.action}>
                                <IconButton
                                    onClick={() => {
                                        setImgToDelete(item?.id)
                                        setDeleteModal(true)
                                    }}
                                    variant={'danger'}
                                    icon={<BsTrash fontSize={15}/>}
                                    size={30}
                                    />
                            </div>
                            <a data-fancybox="gallery" href={item.image_url} className={styles.item}>
                                <UserImageItem
                                    image={item?.image_url}
                                />
                            </a>
                        </div>
                        
                    ))
                }
            </div>
        </FancyboxWrapper>
    )
}

export default UserImages;