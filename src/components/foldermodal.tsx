import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import Image from "next/image";
import fileImg from "@/../public/file.png";

const FolderModal = ({
  item,
  closeModal,
  onFileClick,
}: {
  item: folder;
  closeModal: () => void;
  onFileClick: (file: file) => void;
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

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
    const centerX = window.innerWidth / 2 - 250;
    const centerY = window.innerHeight / 2 - 200;
    setPosition({ x: centerX, y: centerY });
  }, []);

  const handleUrl = (url: string) => {
    if (window === undefined) return;
    window.open(url, "_blank");
  };

  return (
    <Draggable
      position={position}
      onStop={(e, data) => setPosition({ x: data.x, y: data.y })}
    >
      <div
        className="fixed bg-black text-white border-white border-2 border-b-4 p-4 pixelated"
        style={{ minWidth: "50rem", minHeight: "20rem" }} // Adjust size as needed
      >
        <div className="flex flex-row border-b border-white/50 border-dotted mt-2">
          <h1 className="flex-grow">{item.name}</h1>
          <button className="hover:text-white/60" onClick={closeModal}>
            x
          </button>
        </div>
        <div className="p-4">
          {item.files.map((file) => (
            <div key={file.name} className="flex flex-row items-center gap-2">
              <Image src={fileImg} alt="File" width={24} height={24} />
              <p
                className="cursor-pointer hover:underline"
                onClick={() => {
                  if (file.haveContent) {
                    onFileClick(file);
                  } else {
                    handleUrl(file.url as string);
                  }
                }}
              >
                {file.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Draggable>
  );
};

export default FolderModal;
