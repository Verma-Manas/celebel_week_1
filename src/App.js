import { useState } from "react";
import "./App.css";

function App() {
  const initialState = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    showPassword: false,
    phoneCode: "",
    phoneNumber: "",
    country: "",
    city: "",
    pan: "",
    aadhar: "",
  };

  const cities = {
    India: ["Delhi", "Mumbai", "Bangalore"],
    USA: ["New York", "LA", "Chicago"],
    Canada: ["Toronto", "Montreal", "Vancouver"],
  };

  const [form, setForm] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const err = {};
    for (const [key, val] of Object.entries(form)) {
      if (key !== "showPassword" && !val) err[key] = "Required";
    }
    if (form.email && !/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) {
      err.email = "Invalid email";
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="container">
        <h2>Submitted Data</h2>
        <ul>
          {Object.entries(form).map(
            ([key, val]) =>
              key !== "showPassword" && (
                <li key={key}>
                  <strong>{key}:</strong> {val}
                </li>
              )
          )}
        </ul>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>React Form</h2>
      <form onSubmit={handleSubmit}>
        {["firstName", "lastName", "username", "email", "pan", "aadhar"].map((field) => (
          <div key={field}>
            <label>{field}</label>
            <input name={field} value={form[field]} onChange={handleChange} />
            {errors[field] && <p className="error">{errors[field]}</p>}
          </div>
        ))}

        <div>
          <label>Password</label>
          <input
            type={form.showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() => setForm((f) => ({ ...f, showPassword: !f.showPassword }))}
          >
            {form.showPassword ? "Hide" : "Show"}
          </button>
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <div>
          <label>Phone</label>
          <div className="phone">
            <input
              name="phoneCode"
              placeholder="+91"
              value={form.phoneCode}
              onChange={handleChange}
            />
            <input
              name="phoneNumber"
              placeholder="1234567890"
              value={form.phoneNumber}
              onChange={handleChange}
            />
          </div>
          {(errors.phoneCode || errors.phoneNumber) && (
            <p className="error">{errors.phoneCode || errors.phoneNumber}</p>
          )}
        </div>

        <div>
          <label>Country</label>
          <select name="country" value={form.country} onChange={handleChange}>
            <option value="">--Select--</option>
            {Object.keys(cities).map((country) => (
              <option key={country}>{country}</option>
            ))}
          </select>
          {errors.country && <p className="error">{errors.country}</p>}
        </div>

        <div>
          <label>City</label>
          <select name="city" value={form.city} onChange={handleChange}>
            <option value="">--Select--</option>
            {(cities[form.country] || []).map((city) => (
              <option key={city}>{city}</option>
            ))}
          </select>
          {errors.city && <p className="error">{errors.city}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
