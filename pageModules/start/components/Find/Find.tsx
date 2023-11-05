import styles from './Find.module.scss';
import Container from '@/components/Container/Container';
import { FC } from 'react'
import img from '@/public/assets/images/start-find-img.png';
import Image from 'next/image';
import Button from '@/components/Button/Button';
import goToTop from '@/helpers/goToTop';
import { useWindowSize } from 'usehooks-ts';
import imgmob1 from '@/public/assets/images/start-find-mob-1.png'
import imgmob2 from '@/public/assets/images/start-find-mob-2.png'
import getClassNames from '@/helpers/getClassNames';

const Find:FC<any> = () => {
  const {width} = useWindowSize()
  
  return (
    <div className={styles.wrapper}>
      <Container>
        <div className={styles.in}>
          <h2 className={getClassNames([styles.title, 'block-title'])}>Find the right match now!</h2>
          
          <div className={styles.body}>
            <Image
              src={img}
              alt=''
              />
          </div>
          <div className={styles.mob}>
            <div className={styles.part}>
              <Image
                src={imgmob1}
                alt=''
                />
            </div>
            <div className={styles.part}>
              <Image
                src={imgmob2}
                alt=''
                />
            </div>
          </div>
          <div className={styles.action}>
            <Button
              text='Sign up'
              onClick={goToTop}
              middle={width <= 768}
              />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Find;