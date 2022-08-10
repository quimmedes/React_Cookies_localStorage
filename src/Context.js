import React, { createContext, useState, useContext, useEffect} from 'react';
import { useCookies  } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

const Context = createContext(0);

export {Context}


export default function ContextDiv() {

   const {coka} = {
    cookies: instanceOf(Cookies).isRequired
  };
  
  
    const [total, setTotal] = useState([])
    const [cookies, setCookie, removeCookie] = useCookies(['total']);

    

    useEffect(()=>{ 

      let nowDate = new Date();
   //   let expiryDate = new Date(new Date().setHours(new Date().getHours() + 2));
      let expiryDate2 = new Date(new Date().setMinutes(new Date().getMinutes() + 1));

      if(localStorage.getItem("time") !==null) {
        if(new Date(localStorage.getItem("time")) < nowDate ) 
        {  
        localStorage.clear()
        localStorage.setItem("time", expiryDate2.toUTCString());
        console.log("foi")
        console.log(new Date(localStorage.getItem("time")));
      }
     }
    else
    {
      localStorage.setItem("time", expiryDate2.toUTCString());
    }

    }, [total])

  
    return (
      <Context.Provider value={[total, setTotal]}>
        <div>
          <p> total: {total} </p>
          <p> Cookies total: {cookies && cookies.total}</p>
          <p> LocalStorage total: {JSON.parse(localStorage.getItem("total"))}</p>
          <Counter />
        </div>
      </Context.Provider>
    );
  }


   function Counter() {
    const [total, setTotal] = useContext(Context);
    const [cookies, setCookie, removeCookie] = useCookies(['total']);


    const onClique = (newTotal)=>{
      setTotal(newTotal)
     // setCookie('total', newTotal, { path: '/' });
     setCookie('total', newTotal, { path: '/' },{ expires:  new Date().toUTCString()});
     
     localStorage.setItem('total', JSON.stringify(newTotal))

  }

  
    return (
      <div>
        
        <h3>{total}</h3>
        <button type="button" onClick={()=>onClique([...total,"mimi"])}>
          Contador
        </button>
      </div>
    );
  }