import React, { useState } from 'react';
import './Guestbook.css';
import { Send, MessageSquareHeart, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audioPlayer';
import { launchWishConfetti } from '../utils/confetti';

const avatarColors = ['#8B5CF6', '#059669', '#D97706', '#DB2777', '#2563EB', '#7C3AED'];

export default function Guestbook({ initialWishes }) {
  const [wishes, setWishes] = useState(initialWishes);
  const [sender, setSender] = useState('');
  const [relation, setRelation] = useState('Bạn bè');
  const [message, setMessage] = useState('');

  const quickEmojis = ['🎓', '💐', '🥂', '🌟', '💖', '🚀', '👏', '🎉'];

  const handleAddEmoji = (emoji) => {
    soundManager.playClickSound();
    setMessage((prev) => prev + emoji + ' ');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!sender.trim() || !message.trim()) return;

    soundManager.playClickSound();
    launchWishConfetti();

    const newWish = {
      id: Date.now(),
      sender: sender.trim(),
      relation: relation,
      message: message.trim(),
      date: 'Vừa xong',
      avatarBg: avatarColors[Math.floor(Math.random() * avatarColors.length)]
    };

    setWishes([newWish, ...wishes]);
    setMessage('');
  };

  return (
    <section className="guestbook-section" id="guestbook-section">
      <div className="container">
        <div className="section-header-center">
          <span className="section-tag-gold">Sổ Lưu Bút Kỷ Niệm</span>
          <h2 className="section-title-luxury">Gửi Lời Chúc Mừng</h2>
          <p className="section-desc">
            Hãy để lại những lời chúc ấm áp và thông điệp yêu thương gửi tới tân cử nhân trong ngày đặc biệt này!
          </p>
        </div>

        <div className="guestbook-layout-grid">
          {/* Form */}
          <div className="wish-form-card">
            <h3 className="wish-form-title">
              <MessageSquareHeart size={22} color="var(--gold-light)" />
              <span>Gửi lời chúc của bạn</span>
            </h3>
            <p className="wish-form-sub">Lời chúc của bạn sẽ xuất hiện ngay trên tường lưu bút</p>

            <form onSubmit={handleSubmit}>
              <div className="wish-input-group">
                <label className="wish-label">Họ và tên của bạn</label>
                <input
                  type="text"
                  className="wish-input"
                  placeholder="Nhập tên của bạn..."
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  required
                />
              </div>

              <div className="wish-input-group">
                <label className="wish-label">Mối quan hệ</label>
                <select
                  className="wish-select"
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                >
                  <option value="Bạn bè">Bạn bè</option>
                  <option value="Gia đình / Người thân">Gia đình / Người thân</option>
                  <option value="Thầy cô">Thầy cô</option>
                  <option value="Đồng nghiệp">Đồng nghiệp</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>

              <div className="wish-input-group">
                <label className="wish-label">Lời chúc tốt nghiệp</label>
                <textarea
                  className="wish-textarea"
                  placeholder="Viết lời chúc mừng tốt nghiệp, kỷ niệm hoặc lời nhắn nhủ..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>

              {/* Emoji bar */}
              <div className="wish-quick-emojis">
                {quickEmojis.map((emoji, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="quick-emoji-btn"
                    onClick={() => handleAddEmoji(emoji)}
                    title={`Thêm ${emoji}`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>

              <button type="submit" className="btn-send-wish">
                <Sparkles size={18} />
                <span>Gửi lời chúc ngay</span>
              </button>
            </form>
          </div>

          {/* Feed */}
          <div className="wishes-wall-container">
            {wishes.map((item) => {
              const initial = item.sender.charAt(0).toUpperCase();

              return (
                <div key={item.id} className="wish-card-item">
                  <div className="wish-card-header">
                    <div className="wish-author-info">
                      <div
                        className="wish-avatar-circle"
                        style={{ backgroundColor: item.avatarBg || '#8B5CF6' }}
                      >
                        {initial}
                      </div>
                      <div>
                        <div className="wish-author-name">
                          {item.sender}
                          <span className="wish-relation-tag">{item.relation}</span>
                        </div>
                      </div>
                    </div>
                    <span className="wish-timestamp">{item.date}</span>
                  </div>
                  <div className="wish-card-body">{item.message}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
