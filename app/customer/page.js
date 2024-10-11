"use client";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Menu from "@mui/material/Menu";

function createData(id, name, dob, member_number, interests) {
  return { id, name, dob, member_number, interests };
}

export default function Customer() {
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState("");
  const [dob, setDob] = useState();
  const [member_number, setMemberNumber] = useState("");
  const [interests, setInterests] = useState("");
  const [open, setOpen] = useState(false);
  const APIBASE = process.env.NEXT_PUBLIC_API_URL;
  const [customerList, setCustomerList] = useState([]);
  const fetchCustomer = async () => {
    const data = await fetch(`${APIBASE}/customer`);
    const c = await data.json();
    const c2 = c.map((customer) => {
      customer.id = customer._id;
      return customer;
    });
    setCustomerList(c2);
    console.log(c2);
  };
  useEffect(() => {
    fetchCustomer();
  }, []);

  const handleAddCustomer = async () => {
    console.log("test");
    const data = {
      name: name,
      dob: dob,
      member_number: member_number,
      interests: interests,
    };
    console.log(data);
    fetch(`${APIBASE}/customer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      console.log("Customer added");
      fetchCustomer();
      setOpen(false);
    });
  };

  const handleEditCustomer = async () => {
    const data = {
      name: name,
      dob: dob,
      member_number: member_number,
      interests: interests,
    };
    console.log(data);

    fetch(`${APIBASE}/customer/${editingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      console.log("Customer updated");
      fetchCustomer();
      setOpen(false);
      setEditingId(null);
    });
  };

  const handleDeleteCustomer = (id) => {
    if (!confirm("Are you sure?")) return;
    fetch(`${APIBASE}/customer/${id}`, {
      method: "DELETE",
      contentType: "application/json",
    }).then(() => {
      fetchCustomer();
    });
  };

  return (
    <div className="p-6">
      <div>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(true);
          }}
        >
          Add
        </Button>
        <Dialog
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        >
          <DialogTitle>Add Customer</DialogTitle>
          <DialogContent>
            <DialogContentText>Enter customer details</DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Name"
              fullWidth
              variant="standard"
              className="w-80"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="dob"
              name="dob"
              type="date"
              fullWidth
              variant="standard"
              label="Date of Birth"
              className="w-80"
              value={dob ? new Date(dob).toISOString().split("T")[0] : ""}
              onChange={(e) => {
                setDob(e.target.value);
              }}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="member_number"
              name="member_number"
              label="Member Number"
              fullWidth
              variant="standard"
              className="w-80"
              value={member_number}
              onChange={(e) => {
                setMemberNumber(e.target.value);
              }}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="interests"
              name="interests"
              label="Interests"
              fullWidth
              variant="standard"
              className="w-80"
              value={interests}
              onChange={(e) => {
                setInterests(e.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (editingId) {
                  console.log("edit");
                  handleEditCustomer();
                } else {
                  console.log("add");
                  handleAddCustomer();
                }
              }}
            >
              {editingId ? "Edit" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Member Number</TableCell>
              <TableCell>Interests</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customerList
              .map((row) =>
                createData(
                  row.id,
                  row.name,
                  row.dob,
                  row.member_number,
                  row.interests,
                ),
              )
              .map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    {new Date(row.dob).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{row.member_number}</TableCell>
                  <TableCell>{row.interests}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      color="success"
                      variant="contained"
                      onClick={() => {
                        window.location.href = `/customer/${row.id}`;
                      }}
                    >
                      View
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setEditingId(row.id);
                        setName(row.name);
                        setDob(row.dob);
                        setMemberNumber(row.member_number);
                        setInterests(row.interests);
                        setOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      color="error"
                      variant="contained"
                      onClick={() => {
                        handleDeleteCustomer(row.id);
                      }}
                    >
                      DELETE
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
