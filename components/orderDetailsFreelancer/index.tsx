import { TableCell, TableRow, styled, tableCellClasses } from "@mui/material";
import { IBidDetails } from "../../modules/myOrders/type";
import Link from "next/link";


interface IOrderDetails {
    bid: IBidDetails,
    reFetch: (filters?: {}) => Promise<void>
}


export function OrderDetailsFreelancer({ bid, reFetch }: IOrderDetails) {

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 16,
        },
    }))

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
        height: "100px"
    }))

    return (
        <>
            <StyledTableRow>
                <StyledTableCell sx={{ maxWidth: "150px", wordWrap: "break-word" }}>{bid ? bid.rpBidModel.bidId : ""}</StyledTableCell>
                <StyledTableCell>{new Date(bid ? bid?.rpBidModel.bidAt : "").toLocaleString()}</StyledTableCell>
                <StyledTableCell sx={{ maxWidth: "180px", wordWrap: "break-word" }} >{bid ? bid.rpBidModel.paperName : ""}</StyledTableCell>
                <StyledTableCell sx={{ maxWidth: "180px", wordWrap: "break-word" }} ><Link href={encodeURI(bid ? bid.rpBidModel.paperLink.toString() : "")} rel="noopener noreferrer" target="_blank">{bid ? bid.rpBidModel.paperLink : ""}</Link></StyledTableCell>
                <StyledTableCell sx={{ maxWidth: "175px", wordWrap: "break-word" }} >{bid ? bid.rpBidModel.paperDoi : ""}</StyledTableCell>
                <StyledTableCell align="center">{String(bid ? bid.rpBidModel.numberOfCitation : "")}</StyledTableCell>
                <StyledTableCell align="center">{String(bid ? bid.rpBidModel.bidAmount : "")}$</StyledTableCell>
                <StyledTableCell>{new Date(bid ? bid?.rpBidModel.bidEndDate : "").toLocaleString()}</StyledTableCell>
                <StyledTableCell>{bid.bidStatus}</StyledTableCell>
                <StyledTableCell></StyledTableCell>
            </StyledTableRow>
        </>
    )
}