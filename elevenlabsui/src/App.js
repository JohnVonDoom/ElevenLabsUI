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
import CreateProfileModal from './components/CreateProfileModal';

const PROFILES_STORAGE_KEY = 'elevenlabs_profiles';
const ACTIVE_PROFILE_STORAGE_KEY = 'elevenlabs_active_profile_id';
const LEGACY_API_KEY_STORAGE_KEY = 'elevenlabs_api_key';

const createProfileId = () => `profile_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

const getInitialProfiles = () => {
  const savedProfilesRaw = localStorage.getItem(PROFILES_STORAGE_KEY);

  if (savedProfilesRaw) {
    try {
      const parsed = JSON.parse(savedProfilesRaw);
      if (Array.isArray(parsed)) {
        return parsed.filter((profile) => profile?.id && typeof profile?.name === 'string');
      }
    } catch (err) {
      console.error('Failed to parse saved profiles:', err);
    }
  }

  const legacyApiKey = localStorage.getItem(LEGACY_API_KEY_STORAGE_KEY);
  if (legacyApiKey) {
    return [
      {
        id: createProfileId(),
        name: 'Default',
        apiKey: legacyApiKey,
      },
    ];
  }

  return [];
};

function App() {
  const [profiles, setProfiles] = useState(getInitialProfiles);
  const [activeProfileId, setActiveProfileId] = useState(
    localStorage.getItem(ACTIVE_PROFILE_STORAGE_KEY) || ''
  );
  const [showApiKey, setShowApiKey] = useState(false);
  const [text, setText] = useState('');
  const [model, setModel] = useState('eleven_turbo_v2_5');
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showGuide, setShowGuide] = useState(false);
  const [showCreateProfileModal, setShowCreateProfileModal] = useState(false);

  const activeProfile = profiles.find((profile) => profile.id === activeProfileId) || null;
  const apiKey = activeProfile?.apiKey || '';

  useEffect(() => {
    if (profiles.length === 0) {
      if (activeProfileId) {
        setActiveProfileId('');
      }
      return;
    }

    const activeExists = profiles.some((profile) => profile.id === activeProfileId);
    if (!activeExists) {
      setActiveProfileId(profiles[0].id);
    }
  }, [profiles, activeProfileId]);

  useEffect(() => {
    localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(profiles));
  }, [profiles]);

  useEffect(() => {
    if (activeProfileId) {
      localStorage.setItem(ACTIVE_PROFILE_STORAGE_KEY, activeProfileId);
    } else {
      localStorage.removeItem(ACTIVE_PROFILE_STORAGE_KEY);
    }
  }, [activeProfileId]);

  const handleApiKeyChange = (e) => {
    const key = e.target.value;

    if (!activeProfileId) return;

    setProfiles((prevProfiles) =>
      prevProfiles.map((profile) =>
        profile.id === activeProfileId ? { ...profile, apiKey: key } : profile
      )
    );
  };

  const createProfile = (name, key) => {
    const newProfile = {
      id: createProfileId(),
      name,
      apiKey: key,
    };

    setProfiles((prevProfiles) => [...prevProfiles, newProfile]);
    setActiveProfileId(newProfile.id);
    setShowCreateProfileModal(false);
    setError(null);
  };

  const deleteActiveProfile = () => {
    if (!activeProfile) return;

    const confirmed = window.confirm(`Delete profile "${activeProfile.name}"?`);
    if (!confirmed) return;

    setProfiles((prevProfiles) => prevProfiles.filter((profile) => profile.id !== activeProfile.id));
    setVoices([]);
    setSelectedVoice('');
    setAudioUrl(null);
  };

  useEffect(() => {
    const fetchVoices = async () => {
      if (!apiKey) {
        setVoices([]);
        setSelectedVoice('');
        return;
      }

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
        } else {
          setSelectedVoice('');
        }
      } catch (err) {
        console.error('Failed to fetch voices:', err);
        setVoices([]);
        setSelectedVoice('');
      }
    };

    fetchVoices();
  }, [apiKey, activeProfileId]);

  const generateSpeech = async () => {
    if (!apiKey.trim()) {
      setError('Please enter your ElevenLabs API key');
      return;
    }

    if (!text.trim()) {
      setError('Please enter some text');
      return;
    }

    if (!selectedVoice) {
      setError('Please select a voice');
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

              <div className="bg-light border border-2 border-dashed rounded p-3 mb-4">
                <label className="form-label fw-semibold">API Profile</label>

                <div className="input-group">
                  <select
                    className="form-select"
                    value={activeProfileId}
                    onChange={(e) => setActiveProfileId(e.target.value)}
                    disabled={profiles.length === 0}
                  >
                    {profiles.length === 0 ? (
                      <option value="">No profiles yet</option>
                    ) : (
                      profiles.map((profile) => (
                        <option key={profile.id} value={profile.id}>
                          {profile.name}
                        </option>
                      ))
                    )}
                  </select>

                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => setShowCreateProfileModal(true)}
                  >
                    New
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={deleteActiveProfile}
                    disabled={!activeProfile}
                  >
                    Delete
                  </button>
                </div>

                <p className="text-muted text-center mb-0 mt-2 small">
                  Select a profile to load voices for that ElevenLabs account.
                </p>
              </div>

              <ApiKeyInput
                apiKey={apiKey}
                showApiKey={showApiKey}
                onApiKeyChange={handleApiKeyChange}
                onToggleShow={() => setShowApiKey(!showApiKey)}
                onClear={() => {
                  if (!activeProfileId) return;
                  setProfiles((prevProfiles) =>
                    prevProfiles.map((profile) =>
                      profile.id === activeProfileId ? { ...profile, apiKey: '' } : profile
                    )
                  );
                }}
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
      <CreateProfileModal
        show={showCreateProfileModal}
        onClose={() => setShowCreateProfileModal(false)}
        onSubmit={createProfile}
      />
    </div>
  );
}

export default App;
