import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext';

const Loading = () => {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {fetchUser, user, axios, token} = useAppContext()
  const [attempts, setAttempts] = useState(0)
  const [initialCredits] = useState(user?.credits || 0)
  const sessionId = searchParams.get('session_id')

    useEffect(()=>{
      const verifyAndFetch = async () => {
        if(sessionId && attempts === 0){
          try {
            await axios.post('/api/credit/verify', {sessionId}, {headers: {Authorization: token}})
          } catch (error) {
            console.error('Verification error:', error)
          }
        }
        await fetchUser()
        setAttempts(prev => prev + 1)
      }

      verifyAndFetch()
      const interval = setInterval(verifyAndFetch, 3000)
      const timeout = setTimeout(()=>{
        clearInterval(interval)
        navigate('/')
      }, 45000)

      return () => {
        clearInterval(interval)
        clearTimeout(timeout)
      }
    },[])

    useEffect(()=>{
      if(user && user.credits > initialCredits && attempts > 0){
        navigate('/')
      }
    },[user, attempts])

  return (
    <div className='bg-gradient-to-b from-[#531B81] to-[#29184B]
      backdrop-opacity-60 flex items-center justify-center h-screen w-screen
        text-white text-2xl'>
        <div className='w-10 h-10 rounded-full border-3 border-white
         border-t-transparent animate-spin'>
        </div>
    </div>
  )
}

export default Loading
