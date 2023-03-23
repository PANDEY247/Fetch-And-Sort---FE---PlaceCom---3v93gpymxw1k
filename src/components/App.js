import React, { useEffect, useState } from 'react'
import '../styles/App.css';

const App = () => {

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortAscending, setSortAscending] = useState(false); 
  const [show,setShow] = useState(false);

  const handleFetch = async() =>{
    setIsLoading(true);
    let response = await fetch('https://content.newtonschool.co/v1/pr/main/users');
    let data = await response.json();
    setUsers([...data]);
    setIsLoading(false);
    setShow(true);
  }

  function handleOrder(){
    // console.log("in")
    if(sortAscending){
      let arr = users.sort((a,b)=>b.name.length - a.name.length);
      // console.log(arr);
      setUsers([...arr]);
      setSortAscending(false);
    }else{
      let arr = users.sort((a,b)=>a.name.length - b.name.length);
      // console.log(arr);
      setUsers([...arr]);
      setSortAscending(true);
    }
  }

  return (
    <div id="main">
      <h2>User List</h2>
      <button className="fetch-data-btn" onClick={handleFetch}>Fetch User Data</button>
      <button className="sort-btn" onClick={handleOrder}>
        {sortAscending ? "Sort by name length (descending)" : "Sort by name length (ascending)" }
      </button>
      {
        isLoading &&
         <p>Loading...</p>
      }
      <div className='users-section'>
             {/* <ol> */}
              {
                users.map((obj,i)=>{
                  return (
                    <li key={i}>
                     <section className='id-section'>{obj.id}</section>
                       <section className='name-email-section'>
                         <p className='name'>Name: {obj.name}</p>
                         <p className='email'>Email:{obj.email} </p>
                       </section>
                    </li>
                  )
                })
              }
             {/* </ol> */}
      </div>
      
    </div>
  )
}


export default App;