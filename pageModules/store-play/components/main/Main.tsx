import styles from './Main.module.scss';
import { FC } from 'react'
import Head from '../head/Head';
import List from '../list/List';
import Image from 'next/image';
import Card from '../card/Card';

import {FiMoreVertical} from 'react-icons/fi';
import {IoMdArrowBack} from 'react-icons/io';
import {BiSearchAlt2} from 'react-icons/bi';

import avatar1 from '@/public/assets/images/store-avatar-1.png'
import avatar2 from '@/public/assets/images/store-avatar-2.png'
import avatar3 from '@/public/assets/images/store-avatar-3.png'
import avatar4 from '@/public/assets/images/store-avatar-4.jpeg';
import avatar5 from '@/public/assets/images/store-avatar-5.jpeg';


import item1 from '@/public/assets/images/store-list-1.webp';
import item2 from '@/public/assets/images/store-list-2.webp';
import item3 from '@/public/assets/images/store-list-3.webp';
import item4 from '@/public/assets/images/store-list-4.webp';
import item5 from '@/public/assets/images/store-list-5.webp';
import item6 from '@/public/assets/images/store-list-6.webp';
import item7 from '@/public/assets/images/store-list-7.webp';
import item8 from '@/public/assets/images/store-list-8.webp';
import item9 from '@/public/assets/images/store-list-9.webp';
import item10 from '@/public/assets/images/store-list-10.webp';
import item11 from '@/public/assets/images/store-list-11.png';
import item12 from '@/public/assets/images/store-list-12.png';
import item13 from '@/public/assets/images/store-list-13.png';
import item14 from '@/public/assets/images/store-list-14.png';
import item15 from '@/public/assets/images/store-list-15.png';
import item16 from '@/public/assets/images/store-list-16.png';
import item17 from '@/public/assets/images/store-list-17.png';
import { ListItem } from '../item/Item';

const firstList:ListItem[] = [
  {
    img: item1,
    name: 'dating & real love',
    size: 44
  },
  {
    img: item2,
    name: 'Once',
    size: 47
  },
  {
    img: item3,
    name: 'JAUMO',
    size: 35
  },
  {
    img: item4,
    name: 'Coffee Meets',
    size: 56
  },
  {
    img: item5,
    name: 'iFlirts',
    size: 49
  },
  {
    img: item6,
    name: 'Muzz',
    size: 52
  },
  {
    img: item7,
    name: 'Spotted',
    size: 45
  },
  {
    img: item8,
    name: 'LOVOO',
    size: 26
  },
  {
    img: item9,
    name: 'Amur',
    size: 37
  },
  {
    img: item10,
    name: 'Love one',
    size: 37
  }
  
]



const Main:FC<any> = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <div className={styles.part}>
          <div className={styles.item}>
            <IoMdArrowBack/>
          </div>
        </div>
        <div className={styles.part}>
          <div className={styles.item}>
            <BiSearchAlt2/>
          </div>
          <div className={styles.item}>
            <FiMoreVertical/>
          </div>
        </div>
      </div>
      <div className={styles.main}>
        <Card/>
      </div>
      <div className={styles.descr}>
        <div className={styles.head}>
          <Head>
            About this app
          </Head>
        </div>
        <div className={styles.text}>
          <p>
          🚀 Welcome to the world of CoolDreamy – your ultimate destination for connecting with compatible and like-minded individuals. Whether you&apos;re looking for love, meaningful conversations, lasting friendships, or simply to expand your social circle, CoolDreamy has got you covered!
          </p>
          <p>
          💖 Why CoolDreamy?
          </p>
          <p>
          🔥 Find Your Perfect Match: Join millions of singles and discover your ideal partner faster than ever before. We&apos;re dedicated to helping you find love or friendship with ease.
          </p>
          <p>
          🚀 More Than Just a Dating App: We&apos;re not just about swiping left or right. CoolDreamy is your trusted tour guide through the intricate landscape of someone else&apos;s heart and mind.
          </p>
          <p>
          🧠 Personality-Based Matching: We leverage cutting-edge personality psychology to connect you with people who truly resonate with your authentic self. Say goodbye to superficial connections and hello to genuine, soulful interactions.
          </p>
          <p>
          👫 Find Your Soulmate: Discover that special someone who makes your heart skip a beat. Our advanced matching algorithms ensure you&apos;re introduced to potential soulmates who truly understand, appreciate, and love you for who you are.
          </p>
          <p>
          🤝 Build Meaningful Friendships: It&apos;s not just about romance; CoolDreamy is a platform for forming lasting friendships too. Connect with individuals who share your interests, values, and dreams.
          </p>
          <p>
          🌟 Key Features:
          </p>
          <ul>
            <li>
            Personalized Matches: Our intelligent matchmaking system suggests profiles that align with your personality and preferences.
            </li>
            <li>
            Engaging Chat: Start conversations that matter and make a real connection with our user-friendly chat interface.
            </li>
            <li>
            Secure and Safe: Your privacy and security are our top priorities. Rest easy knowing your data is protected.
            </li>
          </ul>
          <p>
          ✨ CoolDreamy is more than just a dating app; it&apos;s a gateway to a world of meaningful connections and unforgettable experiences. Join our vibrant community today and let the journey to finding your soulmate or your new best friend begin! 🌈
          </p>
          <p>
          Get ready for a life-changing experience. Download CoolDreamy now and discover your path to love and friendship! 💑👫
          </p>
        </div>
        <div className={styles.badges}>
          <div className={styles.item}>#1 top win apps</div>
        </div>
      </div>
      <div className={styles.revs}>
        <div className={styles.head}>
          <Head>
          Ratings and reviews
          </Head>
        </div>
        <div className={styles.rating}>
          <div className={styles.main}>
            <div className={styles.value}>4.7</div>
            <div className={styles.stars}></div>
            <div className={styles.count}>364 577</div>
          </div>
          <div className={styles.body}>
            <div className={styles.item}>
              <div className={styles.num}>5</div>
              <div className={styles.line}>
                <div className={styles.fill} style={{width: '55%'}}></div>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.num}>4</div>
              <div className={styles.line}>
                <div className={styles.fill} style={{width: '25%'}}></div>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.num}>3</div>
              <div className={styles.line}>
                <div className={styles.fill} style={{width: '20%'}}></div>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.num}>2</div>
              <div className={styles.line}>
                <div className={styles.fill} style={{width: '5%'}}></div>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.num}>1</div>
              <div className={styles.line}>
                <div className={styles.fill} style={{width: '10%'}}></div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.rev_list}>
          <div className={styles.item}>
            <div className={styles.head}>
              <div className={styles.user}>
                <div className={styles.avatar}>
                  <Image
                    src={avatar1}
                    placeholder='blur'
                    alt=''
                    />
                </div>
                <div className={styles.name}>John Smith</div>
              </div>
              <div className={styles.list_icon}><FiMoreVertical/></div>
            </div>
            <div className={styles.info}>
              <div className={styles.rating}></div>
              <div className={styles.date}>23.09.23</div>
            </div>
            <div className={styles.text}>
            Real people here, no catfish!
            </div>
            <div className={styles.ex}>
              <div className={styles.label}>Did you find this helpful?</div>
              <div className={styles.action}>
                <div className={styles.action_item}>Yes</div>
                <div className={styles.action_item}>No</div>
              </div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.head}>
              <div className={styles.user}>
                <div className={styles.avatar}>
                  <Image
                    src={avatar2}
                    placeholder='blur'
                    alt=''
                    />
                </div>
                <div className={styles.name}>Michael Johnson</div>
              </div>
              <div className={styles.list_icon}><FiMoreVertical/></div>
            </div>
            <div className={styles.info}>
              <div className={styles.rating}></div>
              <div className={styles.date}>23.09.23</div>
            </div>
            <div className={styles.text}>
            This app ain&apos;t no letdown, found exactly what I was looking for.
            </div>
            <div className={styles.ex}>
              <div className={styles.label}>Did you find this helpful?</div>
              <div className={styles.action}>
                <div className={styles.action_item}>Yes</div>
                <div className={styles.action_item}>No</div>
              </div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.head}>
              <div className={styles.user}>
                <div className={styles.avatar}>
                  <Image
                    src={avatar3}
                    placeholder='blur'
                    alt=''
                    />
                </div>
                <div className={styles.name}>David Williams</div>
              </div>
              <div className={styles.list_icon}><FiMoreVertical/></div>
            </div>
            <div className={styles.info}>
              <div className={styles.rating}></div>
              <div className={styles.date}>23.09.23</div>
            </div>
            <div className={styles.text}>
            Finally, some real connections, man!
            </div>
            <div className={styles.ex}>
              <div className={styles.label}>Did you find this helpful?</div>
              <div className={styles.action}>
                <div className={styles.action_item}>Yes</div>
                <div className={styles.action_item}>No</div>
              </div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.head}>
              <div className={styles.user}>
                <div className={styles.avatar}>
                  <Image
                    src={avatar4}
                    placeholder='blur'
                    alt=''
                    />
                </div>
                <div className={styles.name}>Robert Brown</div>
              </div>
              <div className={styles.list_icon}><FiMoreVertical/></div>
            </div>
            <div className={styles.info}>
              <div className={styles.rating}></div>
              <div className={styles.date}>23.09.23</div>
            </div>
            <div className={styles.text}>
            No scamming on this site, found some legit meetups!
            </div>
            <div className={styles.ex}>
              <div className={styles.label}>Did you find this helpful?</div>
              <div className={styles.action}>
                <div className={styles.action_item}>Yes</div>
                <div className={styles.action_item}>No</div>
              </div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.head}>
              <div className={styles.user}>
                <div className={styles.avatar}>
                  <Image
                    src={avatar5}
                    placeholder='blur'
                    alt=''
                    />
                </div>
                <div className={styles.name}>James Davis</div>
              </div>
              <div className={styles.list_icon}><FiMoreVertical/></div>
            </div>
            <div className={styles.info}>
              <div className={styles.rating}></div>
              <div className={styles.date}>23.09.23</div>
            </div>
            <div className={styles.text}>
            I ain&apos;t mad about spending time here. Real meetups happening!
            </div>
            <div className={styles.ex}>
              <div className={styles.label}>Did you find this helpful?</div>
              <div className={styles.action}>
                <div className={styles.action_item}>Yes</div>
                <div className={styles.action_item}>No</div>
              </div>
            </div>
          </div>
          <div className={styles.action}>
            <div className={styles.action_item}>
              App support
            </div>
          </div>
        </div>
      </div>
      <div className={styles.list}>
        <div className={styles.part}>
          <List
            head={'Similar apps'}
            list={firstList}
            />
        </div>
        {/* <div className={styles.part}>
          <List
            head={'Werbeanzeigen'}
            list={secondList}
            />
        </div> */}
      </div>
      <div className={styles.ex}>
        <div className={styles.icon}></div> 
        <div className={styles.label}>Play Store Refund Policy</div>
      </div>
    </div>
  )
}

export default Main;