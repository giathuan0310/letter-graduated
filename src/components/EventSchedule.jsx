import React from 'react';
import './EventSchedule.css';
import { Camera, Award, Sparkles, Coffee, Clock } from 'lucide-react';

const iconMap = {
  Camera: Camera,
  Award: Award,
  Sparkles: Sparkles,
  Coffee: Coffee
};

export default function EventSchedule({ schedule }) {
  return (
    <section className="schedule-section" id="schedule-section">
      <div className="container">
        <div className="section-header-center">
          <span className="section-tag-gold">Chương Trình Lễ Tốt Nghiệp</span>
          <h2 className="section-title-luxury">Lịch Trình Chi Tiết</h2>
          <p className="section-desc">
            Kính mời quý thầy cô, gia đình và bạn bè lưu ý các mốc thời gian để cùng ghi dấu những khoảnh khắc đẹp nhất!
          </p>
        </div>

        <div className="timeline-track-wrapper">
          {schedule.map((item, index) => {
            const IconComponent = iconMap[item.icon] || Clock;

            return (
              <div key={index} className="timeline-item">
                <div className="timeline-node-icon">
                  <IconComponent size={22} />
                </div>
                <div className="timeline-card">
                  <div className="timeline-card-header">
                    <span className="timeline-badge-time">{item.time}</span>
                  </div>
                  <h3 className="timeline-card-title">{item.title}</h3>
                  <p className="timeline-card-desc">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
