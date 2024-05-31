import QuizStyle from "../components/QuizStyle/QuizStyle";
import temas from "../data/temas";

const Quiz = () => {
  return (
    <div>
      <QuizStyle tema={temas} />
    </div>
  );
};

export default Quiz;
