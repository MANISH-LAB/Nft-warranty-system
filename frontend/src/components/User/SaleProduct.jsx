 import React from "react"
 import { ethers } from "ethers";
 import { Button } from '@mui/material';
 import contract from "../../decaythingabi.json";
 const contractAddress = "0x377cf899476868591b0ff9f60f149e81d5bbb536";
const abi = contract.abi;
 
 const SaleProduct=(props)=>{

   
    const { ethereum } = window;
const provider = new ethers.providers.Web3Provider(ethereum);
const signer = provider.getSigner();
const nftContract = new ethers.Contract(contractAddress, abi, signer);
    const buyeraddress="0xFd6B4Aab52d43A30B45F3C2c1939bd45cCf3dD9B";
    const mintNftHandler = async () => {
        try {
       
          if (ethereum) {
         
            console.log(signer);
            console.log("Initialize minting");
            let nftTxn = await nftContract._createToken(
              buyeraddress,
              props.item.name,
              props.item.price,
              props.item.product,
              props.item.warranty
            );
            console.log("Mining.. please wait");
            await nftTxn.wait();
            console.log("Mined, see transaction : https://mumbai.polygonscan.com/");
         
          } else {
            console.log("Ethereum object does not exist");
          }
        } catch (err) {
          console.log(err);
        }
      };

    return <div>
        <div ><img src={props.item.image}></img>  </div> 
                                        <div> name: {props.item.name} </div>

                                        <div> price: {props.item.price} </div>
                                        <div> warranty: {props.item.warranty} </div>
                                        <div>buyer adress :{buyeraddress}</div>
                                        <Button variant="contained" onClick={mintNftHandler}>Mint</Button>

    </div>

}

export default SaleProduct