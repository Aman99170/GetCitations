import { TextField } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";


export function SearchBoxFreelancer({ fetchData, setPage }: { fetchData: (filters?: {}) => Promise<void>, setPage: Dispatch<SetStateAction<number>> }) {
    const searchParam = useSearchParams()
    const router = useRouter()
    const path = usePathname()
    const [searchOrder, setSearchOrder] = useState<String | null>(searchParam?.get('search'))
    const {userInfo} = useAuthContext()
    useEffect(() => {
        setPage(0)
        if (searchOrder !== null && searchOrder !== "") {
            router.push(`?search=${searchOrder}`, { scroll: false })
        }
        else if (searchOrder === null || searchOrder === "") {
            router.push(`${path}`, { scroll: false })
        }
        if (searchOrder) {
            const handler = setTimeout(() => {
                fetchData({ search: `${searchOrder}` })
            }, 500)
            return () => {
                clearTimeout(handler)
            }
        }
        else {
            fetchData()
        }
    }, [searchOrder,userInfo,fetchData])
    return (
        <TextField placeholder="Search order.." sx={{
            width: "300px",
            ".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
                borderRadius: "54px",
                border: "2px solid black"
            }
        }} onChange={(e: any) => setSearchOrder(e.target.value)} defaultValue={searchOrder} />
    )
}