import React from "react";
import PuffLoader from "react-spinners/PuffLoader";

const Spinner = ({
  loading = true,
  size = 60,
  color = "#36d7b7",
  customStyles = {},
}) => {
  return (
    <div style={{ ...styles.container, ...customStyles }}>
      <PuffLoader loading={loading} size={size} color={color} />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default Spinner;
