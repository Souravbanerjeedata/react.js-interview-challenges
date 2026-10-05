import { useState } from "react";

const App = () => {
  const data = [
    {
      id: "name",
      label: "Name",
      inputType: "text",
      placeholder: "Your name",
      button: "Next",
    },
    {
      id: "email",
      label: "Email",
      inputType: "email",
      placeholder: "Your email",
      button: "Next",
    },
    {
      id: "dob",
      label: "DOB",
      inputType: "date",
      placeholder: "",
      button: "Next",
    },
    {
      id: "password",
      label: "Password",
      inputType: "password",
      placeholder: "Type password",
      button: "Submit",
    },
  ];

  const [form, setForm] = useState(data);
  const [index, setIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    password: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitHandle(e) {
    e.preventDefault();
    if (index === form.length - 1) {
      setIsSubmitted(true);
    } else {
      setIndex((idx) => idx + 1);
    }
  }

  function handleBack(e) {
    e.preventDefault();
    setIndex((idx) => idx - 1);
  }

  function handleInputData(e) {
    const id = e.target.id;
    const val = e.target.value;

    const copyFormData = { ...formData };
    copyFormData[id] = val;
    setFormData(copyFormData);
  }

  return (
    <div className="app">
      <h1>Multi-step form</h1>
      {!isSubmitted ? (
        <form onSubmit={submitHandle}>
          {index > 0 && (
            <a href="/" onClick={handleBack}>
              Back
            </a>
          )}

          <label htmlFor={form[index].id}>{form[index].label}</label>
          <input
            id={form[index].id}
            value={formData[form[index].id]}
            onChange={handleInputData}
            type={form[index].inputType}
            placeholder={form[index].placeholder}
          />
          <button>{form[index].button}</button>
        </form>
      ) : (
        <div className="submitted">
          <h1>Submitted</h1>
          <br />
          <div>
            <p>
              Name: <span>{formData.name}</span>
            </p>
            <p>
              Email: <span>{formData.email}</span>
            </p>
            <p>
              DOB: <span>{formData.dob}</span>
            </p>
            <p>
              Password: <span>{formData.password}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
