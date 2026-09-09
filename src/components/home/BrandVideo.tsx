"use client";

import { useRef, useState } from "react";

export function BrandVideo() {
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [opened, setOpened] = useState(false);

  function close() {
    video.current?.pause();
    dialog.current?.close();
  }

  return (
    <div className="sb-film-entry">
      <button
        type="button"
        className="sb-text-link"
        aria-haspopup="dialog"
        onClick={() => {
          setOpened(true);
          dialog.current?.showModal();
        }}
      >
        <span className="sb-play" aria-hidden="true">
          <svg viewBox="0 0 16 16" width="13" height="13">
            <path d="m6 3 7 5-7 5Z" fill="currentColor" />
          </svg>
        </span>
        Watch SMS Buddy in 15 seconds
      </button>
      <dialog
        ref={dialog}
        className="sb-film-dialog"
        aria-labelledby="sb-film-title"
        onClose={() => {
          video.current?.pause();
          video.current?.load();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="sb-film-panel">
          <div className="sb-film-heading">
            <h2 id="sb-film-title">Small messages. Stronger connections.</h2>
            <button type="button" onClick={close} aria-label="Close video">
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                <path d="m6 6 12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </button>
          </div>
          {opened && (
            <video
              ref={video}
              controls
              playsInline
              preload="none"
              poster="/videos/smsbuddy-poster.jpg"
              width="1280"
              height="720"
              aria-label="SMS Buddy promotional video, 15 seconds. All messaging appears on screen; audio is instrumental."
            >
              <source src="/videos/smsbuddy-website.mp4" type="video/mp4" />
              <a href="/videos/smsbuddy-website.mp4">Watch the SMS Buddy video</a>
            </video>
          )}
        </div>
      </dialog>
    </div>
  );
}
