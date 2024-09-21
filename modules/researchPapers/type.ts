export interface IOrder{
    _id:string,
    orderNumber:String,
    paperName:String,
    paperLink:String,
    paperDoi:String,
    orderedBy:String,
    orderedAt: Date,
    numofCitation:Number,
    userDetails: IUserDetails

}

interface IUserDetails {
  firstName: string;
  lastName: string;
  __v: number;
}