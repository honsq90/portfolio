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

  return <Modal
    overlayClassName="z-10 inset-0 fixed"
    className="inset-0 absolute bg-slate-800 justify-center flex"
    isOpen={modalIsOpen}
    contentLabel={selectedImage.title}
    onRequestClose={closeModal}
    ariaHideApp={false}
  >
    <GatsbyImage image={selectedImage.fullScreen} alt={selectedImage.title} objectFit="contain" />
    <button type="button" className="text-white p-2 fixed text-4xl left-0 right-3/4 top-10 bottom-0 focus:border-0"
      onClick={() => window.postMessage({ type: "image-left" })} title="Prev">
    </button>
    <button type="button" className="text-white p-2 fixed text-4xl right-0 left-3/4 top-10 bottom-0 focus:border-0"
      onClick={() => window.postMessage({ type: "image-right" })} title="Next">
    </button>
    <button type="button" className="text-white p-2 fixed right-0" onClick={closeModal}>
      &#9587;
    </button>
  </Modal>

}