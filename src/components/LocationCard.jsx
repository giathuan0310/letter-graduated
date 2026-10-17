import React, { useState } from 'react';
import './LocationCard.css';
import { MapPin, Navigation, Copy, Check, Car, Compass, Info } from 'lucide-react';
import { soundManager } from '../utils/audioPlayer';

export default function LocationCard({ location }) {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    soundManager.playClickSound();
    navigator.clipboard.writeText(`${location.venueName}, ${location.address}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="location-section" id="location-section">
      <div className="container">
        <div className="section-header-center">
          <span className="section-tag-gold">Địa Điểm Tổ Chức</span>
          <h2 className="section-title-luxury">Nơi Diễn Ra Buổi Lễ</h2>
          <p className="section-desc">
            Vị trí thuận lợi tại trung tâm thành phố, thuận tiện cho việc di chuyển và đón tiếp quan khách.
          </p>
        </div>

        <div className="location-grid-layout">
          {/* Location Info */}
          <div className="location-info-panel">
            <div>
              <div className="location-badge-top">
                <Compass size={16} />
                <span>Trực tiếp tại Hội trường</span>
              </div>
              <h3 className="location-venue-name">{location.venueName}</h3>

              <div className="location-address-row">
                <MapPin size={22} />
                <span>{location.address}</span>
              </div>

              {/* Guidelines */}
              <div className="location-tips-grid">
                <div className="location-tip-card">
                  <Info size={20} />
                  <div>
                    <div className="tip-title">Lối vào & Hội trường</div>
                    <div className="tip-desc">{location.hallDetail}</div>
                  </div>
                </div>

                <div className="location-tip-card">
                  <Car size={20} />
                  <div>
                    <div className="tip-title">Bãi Đỗ Xe</div>
                    <div className="tip-desc">{location.parkingInfo}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="location-buttons-group">
              <a
                href={location.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
                onClick={() => soundManager.playClickSound()}
              >
                <Navigation size={18} />
                <span>Mở Google Maps chỉ đường</span>
              </a>

              <button className="btn-outline-gold" onClick={handleCopyAddress}>
                {copied ? <Check size={18} color="#4ade80" /> : <Copy size={18} />}
                <span>{copied ? 'Đã sao chép địa chỉ!' : 'Sao chép địa chỉ'}</span>
              </button>
            </div>
          </div>

          {/* Embedded Google Maps */}
          <div className="location-map-frame">
            <iframe
              title="Bản đồ địa điểm Lễ Tốt Nghiệp"
              src={location.embedMapUrl}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="map-floating-overlay-tag">
              <MapPin size={14} color="#ffd700" />
              <span>Hội Trường E4 - IUH</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
