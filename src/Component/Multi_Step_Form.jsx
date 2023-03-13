import React, { useState } from "react";
import * as Yup from "yup";

const schema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(8).required(),
});

function Multi_Step_Form() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await schema.validate(formData, { abortEarly: false });

      if (step === 1) {
        setStep(2);
      } else {
        // Handle form submission
        console.log(formData);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {step === 1 && (
        <>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" onChange={handleChange} />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
          />
        </>
      )}
      {step === 2 && (
        <>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" onChange={handleChange} />
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            id="address"
            onChange={handleChange}
          />
        </>
      )}
      <button type="button" onClick={() => setStep(1)}>
        previous
      </button>
      <button type="submit">Next</button>
    </form>
  );
}

export default Multi_Step_Form;
