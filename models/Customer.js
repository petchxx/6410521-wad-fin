import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: Date, required: false },
  member_number: { type: Number, required: true },
  interests: { type: String, required: true },
});

const Customer =
  mongoose.models.customer || mongoose.model("customer", customerSchema);

export default Customer;
