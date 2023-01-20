const Content = ({ children }) => {
  return (
    <div
      style={{
        maxHeight: "90vh",
        overflowY: "scroll",
        padding: "1rem 0.5rem 0rem 0.5rem"
      }}
    >
      {children}
    </div>
  );
};

export default Content;
