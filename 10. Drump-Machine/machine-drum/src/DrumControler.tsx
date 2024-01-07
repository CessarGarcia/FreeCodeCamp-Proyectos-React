type DrumControleProps = {
    power: boolean;
    volume: number;
    handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    togglePower: () => void;
};

const DrumControler: React.FC<DrumControleProps> = ({
    // power,
    volume,
    handleVolumeChange,
    // togglePower,
}) => {
    // const handleTogglePower = () => {
    //     togglePower(); // Llama a la función togglePower al hacer clic en el botón
    // };

    return (
        <div className="controle">
            {/* <button onClick={handleTogglePower}>
                Turn Power {power ? 'OFF' : 'ON'}
            </button> */}
            <h2>Volume: %{Math.round(volume * 100)}</h2>
            <input
                max="1"
                min="0"
                step="0.01"
                type="range"
                value={volume}
                onChange={handleVolumeChange}
            />
        </div>
    );
};

export default DrumControler;