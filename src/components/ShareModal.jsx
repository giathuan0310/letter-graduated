import React, { useState } from 'react';
import './Modals.css';
import { X, Share2, Copy, Check, Sparkles, Send } from 'lucide-react';
import { soundManager } from '../utils/audioPlayer';

export default function ShareModal({ isOpen, onClose }) {
  const [recipientInput, setRecipientInput] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Generate URL based on current origin
  const baseUrl = window.location.origin + window.location.pathname;
  const generatedUrl = recipientInput.trim()
    ? `${baseUrl}?to=${encodeURIComponent(recipientInput.trim())}`
    : baseUrl;

  const handleCopy = () => {
    soundManager.playClickSound();
    navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleClose = () => {
    soundManager.playClickSound();
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={handleClose} title="Đóng">
          <X size={18} />
        </button>

        <div className="modal-header-center">
          <div className="modal-icon-badge">
            <Share2 size={26} />
          </div>
          <h3 className="modal-title">Tạo Thiệp Mời Riêng</h3>
          <p className="modal-subtitle">
            Cá nhân hóa tên khách mời hiển thị trên phong bì sáp và thư mời trang trọng
          </p>
        </div>

        <div className="wish-input-group">
          <label className="wish-label">Nhập tên khách mời muốn gửi</label>
          <input
            type="text"
            className="wish-input"
            placeholder="Ví dụ: Bác Ba, Thầy Tuấn, Bạn Lan Anh..."
            value={recipientInput}
            onChange={(e) => setRecipientInput(e.target.value)}
          />
        </div>

        {recipientInput.trim() && (
          <div style={{ fontSize: '0.82rem', color: 'var(--gold-light)', marginBottom: '8px' }}>
            ✨ Người nhận sẽ thấy: <strong>"Kính gửi: {recipientInput.trim()}"</strong>
          </div>
        )}

        <div className="share-link-box">
          <input type="text" readOnly value={generatedUrl} className="share-link-input" />
          <button
            className="btn-gold"
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            onClick={handleCopy}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span>{copied ? 'Đã sao chép!' : 'Copy Link'}</span>
          </button>
        </div>

        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '12px' }}>
          Bạn có thể gửi liên kết này qua Zalo, Messenger, SMS để khách mời mở trực tiếp trên điện thoại!
        </p>
      </div>
    </div>
  );
}
