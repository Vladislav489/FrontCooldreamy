import styles from './Step1.module.scss';
import { FC} from 'react';
import Input from '@/components/Input/Input';
import { Row, Col } from 'antd';
import SelectSex from '@/components/SelectSex/SelectSex';
import Link from 'next/link';
import {motion} from 'framer-motion';
import { useAppSelector } from '@/hooks/useTypesRedux';
import ApiService from '@/service/apiService';
import moment from 'moment';
import BirthdaySelect from '../../components/BirthdaySelect/BirthdaySelect';
import BirthdaySelectMob from '../../components/BirthdaySelectMob/BirthdaySelectMob';
import { useWindowSize } from 'usehooks-ts';

interface IStep1 {
    email: string,
    name: string,
    password: string,
    sex: 'male' | 'female',
    birthday: string,

    setEmail: (...args: any[]) => any,
    setName: (...args: any[]) => any,
    setPassword: (...args: any[]) => any,
    setSex: (sex: 'male' | 'female') => any,
    setBirthday: (...args: any[]) => any
    errors: {
        email: string[],
        password: string[],
        name: string[]
    }
}


const Step1:FC<IStep1> = ({
    name,
    email,
    password,
    sex,
    birthday,
    setEmail,
    setName,
    setPassword,
    setSex,
    setBirthday,
    errors
}) => {
    const {locale, token} = useAppSelector(s => s)
    const {width} = useWindowSize()

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
            <Col span={24}>
                <Row gutter={[30, 30]}>
                    <Col span={24}>
                        <Row gutter={[12,12]}>
                            <Col span={24}>
                                <Input
                                    value={name}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        if(e.target.value?.length <= 20) {
                                            setName(e.target.value)
                                        }
                                    }}
                                    placeholder={locale?.signupPage.steps.step_1.name}
                                    error={errors.name?.length === 1 ? errors.name[0] : false}
                                    type='text'
                                    />
                            </Col>
                            <Col span={24}>
                                <Input
                                    value={email}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                    placeholder='E-mail'
                                    type={'email'}
                                    error={errors.email?.length === 1 ? errors.email[0] : false}
                                    />
                            </Col>
                            <Col span={24}>
                                <Input
                                    value={password}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                    placeholder={locale?.signupPage.steps.step_1.password}
                                    type={'password'}
                                    error={errors.password?.length === 1 ? errors.password[0] : false}
                                    />
                            </Col>
                            {
                                
                            }
                            {/*<Col span={24}>*/}
                            {/*    {*/}
                            {/*        token && (*/}
                            {/*                width <= 768 ? (*/}
                            {/*                    <BirthdaySelectMob*/}
                            {/*                        minAge={18}*/}
                            {/*                        maxAge={70}*/}
                            {/*                        setValue={setBirthday}*/}
                            {/*                        value={birthday}*/}
                            {/*                        />*/}
                            {/*                ) : (*/}
                            {/*                    <BirthdaySelect*/}
                            {/*                        minAge={18}*/}
                            {/*                        maxAge={70}*/}
                            {/*                        setValue={setBirthday}*/}

                            {/*                        initYear={birthday && !Number.isNaN(moment(birthday).get('year')) ? moment(birthday).get('year') : undefined}*/}
                            {/*                        initMonth={birthday && !Number.isNaN(moment(birthday).get('month')) ? moment(birthday).get('month') + 1 : undefined}*/}
                            {/*                        initDay={birthday && !Number.isNaN(moment(birthday).get('D')) ? moment(birthday).get('D') : undefined}*/}
                            {/*                        />*/}
                            {/*                )*/}
                            {/*        )*/}
                            {/*    }*/}
                            {/*</Col>*/}
                            <Col span={24}>
                                {
                                    width <= 768 && (
                                    <BirthdaySelectMob
                                      minAge={18}
                                      maxAge={70}
                                      setValue={setBirthday}
                                      value={birthday}
                                    />
                                  )
                                }
                                {
                                    width > 768 && (
                                    <BirthdaySelect
                                      minAge={18}
                                      maxAge={70}
                                      setValue={setBirthday}

                                      initYear={birthday && !Number.isNaN(moment(birthday).get('year')) ? moment(birthday).get('year') : undefined}
                                      initMonth={birthday && !Number.isNaN(moment(birthday).get('month')) ? moment(birthday).get('month') + 1 : undefined}
                                      initDay={birthday && !Number.isNaN(moment(birthday).get('D')) ? moment(birthday).get('D') : undefined}
                                    />
                                  )
                                }
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24} style={{display: 'flex', justifyContent: 'center'}}>
                        <SelectSex
                            onSelect={(e) => setSex(e)}
                            value={sex}
                            />
                    </Col>
                    <Col span={24}>
                        <div className={styles.pr}>
                            {locale?.signupPage.steps.step_1.privacy.label} <Link href={'/'} target={'_blank'}>{locale?.signupPage.steps.step_1.privacy.link}</Link>
                        </div>
                    </Col>
                </Row>
            </Col>
            
        </motion.div>
    )
}

export default Step1;