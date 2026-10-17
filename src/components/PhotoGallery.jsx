import React, { useState, useEffect, useCallback } from 'react';
import './PhotoGallery.css';
import { Heart, Maximize2, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audioPlayer';

export default function PhotoGallery({ gallery }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [photoList, setPhotoList] = useState(gallery);
  const [likedMap, setLikedMap] = useState({});
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);

  // Filter photos
  const filteredPhotos = photoList.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  // Handle like button
  const handleToggleLike = (e, id) => {
    e.stopPropagation();
    soundManager.playClickSound();

    setLikedMap((prev) => {
      const isCurrentlyLiked = !!prev[id];
      const nextLiked = !isCurrentlyLiked;

      setPhotoList((currentList) =>
        currentList.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              likes: item.likes + (nextLiked ? 1 : -1)
            };
          }
          return item;
        })
      );

      return {
        ...prev,
        [id]: nextLiked
      };
    });
  };

  // Open lightbox
  const openLightbox = (photoId) => {
    soundManager.playClickSound();
    const index = filteredPhotos.findIndex((item) => item.id === photoId);
    if (index !== -1) {
      setActiveLightboxIndex(index);
    }
  };

  // Close lightbox
  const closeLightbox = () => {
    soundManager.playClickSound();
    setActiveLightboxIndex(null);
  };

  // Next / Prev navigation
  const nextPhoto = useCallback(() => {
    soundManager.playClickSound();
    setActiveLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev + 1) % filteredPhotos.length;
    });
  }, [filteredPhotos.length]);

  const prevPhoto = useCallback(() => {
    soundManager.playClickSound();
    setActiveLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev - 1 + filteredPhotos.length) % filteredPhotos.length;
    });
  }, [filteredPhotos.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, nextPhoto, prevPhoto]);

  const activePhoto = activeLightboxIndex !== null ? filteredPhotos[activeLightboxIndex] : null;

  return (
    <section className="gallery-section" id="gallery-section">
      <div className="container">
        <div className="section-header-center">
          <span className="section-tag-gold">Album Kỷ Niệm Tốt Nghiệp</span>
          <h2 className="section-title-luxury">Khoảnh Khắc Tỏa Sáng</h2>
          <p className="section-desc">
            Cùng nhìn lại những dấu ấn thanh xuân tươi đẹp và khoảnh khắc tự hào trong hành trình đại học!
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="gallery-filter-tabs">
          <button
            className={`gallery-tab-btn ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => {
              soundManager.playClickSound();
              setActiveCategory('all');
            }}
          >
            Tất cả hình ảnh
          </button>
          <button
            className={`gallery-tab-btn ${activeCategory === 'portrait' ? 'active' : ''}`}
            onClick={() => {
              soundManager.playClickSound();
              setActiveCategory('portrait');
            }}
          >
            Ảnh Chân Dung
          </button>
          <button
            className={`gallery-tab-btn ${activeCategory === 'moments' ? 'active' : ''}`}
            onClick={() => {
              soundManager.playClickSound();
              setActiveCategory('moments');
            }}
          >
            Khoảnh Khắc Vui
          </button>
          <button
            className={`gallery-tab-btn ${activeCategory === 'ceremony' ? 'active' : ''}`}
            onClick={() => {
              soundManager.playClickSound();
              setActiveCategory('ceremony');
            }}
          >
            Lễ Trao Bằng
          </button>
        </div>

        {/* Photos Grid */}
        <div className="gallery-grid">
          {filteredPhotos.map((photo) => {
            const isLiked = !!likedMap[photo.id];
            const isPortraitRatio = photo.category === 'portrait';

            return (
              <div
                key={photo.id}
                className="gallery-card"
                onClick={() => openLightbox(photo.id)}
                role="button"
                tabIndex={0}
                aria-label={`Xem ảnh ${photo.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') openLightbox(photo.id);
                }}
              >
                <div className={`gallery-image-wrapper ${isPortraitRatio ? 'portrait-ratio' : ''}`}>
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="gallery-img"
                    loading="lazy"
                  />
                  <div className="gallery-card-overlay"></div>
                  <div className="gallery-zoom-badge" title="Phóng to ảnh">
                    <Maximize2 size={16} />
                  </div>
                </div>

                <div className="gallery-card-content">
                  <h3 className="gallery-card-title">{photo.title}</h3>
                  <p className="gallery-card-caption">{photo.caption}</p>
                  <div className="gallery-card-footer">
                    <button
                      className={`gallery-like-btn ${isLiked ? 'liked' : ''}`}
                      onClick={(e) => handleToggleLike(e, photo.id)}
                      title="Thả tim cho ảnh này"
                    >
                      <Heart size={16} />
                      <span>{photo.likes}</span>
                    </button>
                    <span className="gallery-view-hint">
                      <Sparkles size={14} /> Chạm để phóng to
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activePhoto && (
        <div className="lightbox-backdrop" onClick={closeLightbox}>
          <div className="lightbox-content-box" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close-btn" onClick={closeLightbox} title="Đóng (Esc)">
              <X size={22} />
            </button>

            {filteredPhotos.length > 1 && (
              <>
                <button className="lightbox-nav-btn lightbox-btn-prev" onClick={prevPhoto} title="Ảnh trước">
                  <ChevronLeft size={28} />
                </button>
                <button className="lightbox-nav-btn lightbox-btn-next" onClick={nextPhoto} title="Ảnh tiếp theo">
                  <ChevronRight size={28} />
                </button>
              </>
            )}

            <div className="lightbox-img-frame">
              <img src={activePhoto.url} alt={activePhoto.title} />
            </div>

            <div className="lightbox-info-bar">
              <h3 className="lightbox-title">{activePhoto.title}</h3>
              <p className="lightbox-caption">{activePhoto.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
