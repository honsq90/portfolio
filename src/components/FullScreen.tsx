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

const toggleFullScreen = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    document.documentElement.requestFullscreen()
  }
};


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
        history.pushState(null, '', `#${event.data.node.title.replace(" ", "_")}`);
      }
    };

    const hotkeyFullscreen = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() == "f") {
        toggleFullScreen()
      }
    }

    window.addEventListener("message", processMessage)
    window.addEventListener("keydown", hotkeyFullscreen)
    return () => {
      window.removeEventListener("message", processMessage)
      window.removeEventListener("keydown", hotkeyFullscreen)
    }
  }, [])

  if (!selectedImage) {
    return null
  }

  const closeModal = () => {
    setModalIsOpen(false);
    history.pushState(null, '', window.location.pathname);
  };

  return <Modal
    overlayClassName="z-10 inset-0 fixed"
    className="inset-0 absolute justify-center flex"
    style={{
      overlay: {
        backgroundColor: selectedImage.fullScreen.backgroundColor
      }
    }}
    isOpen={modalIsOpen}
    contentLabel={selectedImage.title}
    onRequestClose={closeModal}
    ariaHideApp={false}
  >
    <GatsbyImage image={selectedImage.fullScreen} alt={selectedImage.title} objectFit="contain" />
    <button type="button" className={`text-white p-2 absolute w-1/2 md:w-1/4 left-0 top-10 bottom-10 focus:border-0`}
      onClick={() => window.postMessage({ type: "image-left" })} title="Prev">
      &nbsp;
    </button>
    <button type="button" className={`text-white p-2 absolute w-1/2 md:w-1/4 right-0 top-10 bottom-10 focus:border-0`}
      onClick={() => window.postMessage({ type: "image-right" })} title="Next">
      &nbsp;
    </button>
    <button type="button" className="text-white p-2 text-2xl absolute right-0 focus:border-0" title="Close"
      onClick={closeModal}>
      &#x2715;
    </button>
    <button type="button" className="text-white p-2 text-2xl absolute right-0 focus:border-0 bottom-0" title="Toggle fullscreen"
      onClick={toggleFullScreen}>
      &#x26F6;
    </button>
  </Modal>

}