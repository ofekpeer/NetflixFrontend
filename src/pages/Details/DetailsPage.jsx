import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import {getContent} from '../../utils';
import './DetailsPage.scss'

function DetailsPage() {
  const params = useParams();
  const { _id } = params;
  const navigate = useNavigate();
  const [content, setContent] = useState();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=/');
    }
  }, [user, navigate]);

  useEffect(() => {
      // const getContent = async () => {
      //   const data = await axios.get(`contents/${_id}`, {
      //     headers: { authorization: `Bearer ${user.token}` },
      //   });
      //   setContent(data);
      // };
      // getContent();

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

  }, [_id, user.token]);

  return (
    <div className="main">
      <Navbar />
      <div className="centered">
        <div className="details">
          <img
            className="picture"
            src={content ? content.imgVertical : ''}
            alt="img"
          />
          <div className="info">
            <h1>{content ? content.title : ''}</h1>
            <p>{content ? content.description : ''}</p>
            <p>
              Type: {content ? (content.isSeries ? 'Series' : 'Movie') : ''}
            </p>
            <p>Year: {content ? content.year : ''}</p>
            <p>Duration: {content ? content.duration : ''}</p>
            <p>Age restriction: {content ? content.limit : ''}+</p>
            <p>Genre: {content ? content.genre : ''}</p>
            <div className="buttons">
              <button
                className="play"
                onClick={() => navigate(`/watch/${content ? content._id : ''}`)}
              >
                <PlayArrowIcon />
                <span>Play</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
