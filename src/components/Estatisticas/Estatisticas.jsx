import React from "react";
import "./Estatisticas.css";

const Estatisticas = ({
  totalPoints,
  totalCategoriesCompleted,
  totalErros,
  totalAcertos,
  accuracyAverage,
}) => {
  return (
    <div className="estatisticas-container">
      <div className="estatisticas-item">
        <div className="statistics-title">
          <h4>Total Pontos</h4>
        </div>

        <div className="statistics-p">
          <p>{totalPoints}</p>
        </div>
      </div>

      <div className="estatisticas-item">
        <div className="statistics-title">
          <h4> quizzes completados</h4>
        </div>

        <div className="statistics-p">
          <p>{totalCategoriesCompleted}</p>
        </div>
      </div>
      <div className="estatisticas-item">
        <div className="statistics-title">
          <h4>Acertos</h4>
        </div>
        <div className="statistics-p">
          <p>{totalAcertos}</p>
        </div>
      </div>
      <div className="estatisticas-item">
        <div className="statistics-title">
          <h4>Erros</h4>
        </div>
        <div className="statistics-p">
          <p>{totalErros}</p>
        </div>
      </div>
      <div className="estatisticas-item">
        <div className="statistics-title">
          <h4>média acerto</h4>
        </div>
        <div className="statistics-p">
          <p>{Math.floor(accuracyAverage)}%</p>
        </div>
      </div>
    </div>
  );
};

export default Estatisticas;
