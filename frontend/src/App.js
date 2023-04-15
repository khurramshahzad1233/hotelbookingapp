import React,{useEffect} from 'react';
import "./App.css";
import {Routes,Route,BrowserRouter as Router } from "react-router-dom";
import WebFont from "webfontloader"
import Home from './components/home/Home';
import Hotels from './components/hotels/Hotels';
import Newhotel from './components/admin/newhotel/Newhotel';
import Newroom from './components/admin/newroom/Newroom';
import Hotelpage from './components/hotelpage/Hotelpage';
import Supportengine from './components/supportengine/Supportengine';
import Adminchatpanel from './components/admin/adminchatpannel/Adminchatpanel';



const App = () => {

  useEffect(()=>{

    WebFont.load({google:{
      families:["Roboto","Montserrat","Droid Sans","Chilanka","Satisfy"]
    }})
  },[])
  return (
    <Router>
      <Supportengine/>

      <Routes>

        <Route path='/' element={<Home/>}/>
        <Route path='/hotels' element={<Hotels/>}/>
        <Route path='/hotel/new' element={<Newhotel/>}/>
        <Route path='/room/new' element={<Newroom/>}/>
        <Route path='/hotel/:id' element={<Hotelpage/>}/>


        

        <Route path='/admin/chatpanel' element={<Adminchatpanel/>}/>
      </Routes>
    </Router>
  )
}

export default App