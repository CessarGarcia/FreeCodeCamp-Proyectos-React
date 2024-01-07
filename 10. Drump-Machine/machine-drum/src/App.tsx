import './App.css'
import { AudioClip } from './types';
import Drum from './components/Drum.js';
import DrumControler from './DrumControler.tsx';
import { useState } from 'react';

const audioClips: AudioClip[] = [
  {
    keyTrigger: "Q",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    description: "Heater 1",
  },
  {
    keyTrigger: "W",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    description: "Heater 2",
  },
  {
    keyTrigger: "E",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    description: "Heater 3",
  },
  {
    keyTrigger: "A",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    description: "Heater 4",
  },
  {
    keyTrigger: "S",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    description: "Clap",
  },
  {
    keyTrigger: "D",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    description: "Open HH",
  },
  {
    keyTrigger: "Z",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    description: "Kick n' Hat",
  },
  {
    keyTrigger: "X",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    description: "Kick",
  },
  {
    keyTrigger: "C",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    description: "Closed HH",
  },
];
function App() {
  const [power, setPower] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(0.5);
  const [selectedDescription, setSelectedDescription] = useState<string>('');

  /* {Funcion para manejar el cambio de volumen} */
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume)
  }

  {/* Funcion para alternar el estado de encendido/Apagado */ }
  const togglePower = () => {
    setPower((prevPower) => !prevPower);
  };

  const playAudio = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const clip = audioClips.find(
      (clip) => clip.keyTrigger === e.key.toUpperCase()
    );
    if (!clip) return;

    // Option 1
    const audioElement = document.getElementById(clip.keyTrigger) as HTMLAudioElement;
    if (audioElement) {
      audioElement.play().catch(console.error);
    }

    setSelectedDescription(clip.description);

    // Display the description in the #display element
    const displayElement = document.getElementById('display');
    if (displayElement) {
      displayElement.innerText = clip.description;
    }

    // Option 2
    // (document.getElementById(clip.keyTrigger) as HTMLAudioElement)
    //   .play()
    //   .catch(console.error)

    document.getElementById("drum-machine" + clip.keyTrigger)?.focus();
    document.getElementById("display")!.innerText = clip.description;
  };

  return (
    <div className='div-padre'>
      <div className="row">
        <div className="col-1" id="drum-machine" onKeyDown={playAudio}>
          <div className="whole-drum">
            {audioClips.map((clip) => (
              <Drum audioClip={clip} volume={volume} key={clip.keyTrigger} />
            ))}
          </div>
        </div>

        <div className="col-2">
          <DrumControler
            power={power}
            volume={volume}
            handleVolumeChange={handleVolumeChange}
            togglePower={togglePower}
          />
          <p className='developed'>Developed by: Cessar García</p>
        </div>
      </div>
      <div id="display">{selectedDescription}</div>
    </div>
  )
}

export default App
