import { useContext, useEffect, useState } from "react";
import axios from "axios";

const ComA = () => {

  const [num,setNum] = useState();
  const [name,setName] = useState();
  const [moves,setMoves] = useState();
  const [data,setData] = useState([]);
  const[loading,setLoading] = useState(false);

  const fetchData = async ()=>{
    setLoading(true)
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    setLoading(false);
    setData(response.data);
    console.log(response);
  }

  useEffect(()=>
  {
    fetchData();
    async function getData()
    {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/1${num}`)
      setName(res.data.name);
      setMoves(res.data.moves.length);
    }

    getData();

   
    // alert("hi");
  },[])
  return (
    <>
    <h1>you choose <span style={{color:"red"}}>{num}</span> value</h1>
    <h1>my name is <span style={{color:"red"}}>{name}</span></h1>
    <h1>I have <span style={{color:"red"}}>{moves} moves</span></h1>
      <select name="" value={num} onChange={(event) => {
         setNum(event.target.value);
      }} id="">
        <option value="1">1</option>
        <option value="25">25</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <table className="table table-bordered table-table-striped-columns">
        <tr className="text-bg-secondary">
          <th>User Id</th>
          <th>Id </th>
          <th>Title</th>
          <th>Body</th>
        </tr>
          {
            loading ? <p>Loading...</p> : (
              data?.map((user , index)=>(
                <tr>
                  <td className="text-bg-danger">{user?.userId}</td>
                  <td className="text-bg-primary">{user?.id}</td>
                  <td className="text-bg-info">{user?.title}</td>
                  <td className="text-bg-success">{user?.body}</td>
                </tr>
              ))
            )
          }
      </table>
    </>
  );
};

export default ComA;
