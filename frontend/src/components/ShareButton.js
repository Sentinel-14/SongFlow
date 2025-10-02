import React, { useState } from 'react';
import { Button, Dropdown } from 'react-bootstrap';

const ShareButton = ({ snippet, onShare }) => {
  const [showShareOptions, setShowShareOptions] = useState(false);

  const shareText = `🎵 "${snippet.lyricLines[0]}" - ${snippet.title} by ${snippet.artist}\n\nListen: ${snippet.spotifyUrl}\n\n#SongSnippetly #MoodMusic`;

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: 'fab fa-whatsapp',
      color: '#25D366',
      action: () => shareToWhatsApp()
    },
    {
      name: 'Telegram',
      icon: 'fab fa-telegram',
      color: '#0088CC',
      action: () => shareToTelegram()
    },
    {
      name: 'Twitter',
      icon: 'fab fa-twitter',
      color: '#1DA1F2',
      action: () => shareToTwitter()
    },
    {
      name: 'Copy Link',
      icon: 'fas fa-copy',
      color: '#6c757d',
      action: () => copyToClipboard()
    }
  ];

  const shareToWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
    onShare && onShare({ platform: 'whatsapp', snippet });
  };

  const shareToTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(snippet.spotifyUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
    onShare && onShare({ platform: 'telegram', snippet });
  };

  const shareToTwitter = () => {
    const tweetText = `🎵 "${snippet.lyricLines[0]}" - ${snippet.title} by ${snippet.artist} ${snippet.spotifyUrl} #SongSnippetly`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(url, '_blank');
    onShare && onShare({ platform: 'twitter', snippet });
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      alert('Copied to clipboard!');
      onShare && onShare({ platform: 'clipboard', snippet });
    } catch (err) {
      console.error('Failed to copy:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Copied to clipboard!');
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${snippet.title} by ${snippet.artist}`,
          text: shareText,
          url: snippet.spotifyUrl,
        });
        onShare && onShare({ platform: 'native', snippet });
      } catch (err) {
        console.log('Share cancelled or failed');
      }
    } else {
      setShowShareOptions(!showShareOptions);
    }
  };

  return (
    <div className="share-button-container">
      {/* Primary Share Button */}
      <Button
        variant="success"
        size="sm"
        onClick={handleNativeShare}
        className="share-btn"
      >
        <i className="fas fa-share-alt me-1"></i>
        Share Snippet
      </Button>

      {/* Share Options Dropdown (for browsers without native share) */}
      {showShareOptions && !navigator.share && (
        <div className="share-options">
          {shareOptions.map((option, index) => (
            <Button
              key={index}
              size="sm"
              style={{ 
                backgroundColor: option.color,
                borderColor: option.color,
                color: '#fff'
              }}
              onClick={option.action}
              className="share-btn"
            >
              <i className={`${option.icon} me-1`}></i>
              {option.name}
            </Button>
          ))}
        </div>
      )}

      {/* Always show quick share buttons on mobile */}
      <div className="d-md-none mt-2">
        <div className="d-flex flex-wrap gap-1 justify-content-center">
          <Button
            size="sm"
            style={{ backgroundColor: '#25D366', borderColor: '#25D366' }}
            onClick={shareToWhatsApp}
            className="px-2"
          >
            <i className="fab fa-whatsapp"></i>
          </Button>
          <Button
            size="sm"
            style={{ backgroundColor: '#0088CC', borderColor: '#0088CC' }}
            onClick={shareToTelegram}
            className="px-2"
          >
            <i className="fab fa-telegram"></i>
          </Button>
          <Button
            size="sm"
            style={{ backgroundColor: '#1DA1F2', borderColor: '#1DA1F2' }}
            onClick={shareToTwitter}
            className="px-2"
          >
            <i className="fab fa-twitter"></i>
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={copyToClipboard}
            className="px-2"
          >
            <i className="fas fa-copy"></i>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShareButton;