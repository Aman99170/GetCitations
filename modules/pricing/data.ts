export const citationRate:ICitationRate[] = [
    {value:1,rate:5},
    {value:2,rate:10},
    {value:3,rate:15},
    {value:5,rate:20}
]

export const visual:IVisual[] = [
    {value:1,title:"Upload",subTitle:"Upload your research paper"},    
    {value:2,title:"Pay",subTitle:"Pay using any credit card or paypal"}, 
    {value:3,title:"Track",subTitle:"Track your research paper citation in your dashboard"}, 
]

export interface ICitationRate{
    value:number
    rate:number
}

export interface IVisual{
    value:number
    title:string
    subTitle:string
}