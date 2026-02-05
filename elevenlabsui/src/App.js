import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [apiKey, setApiKey] = useState(localStorage.getItem('elevenlabs_api_key') || '');
  const [showApiKey, setShowApiKey] = useState(false);
  const [text, setText] = useState('');
  const [model, setModel] = useState('eleven_turbo_v2_5');
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState('21m00Tcm4TlvDq8ikWAM');
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleApiKeyChange = (e) => {
    const key = e.target.value;
    setApiKey(key);
    localStorage.setItem('elevenlabs_api_key', key);
  };

  const clearApiKey = () => {
    setApiKey('');
    localStorage.removeItem('elevenlabs_api_key');
  };

  useEffect(() => {
    const fetchVoices = async () => {
      if (!apiKey) return;
      
      try {
        const response = await fetch('/api/voices', {
          headers: {
            'x-api-key': apiKey
          }
        });
        const voicesData = await response.json();
        setVoices(voicesData);
        if (voicesData.length > 0) {
          setSelectedVoice(voicesData[0].voice_id);
        }
      } catch (err) {
        console.error('Failed to fetch voices:', err);
      }
    };

    fetchVoices();
  }, [apiKey]);

  const generateSpeech = async () => {
    if (!apiKey.trim()) {
      setError('Please enter your ElevenLabs API key');
      return;
    }

    if (!text.trim()) {
      setError('Please enter some text');
      return;
    }

    console.log('=== FRONTEND: Starting generation ===');
    console.log('Selected Model:', model);
    console.log('Selected Voice:', selectedVoice);
    console.log('Text:', text);

    setLoading(true);
    setError(null);
    setAudioUrl(null);

    try {
      const requestBody = { text, model_id: model, voice_id: selectedVoice };
      console.log('Sending to backend:', requestBody);

      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify(requestBody),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        throw new Error('Failed to generate speech');
      }

      const audioBlob = await response.blob();
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
    } catch (err) {
      setError('Error generating speech: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Text to Speech</h1>
      
      <div className="api-key-section">
        <div className="api-key-input-group">
          <input
            type={showApiKey ? 'text' : 'password'}
            value={apiKey}
            onChange={handleApiKeyChange}
            placeholder="Enter your ElevenLabs API key"
            className="api-key-input"
          />
          <button 
            type="button"
            onClick={() => setShowApiKey(!showApiKey)}
            className="toggle-key-btn"
          >
            {showApiKey ? 'Hide' : 'Show'}
          </button>
          <button 
            type="button"
            onClick={clearApiKey}
            className="clear-key-btn"
          >
            🗑️ Clear
          </button>
        </div>
        <p className="security-notice">
          🔒 Your API key is stored locally on your computer and only sent to ElevenLabs' official API
        </p>
      </div>
      
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text here..."
        rows={6}
      />

      <select value={model} onChange={(e) => setModel(e.target.value)}>
        <option value="eleven_v3">eleven_v3</option>
        <option value="eleven_flash_v2_5">eleven_flash_v2_5</option>
        <option value="eleven_flash_v2">eleven_flash_v2</option>
        <option value="eleven_turbo_v2_5">eleven_turbo_v2_5</option>
        <option value="eleven_turbo_v2">eleven_turbo_v2</option>
        <option value="eleven_multilingual_v2">eleven_multilingual_v2</option>
        <option value="eleven_multilingual_v1">eleven_multilingual_v1</option>
        <option value="eleven_english_sts_v2">eleven_english_sts_v2</option>
        <option value="eleven_english_sts_v1">eleven_english_sts_v1</option>
      </select>

      <select value={selectedVoice} onChange={(e) => setSelectedVoice(e.target.value)}>
        {voices.length === 0 ? (
          <option>Loading voices...</option>
        ) : (
          voices.map(voice => (
            <option key={voice.voice_id} value={voice.voice_id}>
              {voice.name}
            </option>
          ))
        )}
      </select>

      <button onClick={generateSpeech} disabled={loading}>
        {loading ? 'Generating...' : 'Generate'}
      </button>

      {error && <div className="error">{error}</div>}

      {audioUrl && (
        <audio controls src={audioUrl} autoPlay />
      )}
    </div>
  );
}

export default App;
