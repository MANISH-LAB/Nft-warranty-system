import { useEffect, useRef} from 'react';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../Layouts/Loader';
import MinCategory from '../Layouts/MinCategory';
import MetaData from '../Layouts/MetaData';
import { Button } from '@mui/material';

import contract from "../../decaythingabi.json";
import { ethers } from "ethers";
import "./Warranty.css";
// import Button from 'react-bootstrap/Button';
import { useState } from 'react';
const contractAddress = "0x377cf899476868591b0ff9f60f149e81d5bbb536";
const abi = contract.abi;


const Warranty = () => {
    const { user } = useSelector(state => state.user)
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const product= cartItems[0];
    const inputRef=useRef()
    const tokenInputRef= useRef()
    const idInputRef = useRef()
    const { ethereum } = window;
const provider = new ethers.providers.Web3Provider(ethereum);
const signer = provider.getSigner();
const nftContract = new ethers.Contract(contractAddress, abi, signer);
// var nftShow;
const[nftData,setNftData] = useState([]);
const[idData,setIdData] = useState([]);
const[idShowStatus,setIdShowStatus] = useState(false);
const [tknId,setTknId] = useState([])
    const [nftShowStatus,setNftShowStatus] = useState(false);
// console.log(nftShow);

console.log(user)

   

    //  console.log(tokenInputRef.current.value)
     const submitHandler= async() => {
       
       try{
        const nftShow = await nftContract.getCard(tokenInputRef.current.value);
        console.log(nftShow);
        setNftData(nftShow);
        setNftShowStatus(true);
       }
       catch(nftShowStatus){
        alert(`You are not the owner. Only owner can view the token id: ${tokenInputRef.current.value}`);
       }
        
     }
     const submitHandlerId = async() => {
        const idShow = await nftContract.getWarrantyByOwner(idInputRef.current.value);
        console.log(idShow.length);
        setIdData(idShow);
        setIdShowStatus(true);
        for(var i =0;i<idShow.length;i++){
            console.log(idShow[i]%1000);
            setTknId((prev)=> {
            return [...prev,idShow[i]%1000]
           }
           )
        }

     }
     if(!nftShowStatus){
    return (
       
        <div>
            <MetaData title="My Profile" />

        
                <>
                    <MinCategory />
                    <main className="w-full mt-12 sm:mt-0">

                        {/* <!-- row --> */}
                        <div className="flex gap-3.5 sm:w-11/12 sm:mt-4 m-auto mb-7">

                            <Sidebar activeTab={"profile"} />

                            {/* <!-- details column --> */}
                            <div className='warranty_wrap'>
 
                            <div className='warranty_container'>
                                {/* {user.metawallet} */}
                                <div className='field__divs'>
                                <Button>GET TOKEN IDS</Button>
                                <input type="string" placeholder="address" ref={idInputRef} value={user.metawallet}></input>
                                <button className="submitButton" onClick={submitHandlerId}> submit</button>
                                </div>
                                <br></br>
                                <h2 >{tknId.map((id)=> `${id},`)}</h2>


                                <div className='field__divs'>

                                <Button>GET WARRANTY CARD</Button>
                                <input type="number" placeholder="token id" ref={tokenInputRef} className="tkn__id"></input>
                                <button className="submitButton" onClick={submitHandler}> submit</button>
                                </div>
                                <div className= "warranty_card">
                                    <div>
                                    
                                      <h2>Seller Address:</h2>
                                        <h2>Model:</h2> 
                                        <h2>Serial No.:</h2> 
                                        <h2>Price:</h2> 
                                        <h2>Repairs;</h2>
                                        <h2>Warranty(in days) :</h2> 
                                    
                                  

                                    </div>
                                </div>
                            </div>
                            </div>
                          
                            {/* <!-- details column --> */}
                        </div>
                    </main>
                </>
            
        </div>
    );}
    else {
        return (
       
            <div>
                <MetaData title="My Profile" />
    
            
                    <>
                        <MinCategory />
                        <main className="w-full mt-12 sm:mt-0">
    
                            {/* <!-- row --> */}
                            <div className="flex gap-3.5 sm:w-11/12 sm:mt-4 m-auto mb-7">
    
                                <Sidebar activeTab={"profile"} />
    
                                {/* <!-- details column --> */}
                                <div className='warranty_wrap'>
                                <div className='warranty_container'>
                                    <Button>GET TOKEN IDS</Button>
                                    <input type="string" placeholder="address" ref={idInputRef}></input>
                                    <button className="submitButton" onClick={submitHandlerId}> submit</button>
                                    <br></br>
                                    <Button>GET WARRANTY CARD</Button>
                                    <input type="number" placeholder="token id" ref={tokenInputRef}></input>
                                    <button className="submitButton" variant = "primary" onClick={submitHandler}> submit</button>
    
                                    <div  className= "warranty_card">
                                        <div>
                                      
                                          <h1>Seller Address:</h1><span>  {nftData[0]} </span>
                                            <h2>Model :<span>{nftData[1]} </span></h2>
                                            <h2>Price :<span>{nftData[2]} </span></h2>
                                            <h2>Serial no :<span>{nftData[3]} </span></h2>
                                            <h2>Repairs :<span>{nftData[4][0]} </span></h2>
                                            <h2>Warranty(in days) :<span>{nftData[6]} </span></h2>
                                        
                                        
    
                                        </div>
                                    </div>
                                </div>
                                </div>
                              
                                {/* <!-- details column --> */}
                            </div>
                        </main>
                    </>
                
            </div>
        );
    }
};

export default Warranty;
