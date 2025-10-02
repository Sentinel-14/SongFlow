import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge, Alert } from 'react-bootstrap';
import ChatAnalyzer from './components/ChatAnalyzer';
import ResponseSuggestions from './components/ResponseSuggestions';
import LoadingSpinner from './components/LoadingSpinner';
import { analyzeChatMessage, generateResponses } from './services/aiService';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [chatInput, setChatInput] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [responses, setResponses] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState('auto');
  const [analysisHistory, setAnalysisHistory] = useState([]);

  // Demo chat examples for different scenarios
  const demoChats = {
    romantic: "I miss you so much... can't wait to see you tonight ❤️",
    friendly: "Yaar kya plan hai weekend ka? Bore ho raha hun ghar pe",
    sad: "Feeling really down today... everything seems to be going wrong 😢",
    motivational: "I have a big presentation tomorrow and I'm really nervous",
    toxic: "Why are you always like this? You never understand anything!"
  };

  const handleAnalyzeChat = async () => {
    if (!chatInput.trim()) {
      setError('Please enter some chat text to analyze');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Analyze the chat message
      const chatAnalysis = await analyzeChatMessage(chatInput, language);
      setAnalysis(chatAnalysis);

      // Generate response suggestions
      const responseSuggestions = await generateResponses(chatAnalysis);
      setResponses(responseSuggestions);

      // Add to history
      setAnalysisHistory(prev => [{
        id: Date.now(),
        input: chatInput,
        analysis: chatAnalysis,
        timestamp: new Date().toISOString()
      }, ...prev.slice(0, 4)]); // Keep last 5 analyses

    } catch (err) {
      setError('Failed to analyze chat. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoClick = (demoType) => {
    setChatInput(demoChats[demoType]);
  };

  const clearAnalysis = () => {
    setChatInput('');
    setAnalysis(null);
    setResponses(null);
    setError(null);
  };

  return (
    <div className="app-container">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} lg={10}>
            {/* App Header */}
            <div className="text-center mb-4 fade-in">
              <h1 className="text-white mb-2">
                <i className="fas fa-brain me-2"></i>
                🌊 SongFlow
              </h1>
              <p className="text-white-50 lead">
                AI-powered chat assistant that analyzes your conversations and suggests perfect responses
              </p>
              <p className="text-white-75 small">
                Supports English, Hindi, and Hinglish • Songs, Poetry, Taglines & More
              </p>
            </div>

            <Row>
              {/* Left Column - Chat Input & Analysis */}
              <Col xs={12} lg={6} className="mb-4">
                <Card className="mood-card">
                  <Card.Body>
                    <Card.Title className="d-flex align-items-center mb-3">
                      <i className="fas fa-comments me-2 text-primary"></i>
                      Chat Analysis
                    </Card.Title>

                    {/* Language Selection */}
                    <Form.Group className="mb-3">
                      <Form.Label className="small text-muted">Language Detection</Form.Label>
                      <Form.Select 
                        value={language} 
                        onChange={(e) => setLanguage(e.target.value)}
                        size="sm"
                      >
                        <option value="auto">Auto-detect</option>
                        <option value="english">English</option>
                        <option value="hindi">Hindi</option>
                        <option value="hinglish">Hinglish</option>
                      </Form.Select>
                    </Form.Group>

                    {/* Chat Input */}
                    <Form.Group className="mb-3">
                      <Form.Label>Paste your chat or conversation here:</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Enter the chat message you want to analyze and get response suggestions..."
                        style={{ minHeight: '120px' }}
                      />
                      <Form.Text className="text-muted">
                        SongFlow will analyze mood, tone, language, and context
                      </Form.Text>
                    </Form.Group>

                    {/* Demo Examples */}
                    <div className="mb-3">
                      <small className="text-muted d-block mb-2">Quick Demo Examples:</small>
                      <div className="d-flex flex-wrap gap-1">
                        {Object.keys(demoChats).map((type) => (
                          <Badge
                            key={type}
                            bg="outline-primary"
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleDemoClick(type)}
                            className="demo-badge"
                          >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="d-flex gap-2">
                      <Button 
                        variant="primary" 
                        onClick={handleAnalyzeChat}
                        disabled={loading || !chatInput.trim()}
                        className="flex-grow-1"
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-search me-2"></i>
                            Analyze Chat
                          </>
                        )}
                      </Button>
                      <Button 
                        variant="outline-secondary" 
                        onClick={clearAnalysis}
                        disabled={loading}
                      >
                        <i className="fas fa-eraser"></i>
                      </Button>
                    </div>

                    {/* Error Display */}
                    {error && (
                      <Alert variant="danger" className="mt-3 mb-0">
                        <i className="fas fa-exclamation-triangle me-2"></i>
                        {error}
                      </Alert>
                    )}
                  </Card.Body>
                </Card>

                {/* Analysis Results */}
                {analysis && (
                  <Card className="mood-card mt-3 fade-in">
                    <Card.Body>
                      <Card.Title className="d-flex align-items-center mb-3">
                        <i className="fas fa-chart-line me-2 text-success"></i>
                        Analysis Results
                      </Card.Title>
                      <ChatAnalyzer analysis={analysis} />
                    </Card.Body>
                  </Card>
                )}
              </Col>

              {/* Right Column - Response Suggestions */}
              <Col xs={12} lg={6}>
                {loading && (
                  <Card className="mood-card">
                    <Card.Body className="text-center">
                      <LoadingSpinner message="Generating perfect responses for you..." />
                    </Card.Body>
                  </Card>
                )}

                {responses && !loading && (
                  <Card className="mood-card fade-in">
                    <Card.Body>
                      <Card.Title className="d-flex align-items-center mb-3">
                        <i className="fas fa-magic me-2 text-warning"></i>
                        Response Suggestions
                      </Card.Title>
                      <ResponseSuggestions 
                        responses={responses} 
                        analysis={analysis}
                        onCopyResponse={(text) => {
                          navigator.clipboard.writeText(text);
                          // Show toast notification
                        }}
                      />
                    </Card.Body>
                  </Card>
                )}

                {/* Recent Analysis History */}
                {analysisHistory.length > 0 && (
                  <Card className="mood-card mt-3">
                    <Card.Body>
                      <Card.Title className="d-flex align-items-center mb-3">
                        <i className="fas fa-history me-2 text-info"></i>
                        Recent Analyses
                      </Card.Title>
                      <div className="analysis-history">
                        {analysisHistory.map((item) => (
                          <div 
                            key={item.id}
                            className="history-item p-2 border rounded mb-2"
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              setChatInput(item.input);
                              setAnalysis(item.analysis);
                            }}
                          >
                            <div className="small text-muted">
                              {new Date(item.timestamp).toLocaleTimeString()}
                            </div>
                            <div className="text-truncate">
                              {item.input.substring(0, 50)}...
                            </div>
                            <div className="small">
                              <Badge bg="primary" className="me-1">
                                {item.analysis.mood}
                              </Badge>
                              <Badge bg="secondary">
                                {item.analysis.language}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;