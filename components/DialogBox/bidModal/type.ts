interface IUserDetails {
    _id: number;
    email: string;
    firstName: string;
    lastName: string;
    mobileNumber: string;
    password: string;
    confirmPassword: string;
    createdAt: string;
    updatedAt: string;
    isActive: string;
    userType: string | null;
  }
  
 export interface IBid {
    bidAt: string;
    bidAmount: number;
    userDetails: IUserDetails;
  }
  
  export interface IBidResponse {
    someOneElseUser: IBid[];
    loggedInUser: IBid[];
    startingDate: string
  }

  