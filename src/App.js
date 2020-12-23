import React, { Component } from "react";
import "./App.css";

//defining the expressions
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

//const phoneRegex = RegExp(/^[0 - 9]*$/);

const countryRegex = RegExp(/^[a-zA-Z]*$/);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: null,
      userName: null,
      email: null,
      yearOfBirth: null,
      phoneNumber: null,
      gender: null,
      country: null,
      formErrors: {
        fullName: "",
        userName: "",
        email: "",
        yearOfBirth: "",
        phoneNumber: "",
        gender: "",
        country: ""
      }
    };
  }

  handleSubmit = (e) => {
    if (formValid(this.state)) {
      console.log(`
        Name: ${this.state.fullName}
        User Name: ${this.state.userName}
        Email: ${this.state.email}
        Year of Birth: ${this.state.yearOfBirth}
        Phone Number: ${this.state.phoneNumber}
        Gender: ${this.state.gender}
        Country: ${this.state.country}
      `);
      e.preventDefault();
    } else {
      console.error("Invalid form!!!");
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "fullName":
        formErrors.fullName =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      case "userName":
        formErrors.userName = value.match(/\s/g) ? "no spaces allowed" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "yearOfBirth":
        formErrors.yearOfBirth =
          Date.getFullYear() - value < 15 ? "At least 15 years old" : "";
        break;
      //case "phoneNumber":
      //formErrors.phoneNumber = phoneRegex.test(value)
      //? ""
      //: "enter numbers only";
      //break;
      case "gender":
        formErrors.gender = "Male" || "Female" ? "" : "select gender";
        break;
      case "country":
        formErrors.country = countryRegex.test(value)
          ? ""
          : "enter letters only";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="container">
        <div className="form-container">
          <h1>User Registration Form</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="fullName">
              <label htmlFor="fullName">Full Name</label>
              <input
                className={formErrors.fullName.length > 0 ? "error" : null}
                placeholder="Full Name"
                type="text"
                name="fullName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.fullName.length > 0 && (
                <span className="errorMessage">{formErrors.fullName}</span>
              )}
            </div>
            <div className="userName">
              <label htmlFor="userName">User Name</label>
              <input
                className={formErrors.userName.length > 0 ? "error" : null}
                placeholder="User Name"
                type="text"
                name="userName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.userName.length > 0 && (
                <span className="errorMessage">{formErrors.userName}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="year">
              <label htmlFor="year">Year of Birth</label>
              <input
                className={formErrors.yearOfBirth.length > 0 ? "error" : null}
                placeholder="Year of Birth"
                type="number"
                name="year"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.yearOfBirth.length > 0 && (
                <span className="errorMessage">{formErrors.yearOfBirth}</span>
              )}
            </div>
            <div className="number">
              <label htmlFor="number">Phone Number</label>
              <input
                className={formErrors.phoneNumber.length > 0 ? "error" : null}
                placeholder="Phone Number"
                type="text"
                name="number"
                noValidate
                onChange={this.handleChange}
              />
            </div>
            <div class="gender">
              <label htmlFor="gender">Gender</label>
              <select name="gender" id="'gender">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {formErrors.gender.length > 0 && (
                <span className="errorMessage">{formErrors.gender}</span>
              )}
            </div>

            <div className="country">
              <label htmlFor="country">Country</label>
              <input
                className={formErrors.country.length > 0 ? "error" : null}
                placeholder="Country"
                type="text"
                name="country"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.country.length > 0 && (
                <span className="errorMessage">{formErrors.country}</span>
              )}
            </div>
            <div className="submit">
              <button type="submit">Register</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
