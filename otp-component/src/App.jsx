import { useRef, useState, useEffect } from "react";
import "./index.css";

export default function App() {
  return (
    <div className="App">
      <CustomOtpCmp otpLength={6} />
    </div>
  );
}

const isNumber = (input) => {
  return typeof input === "number" && !isNaN(input);
};

const CustomOtpCmp = ({ otpLength }) => {
  const [otpInputVal, setOtpInputVal] = useState(Array(otpLength).fill(""));
  const [activeOtpIdx, setActiveOtpIdx] = useState(0);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const otpInputRef = useRef(Array(otpLength).fill(null));
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);

  useEffect(() => {
    // focus first box
    otpInputRef.current?.[activeOtpIdx]?.focus();
  }, [activeOtpIdx]);

  useEffect(() => {
    // handle submit btn activation
    let isOtpUnavailable = otpInputVal.some?.(
      (val) => val === null || val === undefined || val === ""
    );
    setIsSubmitDisabled(isOtpUnavailable);
  }, [otpInputVal]);

  const setRef = (el, i) => {
    otpInputRef.current[i] = el;
  };

  const handleInputFocus = (e) => {
    const dataId = +e.target.getAttribute("data-id");
    setActiveOtpIdx(dataId);
  };

  const handleInputChange = (e) => {
    let input = e.target.value;
    if (input) {
      input = input.slice(0, 1);
      input = isNumber(+input) ? input : "";
      setOtpInputVal((prev) => {
        let copyArr = [...prev];
        copyArr[activeOtpIdx] = input;
        return copyArr;
      });
      if (input !== "")
        setActiveOtpIdx((prev) => {
          return prev < otpLength - 1
            ? prev + 1
            : otpInputRef.current?.[activeOtpIdx]?.blur();
        });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Delete" || e.key === "Backspace") {
      let noInputExist =
        otpInputVal[activeOtpIdx] === "" ||
        otpInputVal[activeOtpIdx] === null ||
        otpInputVal[activeOtpIdx] === undefined;

      setOtpInputVal((prev) => {
        let copyArr = [...prev];
        copyArr[activeOtpIdx] = "";
        return copyArr;
      });
      if (noInputExist) {
        setActiveOtpIdx((prev) => {
          return prev > 0
            ? prev - 1
            : otpInputRef.current?.[activeOtpIdx]?.blur();
        });
      }
      return;
    }

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActiveOtpIdx((prev) => {
        return prev > 0
          ? prev - 1
          : otpInputRef.current?.[activeOtpIdx]?.blur();
      });
      return;
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setActiveOtpIdx((prev) => {
        return prev < otpLength - 1
          ? prev + 1
          : otpInputRef.current?.[activeOtpIdx]?.blur();
      });
      return;
    }
  };

  const handleOtpSubmit = () => {
    setShowSuccessScreen(true);
  };

  return (
    <div className="otp-parent">
      {showSuccessScreen ? (
        <p>OTP submitted !!</p>
      ) : (
        <>
          <div className="otp-input-container" onKeyDown={handleKeyDown}>
            {otpInputVal.map((val, idx) => (
              <input
                className={`otp-input ${
                  activeOtpIdx === idx ? "selected" : ""
                }`}
                type="text"
                inputMode="numeric"
                pattern="\d*"
                data-id={idx}
                key={idx}
                value={val}
                ref={(el) => setRef(el, idx)}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            ))}
          </div>

          <button disabled={isSubmitDisabled} onClick={handleOtpSubmit}>
            Submit
          </button>
        </>
      )}
    </div>
  );
};

/*

1. state - input array of same OTP length - fill with null
2. map over the array input to render UI and focus on first using useRef array
3. maintain active input index to do everything
4. listen to backspace and delete.
  - delete focussed value and move to last box

otp input

1. custom OTP length - only numbers
2. after input, focus should move to next box 
  - highlight current box with border
3. on delete / backspace, delete current value and focus to move to previous
  - delete after all filled will start deleting the last input
4. submit button to disable and enable, when each is filled

5. copy paste OTP
6.  


*/
