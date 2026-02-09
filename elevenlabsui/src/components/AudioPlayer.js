function AudioPlayer({ audioUrl }) {
  if (!audioUrl) return null;

  return (
    <audio controls src={audioUrl} autoPlay className="w-100 mt-3" />
  );
}

export default AudioPlayer;
