'use client'
import { Paper, Stack, Table, TableBody, TableContainer, TableHead, TablePagination, TableRow, Typography, styled, tableCellClasses, TableCell, TextField, IconButton } from "@mui/material";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import FilterListIcon from '@mui/icons-material/FilterList';
import { FilterModal } from "../../components/DialogBox/filterModal";
import { useMyOrders } from './useMyOrders'
import { SearchBox } from "../../components/searchBox";
import { OrderDetails } from "../../components/orderDetails";
import { freelancerColumnHeaders, researchersColumnHeaders } from "./type";
import { SearchBoxFreelancer } from "../../components/searchBoxFreelancer";
import { OrderDetailsFreelancer } from "../../components/orderDetailsFreelancer";
import { FilterModalFreelancer } from "../../components/DialogBox/filterModalFreelancer";
import { useAuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";


export function MyOrders() {

    const [rowsPerPage, setRowsPerPage] = useState<number>(5)
    const [page, setPage] = useState<number>(0)
    const [filterModalOpen, setFilterModalOpen] = useState<boolean>(false)
    const { orders, getMyOrders, bids, getBids } = useMyOrders()
    const [userType, setUserType] = useState<String | null>()
    const [TableCells, setTableCells] = useState<String[]>([])

    const router = useRouter()
    const{isLoggedIn} = useAuthContext()
    useEffect(()=>{
            if(!isLoggedIn){
                router.push(`/`);
            }
    },[isLoggedIn])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userType = localStorage.getItem('userType');
            setUserType(userType);
        }
    }, []);

    useEffect(() => {
        userType === "Researcher" ? setTableCells(researchersColumnHeaders) : setTableCells(freelancerColumnHeaders)
    }, [userType]);



    const handleChangePage = ((e: any, newPage: number) => {
        setPage(newPage)
    })

    const handleChangeRowsPerPage = ((e: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(e.target.value, 10))
        setPage(0)
    })

    const visibleRows = useMemo(
        () =>
            orders?.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [page, rowsPerPage, orders],
    );

    const visibleRowsFreelancer = useMemo(
        () =>
            bids?.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [page, rowsPerPage, bids],
    );

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 16,
        },
    }));

    return (
        <>
            <Stack sx={{
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                padding: "40px 0px 30px 0px"
            }}>
                <Typography variant="h3" textAlign={"center"} >{userType==="Researcher"?"My Orders":"My Bids"}</Typography>
            </Stack>
            <Stack direction={"row"} justifyContent={"end"} gap={"10px"} sx={{
                paddingRight: "60px",
                paddingBottom: "20px"
            }}>
                {userType === "Researcher" ?
                    <SearchBox fetchData={getMyOrders} setPage={setPage} /> :
                    userType === "Freelancer" ?
                        <SearchBoxFreelancer fetchData={getBids} setPage={setPage} />
                        : <></>
                }

                <IconButton onClick={() => setFilterModalOpen(true)}>
                    <FilterListIcon sx={{
                        fontSize: "40px"
                    }} /></IconButton>
            </Stack>
            <TableContainer component={Paper} sx={{
                minHeight: "490px",
                width: "1400px",
                marginLeft: "50px",
                borderRadius: "10px"
            }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>{TableCells[0]}</StyledTableCell>
                            <StyledTableCell>{TableCells[1]}</StyledTableCell>
                            <StyledTableCell>{TableCells[2]}</StyledTableCell>
                            <StyledTableCell>{TableCells[3]}</StyledTableCell>
                            <StyledTableCell>{TableCells[4]}</StyledTableCell>
                            <StyledTableCell>{TableCells[5]}</StyledTableCell>
                            <StyledTableCell>{TableCells[6]}</StyledTableCell>
                            <StyledTableCell>{TableCells[7]}</StyledTableCell>
                            <StyledTableCell>{TableCells[8]}</StyledTableCell>
                            <StyledTableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userType === "Researcher" && visibleRows && visibleRows?.length > 0 ? visibleRows?.map((order, index) => {
                            return (
                                <OrderDetails order={order} key={index} reFetch={getMyOrders} />
                            )
                        }) : userType === "Researcher" ?
                            <Typography variant="h3" sx={{
                                position: "absolute",
                                top: "66%",
                                left: "39%"
                            }}>No Record Found</Typography>
                            : <></>
                        }
                        {userType === "Freelancer" && visibleRowsFreelancer && visibleRowsFreelancer?.length > 0 ? visibleRowsFreelancer?.map((bid, index) => {
                            return (
                                <OrderDetailsFreelancer bid={bid} key={index} reFetch={getBids} />
                            )
                        }) : userType === "Freelancer" ?
                            <Typography variant="h3" sx={{
                                position: "absolute",
                                top: "66%",
                                left: "39%"
                            }}>No Record Found</Typography>
                            : <></>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={orders?.length ? orders.length : bids?.length?bids?.length:0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                    width: "1400px",
                    marginLeft: "50px"
                }}
            >
            </TablePagination>
            {filterModalOpen && userType === "Researcher" && <FilterModal open={filterModalOpen} handleClose={() => setFilterModalOpen(false)} reFetch={getMyOrders} setPage={setPage} />}
            {filterModalOpen && userType === "Freelancer" && <FilterModalFreelancer open={filterModalOpen} handleClose={() => setFilterModalOpen(false)} reFetch={getBids} setPage={setPage} />}
        </>
    )
}