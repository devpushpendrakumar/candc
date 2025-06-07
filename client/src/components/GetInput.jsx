import { useState } from "react";

function GetInput({ onUserAdded }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && phone) {
      const newUser = {
        name: name,
        email: email,
        phone: phone,
      };

      onUserAdded(newUser);

      // Reset the form fields
      setName("");
      setEmail("");
      setPhone("");
    } else {
      alert("Please fill in all fields.");
    }

    setEmail("");
    setName("");
    setPhone("");
  };

  return (
    <div>
      <h2>Enter user details</h2>
      <form>
        <label htmlFor="name">Name</label>
        <br />
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
        />
        <br />
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <br />
        <label htmlFor="phone">Phone</label>
        <br />
        <input
          type="tel"
          id="phone"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your phone number"
          required
        />
        <br />
        <br />
        <button type="submit" onClick={(e) => handleSubmit(e)}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default GetInput;
