import React, { useState } from 'react';
import { Card, Button, Badge, Tab, Tabs, Alert, ButtonGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './ResponseSuggestions.css';

const ResponseSuggestions = ({ responses, analysis, onCopyResponse }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      onCopyResponse(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const getResponseIcon = (type) => {
    const icons = {
      text: 'fas fa-comment',
      song: 'fas fa-music',
      poetry: 'fas fa-feather-alt',
      tagline: 'fas fa-tag',
      emoji: 'fas fa-smile',
      gif: 'fas fa-images',
      sticker: 'fas fa-star'
    };
    return icons[type] || 'fas fa-comment';
  };

  const getResponseColor = (type) => {
    const colors = {
      text: 'primary',
      song: 'success',
      poetry: 'info',
      tagline: 'warning',
      emoji: 'danger',
      gif: 'secondary',
      sticker: 'dark'
    };
    return colors[type] || 'primary';
  };

  const filteredResponses = responses?.filter(response => 
    activeTab === 'all' || response.type === activeTab
  ) || [];

  const responseTypes = [...new Set(responses?.map(r => r.type) || [])];

  return (
    <div className="response-suggestions">
      {/* Response Type Tabs */}
      {responseTypes.length > 1 && (
        <Tabs
          activeKey={activeTab}
          onSelect={setActiveTab}
          className="suggestion-tabs mb-3"
          fill
        >
          <Tab eventKey="all" title={`All (${responses?.length || 0})`} />
          {responseTypes.map(type => (
            <Tab 
              key={type}
              eventKey={type} 
              title={
                <span>
                  <i className={`${getResponseIcon(type)} me-1`}></i>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                  <Badge bg="light" text="dark" className="ms-1">
                    {responses?.filter(r => r.type === type).length || 0}
                  </Badge>
                </span>
              }
            />
          ))}
        </Tabs>
      )}

      {/* No Responses */}
      {!responses || responses.length === 0 ? (
        <Alert variant="info" className="text-center">
          <i className="fas fa-info-circle me-2"></i>
          Analyze a chat to get response suggestions
        </Alert>
      ) : (
        <>
          {/* Response Quality Indicator */}
          {analysis && (
            <div className="quality-indicator mb-3">
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted">Response Quality</small>
                <Badge bg={analysis.confidence > 0.8 ? 'success' : 'warning'}>
                  {analysis.confidence > 0.8 ? 'High Quality' : 'Good Quality'}
                </Badge>
              </div>
            </div>
          )}

          {/* Response Cards */}
          <div className="responses-container">
            {filteredResponses.map((response, index) => (
              <Card 
                key={response.id || index} 
                className="response-card mb-3 fade-in"
                style={{ '--animation-delay': `${index * 0.1}s` }}
              >
                <Card.Body className="pb-2">
                  {/* Response Header */}
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div className="d-flex align-items-center">
                      <Badge bg={getResponseColor(response.type)} className="me-2">
                        <i className={`${getResponseIcon(response.type)} me-1`}></i>
                        {response.type.charAt(0).toUpperCase() + response.type.slice(1)}
                      </Badge>
                      {response.language && (
                        <Badge bg="outline-secondary" className="language-badge">
                          {response.language}
                        </Badge>
                      )}
                    </div>
                    {response.confidence && (
                      <small className="text-muted">
                        {Math.round(response.confidence * 100)}% match
                      </small>
                    )}
                  </div>

                  {/* Response Content */}
                  <div className="response-content mb-3">
                    {response.type === 'song' ? (
                      <div className="song-response">
                        <div className="d-flex align-items-center mb-2">
                          {response.coverImage && (
                            <img 
                              src={response.coverImage} 
                              alt={response.title}
                              className="song-cover me-3"
                            />
                          )}
                          <div>
                            <div className="fw-bold">{response.title}</div>
                            <div className="text-muted small">{response.artist}</div>
                          </div>
                        </div>
                        {response.lyrics && (
                          <div className="song-lyrics">
                            <em>"{response.lyrics}"</em>
                          </div>
                        )}
                        {response.spotifyUrl && (
                          <Button 
                            variant="outline-success" 
                            size="sm" 
                            href={response.spotifyUrl}
                            target="_blank"
                            className="mt-2"
                          >
                            <i className="fab fa-spotify me-1"></i>
                            Listen on Spotify
                          </Button>
                        )}
                      </div>
                    ) : response.type === 'poetry' ? (
                      <div className="poetry-response">
                        <div className="poetry-text">
                          {response.text.split('\n').map((line, i) => (
                            <div key={i} className="poetry-line">{line}</div>
                          ))}
                        </div>
                        {response.author && (
                          <div className="poetry-author text-end mt-2">
                            <small className="text-muted">- {response.author}</small>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-response">
                        {response.text}
                      </div>
                    )}
                  </div>

                  {/* Response Actions */}
                  <div className="response-actions">
                    <ButtonGroup size="sm" className="w-100">
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>{copiedId === response.id ? 'Copied!' : 'Copy to clipboard'}</Tooltip>}
                      >
                        <Button 
                          variant={copiedId === response.id ? 'success' : 'outline-primary'}
                          onClick={() => handleCopy(response.text, response.id)}
                          className="flex-grow-1"
                        >
                          <i className={`fas ${copiedId === response.id ? 'fa-check' : 'fa-copy'} me-1`}></i>
                          {copiedId === response.id ? 'Copied!' : 'Copy'}
                        </Button>
                      </OverlayTrigger>
                      
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Share response</Tooltip>}
                      >
                        <Button 
                          variant="outline-secondary"
                          onClick={() => {
                            if (navigator.share) {
                              navigator.share({
                                text: response.text,
                                title: 'SongFlow Response'
                              });
                            }
                          }}
                        >
                          <i className="fas fa-share-alt"></i>
                        </Button>
                      </OverlayTrigger>

                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Save to favorites</Tooltip>}
                      >
                        <Button variant="outline-warning">
                          <i className="fas fa-heart"></i>
                        </Button>
                      </OverlayTrigger>
                    </ButtonGroup>
                  </div>

                  {/* Response Context */}
                  {response.context && (
                    <div className="response-context mt-2">
                      <small className="text-muted">
                        <i className="fas fa-info-circle me-1"></i>
                        {response.context}
                      </small>
                    </div>
                  )}
                </Card.Body>
              </Card>
            ))}
          </div>

          {/* No Filtered Results */}
          {filteredResponses.length === 0 && activeTab !== 'all' && (
            <Alert variant="warning" className="text-center">
              <i className="fas fa-filter me-2"></i>
              No {activeTab} responses found. Try a different filter.
            </Alert>
          )}
        </>
      )}
    </div>
  );
};

export default ResponseSuggestions;