import { GatsbyImage } from "gatsby-plugin-image";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";

interface PhotoWindowDataNode {
  id: string;
  title: string;
  fullScreen: import('gatsby-plugin-image').IGatsbyImageData
}

interface PhotoWindowData {
  type: string;
  node: PhotoWindowDataNode;
}

export function FullScreen() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<PhotoWindowDataNode>()

  useEffect(() => {
    const processMessage = (event: MessageEvent<PhotoWindowData>): void => {
      if (event.data.type == "image-clicked") {
        setSelectedImage(event.data.node)
        setModalIsOpen(true)
      } else if (event.data.type == "image-requested") {
        setSelectedImage(event.data.node)
      }
    };
    window.addEventListener("message", processMessage)
    return () => {
      window.removeEventListener("message", processMessage)
    }
  }, [])

  if (!selectedImage) {
    return null
  }

  const closeModal = () => setModalIsOpen(false);

  const query = new URLSearchParams(window.location.search)
  const devMode = query.get("dev")

  return <Modal
    overlayClassName="z-10 inset-0 fixed"
    className="inset-0 absolute bg-slate-800 justify-center flex"
    isOpen={modalIsOpen}
    contentLabel={selectedImage.title}
    onRequestClose={closeModal}
    ariaHideApp={false}
  >
    <GatsbyImage image={selectedImage.fullScreen} alt={selectedImage.title} objectFit="contain" />
    <button type="button" className={`text-white p-2 absolute w-1/2 md:w-1/4 left-0 top-10 bottom-0 focus:border-0 ${devMode && "border-2 border-red-700"}`}
      onClick={() => window.postMessage({ type: "image-left" })} title="Prev">
      &nbsp;
    </button>
    <button type="button" className={`text-white p-2 absolute w-1/2 md:w-1/4 right-0 top-10 bottom-0 focus:border-0 ${devMode && "border-2 border-red-700"}`}
      onClick={() => window.postMessage({ type: "image-right" })} title="Next">
      &nbsp;
    </button>
    <button type="button" className="text-white p-2 text-2xl absolute right-0" onClick={closeModal}>
      &#9587;
    </button>
  </Modal>

}