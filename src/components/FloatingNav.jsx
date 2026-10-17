import React, { useState } from 'react';
import './FloatingNav.css';
import { VolumeX, Mail, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../utils/audioPlayer';

export default function FloatingNav({ isEnvelopeOpen, onCloseEnvelope, onOpenRsvp }) {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const toggleMusic = () => {
    soundManager.playClickSound();
    const playing = soundManager.toggleBackgroundMusic((state) => {
      setIsPlayingMusic(state);
    });
    setIsPlayingMusic(playing);
  };

  const scrollToSection = (id) => {
    soundManager.playClickSound();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="floating-nav-bar" aria-label="Menu điều hướng nhanh">
      {/* Re-seal envelope button (when letter is open) */}
      {isEnvelopeOpen && (
        <button
          className="envelope-reseal-btn"
          onClick={() => {
            soundManager.playClickSound();
            onCloseEnvelope();
          }}
          title="Đóng phong bì và xem lại hiệu ứng mở thư"
        >
          <Mail size={14} />
          <span>Đóng bì thư</span>
        </button>
      )}

      {/* Nav links (hidden on very small screens to keep clean) */}
      <ul className="nav-links-list">
        <li>
          <button className="nav-link-btn" onClick={() => scrollToSection('invitation-letter')}>
            Thư Mời
          </button>
        </li>
        <li>
          <button className="nav-link-btn" onClick={() => scrollToSection('location-section')}>
            Địa Điểm
          </button>
        </li>
        <li>
          <button className="nav-link-btn" onClick={() => scrollToSection('guestbook-section')}>
            Lời Chúc
          </button>
        </li>
      </ul>

      <div className="nav-divider-v"></div>

      <button className="audio-toggle-btn" onClick={onOpenRsvp} title="Xác nhận tham dự">
        <CheckCircle2 size={16} />
        <span>Xác nhận</span>
      </button>

      <div className="nav-divider-v"></div>

      {/* Music Audio Toggle */}
      <button
        className="audio-toggle-btn"
        onClick={toggleMusic}
        title={isPlayingMusic ? 'Tắt nhạc nền' : 'Bật nhạc nền tốt nghiệp'}
      >
        {isPlayingMusic ? (
          <>
            <div className="audio-equalizer">
              <span className="audio-bar"></span>
              <span className="audio-bar"></span>
              <span className="audio-bar"></span>
            </div>
            <span>Nhạc: Bật</span>
          </>
        ) : (
          <>
            <VolumeX size={16} />
            <span>Bật nhạc</span>
          </>
        )}
      </button>
    </nav>
  );
}
