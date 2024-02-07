import React, { useState } from "react";
import styles from "./CategoryForm.module.css";
import axios from "axios";

function AddCategoryForm({ onAddCategory }) {
  const [formData, setFormData] = useState({
    arabicName: "",
    image: null,
  });
  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.type === "file" ? e.target.files[0] : e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let fd = new FormData();
      fd.append("arabicName", formData.arabicName);
      fd.append("name", formData.name);
      fd.append("image", formData.image);
      console.log("fd::::", fd);
      let res = await axios.post(
        `${process.env.REACT_APP_BACKEND}category/create`,
        fd,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res) {
        console.log("success");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.container} style={{ width: "80%" }}>
      <h1 className={styles.formTitle}> أضف فئة</h1>
      <form action="#" onSubmit={handleSubmit}>
        <div className={styles.mainUserInfo}>
          <div className={styles.userInputBox}>
            <label className={styles.label} htmlFor="arabicName">
              الاسم
            </label>
            <input
              className={styles.input}
              type="text"
              id="arabicName"
              name="arabicName"
              placeholder=" الاسم "
              // Add an onChange handler to update the state when the input changes
              onChange={handleInputChange}
            />
          </div>
          <div>
            <div className={styles.userInputBox}>
              <label className={styles.label} htmlFor="name">
                الاسم
              </label>
              <input
                className={styles.input}
                type="text"
                id="name"
                name="name"
                placeholder=" الاسم "
                // Add an onChange handler to update the state when the input changes
                onChange={handleInputChange}
              />
            </div>{" "}
            <p>اختاري الصور</p>
            <input
              type="file"
              id="files"
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.files[0] })
              }
              name="image"
            />
          </div>
        </div>

        <div className={styles.formSubmitBtn}>
          <button type="submit"> طلب</button>
        </div>
      </form>
    </div>
  );
}

export default AddCategoryForm;
