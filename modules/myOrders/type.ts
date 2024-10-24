import { IUserDetails } from "../../components/DialogBox/bidModal/type";

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

 export interface IBidDetails {
  bidId: number;
  paperId: string;
  paperName: string;
  paperLink: string;
  paperDoi: string;
  postedBy: string;
  numberOfCitation: number;
  postedOn: string;
  bidBy: number;
  bidAt: string;
  bidEndDate: string;
  bidStartDate: string;
  bidAmount: number;
  bidStatus: string;
  }


export const researchersColumnHeaders = ["Order Number","Order Date","Order Status","Paper Name","Paper Link","Paper Doi","Number of Citations","Total Amount","Transaction Status"]

export const freelancerColumnHeaders=["Bid Number","Bid Date","Paper Name","Paper Link","Paper Doi","Number of Citations","Bid Amount","Bid End Date","Bid Status"]