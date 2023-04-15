import React,{Fragment} from 'react';
import {useSelector} from "react-redux";
import {Navigate,Outlet} from "react-router-dom"

const Protectedroute = ({isAdmin}) => {
    const {user,loading,isAuthenticated}=useSelector((state)=>state.userred);
  return (
    <Fragment>{
        loading===false &&(!isAuthenticated?<Navigate to="/login"/>:isAdmin===true && user.role!=="admin"?<Navigate to="/login"/>:<Outlet/>)
        }</Fragment>
  )
}

export default Protectedroute