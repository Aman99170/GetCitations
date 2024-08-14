export const fields:Ifields[] = [
    {label:"First Name",
     value:"firstName"},
    {label:"Last Name",
     value:"lastName"},
     {label:"Email",
     value:"email"},
     {label:"Mobile Number",
     value:"mobileNumber"},
     {label:"Password",
     value:"password",
     type:"password"
     },
     {label:"Confirm Password",
     value:"confirmPassword",
     type:"password"
     }
]
export interface Ifields{
    label:string
    value:string
    type?:string
}

export interface IFormField{
    firstName:string,
    lastName:string,
    email:string,
    mobileNumber:string,
    password:string,
    confirmPassword:string
}



