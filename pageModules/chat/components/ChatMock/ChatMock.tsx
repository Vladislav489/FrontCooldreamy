import styles from './ChatMock.module.scss';
import {Row, Col} from 'antd';
import Button from '@/components/Button/Button';
import Radio from '@/components/Radio/Radio';
import {useState, useEffect} from 'react';
import { useWindowSize } from 'usehooks-ts'; 


const mockList = [
    {
        id: 'mock1',
        value: '1',
        text: "Hello, let's meet?"
    },
    {
        id: 'mock2',
        value: '2',
        text: 'What relationship are you looking for on this site?'
    },
    {
        id: 'mock3',
        value: '3',
        text: 'Hey, have you been told that you are simply stunning?'
    },
    {
        id: 'mock4',
        value: '4',
        text: 'Hello! Great photos!'
    },
    {
        id: 'mock5',
        value: '5',
        text: 'You have great looks. I am amazed...'
    },
]


const ChatMock = ({
    onClose,
    onSend
}: {
    onClose: (e: any) => void,
    onSend: (text: string) => void
}) => {
    const {width} = useWindowSize()
    const [selectValue, setSelectValue] = useState('') 

    return (
        <div className={styles.wrapper}>
            <div className={styles.body}>
                <h3 className={styles.title}>Send Message</h3>
                <div className={styles.main}>
                    {
                        mockList?.map((item,index) => (
                            <div className={styles.item} key={index}>
                                <Radio
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        if(e.target.checked) {
                                            setSelectValue(item.text)
                                        }
                                    }}
                                    id={item.id}
                                    name='mock'
                                    value={item.value}
                                    text={item.text}
                                    />
                            </div>
                        ))
                    }
                   
                </div>
                <div className={styles.action}>
                    <Row gutter={[10,10]}>
                        <Col span={12}>
                            <Button
                                disabled={!selectValue}
                                text='Send'
                                middle={width <= 768}
                                onClick={() => onSend(selectValue)}
                                />
                        </Col>
                        <Col span={12}>
                            <Button
                                variant={'bordered'}
                                text='Back'
                                middle={width <= 768}
                                onClick={onClose}
                                />
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}


export default ChatMock;