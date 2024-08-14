import { Button, Dialog, FormControl, FormControlLabel, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useCallback, useState } from "react";

interface IFilterModal {
    open: boolean,
    handleClose: () => void
    reFetch: any
    setPage: Dispatch<SetStateAction<number>>
}

export function FilterModal({ open, handleClose,reFetch,setPage }: IFilterModal) {
    const searchParam = useSearchParams()
    const router = useRouter()
    const path = usePathname()
    const [sortByValue, setSortByValue] = useState<string | null>(searchParam?.get('sortBy'))
    const [statusValue, setStatusValue] = useState<string | null>(searchParam?.get('status'))
    const [fromDate, setFromDate] = useState<string | null>(searchParam?.get('from'))
    const [toDate, setToDate] = useState<string | null>(searchParam?.get('to'))

    const handleSortByChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSortByValue((event.target as HTMLInputElement).value);
    }
    const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStatusValue((event.target as HTMLInputElement).value);
    }
    const handleToDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setToDate(event.target.value)
    }
    const handleFromDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFromDate(event.target.value)
    }

    const handleCloseButton = useCallback(()=>{
        setSortByValue("")
        setStatusValue("")
        setFromDate("")
        setToDate("")
        reFetch()
        handleClose()
        router.push(`${path}`, { scroll: false })
    },[])

    const handleApplyFilter = useCallback(() => {
        setPage(0)
        let params: Record<string, string> = {}
        if (sortByValue) {
            params.sortBy = sortByValue
        }
        if (statusValue) {
            params.status = statusValue
        }
        if (fromDate) {
            params.from = fromDate
        }
        if (toDate) {
            params.to = toDate
        }
        const queryString = new URLSearchParams(params).toString();
        const url = queryString ? `/myorders?${queryString}` : '/myorders';
        router.push(url, { scroll: false })
        reFetch(params)
        handleClose()
    }, [sortByValue, statusValue, fromDate, toDate])

    return (
        <Dialog open={open} onClose={handleClose}>
            <Stack sx={{
                padding: "20px 40px 20px 40px"
            }}>
                <Stack direction={"row"} justifyContent={"space-between"} gap={"50px"} paddingBottom={"20px"}>
                    <FormControl>
                        <Typography sx={{
                            fontSize: "24px",
                            fontWeight: "bold"

                        }}>Sort By:</Typography>
                        <RadioGroup
                            name="controlled-radio-buttons-group"
                            value={sortByValue}
                            defaultValue={sortByValue}
                            onChange={handleSortByChange}
                        >
                            <FormControlLabel value="Date" control={<Radio />} label="Date (Oldest to Newest)" />
                            <FormControlLabel value="Number of Citation" control={<Radio />} label="Number of Citation" />
                            <FormControlLabel value="Amount" control={<Radio />} label="Amount" />
                        </RadioGroup>
                    </FormControl>
                    <FormControl>
                        <Typography id="status" sx={{
                            fontSize: "24px",
                            fontWeight: "bold"

                        }}>Status:</Typography>
                        <RadioGroup
                            name="controlled-radio-buttons-group"
                            value={statusValue}
                            defaultValue={statusValue}
                            onChange={handleStatusChange}
                        >
                            <FormControlLabel value="Success" control={<Radio />} label="Success" />
                            <FormControlLabel value="In Progress" control={<Radio />} label="In Progress" />
                        </RadioGroup>
                    </FormControl>
                </Stack>
                <Stack direction={"row"} spacing={"20px"} justifyContent={"center"}>
                    <Typography sx={{
                        fontSize: "24px",
                        fontWeight: "500",
                        width: "70px",
                        paddingBottom: "30px"
                    }}>FROM:</Typography>
                    <TextField type="date" value={fromDate} variant="standard" onChange={handleFromDateChange} />
                </Stack>
                <Stack direction={"row"} spacing={"20px"} justifyContent={"center"} >
                    <Typography sx={{
                        fontSize: "24px",
                        fontWeight: "500",
                        width: "70px"
                    }}>TO:</Typography>
                    <TextField type="date" value={toDate} variant="standard" onChange={handleToDateChange} />
                </Stack>
                <Stack direction={"row"} justifyContent={"space-evenly"} paddingTop={"40px"}>
                    <Button variant="outlined" onClick={handleCloseButton}>Cancel</Button>
                    <Button variant="contained" onClick={handleApplyFilter}>Apply Filter</Button>
                </Stack>
            </Stack>
        </Dialog>
    )
}