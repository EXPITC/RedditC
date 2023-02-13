import { Flex } from "@chakra-ui/react"
import Image from 'next/image'
import styles from '@/styles/Logo.module.css'


const Logo = () => (
  <Flex align="center" minWidth="fit-content">
    <Image src="/images/redditFace.svg" alt="redditFace" height={32} width={32} priority />
    <Image src="/images/redditText.svg" alt="redditText" height={43} width={73} className={styles.logoText} priority />
  </Flex>
)


export default Logo
