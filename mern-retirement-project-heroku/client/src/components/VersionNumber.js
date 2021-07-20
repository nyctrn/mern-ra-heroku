import { useState } from "react";

const VersionNumber = () => {
  const [show, setShow] = useState(false);

  setTimeout(() => {
    setShow(true);
  }, 200);
  return (
    show && (
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "110px",
        }}
      >
        <span>v0.7.0</span>
        <br />
        <br />
        <a href="https://github.com/nyctrn">GitHub</a>
        <br />
        <a
          style={{ position: "relative", left: "-70px" }}
          href="mailto:marioskourk@gmail.com"
        >
          marioskourk@gmail.com
        </a>
      </div>
    )
  );
};

export default VersionNumber;
