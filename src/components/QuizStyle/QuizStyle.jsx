import React, { useState, useEffect } from "react";
import "./QuizStyle.css";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, update, get } from "firebase/database";
import temas from "../../data/temas";
import { Link } from "react-router-dom";
import correctAudio from "../../assets/acerto.mp3";
import incorrectAudio from "../../assets/error.mp3";

const QuizStyle = () => {
  const [timeLeft, setTimeLeft] = useState(10);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameOverModalShown, setGameOverModalShown] = useState(false);
  const [points, setPoints] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const { category } = useParams();
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [accuracyAverage, setAccuracyAverage] = useState(0);

  const auth = getAuth();
  const db = getDatabase();

  useEffect(() => {
    const fetchQuestions = async () => {
      const filteredQuestions = temas.find(
        (item) => item.category === category
      );
      if (filteredQuestions) {
        setQuestions(filteredQuestions.questions);

        setPoints(0);
      }
    };

    fetchQuestions();
  }, [category]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0 && !isAnswered) {
        setTimeLeft((prevTime) => prevTime - 1);
      } else {
        if (!isAnswered) {
          setCorrectAnswerIndex(currentQuestionIndex);
          const correctSound = new Audio(correctAudio);
          correctSound.play();
          setTimeout(() => {
            handleNextQuestion();
          }, 900);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isAnswered, currentQuestionIndex]);

  useEffect(() => {
    const checkCategoryCompletion = async () => {
      const userId = auth.currentUser?.uid;
      if (userId) {
        try {
          const userRef = ref(
            db,
            `users/${userId}/completedCategories/${category}`
          );
          const userSnapshot = await get(userRef);
          const categoryData = userSnapshot.val();

          if (categoryData && categoryData.completed && !gameOverModalShown) {
            setIsGameOver(true);
            setPoints(categoryData.points || 0);
            setGameOverModalShown(true);
          }
        } catch (error) {
          console.error("Error checking category completion:", error);
        }
      }
    };

    checkCategoryCompletion();
  }, [category, auth, db, gameOverModalShown]);

  const calculateTotalPoints = async () => {
    const userId = auth.currentUser?.uid;
    if (userId) {
      try {
        const temasRef = ref(db, `users/${userId}/completedCategories`);
        const temasSnapshot = await get(temasRef);
        const temasData = temasSnapshot.val();

        let totalPoints = 0;
        if (temasData) {
          Object.keys(temasData).forEach((tema) => {
            totalPoints += temasData[tema].points || 0;
          });
        }

        setTotalPoints(totalPoints);

        await update(ref(db), {
          [`users/${userId}/totalPoints`]: totalPoints,
        });
      } catch (error) {}
    }
  };

  const handleAnswerSelection = async (answer) => {
    setSelectedAnswer(answer);
    setIsAnswered(true);

    const isCorrect = answer === questions[currentQuestionIndex].response;

    if (isCorrect) {
      const correctSound = new Audio(correctAudio);
      correctSound.play();
      setCorrectAnswers((prevCorrectAnswers) => prevCorrectAnswers + 1);

      const userId = auth.currentUser?.uid;
      if (userId) {
        try {
          const userRef = ref(
            db,
            `users/${userId}/completedCategories/${category}`
          );
          const userSnapshot = await get(userRef);
          const categoryData = userSnapshot.val();

          if (categoryData) {
            const updatedPoints = (categoryData.points || 0) + 5;
            console.log("Updated points:", updatedPoints);
            await update(ref(db), {
              [`users/${userId}/completedCategories/${category}/points`]:
                updatedPoints,
            });

            setPoints(updatedPoints);
          } else {
            await update(ref(db), {
              [`users/${userId}/completedCategories/${category}`]: {
                completed: false,
                points: 5,
              },
            });
            setPoints(5);
          }
        } catch (error) {
          console.error("Error updating document:", error);
        }
      }
    } else {
      setIncorrectAnswers((prevIncorrectAnswers) => prevIncorrectAnswers + 1);

      const incorrectSound = new Audio(incorrectAudio);
      incorrectSound.play();

      const userId = auth.currentUser?.uid;
      if (userId) {
        try {
          await update(ref(db), {
            [`users/${userId}/completedCategories/${category}/erros`]:
              incorrectAnswers + 1,
          });
        } catch (error) {
          console.error("Error updating incorrect answers:", error);
        }
      }
    }

    setTimeout(() => {
      handleNextQuestion();
    }, 2000);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimeLeft(10);
      setCorrectAnswerIndex(null);
    } else {
      setIsGameOver(true);
      markCategoryAsCompleted();
    }
  };

  const markCategoryAsCompleted = async () => {
    const userId = auth.currentUser?.uid;
    if (userId) {
      try {
        await update(ref(db), {
          [`users/${userId}/completedCategories/${category}/completed`]: true,
          [`users/${userId}/completedCategories/${category}/acertos`]:
            correctAnswers,
        });

        calculateTotalPoints();
        calculateTotalAnswers();
      } catch (error) {
        console.error("Error marking category as completed:", error);
      }
    }
  };

  const calculateTotalAnswers = async () => {
    const userId = auth.currentUser?.uid;
    if (userId) {
      try {
        const userRef = ref(db, `users/${userId}/completedCategories`);
        const userSnapshot = await get(userRef);
        const userData = userSnapshot.val();

        let totalAcertos = 0;
        let totalErros = 0;
        let totalTentativas = 0;

        if (userData) {
          Object.keys(userData).forEach((category) => {
            totalAcertos += userData[category].acertos || 0;
            totalErros += userData[category].erros || 0;
            totalTentativas +=
              (userData[category].acertos || 0) +
              (userData[category].erros || 0);
          });

          const accuracyAverage = (totalAcertos / totalTentativas) * 100;

          await update(ref(db), {
            [`users/${userId}/accuracyAverage`]: accuracyAverage,
            [`users/${userId}/totalAcertos`]: totalAcertos + 1,
            [`users/${userId}/totalErros`]: totalErros,
          });
        }
      } catch (error) {
        console.error("Error calculating total answers:", error);
      }
    }
  };
  return (
    <div className="quiz-container">
      <div>
        <p className="points">
          Points <span>{points}</span>
        </p>

        <div className="timer">{timeLeft}s</div>
      </div>

      {questions.length > 0 && !isGameOver && (
        <div className="question">
          <p>{questions[currentQuestionIndex].question}</p>
          <img
            src={questions[currentQuestionIndex].foto}
            alt="Imagem da pergunta"
          />
          <div className="answers">
            {questions[currentQuestionIndex].options.map((answer, idx) => (
              <span
                key={idx}
                onClick={() => handleAnswerSelection(answer)}
                className={`answer-span ${
                  selectedAnswer === answer ? "selected" : ""
                } ${
                  selectedAnswer === answer && isAnswered
                    ? answer === questions[currentQuestionIndex].response
                      ? "correct"
                      : "incorrect"
                    : ""
                } ${
                  idx === correctAnswerIndex && !isAnswered ? "correct" : ""
                }`}
              >
                {answer}
              </span>
            ))}
          </div>
        </div>
      )}
      {isGameOver && (
        <div className="modalPost-overlay">
          <div className="modal">
            <h2>Fim de jogo!</h2>
            <p>Total de pontos: {points}</p>
            <Link to="/home">
              <button>Voltar</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizStyle;
