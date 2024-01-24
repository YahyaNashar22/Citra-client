import React from 'react';
import styles from './AddressForm.module.css';
import { useState } from 'react';

function AddressForm() {

  const [fullName, setFullName] = useState('');
  const [area, setArea] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [building, setBuilding] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [shopsName, setShopsName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      fullName,
      area,
      phoneNumber,
      building,
      ownerName,
      shopsName,
    };

    sendFormDataViaWhatsApp(formData);

  };
  return (
    
    <div className={styles.container}>
      <h1 className={styles.formTitle}>استمارة طلبية</h1>
      <form action="#">
        <div className={styles.mainUserInfo}>
          <div className={styles.userInputBox}>
            <label className={styles.label} htmlFor="fullName">الاسم الكامل</label>
            <input className={styles.input} 
            type="text"
            id="fullName"
            name="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="ادخل الاسم الكامل" />
          </div>
          {/* ... Other user input boxes */}
          <div className={styles.userInputBox}>
            <label htmlFor="area">المنطقة</label>
            <input type="text"
                    id="area"
                    name="area"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="ادخل المنطقة"/>
          </div>
          <div className={styles.userInputBox}>
            <label htmlFor="phoneNumber">رقم الهاتف</label>
            <input type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="ادخل رقم الهاتف"/>
          </div>
          <div className={styles.userInputBox}>
            <label htmlFor="building">البناية و الطابق</label>
            <input type="text"
                    id="building"
                    name="building"
                    value={building}
                    onChange={(e) => setBuilding(e.target.value)}
                    placeholder="ادخل اسم البناية و الطابق"/>
          </div>
          <div className={styles.userInputBox}>
            <label htmlFor="ownername">اسم صاحب المنزل</label>
            <input type="text"
                    id="ownerName"
                    name="ownerName"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="ادخل الاسم هنا"/>
          </div>
          <div className={styles.userInputBox}>
            <label htmlFor="shopesname">اسم محلين جانب مدخل البناية</label>
            <input type="text"
                    id="shopesName"
                    name="shopesName"
                    value={shopsName}
                    onChange={(e) => setShopsName(e.target.value)}
                    placeholder="ادخل اسماء المحلات"/>
          </div>
          {/* <div className={styles.userInputBox}>
            <label for="qualityandquantity">النوع و الكمية</label>
            <input type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="ادخل النوع و الكمية"/>
          </div>
           */}
        </div>
       
        <div className={styles.formSubmitBtn}>
          <button type="submit"> طلب</button>
        </div>
      </form>
    </div>
    
  );
}

export default AddressForm;
