import React from 'react';
import './Footer.css';
import { Phone, Mail, GraduationCap, Heart } from 'lucide-react';

export default function Footer({ graduate }) {
  return (
    <footer className="graduation-footer">
      <div className="footer-crest">🎓</div>
      <h3 className="footer-name">{graduate.fullName}</h3>
      <p className="footer-degree">
        {graduate.degree} • {graduate.university}
      </p>

      <div className="footer-contact-row">
        <a href={`tel:${graduate.phone.replace(/\s+/g, '')}`} className="footer-contact-item">
          <Phone size={16} />
          <span>{graduate.phone}</span>
        </a>
        <a href={`mailto:${graduate.email}`} className="footer-contact-item">
          <Mail size={16} />
          <span>{graduate.email}</span>
        </a>
      </div>

      <div className="footer-copyright">
        <p>
          Rất hân hạnh được đón tiếp quý khách tại Lễ Tốt Nghiệp 2026.
        </p>
        <p style={{ marginTop: '6px', fontSize: '0.75rem', opacity: 0.7 }}>
          Made with <Heart size={12} style={{ display: 'inline', color: '#f43f5e' }} /> for Graduation Celebration
        </p>
      </div>
    </footer>
  );
}
