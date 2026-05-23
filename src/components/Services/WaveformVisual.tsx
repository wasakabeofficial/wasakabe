
const waveformBars = [
  { duration: '1.2s', height: 'h-1/2' },
  { duration: '1.5s', height: 'h-3/4' },
  { duration: '0.8s', height: 'h-1/4' },
  { duration: '1.0s', height: 'h-full' },
  { duration: '1.3s', height: 'h-2/3' },
  { duration: '0.9s', height: 'h-1/3' },
  { duration: '1.1s', height: 'h-5/6' },
  { duration: '1.4s', height: 'h-1/2' },
  { duration: '1.5s', height: 'h-3/4' },
];


export default function WaveformVisual () {
  return (
    <div className="flex items-end gap-1 w-full h-full px-4 py-6">
      {waveformBars.map((bar, index) => (
        <div
          key={index}
          className={`waveform-bar w-full bg-blood-red ${bar.height}`}
          style={{ animationDuration: bar.duration }}
        />
      ))}
    </div>
  );
}
