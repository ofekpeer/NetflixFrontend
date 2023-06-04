import React, { useContext, useState, useEffect } from 'react'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
import { AuthContext } from '../../auth/authContext'
import "./WatchPage.scss"
import {getContent} from '../../utils'

function WatchPage () {
  const params = useParams()
  const { _id } = params
  const navigate = useNavigate()
  const [content, setContent] = useState()
  const { user } = useContext(AuthContext)

  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=/')
    }
  }, [user, navigate])
  useEffect(() => {
    async function GetContent () {
      try {
        const wapper = async () => {
          try{
            const res = await getContent(_id, user.token)
            setContent(res);
          }
          catch(err){
            console.log(err)
          }
        }
  
        wapper();
      } catch (err) {
        console.log(err)
      }
    }

    GetContent();
  }, [_id, navigate, user.token])
  
  return (
    <div className='watch'>
      <Link className='back' to='/'>
        <ArrowBackIosNewOutlinedIcon />
        home
      </Link>
      <ReactPlayer
        controls={true}
        className='video'
        height='100%'
        width='100%'
        url={content ? content.movie : ''}
        playing={true}
      ></ReactPlayer>
    </div>
  )
}

export default WatchPage
