import React, { useEffect } from "react";
import Draggable from "react-draggable";

const FileModal = ({
  item,
  closeModal,
}: {
  item: file;
  closeModal: () => void;
}) => {
  const [postion, setPosition] = React.useState({ x: 0, y: 0 });
  useEffect(() => {
    if (window === undefined) return;
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [closeModal]);

  useEffect(() => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    setPosition({ x: centerX, y: centerY });
  }, []);

  return (
    <Draggable
      position={postion}
      onStop={(_, data) => {
        setPosition({ x: data.x, y: data.y });
      }}
    >
      <div
        className="fixed bg-black text-white border-white border-2 border-b-4 p-4"
        style={{ minWidth: "20rem", minHeight: "10rem" }}
      >
        <div className="flex flex-row border-b border-white/50 border-dotted mt-2">
          <h1 className="flex-grow">{item.name}</h1>
          <button className="hover:text-white/60" onClick={closeModal}>
            x
          </button>
        </div>
        <div className="p-4">
          {item.haveContent ? (
            <p>{item.content}</p>
          ) : (
            <p className="text-white/50">Nothing to show.</p>
          )}
        </div>
      </div>
    </Draggable>
  );
};

export default FileModal;
