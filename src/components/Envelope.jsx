import React, { useState } from 'react';
import './Envelope.css';
import { Mail, Sparkles, ChevronDown } from 'lucide-react';
import { soundManager } from '../utils/audioPlayer';
import { launchGraduationConfetti } from '../utils/confetti';

export default function Envelope({ isOpen, onOpen, graduate }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleOpenClick = () => {
    soundManager.playEnvelopeOpenSound();
    launchGraduationConfetti();
    // Also initiate background ambient music
    soundManager.startBackgroundMusic();
    onOpen();
  };

  return (
    <section className="envelope-wrapper" id="envelope-section">
      <div className="envelope-aurora"></div>

      {/* Intro Header */}
      <div className="envelope-header-intro">
        <p className="envelope-subtitle">Trân trọng kính mời</p>
        <h1 className="envelope-main-title">
          LỄ TỐT NGHIỆP
          <span>Graduation Ceremony</span>
        </h1>
      </div>

      {/* 3D Envelope */}
      <div
        className={`envelope-3d-box ${isOpen ? 'is-open' : ''}`}
        onClick={handleOpenClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="button"
        tabIndex={0}
        aria-label="Mở phong bì thư mời tốt nghiệp"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleOpenClick();
          }
        }}
      >
        {/* Corner filigrees */}
        <div className="envelope-filigree filigree-tl"></div>
        <div className="envelope-filigree filigree-tr"></div>
        <div className="envelope-filigree filigree-bl"></div>
        <div className="envelope-filigree filigree-br"></div>

        {/* Peek of the letter inside */}
        <div className="letter-inside-peek">
          <div className="letter-peek-crest">🎓</div>
          <span className="letter-peek-title">THƯ MỜI TỐT NGHIỆP</span>
          <span className="letter-peek-name">{graduate.fullName}</span>
          <span style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>
            {graduate.degree}
          </span>
        </div>

        {/* Envelope folds */}
        <div className="envelope-fold-left"></div>
        <div className="envelope-fold-right"></div>
        <div className="envelope-fold-bottom"></div>

        {/* Recipient tag */}
        <div className="envelope-recipient-badge">
          <span className="label-to">Kính gửi</span>
          <div className="guest-name">
            Quý Thầy Cô, Gia Đình & Bạn Bè
          </div>
        </div>

        {/* Flap */}
        <div className={`envelope-flap ${isOpen ? 'is-open' : ''}`}></div>

        {/* Wax Seal */}
        <div className={`wax-seal ${isOpen ? 'broken' : ''}`} title="Chạm để bẻ sáp niêm phong và mở thư">
          <span className="wax-seal-icon">🎓</span>
          <span className="wax-seal-text">GRAD 2026</span>
        </div>
      </div>

      {/* Action CTA */}
      <div className="envelope-cta">
        <button className="envelope-cta-btn" onClick={handleOpenClick}>
          <Sparkles size={18} />
          <span>Chạm để mở thư mời</span>
        </button>
        <p className="envelope-hint">
          <Mail size={14} /> Chạm vào con dấu sáp vàng để mở phong bì
        </p>
      </div>
    </section>
  );
}
