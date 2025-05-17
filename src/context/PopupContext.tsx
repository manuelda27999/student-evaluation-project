"use client";

import { createContext, useContext, useState } from "react";

const PopupContext = createContext<{
  showPopup: boolean;
  title: string;
  content: string;
  openPopup: (title: string, content: string) => void;
  closePopup: () => void;
}>({
  showPopup: false,
  title: "",
  content: "",
  openPopup: () => {},
  closePopup: () => {},
});

export const PopupProvider = ({ children }: { children: React.ReactNode }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const openPopup = (title: string, content: string) => {
    setShowPopup(true);
    setTitle(title);
    setContent(content);
  };

  const closePopup = () => {
    setShowPopup(false);
    setTitle("");
    setContent("");
  };

  return (
    <PopupContext.Provider
      value={{ showPopup, title, content, openPopup, closePopup }}
    >
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => useContext(PopupContext);
