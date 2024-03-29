import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { fetchOrders } from "../../../db/fetchOrder";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingPage from "../../loadingPage";

import { useQuery, useQueryClient } from "react-query";
import { GridToolbar, DataGrid } from "@mui/x-data-grid";

export default function DashTable() {
  const queryClient = useQueryClient();
  const [rows, setRows] = useState([]); //data
  const [rowModesModel, setRowModesModel] = useState({});
  const [statuses, setStatuses] = React.useState({});
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [filterModel, setFilterModel] = useState({ items: [] }); // State for filter model
  const {
    isLoading,
    isError,
    data: orderData,
  } = useQuery("user-table", fetchOrders);

  const handlePageChange = (params) => {
    setPage(params.page);
  };

  const handlePageSizeChange = (params) => {
    setPageSize(params.pageSize);
    setPage(0);
  };

  const handleRowClickDelete = async (params) => {
    const orderId = params.row.id;
    console.log("Deleting order with ID:", orderId);

    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND}order/${orderId}`);
      console.log("Order deleted successfully!");

      // If the delete request is successful, filter out the deleted row from the displayed data
      const updatedData = rows.filter((row) => row.id !== orderId);

      // Set the updated data to the state or wherever you store your data
      setRows(updatedData);
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  const handleChange = async (event, orderId) => {
    const newStatus = event.target.value;

    try {
      // Send a PUT request to update the status of the specific order ID
      await axios.put(`${process.env.REACT_APP_BACKEND}order/${orderId}`, {
        status: newStatus,
      });
      if (newStatus === "الغاء") {
        console.log("Deleting order with ID:", orderId);
        await axios.delete(`${process.env.REACT_APP_BACKEND}order/${orderId}`);
        console.log("Order deleted successfully!");
        toast.success("تم الغاء الطلب بنجاح");
        // If the delete request is successful, filter out the deleted row from the displayed data
        const updatedData = rows.filter((row) => row.id !== orderId);

        // Set the updated data to the state or wherever you store your data
        setRows(updatedData);
      }

      // Update the local state (statuses) with the new status
      setStatuses((prevStatuses) => ({
        ...prevStatuses,
        [orderId]: newStatus,
      }));

      // Trigger a re-render by updating the state used to render the DataGrid
      setRows((prevRows) => {
        const updatedRows = prevRows.map((row) => {
          if (row.id === orderId) {
            // Update the row with the new status
            return {
              ...row,
              status: newStatus,
            };
          }
          return row;
        });
        return updatedRows;
      });
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  // const handleChange = async (event, orderId) => {
  //   const newStatus = event.target.value;

  //   try {
  //     // Send a PUT request to update the status of the specific order ID
  //     await axios.put(`${process.env.REACT_APP_BACKEND}order/${orderId}`, {
  //       status: newStatus,
  //     });
  //     if (newStatus === "الغاء") {
  //       console.log("Deleting order with ID:", orderId);
  //       await axios.delete(`${process.env.REACT_APP_BACKEND}order/${orderId}`);
  //       console.log("Order deleted successfully!");
  //       toast.success("تم الغاء الطلب بنجاح");
  //       // If the delete request is successful, filter out the deleted row from the displayed data
  //       const updatedData = rows.filter((row) => row.id !== orderId);

  //       // Set the updated data to the state or wherever you store your data
  //       setRows(updatedData);
  //     }

  //     // Update the local state (statuses) with the new status
  //     setStatuses((prevStatuses) => ({
  //       ...prevStatuses,
  //       [orderId]: newStatus,

  //     }));

  //   } catch (error) {
  //     console.error("Error updating order status:", error);
  //   }
  // };

  const columns = [
    {
      field: "description",
      headerName: "الوصف  ",
      type: "",
      width: 180,
      height: 300,
      align: "left",
      headerAlign: "left",
      editable: false,
      flex: 2,
      cellClassName: "delete-cell",
      renderCell: (params) => (
        <div style={{ maxWidth: "600px" }}>
          <p
            style={{
              maxWidth: "600px",
              width: "100%",
              display: "flex",
              overflow: "auto",
            }}
          >
            {params.row.description}
          </p>
        </div>
      ),
    },
    {
      field: "totalPrice",
      headerName: "المجموع",
      type: "",
      width: 180,
      align: "left",
      headerAlign: "left",
      editable: false,
      flex: 0.5,
      cellClassName: "delete-cell",
    },
    {
      flex: 0.5,
      field: "createdAt",
      headerName: "تاريخ الانشاء",
      type: "date",
      width: 180,
      cellClassName: "delete-cell",
      valueGetter: (params) => {
        // Assuming that createdAt is a property of the rowData
        const createdAt = params.row.createdAt;

        // If createdAt is available, format it as a date
        return createdAt ? new Date(createdAt) : null;
      },
    },
    {
      field: "status",
      headerName: "status",
      flex: 0.7,
      cellClassName: "delete-cell",
      type: "singleSelect",
      renderCell: (params) => (
        <>
          <Box sx={{ minWidth: 120, cellClassName: "actions" }}>
            <FormControl fullWidth>
              <InputLabel
                id={`status-label-${params.id}`}
                style={{
                  color:
                    params.row.status === "تم التسليم"
                      ? "var(--blue-color)"
                      : "",
                }}
              >
                {params.row.status || "Select Status"}
              </InputLabel>
              <Select
                labelId={`status-label-${params.id}`}
                id={`status-select-${params.id}`}
                value={statuses[params.id] || ""}
                label="Status"
                onChange={(event) => handleChange(event, params.id)}
              >
                <MenuItem value="انتظار">انتظار</MenuItem>
                <MenuItem
                  style={{ color: "var(--blue-color)" }}
                  value="تم التسليم"
                >
                  تم التسليم
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </>
      ),
    },
    {
      field: "العمليات", // Add a delete column
      headerName: "حذف",
      flex: 0.5,
      cellClassName: "delete-cell",

      renderCell: (params) => (
        <>
          <Button
            variant="outlined"
            color="secondary"
            sx={{
              textAlign: "center",
              margin: "0 auto",
              color: "var(--brown-color)",
              borderColor: "var(--blue-color) ",
              "&:hover": {
                boxShadow: "0px 0px 10px 3px rgba(0,0,0,0.5)",
                backgroundColor: "var(--gray-color)",
              },
            }}
            onClick={() => handleRowClickDelete(params)}
          >
            حذف
          </Button>
        </>
      ),
    },
  ];

  const data = {
    rows,
    columns,
    page,
    pageSize,
    rowCount: rows.length,
    pageSizeOptions: [10, 25, 50, 75, 100],
    filterModel,
    dataSet: "Employee",
    visibleFields: columns,
    rowLength: 100,
  };
  useEffect(() => {
    if (orderData && orderData.orders) {
      const rowsWithId = orderData.orders.map((row) => ({
        ...row,
        id: row._id, // Assuming _id is a unique identifier
      }));
      setRows(rowsWithId);
    }
    setRowModesModel({});
  }, [orderData]);
  if (isLoading) {
    return <LoadingPage />;
  }
  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          sx={{ minHeight: "60vh" }}
          {...data}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          onFilterModelChange={(model) => setFilterModel(model)}
          onRowModesModelChange={handleRowModesModelChange}
          initialState={{
            ...data.initialState,

            filter: {
              //filter
              ...data.initialState?.filter,
              filterModel: {
                items: [
                  {
                    field: "rating",
                    operator: ">",
                    value: "2.5",
                  },
                ],
              },
            },
          }}
          pageSizeOptions={[10, 25, 50, 75, 100]}
          slots={{
            toolbar: GridToolbar,
          }}
        />
      </div>
    </Box>
  );
}
