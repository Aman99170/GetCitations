import { Button, Stack, TextField, Typography } from "@mui/material";
import { useOrderContext } from "../../context/OrderContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export function Order() {
    const router = useRouter()
    const [userType, setUserType] = useState<String | null>()
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userType = localStorage.getItem('userType');
            setUserType(userType);
        }
    },[]);
    useEffect(()=>{
        if(userType===null || userType!="Researcher"){
            router.push(`/?userType=${userType}`);
        }else{
            router.push(`/order?numofCitation=${numOfCitation}&rate=${rate}`)
        }
    },[userType])
    
    const {handleChange,formData,numOfCitation,rate,handleSubmit} = useOrderContext()
    return (
        <>
            <Typography variant="h4" textAlign={"center"} sx={{ pt: "20px", pb: "100px" }}>By checking out you're ready to get {numOfCitation} citation for {rate}$</Typography>
            <form onSubmit={handleSubmit}>
                <Stack direction={"row"} justifyContent={"center"} sx={{pb:"20px"}}>
                    <Stack gap={"50px"}>
                        <TextField
                            label="Your research paper name"
                            variant="outlined"
                            name="paperName"
                            value={formData.paperName}
                            onChange={handleChange}
                            required
                            sx={{ borderRadius: 20, width: "600px" }}
                        />
                        <TextField
                            label="Your research paper link"
                            variant="outlined"
                            name="paperLink"
                            value={formData.paperLink}
                            onChange={handleChange}
                            required
                            sx={{ borderRadius: 20, width: "600px" }}
                        />

                        <TextField
                            label="Your research paper doi"
                            variant="outlined"
                            name="paperDoi"
                            value={formData.paperDoi}
                            onChange={handleChange}
                            required
                            sx={{ borderRadius: 20, width: "600px" }}
                        />
                        <Stack direction={"row"} justifyContent={"center"}>
                            <Button variant="contained" type="submit">Checkout</Button>
                        </Stack>
                    </Stack>
                </Stack>
            </form>
        </>
    )
}