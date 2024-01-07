import { AudioClip } from "../types";

interface DrumProps {
    audioClip: AudioClip;
    volume: number;
}

const Drum = ({ audioClip, volume }: DrumProps) => {
    const playSound = (clip: AudioClip) => {
        const audioElement = document.getElementById(clip.keyTrigger) as HTMLAudioElement;
        audioElement.volume = volume; // Establecer el volumen
        audioElement.play().catch(console.error);
    };

    return (
        <button
            className="drum-pad"
            id={`drum-${audioClip.keyTrigger}`}
            onClick={() => playSound(audioClip)}
        >
            <audio src={audioClip.url} id={audioClip.keyTrigger} className="clip" />
            <p className="keyTrigger">{audioClip.keyTrigger}</p>
        </button>
    );
};

export default Drum;