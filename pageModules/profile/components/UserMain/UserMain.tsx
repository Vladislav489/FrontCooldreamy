import styles from './UserMain.module.scss';
import { Row, Col } from 'antd';
import {RiPencilLine} from 'react-icons/ri';
import Badge from '@/components/Badge/Badge';
import { IUser } from '@/models/IUser';
import {FC, useEffect, useState} from 'react'
import ApiService from '@/service/apiService';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypesRedux';
import EditModalPl from '../../modals/EditModals/EditModalPl/EditModalPl';
import EditModalText from '../../modals/EditModals/EditModalText/EditModalText';
import EditModalRegion from '../../modals/EditModals/EditModalRegion/EditModalRegion';
import { useRouter } from 'next/router';
import setIconsSg from '@/helpers/setIconsSg';
const service = new ApiService()

export type editItemT = 'career' | 'finance' | 'rl' | 'target' | 'kids' | 'name' | 'email' | 'about' | 'country' | 'interest'


const UserMain:FC<IUser> = (props) => {
    const {
        about_self,
        name,
        email,
        country,
        state,
        
        prompt_careers,
        prompt_relationships,
        prompt_finance_states,
        prompt_targets,
        prompt_want_kids,
        prompt_interests,
        is_email_verified
    } = props
    
    const router = useRouter()
    const {token, userData, locale} = useAppSelector(s => s)
    const dispatch = useAppDispatch()
    const [editItemType, setEditItemType] = useState<editItemT | ''>('')

    const [promptModal, setPromptModal] = useState(false)
    const [textModal, setTextModal] = useState(false)
    const [regionModal, setRegionModal] = useState(false)

    const [modalHead, setModalHead] = useState('')

    const [prompt_targets_list, setPrompt_targets_list] = useState<any[]>([])
    const [prompt_finance_states_list, setPrompt_finance_states_list] = useState<any[]>([])
    const [prompt_sources_list, setPrompt_sources_list] = useState<any[]>([])
    const [prompt_want_kids_list, setPrompt_want_kids_list] = useState<any[]>([])
    const [prompt_relationships_list, setPrompt_relationships_list] = useState<any[]>([])
    const [prompt_careers_list, setPrompt_careers_list] = useState<any[]>([])   
    const [prompt_interests_list, setPrompt_interests_list] = useState<any[]>([])





    useEffect(() => {
        if(router?.locale && token) {
            service.getAllPrompts(token, router.locale).then(res => {
                setPrompt_targets_list(res?.prompt_targets?.map((i: any) => ({...i, icon: setIconsSg('targets', i?.id)})))
                setPrompt_careers_list(res?.prompt_careers?.map((i: any) => ({...i, icon: setIconsSg('careers', i?.id)})))
                setPrompt_finance_states_list(res?.prompt_finance_states?.map((i:any) => ({...i, icon: setIconsSg('finance_states', i?.id)})))
                setPrompt_sources_list(res?.prompt_sources?.map((i: any) => ({...i, icon: setIconsSg('sources', i?.id)})))
                setPrompt_interests_list(res?.prompt_interests?.map((i:any) => ({...i, icon: setIconsSg('intersets', i?.id)})))
                setPrompt_want_kids_list(res?.prompt_want_kids?.map((i:any) => ({...i, icon: setIconsSg('want_kids', i?.id)})))
                setPrompt_relationships_list(res?.prompt_relationships?.map((i:any) => ({...i, icon: setIconsSg('rl', i?.id)})))

                console.log(res?.prompt_relationships)
                // setPrompt_targets_list(res?.prompt_targets)
                // setPrompt_careers_list(res?.prompt_careers)
                // setPrompt_finance_states_list(res?.prompt_finance_states)
                // setPrompt_sources_list(res?.prompt_sources)
                // setPrompt_interests_list(res?.prompt_interests)
                // setPrompt_want_kids_list(res?.prompt_want_kids)
                // setPrompt_relationships_list(res?.prompt_relationships)
            })
        }
    }, [token, router])


    const closeEditModal = () => {
        setEditItemType('')
        setModalHead('')
        setPromptModal(false)
        setTextModal(false)
        setRegionModal(false)
    }


    const switchHead = (type: editItemT | '') => {
        switch(type) {
            case 'name':
                return 'Edit name'
            case 'email':
                return 'Edit e-mail'
            case 'about':
                return 'Tell me about yourself'
            case 'finance':
                return 'Financial preferences'
            case 'career':
                return 'Career'
            case 'kids':
                return 'Children'
            case 'rl':
                return 'Marital status'
            case 'target':
                return 'Dating goals'
            case 'country':
                return 'Country/State'
            case 'interest':
                return 'Interests'
            default:
                return 'Edit'
        }
    }

    

    const switchPlList = (type: editItemT | '') => {
        switch(type) {
            
            case 'finance':
                return {
                    list: prompt_finance_states_list,
                    maxSelect: 1
                }
            case 'target':
                return {
                    list: prompt_targets_list,
                    maxSelect: 3
                }
            case 'interest':
                return {
                    list: prompt_interests_list,
                    maxSelect: 5
                }
            case 'career':
                return {
                    list: prompt_careers_list,
                    maxSelect: 1
                }
            case 'rl':
                return {
                    list: prompt_relationships_list,
                    maxSelect: 1
                }
            case 'kids':
                return {
                    list: prompt_want_kids_list,
                    maxSelect: 1
                }
            default:
                return {
                    list: [],
                    maxSelect: 1
                }
        }
    }


    const switchInitValue = (type: editItemT | '') => {
        switch(type) {
            case 'about':
                return about_self
            case 'name':
                return name
            case 'email':
                return email
            case 'career':
                return prompt_careers
            case 'finance':
                return prompt_finance_states
            case 'kids':
                return prompt_want_kids
            case 'rl':
                return prompt_relationships
            case 'target':
                return prompt_targets
            case 'interest':
                return prompt_interests
            default:
                return ''
        }
    }


    const setModalProps = (type: editItemT) => {
        setModalHead(switchHead(type))
        setEditItemType(type)

    }

    const openModal = (modalType: 'prompt' | 'text' | 'region') => {
        if(modalType === 'text') {
            setTextModal(true)
        }
        if(modalType === 'prompt'){
            setPromptModal(true)
        }
        if(modalType === 'region') {
            setRegionModal(true)
        }
    }

    
    

    return (
        <div className={styles.wrapper}>

            <EditModalPl 
                promptList={switchPlList(editItemType).list}
                head={modalHead} 
                editItemType={editItemType}
                open={promptModal}
                onCancel={closeEditModal}
                maxSelect={switchPlList(editItemType).maxSelect}
                activeIds={typeof switchInitValue(editItemType) === 'object' ? switchInitValue(editItemType) : []}
                />

            <EditModalText
                textValue={typeof switchInitValue(editItemType) === 'string' ? switchInitValue(editItemType) : null}
                head={modalHead}
                editItemType={editItemType}
                open={textModal}
                onCancel={closeEditModal}
                />

            <EditModalRegion
                head={modalHead}
                editItemType={editItemType}
                open={regionModal}
                onCancel={closeEditModal}
                stateInit={state}
                countryInit={country}
                />

            <Row gutter={[10,10]}>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                            {locale?.profilePage.info.name}
                            <button
                                onClick={() => {
                                    setModalProps('name')
                                    openModal('text')
                                }}
                                >
                                <RiPencilLine/>
                            </button>
                        </div>
                        <div className={styles.text} style={{color: name ? 'var(--text)' : 'var(--red)'}}>
                            {name ? name : locale?.global?.placeholders?.nd}
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                            E-mail
                            <button
                                onClick={() => {
                                    setModalProps('email')
                                    openModal('text')
                                }}
                                >
                                <RiPencilLine/>
                            </button>
                            {
                                is_email_verified === 1 && <span className={styles.confirmed}>confirmed</span>
                            }
                        </div>
                        <div className={styles.text} style={{color: email ? 'var(--text)' : 'var(--red)'}}>
                            {email ? email : locale?.global?.placeholders?.nd}
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                        {locale?.profilePage.info.about}    
                            <button
                                onClick={() => {
                                    setModalProps('about')
                                    openModal('text')
                                }}
                                >
                                <RiPencilLine/>
                            </button>
                        </div>
                        <div className={styles.text} style={{color: about_self ? 'var(--text)' : 'var(--red)'}}>
                            {about_self ? about_self : locale?.global?.placeholders?.nd}
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                            {locale?.profilePage.info.country}
                            <button
                                onClick={() => {
                                    setModalProps('country')
                                    openModal('region')
                                }}
                                >
                                <RiPencilLine/>
                            </button>
                        </div>
                        <div className={styles.text} style={{color: about_self ? 'var(--text)' : 'var(--red)'}}>
                            
                            {
                                country && country
                            }
                            {
                                state && `/${state}`
                            }
                            {
                                (!country && !state) && locale?.global?.placeholders?.nd
                            }
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                        Interests
                            <button
                                onClick={() => {
                                    setModalProps('interest')
                                    openModal('prompt')
                                }}
                                ><RiPencilLine/></button>
                        </div>
                        <div className={styles.interests}>
                            {
                                prompt_interests?.length > 0 ? (
                                    prompt_interests?.map((item: any,index: number) => (
                                        <div className={styles.item} key={index}>
                                            <Badge size={30} style={{background: 'var(--violet)'}} icon={item?.icon}/>
                                            {item.text}
                                        </div>
                                    ))
                                ) : (
                                    <div className={styles.text} style={{color: 'var(--red)', marginLeft: 5}}>
                                        {locale?.global?.placeholders?.nd}
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                        {locale?.profilePage.info.target}
                            <button
                                onClick={() => {
                                    setModalProps('target')
                                    openModal('prompt')
                                }}
                                >
                                <RiPencilLine/>
                            </button>
                        </div>
                        <div className={styles.interests}>
                            {
                                prompt_targets?.length > 0 ? (
                                    prompt_targets?.map((item: any,index: number) => (
                                        <div className={styles.item} key={index}>
                                            <Badge size={30} style={{background: 'var(--violet)'}} icon={item?.icon}/>
                                            {item.text}
                                        </div>
                                    ))
                                ) : (
                                    <div className={styles.text} style={{color: 'var(--red)', marginLeft: 5}}>
                                        {locale?.global?.placeholders?.nd}
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                        {locale?.profilePage.info.finance}
                            <button
                                onClick={() => {
                                    setModalProps('finance')
                                    openModal('prompt')
                                }}
                                ><RiPencilLine/></button>
                        </div>
                        <div className={styles.interests}>
                            {
                                prompt_finance_states?.length > 0 ? (
                                    prompt_finance_states?.map((item: any,index: number) => (
                                        <div className={styles.item} key={index}>
                                            <Badge size={30} style={{background: 'var(--violet)'}} icon={item?.icon}/>
                                            {item.text}
                                        </div>
                                    ))
                                ) : (
                                    <div className={styles.text} style={{color: 'var(--red)', marginLeft: 5}}>
                                        {locale?.global?.placeholders?.nd}
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                        {locale?.profilePage.info.career}
                            <button
                                onClick={() => {
                                    setModalProps('career')
                                    openModal('prompt')
                                }}
                                ><RiPencilLine/></button>
                        </div>
                        <div className={styles.interests}>
                            {
                                prompt_careers?.length > 0 ? (
                                    prompt_careers?.map((item: any,index: number) => (
                                        <div className={styles.item} key={index}>
                                            <Badge size={30} style={{background: 'var(--violet)'}} icon={item?.icon}/>
                                            {item.text}
                                        </div>
                                    ))
                                ) : (
                                    <div className={styles.text} style={{color: 'var(--red)', marginLeft: 5}}>
                                        {locale?.global?.placeholders?.nd}
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                        {locale?.profilePage.info.relationship}
                            <button
                                onClick={() => {
                                    setModalProps('rl')
                                    openModal('prompt')
                                }}
                                ><RiPencilLine/></button>
                        </div>
                        <div className={styles.interests}>
                            {
                                prompt_relationships?.length > 0 ? (
                                    prompt_relationships?.map((item: any,index: number) => (
                                        <div className={styles.item} key={index}>
                                            <Badge size={30} style={{background: 'var(--violet)'}} icon={item?.icon}/>
                                            {item.text}
                                        </div>
                                    ))
                                ) : (
                                    <div className={styles.text} style={{color: 'var(--red)', marginLeft: 5}}>
                                        {locale?.global?.placeholders?.nd}
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                        {locale?.profilePage.info.kids}
                            <button
                                onClick={() => {
                                    setModalProps('kids')
                                    openModal('prompt')
                                }}
                                ><RiPencilLine/></button>
                        </div>
                        <div className={styles.interests}>
                            {
                                prompt_want_kids?.length > 0 ? (
                                    prompt_want_kids?.map((item: any,index: number) => (
                                        <div className={styles.item} key={index}>
                                            <Badge size={30} style={{background: 'var(--violet)'}} icon={item?.icon}/>
                                            {item.text}
                                        </div>
                                    ))
                                ) : (
                                    <div className={styles.text} style={{color: 'var(--red)', marginLeft: 5}}>
                                        {locale?.global?.placeholders?.nd}
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </Col>

            </Row>
        </div>
    )
}

export default UserMain;