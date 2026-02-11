require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { ElevenLabsClient } = require('@elevenlabs/elevenlabs-js');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Serve React frontend static files
app.use(express.static(path.join(__dirname, '../elevenlabsui/build')));

app.get('/api/voices', async (req, res) => {
  try {
    const apiKey = req.headers['x-api-key'] || process.env.ELEVENLABS_API_KEY;
    
    if (!apiKey) {
      return res.status(401).json({ error: 'API key required' });
    }

    const voiceClient = new ElevenLabsClient({ apiKey });
    const voicesResponse = await voiceClient.voices.getAll();
    
    const voices = voicesResponse.voices.map(voice => {
      const voiceId = voice.voice_id || voice.voiceId || voice.id;
      const name = voice.name;
      
      return {
        voice_id: voiceId,
        name: name
      };
    });
    
    console.log(`Found ${voices.length} voices`);
    res.json(voices);
  } catch (error) {
    console.error('Error fetching voices:', error.message);
    res.status(500).json({ error: 'Failed to fetch voices' });
  }
});

app.post('/api/tts', async (req, res) => {
  try {
    const apiKey = req.headers['x-api-key'] || process.env.ELEVENLABS_API_KEY;
    
    if (!apiKey) {
      return res.status(401).json({ error: 'API key required' });
    }

    const { text, model_id, voice_id } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const selectedVoiceId = voice_id || '21m00Tcm4TlvDq8ikWAM';
    
    const apiConfig = {
      text: text,
      modelId: model_id || 'eleven_turbo_v2_5',
      voiceSettings: {
        stability: 0.5,
        similarityBoost: 0.75
      },
      promptInfluence: 1.0
    };
    
    console.log('Generating speech with model:', apiConfig.modelId);

    const ttsClient = new ElevenLabsClient({ apiKey });
    const audio = await ttsClient.textToSpeech.convert(selectedVoiceId, apiConfig);
    
    const chunks = [];
    for await (const chunk of audio) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);
    res.set('Content-Type', 'audio/mpeg');
    res.send(buffer);
  } catch (error) {
    console.error('Error generating speech:', error.message);
    res.status(500).json({ error: 'Failed to generate speech' });
  }
});

// Serve React app for all other routes (must be after API routes)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../elevenlabsui/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
