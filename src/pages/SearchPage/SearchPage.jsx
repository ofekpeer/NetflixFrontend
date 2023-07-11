import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import Navbar from '../../components/Navbar/Navbar';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { genres } from '../../utils';
import axios from 'axios';
import './SearchPage.scss';

function SearchPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const [searchText, setSearchtext] = useState('');
  const queryParam = searchParams.get('query') || '';
  const genreParam = searchParams.get('genre') || '';
  const [content, setContent] = useState([]);
  const { user } = useContext(AuthContext);

  const onSearchStart = () => {
    navigate(
      `${genreParam || searchText ? '?' : ''}${
        genreParam ? `genre=${genreParam}` : ''
      }${genreParam && searchText ? '&' : ''}${
        searchText ? `query=${searchText}` : ''
      }`
    );
    console.log(2);
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
      const response = await axios.get(
        'contents/search' +
          `${searchParams || searchText ? '?' : ''}${
            genreParam ? `genre=${genreParam}` : ''
          }${genreParam && searchText ? '&' : ''}${
            searchText ? `query=${searchText}` : ''
          }`,
        { headers: { authorization: `Bearer ${user.token}` } }
      );
      setContent(response.data);
    };
    getReusult();
    console.log(1);
  }, [genreParam, queryParam]);

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
              <li
                onClick={() =>
                  navigate(searchText ? `?query=${searchText}` : '')
                }
              >
                Genre
              </li>
              {genres.map((genre, i) => (
                <li
                  value={genre}
                  key={i}
                  onClick={() =>
                    navigate(
                      searchText
                        ? `?genre=${genre}&query=${searchText}`
                        : `?genre=${genre}`
                    )
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

export default SearchPage;
