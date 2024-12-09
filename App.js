import React, { useEffect, useState } from "react";
import "./App.css"; // Import the CSS file for styling
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShimmerEffect from "./app/ShimmerEffect";
import { hover } from "@testing-library/user-event/dist/hover";

const App = () => {
  const [ShowPhonenumberView, SetShowPhonenumberView] = useState(0);
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submit_otp, Set_submit_otp] = useState(false);

  const handleEmailLogin = () => {
    SetShowPhonenumberView(1);
  };

  const Submit_mobile_number = () => {
    SetShowPhonenumberView(2);
    setError(false);
  };

  const Submit_OTP_number = () => {
    setError(true);
    Set_submit_otp(true);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,4}$/.test(value)) {
      setOtp(value);
      setError(false);
    }
  };

  const handleResendCode = () => {
    setIsButtonDisabled(true);
    setTimer(30);
    setOtp("");
    notify();
    setError(false);
  };

  const notify = () => toast("Code resent");

  const Working_on_it = () => toast("Working on it");

  useEffect(() => {
    let interval;
    if (isButtonDisabled) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            setIsButtonDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isButtonDisabled]);

  // const handleSubmit = () => {
  //   if (otp !== "4456") {
  //     setError(true); // Show error if OTP is incorrect
  //   } else {
  //     setError(false);
  //     alert("OTP Verified Successfully!");
  //   }
  // };

  const validateCode = (e) => {
    const input = e.target.value;
    if (/^\d{0,10}$/.test(input)) {
      setCode(input);
      setError("");
    } else {
      setError("Please enter a valid 4-digit code.");
    }
  };

  const handleBlur = () => {
    if (code.length !== 4) {
      setError("Code must be exactly 4 digits.");
    } else {
      setError("");
    }
  };

  const handleReload = () => {
    setLoading(true);
    const timer = setTimeout(() => {
      window.location.reload();
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  };

  const AllButtons = () => {
    return (
      <div className="col-md-5">
        <div className="text-sec">
          <img
            src={require("./assets/logo.png")}
            className="img-fluid"
            alt="Logo"
            onClick={handleReload}
          />

          <h4 style={{fontSize:"30px"}}>Welcome to the Command Centre 
          <img src={require("./assets/shape.png")} alt="shape" style={{height:25,width:24,marginLeft:5}}/>
          </h4>

          <span className="desc">
            Login to access and manage the Townverse.
          </span>

          <div class="google-login-btn">
            <button type="button" onClick={Working_on_it}>
              <img src={require("./assets/google.png")} alt="Google Logo" />
              Login with Google
            </button>
          </div>

          <div class="login-container">
            <div class="separator">
              <hr />
              <span>OR</span>
              <hr />
            </div>
          </div>

          <div class="phone-login-btn">
            <button type="button" onClick={handleEmailLogin}>
              <img src={require("./assets/mobile.png")} alt="Phone Icon" />
              Login with Phone
            </button>
          </div>

          <div class="email-login-btn">
            <button type="button" onClick={Working_on_it}>
              <img src={require("./assets/mail.png")} alt="Email Icon" />
              Login with Email
            </button>
          </div>
        </div>
      </div>
    );
  };

  const EnterOtpNumber = () => {
    return (
      <div className="col-md-5">
        <div className="text-sec">
          <img
            src={require("./assets/logo.png")}
            className="img-fluid"
            alt="Logo"
            onClick={handleReload}
          />

          <h4 style={{fontSize:"32px"}}>Enter your phone number</h4>

          <span className="desc">Keep your phone closeby to verify.</span>

          <div className="inner d-flex align-items-center">
            <div className="code d-flex align-items-center">
              <img src={require("./assets/india.png")}  className="img-fluid" alt="Country" />
              <span>+91</span>
            </div>
            <input
              type="text"
              placeholder="Enter your phone number"
              value={code}
              onChange={validateCode}
              onBlur={handleBlur}
              className={`form-control ${error ? "is-invalid" : ""}`}
              style={{ borderColor: error ? "red" : "#ced4da",borderWidth:.1 }}
            />
          </div>
          <div
            className={
              code.length == 10 && error == false
                ? "active-continue-btn"
                : "continue-btn"
            }
          >
            <button
              onClick={Submit_mobile_number}
              type="submit"
              className="btn"
              style={{
                marginTop: "20px",
                // backgroundColor: code.length == 10 ? "#5D7CE3" : "#ccc",
                color: code.length < 10 ? "#A4A4A4" : "white",
                border: code.length == 10 ? "2px solid white" : null,
                borderRadius: "8px",
                padding: "14px 20px",
                fontSize: "18px",
                cursor: code.length == 10 ? "pointer" : "not-allowed",
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  };

  const OTP_View = () => {
    return (
      <div className="col-md-5">
        <div className="text-sec">
          <img
            src={require("./assets/logo.png")}
            className="img-fluid"
            alt="Logo"
            onClick={handleReload}
          />
          <h4 style={{fontSize:"32px"}}>Enter the code sent</h4>
          <span className="desc">{`Please check your texts on +91 ${code}`}</span>
          <div
            style={{
              position: "relative",
              display: "inline-block",
              marginTop: 50,
            }}
          >
            <input
              type="text"
              value={otp}
              className={`form-control ${error ? "is-invalid" : ""}`}
              onChange={handleInputChange}
              placeholder="Enter the 4 digit code"
              style={{
                color: "black",
                height: "55px",
                width: "476px",
                textAlign: "start",
                paddingLeft: 35,
                border: error ? "1px solid red" : "",
                borderRadius: "8px",
                // padding: "5px",
                fontSize: "18px",
                backgroundColor: error ? "#ffe6e6" : "white",
              }}
            />
            {error && (
              <span
                style={{
                  position: "absolute",
                  width: "20%",
                  color: "red",
                  fontSize: "12px",
                  top: "18px",
                  left: "90%",
                  transform: "translateX(-50%)",
                }}
              >
                Incorrect Code!
              </span>
            )}
          </div>

          <div
            className={
              otp.length == 4 && error == false
                ? "active-continue-btn"
                : "continue-btn"
            }
          >
            <button
              onClick={Submit_OTP_number}
              type="submit"
              className="btn"
              style={{
                marginTop: "20px",
                // backgroundColor:
                //   otp.length == 4 && error == false ?  "#5D7CE3" : "#ccc",
                color: otp.length < 4 ? "#A4A4A4" : "white",
                border:
                  otp.length == 4 && error == false ? "2px solid white" : null,
                borderRadius: "8px",
                padding: "14px 20px",
                fontSize: "18px",
                cursor:
                  otp.length == 4 && error == false ? "pointer" : "not-allowed",
              }}
            >
              Continue
            </button>
          </div>
          {/* <p className="mt-4">
        Didn't get it? <span className="resend">Resend in 1:02</span>
      </p> */}
          <p
            style={{
              marginTop: "20px",
              fontSize: "18px",
              color: "#666",
              fontWeight: "bold ",
              fontFamily: "Nunito, sans-serif",
            }}
          >
            Didn’t get it?{" "}
            <button
              onClick={handleResendCode}
              disabled={isButtonDisabled}
              style={{
                background: "none",
                border: "none",
                color: isButtonDisabled ? "gray" : "#4a90e2",
                cursor: isButtonDisabled ? "not-allowed" : "pointer",
                textDecoration: "underline",
              }}
            >
              Resend Code {isButtonDisabled && `(${timer}s)`}
            </button>
          </p>
        </div>
      </div>
    );
  };

  return (
    <section className="main position-relative">
      <div className="container">
        {loading ? (
          <ShimmerEffect></ShimmerEffect>
        ) : (
          <div className="row">
            {ShowPhonenumberView == 0 ? AllButtons() : null}
            {ShowPhonenumberView == 1 ? EnterOtpNumber() : null}
            {ShowPhonenumberView == 2 ? OTP_View() : null}

            {/* Right Section */}
            <div className="col-md-7">
              <div className="img-sec position-absolute">
                <img src={require("./assets/img.png")} className="img-fluid" alt="Illustration" />
                <p>Let's keep the world playing!</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer position="bottom-center" bodyStyle={{ color: "black" }} />
    </section>
  );
};

export default App;
