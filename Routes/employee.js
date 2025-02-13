const express = require("express");
const employee = express.Router();
const employeeModel = require("../Schema/employeeModel");
const authMiddleware = require("../middleware/authMiddleware");

// Apply authMiddleware to all routes
employee.use(authMiddleware);

// Get all employees
employee.get("/getEmployee", async (req, res) => {
  try {
    const employees = await employeeModel.find({ userId: req.user._id });
    res.status(200).json(employees);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching employees", error: error.message });
  }
});

// Get single employee by ID
employee.get("/getEmployee/:id", async (req, res) => {
  try {
    const employee = await employeeModel.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching employee", error: error.message });
  }
});

// Add employee
employee.post("/addEmployee", async (req, res) => {
  try {
    const { name, email, age, salary } = req.body;
    const newEmployee = new employeeModel({
      name,
      email,
      age,
      salary,
      userId: req.user._id,
    });
    await newEmployee.save();
    res.status(201).json({ message: "Employee added successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating employee", error: error.message });
  }
});

// Update employee
employee.put("/updateEmployee/:id", async (req, res) => {
  try {
    const { name, email, age, salary } = req.body;
    const employeeId = req.params.id;

    const employee = await employeeModel.findOne({
      _id: employeeId,
      userId: req.user._id,
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    employee.name = name;
    employee.email = email;
    employee.age = age;
    employee.salary = salary;

    await employee.save();
    res
      .status(200)
      .json({ message: "Employee updated successfully", employee });
  } catch (error) {
    console.error("Update error:", error);
    res
      .status(500)
      .json({ message: "Error updating employee", error: error.message });
  }
});

// Delete employee
employee.delete("/deleteEmployee", async (req, res) => {
  try {
    const { email } = req.body;
    const employee = await employeeModel.findOneAndDelete({
      email,
      userId: req.user._id,
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting employee", error: error.message });
  }
});

module.exports = employee;
