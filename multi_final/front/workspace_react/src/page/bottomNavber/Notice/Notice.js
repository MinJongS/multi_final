import React,{useState,useEffect} from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Notice = () => {
  const navigate = useNavigate();
  const AddNoticePage = () => {
    navigate("/addNotice");
  }
  const[Noticedatas,setNoticedata]=useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(()=>{
      const fetchNotice=async()=>{
          try {
              //error 와 tech 를 초기화
              setError(null);
              setNoticedata(null);
              // loading 상태를 true
              setLoading(true);    
              const response=await axios.get('http://localhost:8085/notice');
              setNoticedata(response.data);
          }catch(e){
              setError(e);
          }
          setLoading(false);
        
      
  };
  fetchNotice();
  
},[]);

if (loading) return <div>로딩중..</div>;
if (error) return <div>에러가 발생했습니다</div>;
if (!Noticedatas) return null;

  return (
    <div>
      <h3>공지사항</h3>
      <Table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {Noticedatas.map((Noticedata,index) => (
              <tr key={index}>
                <td>{Noticedata.n_no}</td>
                <td>
                  <Link to={"/notice/" + Noticedata.n_no} style={{ textDecoration: 'none' }}>
                    {Noticedata.n_title}
                  </Link>
                </td>
                <td>관리자</td>
                <td>
                  {Noticedata.n_date}
                </td>
              </tr>
        
          ))}
        </tbody>
      </Table>
      {/* 관리자용 */}
      <input type="button" value="글쓰기" onClick={AddNoticePage} />
    </div>
  );
};

export default Notice;