import { GatsbyImage } from "gatsby-plugin-image";
import React, { useEffect, useRef, useState } from "react";
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
  const [copied, setCopied] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

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

  const goLeft = () => window.postMessage({ type: "image-left" })
  const goRight = () => window.postMessage({ type: "image-right" })

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    })

  };

  const closeModal = () => {
    setModalIsOpen(false);
    history.pushState(null, '', window.location.pathname);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX < 0) goRight();
      else goLeft();
    }

    touchStartX.current = null;
    touchStartY.current = null;
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
    <div
      className="w-full h-full flex justify-center"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <GatsbyImage image={selectedImage.fullScreen} alt={selectedImage.title} objectFit="contain" />
    </div>

    <div id="desktop-nav" className="hidden md:block">
      <button type="button" className={`text-white p-2 absolute w-1/2 md:w-1/4 left-0 top-10 bottom-10 focus:border-0`}
        onClick={goLeft} title="Prev">
        &nbsp;
      </button>
      <button type="button" className={`text-white p-2 absolute w-1/2 md:w-1/4 right-0 top-10 bottom-10 focus:border-0`}
        onClick={goRight} title="Next">
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
    </div>

    {/* Bottom bar — close left, fullscreen right */}
    <div id="mobile-nav" className="md:hidden absolute bottom-0 left-0 right-0 flex justify-between items-center px-4 py-3 bg-slate-950">
      <button
        type="button"
        className="text-white text-2xl focus:border-0 disabled:opacity-30 md:hidden"
        title="Previous"
        aria-label="Previous image"
        onClick={goLeft}
      >
        &#x276E;
      </button>
      <button
        type="button"
        className="text-white text-2xl focus:border-0"
        title="Close"
        aria-label="Close"
        onClick={closeModal}
      >
        &#x2715;
      </button>
      {navigator.clipboard && <button
        type="button"
        className="text-white text-2xl focus:border-0"
        aria-label="Copy link"
        onClick={copyLink}
        title={copied ? "Copied!" : "Copy link"}
      >
        {copied ? "✅" : "🔗"}
      </button>}
      <button
        type="button"
        className="text-white text-2xl focus:border-0 disabled:opacity-30 md:hidden"
        title="Next"
        aria-label="Next image"
        onClick={goRight}
      >
        &#x276F;
      </button>
    </div>
  </Modal>
}