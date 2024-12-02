interface Option {
    text: string;
    isCorrect: boolean;
}

interface Question {
    Question: string;
    option_1: Option;
    option_2: Option;
    option_3: Option;
    option_4: Option;
}

const GameScreen = ({
    name,
    question,
    timer,
    onAnswer,
}: {
    name: string;
    question: Question;
    timer: number;
    onAnswer: (isCorrect: boolean) => void;
}) => {
    return (
        <div className="game-container">
            <h2>{name}</h2>
            <h3 className="timer">Tid kvar: {timer}s</h3>
            <div className="question-and-options-container">
                <p className="question">{question.Question}</p>
                <div className="options">
                    {Object.values(question)
                        .filter((key) => key instanceof Object)
                        .map((option: Option, index) => (
                            <button
                                className="option"
                                key={index}
                                onClick={() => onAnswer(option.isCorrect)}
                            >
                                {option.text}
                            </button>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default GameScreen;
