"use client";
import React, { useEffect, useState } from "react";

export default function CustomerDetails({ params }) {
  const [customer, setCustomer] = useState(null);
  const fetchCustomer = async () => {
    const data = await fetch("/api/customer/" + params.id, {
      method: "GET",
    });
    setCustomer(await data.json());
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  return (
    <div className="p-6">
      <p className="text-2xl">Customer Details</p>
      {customer && (
        <div className="mt-4">
          <p>Customer Name: {customer.name}</p>
          <p>
            Date of Birth:{" "}
            {customer.dob ? new Date(customer.dob).toDateString() : ""}
          </p>
          <p>Member Number: {customer.member_number}</p>
          <p>Interests: {customer.interests}</p>
        </div>
      )}
    </div>
  );
}
