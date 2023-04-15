import React,{Fragment,useState} from 'react';
import "./Newhotel.css";
import {useDispatch} from "react-redux";
import {createhotelaction} from "../../actions/hotelaction"

const Newhotel = () => {
    const dispatch=useDispatch()

    const [hotelname, setHotelname]=useState("");
    const [title,setTitle]=useState("");
    const [type,setType]=useState("");
    const [description,setDescription]=useState("");
    const [address,setAddress]=useState("")
    const [distance,setDistance]=useState("")
    const [city,setCity]=useState("")
    const [cheapestprice,setCheapestprice]=useState("");
    const [images,setImages]=useState([]);
    const [imagespreview,setImagespreview]=useState([]);
    const [feature,setFeature]=useState("")
 
    

    const createhotelphotohandler=(e)=>{
        const files=Array.from(e.target.files);

        files.forEach((file)=>{
            const reader=new FileReader();

            reader.onload=()=>{
                if(reader.readyState===2){
                    setImages((old)=>[...old,reader.result]);
                    setImagespreview((old)=>[...old,reader.result]);
                }
            };
            reader.readAsDataURL(file)
        })
    }
    const createnewhotelhandler=(e)=>{
        e.preventDefault();

        const myform=new FormData();

        myform.set("hotelname",hotelname)
        myform.set("title",title)
        myform.set("type",type)
        myform.set("description",description)
        myform.set("address",address)
        myform.set("distance",distance)
        myform.set("city",city)
        myform.set("cheapestprice",cheapestprice)
        myform.set("feature",feature);
        

        images.forEach((img)=>{
            myform.append("image",img);
        });
        dispatch(createhotelaction(myform))

    }
  return (
    <Fragment>
        <div className="new">
            <div className="newContainer">
                <div className="top">
                    <h1>Add New Product</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        {imagespreview.map((image,index)=>{
                            return <img key={index} src={image} alt=""/>
                        })}
                    </div>
                    <div className="right">
                        <form
                        encType='multipart/form-data'
                        onSubmit={createnewhotelhandler}
                        >
                            <div className="formInput">
                                <input type="file"
                                name='avatar'
                                accept='image/*'
                                multiple
                                onChange={createhotelphotohandler}
                                />

                            </div>
                            <div className="formInput">
                                <input type="text"
                                required
                                placeholder='Hotel Name'
                                value={hotelname}
                                onChange={(e)=>setHotelname(e.target.value)}
                                />
                            </div>
                            <div className="formInput">
                                <input type="text"
                                required
                                placeholder='title'
                                value={title}
                                onChange={(e)=>setTitle(e.target.value)}
                                />
                            </div>
                            <div className="formInput">
                                <input type="text"
                                required
                                placeholder='Type'
                                value={type}
                                onChange={(e)=>setType(e.target.value)}
                                />
                            </div>
                            <div className="formInput">
                                <input type="text"
                                required
                                placeholder='Description'
                                value={description}
                                onChange={(e)=>setDescription(e.target.value)}
                                />
                            </div>
                            <div className="formInput">
                                <input type="number"
                                required
                                placeholder='Distance'
                                value={distance}
                                onChange={(e)=>setDistance(e.target.value)}
                                />
                            </div>
                            <div className="formInput">
                                <input type="text"
                                required
                                placeholder='address'
                                value={address}
                                onChange={(e)=>setAddress(e.target.value)}
                                />
                            </div>
                            <div className="formInput">
                                <input type="text"
                                required
                                placeholder='city'
                                value={city}
                                onChange={(e)=>setCity(e.target.value)}
                                />
                            </div>
                            <div className="formInput">
                                <input type="number"
                                required
                                placeholder='cheapest price'
                                value={cheapestprice}
                                onChange={(e)=>setCheapestprice(e.target.value)}
                                />
                            </div>
                            <div className="formInput">
                                <select onChange={(e)=>setFeature(e.target.value)}>
                                    <option value="">Feature/Not Feature</option>
                                    <option value={true}>feature</option>
                                    <option value={false}>Not Feature</option>
                                </select>
                            </div>
                            <div><input type="submit" 
                            value="Submit Info"
                            /></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default Newhotel