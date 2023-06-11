import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import '../SearchPage/SearchPage.scss';
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import { genres } from '../../utils';
import CloseIcon from '@mui/icons-material/Close';


function SearchPageTest() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const queryParam = searchParams.get('query') || '';
  const genreParam = searchParams.get('genre') || '';
  const [searchText, setSearchtext] = useState('');
  const [content, setContent] = useState([]);
  const { user } = useContext(AuthContext);

  const onSearchStart = () => {
    navigate(searchText ? `?query=${searchText}` : '');
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [navigate, user]);

  useEffect(() => {
    onSearchStart();
  }, [searchText]);

  useEffect(() => {
    const getReusult = async () => {
        console.log( `contents/search/${ genreParam && searchText ? '?query=' + searchText  + '?genre=' + genreParam : searchText ? '?query=' + searchText : genreParam ? '?genre=' + genreParam : ''}  `);
      const response = await axios.get(
        `contents/search${ genreParam && searchText ? '?query=' + searchText  + '&genre=' + genreParam : searchText ? '?query=' + searchText : genreParam ? '?genre=' + genreParam : ''}  `,
        {
          headers: { authorization: `Bearer ${user.token}` },
        }
      );
      setContent(response.data);
    };
    getReusult();
  }, [searchText, user.token, queryParam,genreParam]);

  return (
    <>
      <div className="main">
        <Navbar className="nav" />

        <div className="search">
          <div className="options">
            <div className="searchGroup">
              <input
                type="text"
                className="searchInput"
                onChange={(e) => setSearchtext(e.target.value)}
              />
              <button className="searchbutton" onClick={() => onSearchStart()}>
                <SearchIcon />
              </button>
            </div>
            <ul className="genres">
              <li>Genre</li>
              {genres.map((genre, i) => (
                <li
                  value={genre}
                  key={i}
                  onClick={() =>
                    navigate('/search')
                  }
                >
                  {genre}
                </li>
              ))}
            </ul>
          </div>
          <div className="results">
          <h3 className="resultText">
              Your results: {queryParam ? `input: ${queryParam}, ` : ' '}{' '}
              {genreParam ? `genre: ${genreParam}` : ''}{' '}
              {queryParam || genreParam ? (
                <CloseIcon
                  className="clearbutton"
                  onClick={() => {
                    navigate('/search');
                  }}
                />
              ) : (
                ''
              )}{' '}
            </h3>
            <div className="results-items">
              <div className="movies">
                <h2>Movies</h2>
                <div className="moviesRes">
                  {content.map(
                    (item, i) =>
                      !item.isSeries && (
                        <Link
                          to={{ pathname: `/details/${item._id}` }}
                          className="link"
                          key={i}
                        >
                          <img
                            src={item.imgThumb}
                            alt={item.title}
                            className="content"
                          />
                        </Link>
                      )
                  )}
                </div>
              </div>
              <div className="series">
                <h2>Series</h2>
                <div className="moviesRes">
                  {content.map(
                    (item, i) =>
                      item.isSeries && (
                        <Link
                          to={{ pathname: `/details/${item._id}` }}
                          className="link"
                          key={i}
                        >
                          <img
                            src={item.imgThumb}
                            alt="content"
                            className="content"
                          />
                        </Link>
                      )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchPageTest;
