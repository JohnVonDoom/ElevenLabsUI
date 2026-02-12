import { useState, useEffect } from 'react';
import './App.css';
import ApiKeyInput from './components/ApiKeyInput';
import TextInput from './components/TextInput';
import ModelSelect from './components/ModelSelect';
import VoiceSelect from './components/VoiceSelect';
import GenerateButton from './components/GenerateButton';
import ErrorAlert from './components/ErrorAlert';
import AudioPlayer from './components/AudioPlayer';
import TTSGuideModal from './components/TTSGuideModal';

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
  const [showGuide, setShowGuide] = useState(false);

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
            'x-api-key': apiKey,
          },
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
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card shadow">
            <div className="card-body p-4">
              <h1 className="card-title text-center mb-4 fw-semibold">
                <i className="bi bi-soundwave me-2"></i>Text to Speech
              </h1>

              <div className="d-grid mb-3">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowGuide(true)}
                >
                  <i className="bi bi-journal-text me-2"></i>TTS Guide
                </button>
              </div>

              <ApiKeyInput
                apiKey={apiKey}
                showApiKey={showApiKey}
                onApiKeyChange={handleApiKeyChange}
                onToggleShow={() => setShowApiKey(!showApiKey)}
                onClear={clearApiKey}
              />

              <TextInput value={text} onChange={setText} />

              <ModelSelect value={model} onChange={setModel} />

              <VoiceSelect
                voices={voices}
                value={selectedVoice}
                onChange={setSelectedVoice}
              />

              <GenerateButton loading={loading} onClick={generateSpeech} />

              <ErrorAlert message={error} />

              <AudioPlayer audioUrl={audioUrl} />
            </div>
          </div>
        </div>
      </div>

      <TTSGuideModal show={showGuide} onClose={() => setShowGuide(false)} />
    </div>
  );
}

export default App;
