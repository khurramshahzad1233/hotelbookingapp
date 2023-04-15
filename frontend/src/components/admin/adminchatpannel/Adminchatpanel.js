import React,{useState,useRef,useEffect,Fragment} from 'react';
import "./Adminchatpanel.css"



import {io} from "socket.io-client";
const endpoint=window.location.host.indexOf("localhost")>=0?
"http://192.168.18.138:5000":
window.location.host;
const socket=io.connect(endpoint)


const Adminchatpanel = () => {

  const messageref=useRef(null)


  const [selecteduser,setSelecteduser]=useState({});
  const [socket,setSocket]=useState(null);
  const [messagebody,setMessagebody]=useState("")
  const [message,setMessage]=useState([]);
  const [users,setUsers]=useState([]);

  console.log(selecteduser)


  useEffect(()=>{

    if(messageref.current){
      messageref.current.scrollBy({
        top:messageref.current.scrollHeight,
        left:0,
        behaviour:"smooth"
      })
    }

    if(socket){

      socket.on("message",(data)=>{
        if(selecteduser.name===data.from){
          setMessage([...message,data])
        }else{
          const existuser=users.find((user)=>user.name===data.from);

          if(existuser){
            setUsers(users.map((user)=>
            user.name===existuser.name?{...user,unread:true}:user
            ))
          }
        }
      });

      socket.on("updateuser",(updateuser)=>{
        const existuser=users.find((user)=>user.name===updateuser.name);
        if(existuser){
          setUsers(users.map((user)=>
          user.name===existuser.name?updateuser:user
          ))
        }else{
          setUsers([...users,updateuser])
        }
      });


      socket.on("userlist",(alluser)=>{
        setUsers(alluser)
      });



      socket.on("selecteduser",(user)=>{
        setMessage(user.messages)
      })
    }else{

      const sk=io.connect(endpoint);
      setSocket(sk);
      sk.emit("onlogin",{name:"admin"})
    }
  },[message,socket,users,selecteduser.name]);


  const selectuserhandler=(user)=>{
    setSelecteduser(user);
    const existuser=users.find((item)=>item.name===user.name);
    if(existuser){
      setUsers(users.map((item)=>
      item.name===existuser.name?{...item,unread:false}:item
      ))
    };

    socket.emit("selecteduser",user)
  };


  const sendmessagehandler=(e)=>{
    e.preventDefault();

    if(!messagebody.trim()){
      alert("please type message here")
    }else{
      setMessage([
        ...message,
        {
          body:messagebody,
          from:"admin",
          to:selecteduser.name
        }
      ]);
      setTimeout(()=>{
        socket.emit("sendmessage",{
          body:messagebody,
          from:"admin",
          to:selecteduser.name,
        })

      },2000);
      setMessagebody("")
    }
  }




  return (
    <Fragment>
      <div className='nousers'>{
        users.filter((item)=>item.name!=="admin").length===0 &&(
          <div>No user Found</div>
        )
      }
      <div className="allusers">{
        users.filter((item)=>item.name!=="admin").map((user)=>(
          <div 
          key={user.name}
          className={user.name===selecteduser.name?"green":""}
          onClick={(e)=>selectuserhandler(user)}
          
          >
            <span
            className={
              selecteduser.name===user.name?user.online?"darkgreen":"blue":
              user.unread?"orange":user.online?"darkgreen":"blue"
            }
            >{
              selecteduser.name === user.name
              ? user.online
                ? "Online"
                : "Offline"
              : user.unread
              ? "New"
              : user.online
              ? "Online"
              : "Offline"
              }</span>
              <span>{user.name}</span>

          </div>
        ))
      }</div>
      
      </div>


      <div className="adminchat">{
        !selecteduser.name?(
          <div>select a user to start a chat</div>
        ):(<div>
          <h2>chat with {selecteduser.name}</h2>
          <div ref={messageref}>{
            // message.length===0 &&(
            //   <div>no message yet</div>
            // )
          }
          {
            message.map((msg,index)=>(
              <div key={index}>{
                <strong>{`${msg.from}:`} </strong>
              }{msg.body}</div>
            ))
          }
          </div>

          <form 
          onSubmit={(e)=>sendmessagehandler(e)}
          >
            <input type="text"
            required
            placeholder='type message here'
            value={messagebody}
            onChange={(e)=>setMessagebody(e.target.value)}
            />
          </form>
        </div>)
      }</div>
    </Fragment>
  )
}

export default Adminchatpanel