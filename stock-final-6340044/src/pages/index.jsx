import { useState, useEffect } from "react";
import styles from "../styles/supplierform.module.css";
import Link from "next/link";
import { useRouter } from 'next/router';

const SupplierManagement = () => {
  const [suppliers, setSuppliers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/supplier")
      .then((res) => res.json())
      .then((data) => setSuppliers(data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/supplier/${id}`, { method: "DELETE" });

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      setSuppliers(suppliers.filter((supplier) => supplier._id !== id));
      alert("Supplier deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Error deleting supplier");
    }
  };

  return (
    <>
      <header className={styles["navbar"]}>
        <h1 className={styles["navbar-brand"]}>Supplier Management</h1>
      </header>
      <div>
      <table className={styles["supplier-table"]}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier._id}>
              <td>{supplier.name}</td>
              <td>{supplier.address}</td>
              <td>{supplier.number}</td>
              <td>
                <button
                  className={styles["submit-btn"]}
                  onClick={() => { router.push(`/supplier/Update/${supplier._id}`); }}>Update
                </button>
                <button
                  className={styles["submit-btn"]}
                  onClick={() => handleDelete(supplier._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <Link href="/supplier">
        <button className={styles["add-btn"]}>Add Supplier</button>
      </Link>
      </table>
      </div>


    </>
  );
};

export default SupplierManagement;
