import { connect, model, models, Schema } from "mongoose";

const connectionString =
  "mongodb+srv://manallmahmood:stupid123@cluster0.y1xgwpp.mongodb.net/suppliersdb";

export default async function handler(req, res) {
  await connect(connectionString);

  console.log("req.method: ", req.method);

  const id = req.query.id;

  console.log("id", id);

  console.log("Mongoose Models", models);

  if (req.method === "GET") {
    // Get all documents
    const docs = await Suppliers.find();
    res.status(200).json(docs);
  } else if (req.method === "DELETE") {
    const deletedDoc = await Suppliers.deleteOne({ _id: id });
    res.status(200).json(deletedDoc);
  } else if (req.method === "PUT") {
    const updatedDoc = await Suppliers.updateOne({ _id: id }, req.body);
    res.status(200).json(updatedDoc);
  } else {
    res.setHeader("Allow", ["GET", "DELETE", "PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const supplierSchema = new Schema({
  name: String,
  address: String,
  number: String,
});

const Suppliers = models?.suppliers || model("suppliers", supplierSchema);
