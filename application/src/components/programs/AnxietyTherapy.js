import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnxietyQuestions from '../questions/AnxietyQuestions';
import '../styles/DepressionTherapy.css'; // Import the CSS file

const AnxietyTherapy = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState(Array(AnxietyQuestions.length).fill(''));

  const handleNextQuestion = () => {
    if (currentQuestionIndex < AnxietyQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleOptionSelect = (option) => {
    const updatedUserResponses = [...userResponses];
    updatedUserResponses[currentQuestionIndex] = option;
    setUserResponses(updatedUserResponses);
  };

  const allQuestionsAnswered = userResponses.every((response) => response !== '');

  const handleSubmit = () => {
    const featureKeys = [
      'Q2A', 'Q4A', 'Q7A', 'Q9A', 'Q15A', 'Q19A', 'Q20A', 'Q23A', 'Q25A', 'Q28A', 'Q30A', 'Q36A', 'Q40A', 'Q41A'
    ];

    const requestData = {};
    featureKeys.forEach((key, index) => {
      requestData[`${key}`] = [parseInt(userResponses[index])];
    });

    fetch('http://127.0.0.1:5000/AnxietyPredict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Prediction result:', data);
        navigate('/Dashboard'); // Redirect to the main page after submitting
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="container">
      <h1 className="title">Anxiety Therapy</h1>
      <div className="option-desc">
        <p>
          0 = Did not apply to me at all.<br />
          1 = Applied to me to some degree, or some of the time.<br />
          2 = Applied to me to a considerable degree, or a good part of the time.<br />
          3 = Applied to me very much, or most of the time.
        </p>
      </div>

      <p className="question">
        Question {currentQuestionIndex + 1}:<br />
        &nbsp;&nbsp;&nbsp;{AnxietyQuestions[currentQuestionIndex]}
      </p>

      <div className="options-container">
        <label className="option-label">
          <input
            type="radio"
            value="0"
            checked={userResponses[currentQuestionIndex] === '0'}
            onChange={() => handleOptionSelect('0')}
            className="option-input"
          />
          0
        </label>
        <label className="option-label">
          <input
            type="radio"
            value="1"
            checked={userResponses[currentQuestionIndex] === '1'}
            onChange={() => handleOptionSelect('1')}
            className="option-input"
          />
          1
        </label>
        <label className="option-label">
          <input
            type="radio"
            value="2"
            checked={userResponses[currentQuestionIndex] === '2'}
            onChange={() => handleOptionSelect('2')}
            className="option-input"
          />
          2
        </label>
        <label className="option-label">
          <input
            type="radio"
            value="3"
            checked={userResponses[currentQuestionIndex] === '3'}
            onChange={() => handleOptionSelect('3')}
            className="option-input"
          />
          3
        </label>
      </div>

      <div className="nav-buttons">
        <button className="nav-button" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
          Previous
        </button>
        <button className="nav-button" onClick={handleNextQuestion} disabled={currentQuestionIndex === AnxietyQuestions.length - 1}>
          Next
        </button>
      </div>

      <div>
        <button className="submit-button" onClick={handleSubmit} disabled={!allQuestionsAnswered}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AnxietyTherapy;
