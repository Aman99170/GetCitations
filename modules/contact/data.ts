export const contactdata: IContactData[]= [
    {imagesrc:"/assets/icons/msg.svg",title:"Support Team", email:"support@getcitations.com", phone:"+91 9999888877"},
    {imagesrc:"/assets/icons/tele.svg",title:"Sales Team", email:"Sales@getcitations.com", phone:"+91 9999888877"},
    {imagesrc:"/assets/icons/address.svg",title:"Address", address:"67,Noida sector 125,U.P"},
]

export const leaveMsgData: ILeaveMsgData[] = [
    {title:"Your name",value:"name"},
    {title:"Your email address",value:"email"},
    {title:"Subject",value:"subject"},
    {title:"Your Phone Number",value:"mobileNumber"},
    {title:"How can we help you?",multiLine:true,value:"description"}]

export interface IContactData{
    imagesrc:string
    title?:string
    email?:string
    phone?:string
    address?:string
}

export interface ILeaveMsgData{
    title:string
    multiLine?:boolean
    value:string
}