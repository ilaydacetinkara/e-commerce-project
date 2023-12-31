import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { BsStar,BsStarHalf,BsStarFill } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import { FaMinus,FaPlus} from "react-icons/fa";
import { ProductContext } from "../context/ProductContext";
import { toastErrorNotify } from "../helpers/toastify";


const Details = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [detail, setDetail] = useState([]);
  const [imgIndex,setImgIndex]=useState(0)
  const [amount,setAmount]=useState(1)
  const {cart,setCart}=useContext(ProductContext)
  const [colorIndex, setColorIndex] = useState(0)



  let singleUrl = `https://course-api.com/react-store-single-product?id=${id}`;

  const getProductDetails = async () => {
    try {
      const {    data } = await axios.get(singleUrl);
      setDetail(data);
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(detail);
  useEffect(() => {
    getProductDetails();
  }, []); 





  const { name, reviews, price, description, stock, company,colors ,images,stars} = detail;
  // console.log(detail)
  const newImageList=images?.map((item)=>item.thumbnails.large.url)
  // console.log(newImageList)
  
// console.log(name);


const increase=()=>{
  if(amount<10){
    setAmount(amount+1)
  }
}
const decrease = ()=>{
  if(amount>1){
    setAmount(amount-1)
  }
}
const addToCart = () =>{
  if(stock>=1){
    let oldAmount;
    const date = new Date().getTime();
    let newcart = { id: date, detail: detail, amount:amount, color:colors[colorIndex],date:date };
    // cart.filter((item)=>console.log(item.amount))
    let tempIdArr=cart.filter((item)=>item.detail.name===newcart.detail.name)
    if(tempIdArr.length>0){
      let tempColorArr=tempIdArr.filter((item)=>item.color===newcart.color)
      if(tempColorArr.length>0){
        oldAmount=tempColorArr[0].amount
        tempColorArr.map((item)=>item.amount=oldAmount)
        newcart={...newcart,amount:(oldAmount+newcart.amount<stock) ? oldAmount+newcart.amount<10 ? oldAmount+newcart.amount : 10: stock} 
        cart.splice(cart.indexOf(tempColorArr[0]),1)
        setCart([...cart, newcart]);
      }else{
        setCart([...cart, newcart]);
      }
    }
    else{
      
    }
    setCart([...cart, newcart]);
  navigate("/cart", {state:setAmount})
  }else{
    toastErrorNotify("Out of Stock.")
  }
}


  return (
    <div>
      <div className="details-header py-2 ">
        <h1 className="details-h1 p-3 container">
          <span onClick={() => navigate("/")}>Home</span>
          <span onClick={() => navigate("/products")}> / Products</span>
          <span className="text-capitalize "> / {name}</span>
        </h1>
      </div>
      <div className="container row m-auto">
        <div className="col-12">
          <button className="text-uppercase border-0 p-2 rounded-2 my-3 detail-backBtn" onClick={()=>navigate("/products")}>Back To Products</button>
        </div>
        <div className="details-imgDiv col-lg-6">
          <div className="detail-big-img mb-3">
          <img src={newImageList && newImageList[imgIndex]} alt="image1" className="rounded-3"/>
          </div>
          <div className="detail-small-img d-flex justify-content-between align-items-center">
              {newImageList?.map((url,index)=>{
              return(
                <img key={url.id} src={url} className="detail-img rounded-3" onClick={()=>setImgIndex(index)}/>
              )
            })
          }
          </div>
        </div>
        <div className="details-content col-lg-6 p-2 ps-lg-4">
          <h1 className="text-capitalize single-detail-title fw-bold">{name}</h1>
          < div className="stars fs-4 d-flex align-items-center flex-row text-warning">
            <span className="d-flex align-items-center">
              {stars >=1 ? <BsStarFill/> : stars>=0.5 ? <BsStarHalf/> : <BsStar/>}
            </span>
            <span className="d-flex align-items-center">
              {stars >=2 ? <BsStarFill/> : stars>=1.5 ? <BsStarHalf/> : <BsStar/>}
            </span>
            <span className="d-flex align-items-center">
              {stars >=3 ? <BsStarFill/> : stars>=2.5 ? <BsStarHalf/> : <BsStar/>}
            </span>
            <span className="d-flex align-items-center">
              {stars >=4 ? <BsStarFill/> : stars>=3.5 ? <BsStarHalf/> : <BsStar/>}
            </span>
            <span className="d-flex align-items-center">
              {stars ==5 ? <BsStarFill/> : stars>=4.5 ? <BsStarHalf/> : <BsStar/>}
            </span>
            <span className="single-detail-review d-flex align-items-center fs-5 ps-2">({reviews} customer reviews)</span>
          </div>
          <h3 className="single-detail-price"> ${String(price).slice(0, 3) + "." + String(price).slice(3)}</h3>
          <p className="single-detail-desc">{description}</p>
          <p>
            <span className="single-detail-available fw-bold">Available:</span> <span>{stock ? "In Stock" : "Out Of Stock"}</span> 
          </p>
          <p className="text-capitalize">
            <span className="single-detail-available fw-bold">SKU:</span> <span>{id}</span> 
          </p>
          <p className="text-capitalize">
            <span className="single-detail-available fw-bold">Brand:</span> <span>{company}</span>
          </p>
          <hr/>
          <div className="d-flex ">
            <span className="single-detail-color fw-bold">Colors:</span>
            {
              colors?.map((item,index)=> {
                return(
                  <button style={{backgroundColor:item}} key={index} className="rounded-circle border-0 mx-1 detail-color-btn" onClick={()=>setColorIndex(index)}>
                  {colorIndex === index ? <TiTick className='text-white m-1 fs-5'/> : <p className='mx-2' style={{color:item}}><TiTick/></p>}
                </button>
                )
              }
              )
            }
          </div>
          <div className="d-flex p-0 align-items-center">
            <button className="bg-transparent border-0 fs-4 me-2 my-2" onClick={()=>decrease()}><FaMinus/></button>
            <h2 className="m-0 mx-1 fw-bold">{amount}</h2>
            <button className="bg-transparent border-0 fs-4 ms-2 my-2" onClick={()=>increase()}><FaPlus/></button>
          </div>
          <button onClick={addToCart} className="cartBtn border-0 p-2 rounded-2 my-3">ADD TO CART</button>
        </div>
      </div>
    </div>
  );
};

export default Details;