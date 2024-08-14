export interface IOrder{
    _id:string,
    orderNumber:String,
    paperName:String,
    paperLink:String,
    paperDoi:String,
    orderedBy:String,
    orderStatus:String,
    orderedAt: Date,
    numofCitation:Number,
    amount:Number,
    transactionStatus:String
}
