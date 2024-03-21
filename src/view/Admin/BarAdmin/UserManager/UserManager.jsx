import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Modal,
    TextField,
    Typography,
    Table,
    TableBody,
    TableContainer,
    TableFooter,
    TablePagination,
    TableRow,
    Paper,
    IconButton,
    Alert,
    Snackbar,
    Stack,
    TableHead,
    Tooltip,
    TableCell,
    tableCellClasses,
} from "@mui/material";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteRoom, getRooms } from "../../../../apis/AdminRoomAPI";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import styled from "@emotion/styled";
import AddRoom from "../../../components/RoomManager/AddRoom/AddRoom";
import DoneIcon from '@mui/icons-material/Done';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import UpdateRoom from "../../../components/RoomManager/UpdateRoom";
import { deleteUser, getUser } from "../../../../apis/AdminUserAPI";
import AddUser from "../../../components/UserManager/AddUser";
import UpdateUser from "../../../components/UserManager/UpdateUser";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#000",
        color: "#fff",
        fontWeight: "bold",
        fontSize: '12px'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: "#f5f5f5",
        borderBottom: "1px solid rgba(224, 224, 224, 1)",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));


const ModalSuccess = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 12;
`;

const ModalContent = styled.div`
  background-color: #fff;
  width: 400px;
  /* height: 280px; */
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  text-align: center;
`;

const ModalWidth = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  /* height: 50%; */
  background-color: white;
  border: none solid #fff;
  padding: 10px;
`;



function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                ) : (
                    <KeyboardArrowLeft />
                )}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                ) : (
                    <KeyboardArrowRight />
                )}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};


export default function UserManager() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openUpDate, setOpenUpDate] = useState(false);
    const [openAddRoom, setOpenAddRoom] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [openStack, setOpenStack] = useState(false);
    const queryClient = useQueryClient();
    const [showSuccessModal, setShowSuccessModal] = useState(false);


    const { data: userList = [] } = useQuery({
        queryKey: ["userList"],
        queryFn: getUser,
    });

    const { mutate: handleDeleteUser } = useMutation({
        mutationFn: (id) => deleteUser(id),
        onSuccess: () => {
            setOpenStack(true);
            queryClient.invalidateQueries({ queryKey: ["userList"] });
        },
        onError: (err) => {
        },
    });




    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Delete Room by ID
    const handleDeleteAndReload = () => {
        console.log(selectedUser)
        handleDeleteUser(selectedUser);
        setOpenDelete(false);
    };


    //
    const handleCloseStack = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenStack(false);
    };



    //Success PopUp
    const HandleOnSuccessPopUp = () => {
        setShowSuccessModal(true)
    }

    const handleCloseSuccessPopUp = () => {
        setShowSuccessModal(false);
    };

    useEffect(() => {
        if (userList) {
            setFilteredRooms(userList);
        }
    }, [userList]);



    return (
        <>
            <div style={{ textAlign: 'right' }}>
                <Box
                    sx={{
                        width: 500,
                        maxWidth: "100%",
                        marginRight: "16px",
                        display: "flex",
                    }}
                >
                </Box>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        setOpenAddRoom(true);
                    }}
                >
                    Thêm tài khoản
                </Button>
            </div>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="infor pagination table">

                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell component="th" scope="row">
                                STT
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                Email
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                Ngày sinh
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                Pass
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                Thao tác
                            </StyledTableCell>
                        </StyledTableRow>
                    </TableHead>


                    <TableBody>
                        {(rowsPerPage > 0
                            ? filteredRooms.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            : filteredRooms
                        ).map((user, index) => (
                            <StyledTableRow key={user.id}>
                                <StyledTableCell>{index + 1}</StyledTableCell>
                                <StyledTableCell>{user.email}</StyledTableCell>
                                <StyledTableCell>{user.birthday}</StyledTableCell>
                                <StyledTableCell>{user.pass}</StyledTableCell>

                                <StyledTableCell>
                                    <Box>
                                        <Tooltip title="chỉnh sửa" placement="top">
                                            <IconButton
                                                aria-label="update"
                                                size="large"
                                                onClick={() => {
                                                    setOpenUpDate(true);
                                                    setSelectedUser(user.id);
                                                    console.log(user.id)
                                                }}
                                            >
                                                <EditIcon fontSize="inherit" color="primary" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Xóa tài khoản" placement="bottom">
                                            <IconButton
                                                aria-label="delete"
                                                size="large"
                                                onClick={() => {
                                                    setOpenDelete(true);
                                                    setSelectedUser(user.id);

                                                }}
                                            >
                                                <DeleteIcon fontSize="inherit" color="error" />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <StyledTableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>



                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                                colSpan={6}
                                count={userList.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        "aria-label": "rows per page",
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>

            {/* Modal AddRoom */}
            <Modal
                open={openAddRoom}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <ModalWidth>
                    {/* Hiển thị form hoặc nội dung modal */}
                    <AddUser
                        onClose={() => {
                            setOpenAddRoom(false);
                        }}
                        onSuccessPopUp={() => { HandleOnSuccessPopUp() }}
                    />
                </ModalWidth>
            </Modal>

            {/* Modal thanh cong */}
            {showSuccessModal && (
                <ModalSuccess>
                    <ModalContent>
                        <DoneIcon />
                        <Typography
                            variant="h5"
                            sx={{ fontWeight: "bold", marginBottom: "40px" }}
                        >
                            Thành Công
                        </Typography>

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleCloseSuccessPopUp}
                        >
                            Đồng ý
                        </Button>
                    </ModalContent>
                </ModalSuccess>
            )}
            {/* Xac Nhan Xoa */}
            {/* Modal hiển thị thông báo xác nhận xóa */}
            <Modal
                open={openDelete}
                onClose={() => {
                    setOpenDelete(false);
                }}
                sx={{
                    position: "fixed",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    backgroundColor: " rgba(0, 0, 0, 0.6)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: "12",
                }}
            >
                <ModalContent>
                    <ConfirmationNumberIcon />
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: "bold",
                            marginBottom: "40px",
                            color: " #f43f5e",
                        }}
                    >
                        Bạn có chắc chắn xóa tài khoản?
                    </Typography>

                    <Button onClick={handleDeleteAndReload}>Xác nhận</Button>
                    <Button
                        onClick={() => {
                            setOpenDelete(false);
                        }}
                    >
                        Hủy
                    </Button>
                </ModalContent>
            </Modal>

            {/* Modal xoa thanh cong */}
            <Stack spacing={2} sx={{ width: "100%" }}>
                <Snackbar
                    open={openStack}
                    autoHideDuration={3000}
                    onClose={handleCloseStack}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    <Alert
                        onClose={handleCloseStack}
                        severity="success"
                        sx={{ width: "100%" }}
                    >
                        Xóa thành công!
                    </Alert>
                </Snackbar>
            </Stack>
            {/* Modal update user */}
            <Modal
                open={openUpDate}
                aria-labelledby="modal-modal-ftitle"
                aria-describedby="modal-modal-description"
            >
                <ModalWidth>
                    {/* Hiển thị form hoặc nội dung modal */}
                    <UpdateUser
                        onClose={() => {
                            setOpenUpDate(false);
                        }}
                        userId={selectedUser}
                        onSuccessPopUp={() => { HandleOnSuccessPopUp() }}
                    />
                </ModalWidth>
            </Modal>





        </>



    );
}

