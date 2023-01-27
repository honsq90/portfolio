import { GatsbyImage } from "gatsby-plugin-image";
import React, { useEffect, useState } from "react";
import Modal from 'react-modal';

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

  return <Modal
    overlayClassName="z-10 inset-0 fixed"
    className="inset-0 absolute bg-slate-800 justify-center flex"
    isOpen={modalIsOpen}
    contentLabel={selectedImage.title}
    onRequestClose={() => setModalIsOpen(false)}
    ariaHideApp={false}
  >
    <GatsbyImage image={selectedImage.fullScreen} alt={selectedImage.title} objectFit="contain" />
  </Modal>

}