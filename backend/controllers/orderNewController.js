const newOrder = require("../models/orderNewModel")

const httpNewOrder= async(req,res)=>{
    console.log(req.body)

    //  await newOrder.updateOne({
    //     buyer_metawallet:metawallet
    // },{
    //     buyer_metawallet,
    //     cuttedPrice,
    //     image
    //     name
    //     price
    //     product
    //     quantity
    //     seller
    //     stock
    //     warranty
        


       

    // },{
    //     upsert:true
    // })

    res.status(200).json({
        message:"ok",
    
    })


}

module.exports={
    httpNewOrder
}