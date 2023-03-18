import Head from "next/head";
import Link from "next/link";

export default function Supplier({ supplier }) {
  console.log("supplier 2", supplier);
  if (!supplier)
    return (
      <div>
        <p>Supplier not found</p>
        <Link href="/Supplier">Back</Link>
      </div>
    );

  return (
    <>
      <Head>
        <title>{supplier.name}</title>
      </Head>
      <div className="container">
        <h1>{supplier.name}</h1>
        <p>{supplier.address}</p>
        <p>{supplier.phonenumber}</p>
        <Link href="/Supplier">
          <a className="back-link">Back</a>
        </Link>
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  console.debug("params", params);
  const res = await fetch(`http://localhost:3000/api/supplier/${params.id}`);
  const supplier = await res.json();
  console.debug("supplier 1", supplier);
  return { props: { supplier } };
}
