import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import axios from 'axios';
import './Featured.scss';
import { AuthContext } from '../../auth/authContext';
import Loaging from '../Loading/Loaging';

function Featured({ type }) {
  const [randomContent, setRandomContent] = useState({});
  const [isFatching, setIsFatching] = useState(true);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    let response;
    const getContent = async () => {
      try {
        if (type === 'Movies') {
          response = await axios.get('contents/movies', {
            headers: { authorization: `Bearer ${user.token}` },
          });
        } else if (type === 'Series') {
          response = await axios.get('contents/series', {
            headers: { authorization: `Bearer ${user.token}` },
          });
        } else {
          response = await axios.get('contents/', {
            headers: { authorization: `Bearer ${user.token}` },
          });
        }
      } catch (err) {
        console.log(err);
      }
    };

    getContent();
    let index = 0;
    const interval = setInterval(() => {
      setRandomContent(response.data[index]);
      setIsFatching(false);
      console.log(index);
      if (index < response.data.length - 1) index++;
      else index = 0;
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, [type, user.token]);

  return (
    <div>
      <div className="featured">
        {type && (
          <div className="category">
            <span>{type === 'Movies' ? 'Movies' : 'Series'}</span>
          </div>
        )}
        {isFatching ? (
          <Loaging loading="loading images..."></Loaging>
        ) : (
          <>
            <img
              loading="eager"
              src={randomContent.img}
              alt={randomContent.title}
            />
          </>
        )}
        <div className="info">
          <img
            loading="eager"
            src={randomContent.imgTitle}
            alt={randomContent.title}
          />
          <span className="desc">{randomContent.description}</span>
          <div className="buttons">
            <button
              className="play"
              onClick={() => {
                navigate(`/watch/${randomContent._id}`);
                console.log(randomContent._id);
              }}
            >
              <PlayArrowIcon />
              <span>Play</span>
            </button>
            <button
              className="more"
              onClick={() => navigate(`/details/${randomContent._id}`)}
            >
              <InfoOutlinedIcon />
              <span>Info</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Featured;
