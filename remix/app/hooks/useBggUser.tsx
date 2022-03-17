import { useState, useEffect } from 'react'
import { useParams } from 'remix'
import { getUserInfo } from '~/services/bggService';
import { UserInfo } from '~/models/bgg/userInfo';


export function useBggUser() {
    const { username } = useParams();
    const [user, setUser] = useState<UserInfo>();

    const handleUserName = async (username: string) => {
        const userInfo = await getUserInfo(username)
        console.log('userInfo', userInfo)
        setUser(userInfo)
    }

    useEffect(() => {
        if(username) {  
            handleUserName(username)
            } else {
                setUser(null)
            }
    }, [username])

    return user;

}
  