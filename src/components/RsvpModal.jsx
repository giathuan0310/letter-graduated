import React, { useState } from 'react';
import './Modals.css';
import { X, Heart, Check, LoaderCircle } from 'lucide-react';
import { soundManager } from '../utils/audioPlayer';
import { launchWishConfetti } from '../utils/confetti';

export default function RsvpModal({ isOpen, onClose, guestName }) {
  const [attending, setAttending] = useState('yes');
  const [name, setName] = useState(guestName || '');
  const [count, setCount] = useState('1');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = import.meta.env.VITE_GOOGLE_SHEETS_URL;

    if (!endpoint) {
      setSubmitError('Chưa cấu hình đường dẫn Google Sheets.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const body = new URLSearchParams({
        attending,
        name: name.trim(),
        count: attending === 'yes' ? count : '0',
        phone: phone.trim(),
        note: note.trim(),
      });

      // Apps Script does not expose CORS headers, so the response is opaque.
      // The request still reaches doPost() and is appended to the spreadsheet.
      await fetch(endpoint, {
        method: 'POST',
        mode: 'no-cors',
        body,
      });

      soundManager.playClickSound();
      launchWishConfetti();
      setSubmitted(true);
    } catch {
      setSubmitError('Không thể gửi xác nhận. Vui lòng kiểm tra mạng và thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    soundManager.playClickSound();
    onClose();
    setTimeout(() => setSubmitted(false), 300);
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={handleClose} title="Đóng">
          <X size={18} />
        </button>

        {!submitted ? (
          <>
            <div className="modal-header-center">
              <div className="modal-icon-badge">
                <Heart size={28} />
              </div>
              <h3 className="modal-title">Xác Nhận Tham Dự</h3>
              <p className="modal-subtitle">
                Sự hiện diện của bạn là niềm vinh hạnh to lớn cho tôi và gia đình!
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="rsvp-options-grid">
                <div
                  className={`rsvp-option-label ${attending === 'yes' ? 'active' : ''}`}
                  onClick={() => setAttending('yes')}
                >
                  <span className="rsvp-option-icon">🎓</span>
                  <span className="rsvp-option-text">Tôi sẽ tham dự</span>
                </div>
                <div
                  className={`rsvp-option-label ${attending === 'no' ? 'active' : ''}`}
                  onClick={() => setAttending('no')}
                >
                  <span className="rsvp-option-icon">💌</span>
                  <span className="rsvp-option-text">Gửi lời chúc từ xa</span>
                </div>
              </div>

              <div className="wish-input-group">
                <label className="wish-label">Họ và tên của bạn</label>
                <input
                  type="text"
                  className="wish-input"
                  placeholder="Nhập tên của bạn..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {attending === 'yes' && (
                <div className="wish-input-group">
                  <label className="wish-label">Số người cùng tham dự</label>
                  <select
                    className="wish-select"
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                  >
                    <option value="1">1 người (Đi một mình)</option>
                    <option value="2">2 người</option>
                    <option value="3">3 người</option>
                    <option value="4+">4 người trở lên</option>
                  </select>
                </div>
              )}

              <div className="wish-input-group">
                <label className="wish-label">Số điện thoại (tùy chọn)</label>
                <input
                  type="tel"
                  className="wish-input"
                  placeholder="09..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="wish-input-group">
                <label className="wish-label">Lời nhắn thêm (nếu có)</label>
                <input
                  type="text"
                  className="wish-input"
                  placeholder="Ví dụ: Mình sẽ đến khoảng 8h sáng nhé!"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>

              {submitError && <p className="form-error-message" role="alert">{submitError}</p>}

              <button
                type="submit"
                className="btn-send-wish"
                style={{ marginTop: '12px' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? <LoaderCircle className="submit-spinner" size={18} /> : <Check size={18} />}
                <span>{isSubmitting ? 'Đang gửi...' : 'Gửi xác nhận tham dự'}</span>
              </button>
            </form>
          </>
        ) : (
          <div className="modal-success-box">
            <span className="modal-success-icon">🎉</span>
            <h3 className="modal-title" style={{ color: 'var(--gold-light)' }}>
              Cảm ơn {name || 'bạn'} rất nhiều!
            </h3>
            <p className="modal-subtitle" style={{ margin: '14px 0 24px' }}>
              {attending === 'yes'
                ? 'Thông tin xác nhận đã được ghi nhận. Hẹn gặp bạn tại buổi lễ tốt nghiệp nhé!'
                : 'Cảm ơn tấm lòng và những lời chúc tốt đẹp của bạn dành cho tôi!'}
            </p>
            <button className="btn-gold" onClick={handleClose}>
              Đóng cửa sổ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
