import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ProductForm from "../../../components/ProducForm /ProductForm";
import axios from "axios";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "800px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const ChildModal = ({
  onClose,
  rowData,
  rows,
  setRows,
  setSelectedRowData,
  onSubmitSuccess,
}) => {
  const [formData, setFormData] = useState({
    arabicName: rowData.arabicName || "",
    name: rowData.name || "",
    price: rowData.price || 0, // Assuming a default value for price
    serialNumber: rowData.serialNumber || "",
    images: (rowData.images || []), // Assuming images is an array of strings
    details: (rowData.details || []).map((detail) => ({
      color: detail.color || "",
      sizes: (detail.sizes || []).map((size) => ({
        size: size.size || "",
        quantity: size.quantity || 0, // Assuming a default value for quantity
      })),
    })),
    subCategoryID: rowData.subCategoryID || "", // Assuming subCategoryID is a string
    categoryID: rowData.categoryID || "", // Assuming categoryID is a string
    slug: rowData.slug || "",
    type: rowData.type || "",
    description: rowData.description || "",
    joinDate: rowData.joinDate || "", // Assuming joinDate is a string (adjust accordingly)
  });

  const handleClose = () => {
    onClose();
  };


  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({ ...prevData, [name]: value }));
  // };
  const handleInputChange = (e) => {
 
    // Check if e.target is defined before destructuring
    if (e.target) {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    try {
      const requestData = { ...formData };

      if (!requestData.joinDate) {
        delete requestData.joinDate;
      }

      const response = await axios.patch(
        `${process.env.REACT_APP_BACKEND}product/${rowData.id}`,
        requestData
      );

      if (response.status === 200) {
        const updatedProduct = response.data;

        const updatedRows = rows.map((row) =>
          row.id === updatedProduct.id ? updatedProduct : row
        );

        setRows(updatedRows);

        onClose();
        toast.success("تم تجديد المعلومات بنجاح");
        if (onSubmitSuccess) {
          onSubmitSuccess(updatedProduct);
        }
      } else {
        console.error("Error updating product:", response.data);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  useEffect(() => {
    // const fetchData = async () => {
    //   // Fetch updated data
    //   try {
    //     const response = await axios.get(`${process.env.REACT_APP_BACKEND}product/`);
    //     const updatedData = response.data;
    //     setRows(updatedData);
    //   } catch (error) {
    //     console.error("Error fetching updated data:", error);
    //   }
    // };
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND}product/${rowData.id}`
        );
        const updatedData = response.data;
        setRows((prevRows) => {
          // Update the specific row in the state
          const updatedRows = prevRows.map((row) =>
            row.id === updatedData.id ? updatedData : row
          );
          return updatedRows;
        });
      } catch (error) {
        console.error("Error fetching updated data:", error);
      }
    };

    // Call fetchData function after successful form submission
    if (onSubmitSuccess) {
      fetchData();
    }
  }, [onSubmitSuccess, setRows]);

  return (
    <React.Fragment>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }}>
          <ProductForm
            formData={formData}
            setFormData={setFormData}
            onInputChange={handleInputChange}
            onSubmit={(updatedData) => handleSubmit(updatedData, setRows)}
            rowData={rowData}
            rows={rows}
          />
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default ChildModal;
