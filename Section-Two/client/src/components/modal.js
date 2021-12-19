import ReactDom from "react-dom";

const modal = {
  position: "fixed",
  top: "50%",
  left: "50%",
  width: "650px",
  maxWidth: "100%",
  height: "500px",
  maxHeight: "100%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "75px",
  zIndex: 1000,
};

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, .5)",
  zIndex: 1000,
};

const Modal = ({ open, children, onClose }) => {
  if (!open) return null;
  return ReactDom.createPortal(
    <>
      <div style={overlay} />
      <div style={modal}>
        {children}
        <button className="cancel-edit" onClick={onClose}>
          Cancel Edit
        </button>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
