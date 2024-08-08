import React, { useState, useEffect } from "react";
import PuffLoader from "react-spinners/PuffLoader";

const Spinner = ({
  loading = true,
  size = 60,
  color = "#36d7b7",
  customStyles = {},
  text = "",
  longText = "",
}) => {
  const [showLongText, setShowLongText] = useState(false);

  useEffect(() => {
    if (loading && longText) {
      const timer = setTimeout(() => {
        setShowLongText(true);
      }, 7000);

      return () => clearTimeout(timer);
    }
  }, [loading, longText]);

  return (
    <div style={{ ...styles.container, ...customStyles }}>
      <PuffLoader loading={loading} size={size} color={color} />
      <p className="text-white pt-3">{showLongText ? longText : text}</p>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default Spinner;
