"use client";
import FileModal from "@/components/filemoda";
import FolderModel from "@/components/foldermodal";
import ItemGrid from "@/components/ItemGrid";
import RandomQuote from "@/components/RandomQuote";
import { files, folders } from "@/lib/data";
import { quotes } from "@/lib/quotes";
import React, { useEffect } from "react";
const Home = () => {
  const [selectedFolder, setSelectedFolder] = React.useState<folder | null>(
    null
  );
  const [selectedFile, setSelectedFile] = React.useState<file | null>(null);
  const nakedFiles = files.filter((file) => !file.isInFolder);
  const [randomQuote, setRandomQuote] = React.useState<{
    quote: string;
    author: string;
  } | null>(null);
  const allItems = [...nakedFiles, ...folders];
  allItems.sort((a, b) => a.name.length - b.name.length);

  const handleFileModal = (file: file) => {
    setSelectedFile(file);
  };
  const handleFolderModal = (folder: folder) => {
    setSelectedFolder(folder);
  };

  const closeModals = () => {
    setSelectedFile(null);
    setSelectedFolder(null);
  };

  useEffect(() => {
    const chooseRandomQuote = () => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      return quotes[randomIndex];
    };

    setRandomQuote(chooseRandomQuote());
  }, []);

  return (
    <main className="h-screen w-full relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="movie-bg" />
        <div className="movie-bg-s" />
        <video
          src="./bg.mp4"
          autoPlay
          muted
          loop
          className="h-full w-full object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent flex flex-col justify-center items-center text-6xl text-white font-bold w-full pointer-events-none select-none">
        <RandomQuote quote={randomQuote} />
      </div>

      <div className="absolute inset-0 flex justify-start p-4">
        <div className="h-full overflow-y-auto">
          <ItemGrid
            items={allItems}
            onFileClick={handleFileModal}
            onFolderClick={handleFolderModal}
          />
        </div>
      </div>
      {selectedFile && (
        <FileModal item={selectedFile} closeModal={closeModals} />
      )}

      {selectedFolder && (
        <FolderModel
          item={selectedFolder}
          closeModal={closeModals}
          onFileClick={handleFileModal}
        />
      )}
    </main>
  );
};

export default Home;
