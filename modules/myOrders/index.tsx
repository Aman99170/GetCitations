'use client'
import { Paper, Stack, Table, TableBody, TableContainer, TableHead, TablePagination, TableRow, Typography, styled, tableCellClasses, TableCell, TextField, IconButton } from "@mui/material";
import { ChangeEvent, useMemo, useState } from "react";
import FilterListIcon from '@mui/icons-material/FilterList';
import { FilterModal } from "../../components/DialogBox/filterModal";
import { useMyOrders } from './useMyOrders'
import { SearchBox } from "../../components/searchBox";
import { OrderDetails } from "../../components/orderDetails";


export function MyOrders() {

    const [rowsPerPage, setRowsPerPage] = useState<number>(5)
    const [page, setPage] = useState<number>(0)
    const [filterModalOpen, setFilterModalOpen] = useState<boolean>(false)
    const { orders, getMyOrders } = useMyOrders()

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
                <Typography variant="h3" textAlign={"center"} >My Orders</Typography>
            </Stack>
            <Stack direction={"row"} justifyContent={"end"} gap={"10px"} sx={{
                paddingRight: "60px",
                paddingBottom: "20px"
            }}>
                <SearchBox fetchData={getMyOrders} setPage={setPage} />
                <IconButton onClick={() => setFilterModalOpen(true)}>
                    <FilterListIcon sx={{
                        fontSize: "40px"
                    }} /></IconButton>
            </Stack>
            <TableContainer component={Paper} sx={{
                minHeight: "490px",
                width:"1400px",
                marginLeft:"50px",
                borderRadius:"10px"
            }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Order Number</StyledTableCell>
                            <StyledTableCell>Order Date</StyledTableCell>
                            <StyledTableCell>Order Status</StyledTableCell>
                            <StyledTableCell>Paper Name</StyledTableCell>
                            <StyledTableCell>Paper Link</StyledTableCell>
                            <StyledTableCell>Paper Doi</StyledTableCell>
                            <StyledTableCell>Number of Citations</StyledTableCell>
                            <StyledTableCell>Total Amount</StyledTableCell>
                            <StyledTableCell>Transaction Status</StyledTableCell>
                            <StyledTableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {visibleRows && visibleRows?.length > 0 ? visibleRows?.map((order, index) => {
                        return (
                                <OrderDetails order={order} key={index} reFetch={getMyOrders}/>
                        )
                    }) :
                        <Typography variant="h3" sx={{
                            position: "absolute",
                            top: "66%",
                            left: "39%"
                        }}>No Record Found</Typography>
                    }
                        </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={orders?.length ? orders.length : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                    width:"1400px",
                    marginLeft:"50px"
                }}
            >
            </TablePagination>
            {filterModalOpen && <FilterModal open={filterModalOpen} handleClose={() => setFilterModalOpen(false)} reFetch={getMyOrders} setPage={setPage}/>}
        </>
    )
}