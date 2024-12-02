const EndScreen = ({ score, onNewGame }: { score: number; onNewGame: () => void }) => {
    const copyToClipboard = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl);
    };

    return (
        <div className="container">
            <h1>Tiden är ute!</h1>
            <p>Ni svarade rätt på {score} frågor!</p>
            <button onClick={onNewGame}>Nytt spel</button>
            <button onClick={copyToClipboard}>Kopiera länk</button>
        </div>
    );
};

export default EndScreen;
