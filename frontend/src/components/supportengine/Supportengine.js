import React,{Fragment,useState,useRef,useEffect} from 'react';
import "./Supportengine.css"
import svgcolor from "../assets/Vector.png"
import { LoadingOutlined } from '@ant-design/icons'


import {io} from "socket.io-client";
const endpoint=window.location.host.indexOf("localhost")>=0?
"http://192.168.18.138:5000":
window.location.host;
// const socket=io.connect(endpoint)



const Supportengine = () => {

    const chatboxref=useRef(null);
    const messageref=useRef(null);



    const [hover,setHover]=useState(false);
    const [visibility,setVisibility]=useState(false);
    const [loading,setLoading]=useState(false);
    
    const [name,setName]=useState("")
    const [username,setUsername]=useState("");
    
    const [message,setMessage]=useState([
        {
            from:"system",
            body:"hellow there, please ask your question"
        }
    ]);
    const [socket,setSocket]=useState(null);
    const [messagebody,setMessagebody]=useState("")

    console.log(message)

    const chatsectionvisibility=(e)=>{
        setVisibility(!visibility)
    }

    useEffect(()=>{

        function handleclickoutside(e){
            if(chatboxref.current && !chatboxref.current.contains(e.target)){
                setVisibility(false)
            }
        }
        document.addEventListener("mousedown",handleclickoutside);
        return ()=>{
            document.removeEventListener("mousedown",handleclickoutside)
        }
    },[]);


    useEffect(()=>{
        if(messageref.current){
            messageref.current.scrollBy({
                top:messageref.current.scrollHeight,
                left:0,
                behaviour:"smooth"
            })
        }

        if(socket){
            socket.emit("onlogin",{name:username});

            socket.on("message",(data)=>{
                setMessage([...message,data])
            })
        }
    },[message,socket,username]);


    const namesubmithandler=(e)=>{
        e.preventDefault();
        setUsername(name);
        const sk=io.connect(endpoint);
        setSocket(sk)

        
        
    }

    const chatsubmithandler=(e)=>{
        e.preventDefault();
        setLoading(true )
        if(!messagebody.trim()){
            alert("plz type message")
        }else{
            setMessage([
                ...message,
                {
                    body:messagebody,
                    from:username,
                    to:"admin"

                },
            ]);

            setTimeout(()=>{
                socket.emit("sendmessage",{
                    body:messagebody,
                    from:username,
                    to:"admin"
                })

            },2000);
            setMessagebody("")
        }
        setLoading(false)
    }
  return (
    <Fragment>
        <div className="avatarsection">
        <div className={!hover?"avatar":"avatar avatarhover"}
        onMouseEnter={()=>setHover(true)}
        onMouseLeave={()=>setHover(false)}
        onClick={chatsectionvisibility}
        >
        </div>
        <div 
        className={!hover?"noname":"noname adminname"}
        >hi its khurram</div>
        </div>

        {
            visibility &&(<div className="chatsection"
            ref={chatboxref} 
            
            >
                <div className="chatemailsection">
                    
                    <div className="svgcolor">
                        <img src={svgcolor} alt="avatar"/>
                    </div>
                    <div>Welcome to my support</div>
                    <div
                    ref={messageref}
                    >
                        {
                            message.map((msg,index)=>(
                                <div key={index}>
                                    <strong>{`${msg.from}:`}</strong>
                                    {msg.body}
                                </div>
                            ))
                        }
                    </div>
                    {
                        !username &&(
                            <div className="username">
                                <form 
                                onSubmit={(e)=>namesubmithandler(e)}
                                >
                                    <input type="text"
                                    required
                                    placeholder='please enter your name'
                                    value={name}
                                    onChange={(e)=>setName(e.target.value)}
                                    />
                                </form>

                            <div>enter you email to get started</div>
                            </div>
                        )
                    }

                    {
                        username &&(
                            <form 
                    onSubmit={(e)=>chatsubmithandler(e)}
                    >
                        <input type="text"
                        required
                        placeholder='type message'
                        value={messagebody}
                        onChange={(e)=>setMessagebody(e.target.value)}
                        />
                    </form>
                        )
                    }

                    
                   
                </div>


                <div className={loading?"loadingsection":"loadingsection noloading"}>
                    <LoadingOutlined className='loadingicon'/>
                </div>

               
        
        

        
            </div>)
        }

        

        
        
    </Fragment>
  )
}

export default Supportengine