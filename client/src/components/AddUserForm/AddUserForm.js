import React from "react";
import styles from "./AddUserForm.module.css";

function AddUserForm({formData,onInputChange,onSubmit}) {
  console.log("Rendering AddUserForm with formData:", formData);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onSubmit function and pass the formData to it
    onSubmit(formData);
 
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.formTitle}> تعديل المعلومات الشخصية</h1>
      <form action="#" onSubmit={handleSubmit}>
        <div className={styles.mainUserInfo}>
          <div className={styles.userInputBox}>
            <label className={styles.label} htmlFor="fullName">
              الاسم الكامل
            </label>
            <input
              className={styles.input}
              type="text"
              id="fullName"
              name="name"
              placeholder="ادخل الاسم الكامل"
              value={formData.name}
              // Add an onChange handler to update the state when the input changes
              onChange={onInputChange}
            
            />
          </div>
          {/* ... Other user input boxes */}
          {/* <div className={styles.userInputBox}>
            <label for="area">البريد الالكتروني</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="البريد الالكترون"
              onChange={onInputChange}
              value={formData.email}

            />
          </div> */}
          <div className={styles.userInputBox}>
            <label for="phoneNumber">رقم الهاتف</label>
            <input
              type="text"
              id="phoneNumber"
              name="phone"
              placeholder="ادخل رقم الهاتف"
              onChange={onInputChange}
              value={formData.phone}

            />
          </div>
          <div className={styles.userInputBox}>
            <label htmlFor="userRole">نوع العميل</label>
            <select id="userRole" name="role"     
              value={formData.role}
              onChange={onInputChange}
            >
              <option value="admin">مدير</option>
              <option value="user">مستخدم عادي</option>
              <option value="dataentry">مدخل بيانات</option>
            </select>
          </div>
          <div className={styles.userInputBox}>
            <label htmlFor="joinDate">تاريخ الانضمام</label>
            <input type="date" id="joinDate" name="joinDate"      onChange={onInputChange} value={formData.joinDate}/>
          </div>
       
        </div>

        <div className={styles.formSubmitBtn}>
          <button type="submit" > طلب</button>
        </div>
      </form>
    </div>
  );
}

export default AddUserForm;
