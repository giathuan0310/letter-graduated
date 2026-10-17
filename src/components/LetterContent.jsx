import React, { useState, useEffect } from 'react';
import './LetterContent.css';
import { Clock, MapPin, MessageSquareHeart, Award, Sparkles, X, Maximize2 } from 'lucide-react';
import { soundManager } from '../utils/audioPlayer';

export default function LetterContent({ graduationData }) {
  const { graduate, event, location } = graduationData;
  const [isPhotoZoomed, setIsPhotoZoomed] = useState(false);

  // Countdown Timer State
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date(event.ceremonyDate).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [event.ceremonyDate]);

  return (
    <section className="letter-section" id="invitation-letter">
      <div className="letter-parchment-sheet">
        {/* Double inner gold border and ornate corners */}
        <div className="letter-inner-border"></div>
        <div className="letter-corner-decor corner-tl"></div>
        <div className="letter-corner-decor corner-tr"></div>
        <div className="letter-corner-decor corner-bl"></div>
        <div className="letter-corner-decor corner-br"></div>

        {/* Top Crest & Formal Title */}
        <div className="letter-crest-header">
          <div className="letter-wreath-icon">🎓</div>
          <span className="letter-top-sub">Thư Mời Trang Trọng</span>
          <h2 className="letter-formal-heading">LỄ TỐT NGHIỆP ĐẠI HỌC</h2>
          <div className="letter-divider-gold">
            <span>✦</span>
            <span>✦</span>
            <span>✦</span>
          </div>
        </div>

        {/* Recipient Greeting */}
        <div className="letter-greeting-recipient">
          Kính gửi: <span>Quý Thầy Cô, Gia Đình & Bạn Bè</span>
        </div>

        {/* Heartfelt Letter Body */}
        <div className="letter-invitation-body">
          <p>
            Sau những năm tháng miệt mài học tập và nghiên cứu dưới mái trường đại học, ngày lễ tốt nghiệp
            đánh dấu cột mốc quan trọng nhất trên con đường trưởng thành của tôi. Sự thành công ngày hôm nay
            không thể thiếu tình yêu thương, sự dạy bảo tận tình của quý thầy cô, sự hy sinh thầm lặng của gia đình
            cùng sự đồng hành sẻ chia của những người bạn tuyệt vời.
          </p>
          <p style={{ marginTop: '12px' }}>
            Tôi trân trọng kính mời bạn đến chung vui, chụp ảnh kỷ niệm và chứng kiến khoảnh khắc nhận bằng kỹ sư
            trang trọng của tôi:
          </p>
        </div>

        {/* Graduate Spotlight Card with Photo Zoom */}
        <div className="graduate-spotlight-card">
          <div
            className="graduate-avatar-frame"
            onClick={() => {
              soundManager.playClickSound();
              setIsPhotoZoomed(true);
            }}
            style={{ cursor: 'pointer' }}
            title="Nhấn để xem ảnh phóng to"
          >
            <img
              src={graduate.avatar}
              alt={graduate.fullName}
              className="graduate-photo"
              loading="eager"
            />
            <div className="graduate-honor-tag">
              <Award size={13} style={{ display: 'inline', marginRight: '4px' }} />
              {graduate.degree}
            </div>
            <div
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                background: 'rgba(0,0,0,0.55)',
                color: '#fff',
                borderRadius: '50%',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Maximize2 size={12} />
            </div>
          </div>
          <div className="graduate-details">
            <span className="graduate-label-sub">{graduate.title}</span>
            <h3 className="graduate-name">{graduate.fullName}</h3>
            <p className="graduate-degree-name">{graduate.major}</p>
            <p className="graduate-univ">{graduate.university} • Niên khóa {graduate.graduationYear}</p>
            <div className="graduate-quote-box">
              "{graduate.quote}"
            </div>
          </div>
        </div>

        {/* KEY HIGHLIGHT: Ceremony Time & Location Banner */}
        <div className="event-core-highlight-box">
          <div className="event-highlight-grid">
            {/* Time Card */}
            <div className="event-highlight-card">
              <div className="highlight-card-icon">
                <Clock size={24} />
              </div>
              <div className="highlight-card-info">
                <h4>Thời Gian Tổ Chức</h4>
                <div className="main-text">{event.timeSpan}</div>
                <div className="sub-text">{event.dateFormatted}</div>
                <div className="sub-text" style={{ fontSize: '0.8rem', opacity: 0.8, marginTop: '2px' }}>
                  ({event.lunarDate})
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="event-highlight-card">
              <div className="highlight-card-icon">
                <MapPin size={24} />
              </div>
              <div className="highlight-card-info">
                <h4>Địa Điểm Tốt Nghiệp</h4>
                <div className="main-text">{location.venueName}</div>
                <div className="sub-text">{location.address}</div>
                <div className="sub-text" style={{ fontSize: '0.8rem', color: 'var(--gold-light)', marginTop: '2px' }}>
                  📍 {location.hallDetail}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="countdown-container">
          <div className="countdown-title">
            ⏳ Đếm ngược đến khoảnh khắc tốt nghiệp
          </div>
          <div className="countdown-digits-row">
            <div className="countdown-box">
              <span className="countdown-number">{String(timeLeft.days).padStart(2, '0')}</span>
              <span className="countdown-unit">Ngày</span>
            </div>
            <div className="countdown-box">
              <span className="countdown-number">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="countdown-unit">Giờ</span>
            </div>
            <div className="countdown-box">
              <span className="countdown-number">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="countdown-unit">Phút</span>
            </div>
            <div className="countdown-box">
              <span className="countdown-number">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="countdown-unit">Giây</span>
            </div>
          </div>
        </div>

        {/* Action Button Bar */}
        <div className="letter-actions-bar">
          <button
            className="btn-letter-primary"
            onClick={() => {
              soundManager.playClickSound();
              const el = document.getElementById('guestbook-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <MessageSquareHeart size={18} />
            <span>Gửi lời chúc mừng</span>
          </button>

          <button
            className="btn-letter-outline"
            onClick={() => {
              soundManager.playClickSound();
              const el = document.getElementById('location-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <MapPin size={18} />
            <span>Xem địa điểm & Bản đồ</span>
          </button>
        </div>
      </div>

      {/* Fullscreen Photo Lightbox for Graduate Photo */}
      {isPhotoZoomed && (
        <div
          className="lightbox-backdrop"
          onClick={() => {
            soundManager.playClickSound();
            setIsPhotoZoomed(false);
          }}
        >
          <div className="lightbox-content-box" onClick={(e) => e.stopPropagation()}>
            <button
              className="lightbox-close-btn"
              onClick={() => {
                soundManager.playClickSound();
                setIsPhotoZoomed(false);
              }}
              title="Đóng"
            >
              <X size={22} />
            </button>
            <div className="lightbox-img-frame">
              <img src={graduate.avatar} alt={graduate.fullName} />
            </div>
            <div className="lightbox-info-bar">
              <h3 className="lightbox-title">{graduate.fullName}</h3>
              <p className="lightbox-caption">{graduate.degree} • {graduate.major}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
