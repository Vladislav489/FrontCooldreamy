import { FC, useState, useEffect } from 'react';
import styles from './Step9.module.scss';
import {motion} from 'framer-motion';
import placeholder from '@/public/assets/images/signup-avatar-placeholder.svg';
import Image from 'next/image';
import { useAppSelector } from '@/hooks/useTypesRedux';
import ImageCropModal from '@/pageModules/profile/modals/ImageCropModal/ImageCropModal';


interface I {
    nextStep: (...args: any[]) => any,
    img: any,
    setImg: (...args:any[]) => any
}

const Step9:FC<I> = ({
    nextStep,
    img,
    setImg
}) => {
    const {locale} = useAppSelector(s => s)
    const [file, setFile] = useState<File | null>(null)
    const [editModal, setEditModal] = useState(false)

    useEffect(() => {
        if(file) {
            setEditModal(true)
        }
    }, [file])

    const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files !== null ) {
            setFile(e.target.files[0])
        }
    }

    return (
        <motion.div 
            initial={{
                y: '20px',
                scale: 0.8,
                opacity: 0
            }}
            animate={{
                y: 0,
                scale: 1,
                opacity: 1
            }}
            transition={{type: 'spring', stiffness: 400, damping: 17 }}
            className={styles.wrapper}>

            <ImageCropModal
                open={editModal}
                onClose={() => {
                    setEditModal(false)
                    setFile(null)
                }}
                uploadedFile={file}
                onAfterUpload={nextStep}
                initCategory={1}

                isGetBase64={true}
                getConvertedFile={setImg}
                />
            
            <div className={styles.head}>
                <h2 className={styles.title}>{locale?.signupPage.steps.step_9.title}</h2>
                <div className={styles.subtitle}>{locale?.signupPage.steps.step_9.text}</div>
            </div>
            <div className={styles.body}>
                <div className={styles.place}>
                    <input
                        onChange={uploadFile}
                        id='signup-avatar' 
                        type="file" 
                        value={''}
                        accept='.png, .jpg, .jpeg'/>
                    <motion.label 
                        transition={{type: 'spring', stiffness: 400, damping: 17}}
                        whileTap={{scale: 0.9}}
                        className={styles.upload} htmlFor="signup-avatar">
                        <Image
                            src={img || placeholder}
                            alt=''
                            width={186}
                            height={186}
                            />
                    </motion.label>
                </div>
            </div>
            
        </motion.div>
    )
}

export default Step9;