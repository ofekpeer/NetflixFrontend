import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';import AddIcon from '@mui/icons-material/Add';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import './ListItem.scss';
import { AuthContext } from '../../auth/authContext';
import { addContent } from '../../auth/authApiCalls';

function ListItem({ item }) {
  const [isHovered, setIsHovered] = useState(false);
  const { user, dispatch, error, userContentList } = useContext(AuthContext);
  const [exist, setExist] = useState(false);
  useEffect(() => {
    const exsitItem = userContentList.content.find((i) => i._id === item._id);
    if (exsitItem) setExist(true);
  }, [item._id, userContentList]);

  const addToList = async (e) => {
    e.preventDefault();
    if (userContentList) {
      const exsitItem = userContentList.content.find((i) => i._id === item._id);
      if (!exsitItem) {
        try {
          await addContent(item, user, dispatch);
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  return (
    <Link to={{ pathname: `/details/${item._id}` }} className="link">
      <div
        className="listItem"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={item?.imgThumb} alt="" />
        {isHovered && (
          <div>
            <ReactPlayer
              className="video"
              pip
              height="50%"
              width="100%"
              url={item.trailer}
              playing={true}
            ></ReactPlayer>
            <div className="itemInfo">
              <div className="icons">
                <PlayArrowIcon className="icon link" />
                {exist ? (
                  <PlaylistAddCheckIcon className="icon"></PlaylistAddCheckIcon>
                ) : (
                  <AddIcon className="icon" onClick={(e) => addToList(e)} />
                )}
                <ThumbUpOutlinedIcon className="icon" />
                <ThumbDownOffAltOutlinedIcon className="icon" />
              </div>
              <div className="itemInfoTop">
                <span>{item.duration}</span>
                <span className="limit">+{item.limit}</span>
                <span>{item.year}</span>
              </div>
              <div className="desc">{item.desc}</div>
              <div className="genre">{item.genre}</div>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}

export default ListItem;
