const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const officeSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  managementContact: { type: String, required: true },
  managementContactPhone: { type: String, required: true },
});

const employeeSchema = new Schema({
  name: { type: String, required: true },
  office_id: { type: Schema.Types.ObjectId, ref: "Office" },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
});

const equipmentSchema = new Schema({
  type: { type: String, required: true },
  model: { type: String, required: true },
  serialNum: { type: String, required: true },
  condition: { type: String, required: true },
  purchaseDate: { type: Date, default: Date.now },
  dateIssued: { type: Date, default: Date.now },
  initialCost: { type: String, required: true },
  employee_id: { type: Schema.Types.ObjectId, ref: "Employee" },

});

//HISTORICAL LOGS

const Office = mongoose.model("Office", officeSchema);
const Employee = mongoose.model("Employee", employeeSchema);
const Equipment = mongoose.model("Equipment", equipmentSchema);

module.exports = { Office, Employee, Equipment };
