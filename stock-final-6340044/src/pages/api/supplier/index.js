import { connect, model, models, Schema } from "mongoose";

const connectionString =
  "mongodb+srv://manallmahmood:stupid123@cluster0.y1xgwpp.mongodb.net/suppliersdb";

export default async function handler(req, res) {
  await connect(connectionString);
  console.log("req.method: ", req.method);

  if (req.method === "GET") {
    const docs = await Suppliers.find();
    res.status(200).json(docs);
  } else if (req.method === "POST") {
    console.log(req.body);
    const doc = await Suppliers.create(req.body);
    res.status(201).json(JSON.stringify(doc));
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  
}

const supplierSchema = new Schema({
  name: String,
  address: String,
  number: String
});

const Suppliers = models?.suppliers || model("suppliers", supplierSchema);
