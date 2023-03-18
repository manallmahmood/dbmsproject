import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../../styles/supplierform.module.css";

const SupplierForm = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const suppliers = { name, address, number };

    try {
      const res = await fetch("/api/supplier", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(suppliers),
      });

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      alert("Supplier added successfully!");
      setName("");
      setAddress("");
      setNumber("");
    } catch (error) {
      console.error(error);
      alert("Error adding supplier");
    }
  };

  return (
    <>
    <header className={styles["navbar"]}>
        <h1 className={styles["navbar-brand"]}>Add a Supplier</h1>
      </header>
    <form className={styles["supplier-form"]}onSubmit={handleSubmit}>
      <div className={styles["form-input"]}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className={styles["form-input"]}>
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className={styles["form-input"]}>
        <label htmlFor="number">Phone Number:</label>
        <input
          type="tel"
          id="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>
      <button className={styles["form-btn"]} type="submit">Add Supplier</button>
    </form>
    </>
  );
};

export default SupplierForm;
