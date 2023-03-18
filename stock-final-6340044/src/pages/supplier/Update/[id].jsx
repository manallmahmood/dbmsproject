import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/supplierform.module.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Supplier({ supplier }) {
  const { register, handleSubmit, reset } = useForm();
  const [data, setData] = useState("");

  useEffect(() => {
    reset(supplier);
  }, [reset, supplier]);

  const updateSupplier = async (data) => {
    const response = await fetch(`/api/supplier/${supplier._id}`, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.error) {
      alert("Error: " + result.error);
    } else {
      alert("Supplier updated");
      window.location.href = "/";
    }
    console.log(result);
    setData(JSON.stringify(data));
  };

  if (!supplier) {
    return (
      <div>
        <p>Supplier not found</p>
        <Link href="/">Back</Link>
      </div>
    );
  }

  return (
    <>
      <header className={styles["navbar"]}>
        <h1 className={styles["navbar-brand"]}>Update Supplier</h1>
      </header>
      <div className={styles.container}>
        <div style={{ margin: "1rem" }}>
          <form onSubmit={handleSubmit(updateSupplier)} className={styles.label}>
            <h1>Update Supplier</h1>
            <label htmlFor="name" className={styles.label}>
              Name
            </label>
            <br />
            <input
              id="name"
              {...register("name", { required: true })}
              defaultValue={supplier.name}
            />
            <br />

            <label htmlFor="address" className={styles.label}>
              Address
            </label>
            <br />
            <input
              id="address"
              {...register("address", { required: true })}
              defaultValue={supplier.address}
            />
            <br />

            <label htmlFor="number" className={styles.label}>
              Phone Number
            </label>
            <br />
            <input
              id="number"
              {...register("number", { required: true })}
              defaultValue={supplier.number}
            />
            <br />

            <input className={styles["submit-btn"]} type="submit" value="Submit" />
            <br />
          </form>
        </div>
      </div>

      <Link href="/">Back</Link>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const res = await fetch(`http://localhost:3000/api/supplier/${params.id}`);
  const supplier = await res.json();
  return { props: { supplier } };
}
