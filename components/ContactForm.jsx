"use client";

import { useState } from "react";

export default function ContactForm() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); // Corrected variable name
  const [error, setError] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(fullname);
    console.log(email);
    console.log(message);

    const res = await fetch("api/contact", {
      method: "POST",
      headers: {
        "Contact-type": "application/json",
      },
      body: JSON.stringify({
        fullname,
        email,
        message,
      }),
    });

    const { msg } = await res.json();
    setError(msg);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {" "}
        {/* Corrected attribute name */}
        <div>
          <label htmlFor="fullname">Full Name: </label>
          <input
            type="text"
            id="fullname"
            placeholder="Enter your name"
            onChange={(e) => setFullname(e.target.value)} // Corrected state update
            value={fullname}
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>{" "}
          {/* Corrected id to lowercase */}
          <input
            type="text"
            id="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)} // Corrected state update
            value={email}
          />
        </div>
        <div>
          <label htmlFor="message">Message: </label>
          <textarea
            id="message"
            placeholder="Enter your message..."
            onChange={(e) => setMessage(e.target.value)} // Corrected state update
            value={message}
          />
        </div>
        <button type="submit">Send</button>
      </form>
      <br />

      <div>Error Message</div>
    </div>
  );
}
