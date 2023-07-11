import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../auth/authContext';
import { Link, useNavigate } from 'react-router-dom';
import './MyListPage.scss';
import Navbar from '../../components/Navbar/Navbar';
import Error from '../../components/Error/Error';

function MyListPage() {
  const { user, userContentList } = useContext(AuthContext);
  const navigate = useNavigate();
  const [pages, setPages] = useState(0);
  const [contents, setContents] = useState([]);
  const pageSize = 5;
  const [currentPage, setcurrentPage] = useState(0);

  useEffect(() => {
    setPages(Math.floor(userContentList?.content?.length / pageSize) + 1);
    if (!user) {
      navigate('/login');
    }
  }, [navigate, user]);

  useEffect(() => {
    const f = [];
    for (
      let index = pageSize * currentPage;
      index < pageSize * (currentPage + 1);
      index++
    ) {
      if (userContentList?.content?.length > index)
        f.push(userContentList?.content[index]);
    }
    setContents(f.map((o) => o));
  }, [pages, currentPage, userContentList]);

  const handlePage = (i) => {
    setcurrentPage(i);
  };

  return userContentList && userContentList?.content ? (
    <div>
      <div className="home">
        <Navbar></Navbar>
        <div style={{ margin: '50px' }}></div>
        <div className='content-mylist'>
          {contents.map((item, i) => (
            <Link
              to={{ pathname: `/details/${item._id}` }}
              className="link"
              key={i}
            >
              <img src={item.imgThumb} alt={item.title} className="content" />
            </Link>
          ))}
        </div>
        <div className="pages">
          {[...Array(pages).keys()].map((x, i) => (
            <i onClick={() => handlePage(i)} className="page" key={i}>
              {x + 1}
            </i>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div>
      <Navbar />
      <div style={{ margin: '100px' }}>
        <Error error="some error" color="red"></Error>
      </div>
    </div>
  );
}

export default MyListPage;
