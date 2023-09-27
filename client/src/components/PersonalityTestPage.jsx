import styles from "./styles.module.css";
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProgressBar from './progressbar/ProgressBar';
import AboutUs from "./AboutUs";



const PersonalityTestPage = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("token"); // Check if the user is logged in

    const questions = [
        {
            question: "You take initiative in unfamiliar situations.",
            options: [
                "Strongly Agree",
                "Agree",
                "Disagree",
                "Strongly Disagree"
            ]
        },
        {
            question: "When working in a team, you often step up as the leader.",
            options: [
                "Strongly Agree",
                "Agree",
                "Disagree",
                "Strongly Disagree"
            ]
        },
        {
            question: "You believe it's important to lead by example rather than just by words.",
            options: [
                "Strongly Agree",
                "Agree",
                "Disagree",
                "Strongly Disagree"
            ]
        },

        {
            question: "Listening actively to team members is one of your top priorities.",
            options: [
                "Strongly Agree",
                "Agree",
                "Disagree",
                "Strongly Disagree"
            ]
        },

        {
            question: "In conflicts, you tend to be the mediator.",
            options: [
                "Strongly Agree",
                "Agree",
                "Disagree",
                "Strongly Disagree"
            ]
        },
        {
            question: "You frequently self-reflect and seek feedback about your performance.",
            options: [
                "Strongly Agree",
                "Agree",
                "Disagree",
                "Strongly Disagree"
            ]
        },
        {
            question: "You enjoy mentoring and guiding others.",
            options: [
                "Strongly Agree",
                "Agree",
                "Disagree",
                "Strongly Disagree"
            ]
        },
        {
            question: "When a task is challenging, you persist rather than give up.",
            options: [
                "Strongly Agree",
                "Agree",
                "Disagree",
                "Strongly Disagree"
            ]
        },
        {
            question: "You are comfortable delegating tasks and trust your team's abilities.",
            options: [
                "Strongly Agree",
                "Agree",
                "Disagree",
                "Strongly Disagree"
            ]
        },
        {
            question: "You are open to changing your opinion if presented with new information.",
            options: [
                "Strongly Agree",
                "Agree",
                "Disagree",
                "Strongly Disagree"
            ]
        },
        {
            question: "You often set personal goals and work diligently to achieve them.",
            options: [
                "Strongly Agree",
                "Agree",
                "Disagree",
                "Strongly Disagree"
            ]
        },
        {
            question: "You can effectively manage stress and high-pressure situations.",
            options: [
                "Strongly Agree",
                "Agree",
                "Disagree",
                "Strongly Disagree"
            ]
        },
        {
            question: "Adapting to new situations or unexpected changes is easy for you.",
            options: [
                "Strongly Agree",
                "Agree",
                "Disagree",
                "Strongly Disagree"
            ]
        },
        {
            question: "You value and promote diversity in a team setting.",
            options: [
                "Strongly Agree",
                "Agree",
                "Disagree",
                "Strongly Disagree"
            ]
        },
        {
            question: "You prioritize tasks based on importance and deadline.",
            options: [
                "Strongly Agree",
                "Agree",
                "Disagree",
                "Strongly Disagree"
            ]
        },
        {
            question: "You tend to see the bigger picture and not get lost in minor details.",
            options: [
                "Strongly Agree",
                "Agree",
                "Disagree",
                "Strongly Disagree"
            ]
        },
        {
            question: "You regularly encourage feedback and ideas from others.",
            options: [
                "Strongly Agree",
                "Agree",
                "Disagree",
                "Strongly Disagree"
            ]
        },
        {
            question: "You are skilled at building relationships and networking.",
            options: [
                "Strongly Agree",
                "Agree",
                "Disagree",
                "Strongly Disagree"
            ]
        },
        {
            question: "You believe in constant self-improvement and often take courses or workshops.",
            options: [
                "Strongly Agree",
                "Agree",
                "Disagree",
                "Strongly Disagree"
            ]
        },
        {
            question: "You take responsibility for your mistakes and learn from them.",
            options: [
                "Strongly Agree",
                "Agree",
                "Disagree",
                "Strongly Disagree"
            ]
        }
    ]

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate('/Login');  // Navigate to the main page after logout
    };

    const AboutUs = () => {
        if (!localStorage.getItem("token")) {
            navigate('/login', { state: { from: '/AboutUs' } });
        } else {
            navigate('/AboutUs');
        }
    };

    

    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [feedback, setFeedback] = useState("");

    const handleOptionChange = (e) => {
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestion] = Number(e.target.value);
        setAnswers(updatedAnswers);
    };

    

    const moveToNextQuestion = () => {
        if (answers[currentQuestion] !== undefined) {
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
            } else {
                handleSubmit();
            }
        } else {
            alert("Please answer the current question before proceeding.");
        }
    };

    const moveToPreviousQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const allQuestionsAnswered = () => {
        return answers.length === questions.length;
    };

    const handleSubmit = () => {
        if (allQuestionsAnswered()) {
            const generatedFeedback = generateFeedback(answers);
            setFeedback(generatedFeedback);
            alert("Test submitted!");
        } else {
            alert("Please answer all questions before submitting.");
        }
    };

    const handleSuggestionsFeedbackPage = () => {
        if (!isLoggedIn) {
            navigate('/login', { state: { from: '/suggestions-feedback' } });
        } else {
            navigate('/suggestions-feedback');
        }
    };

    const contact = () => {
        navigate('/contactus');
    };
    

    const generateFeedback = (answers) => {
            // Calculate the total score
        const scoringSystem = [4, 3, 2, 1]; // Assuming 0=Strongly Agree, 1=Agree, 2=Disagree, 3=Strongly Disagree

        const totalScore = answers.reduce((total, answerIndex) => total + scoringSystem[answerIndex], 0);

        // Calculate the maximum possible score
        const maxScore = 4 * answers.length;

        // Calculate the percentage score
        const percentageScore = (totalScore / maxScore) * 100;

        // Initialize feedback based on the score
        let feedback = "";

        // Add the user's total score to the feedback
        feedback += `\n\nYour Total Score: ${totalScore} (${percentageScore.toFixed(2)}% out of 100%)`;
      
        // Detailed feedback for each category
        const naturalLeaderFeedback = 
            <div className="feedback-container">
            <h1 className="feedback-title">Leadership Skills and Personality Assessment Report</h1>
            <hr />
            <h2 className="feedback-section-title">Executive Summary:</h2>
            <p className="feedback-text">Congratulations! Your total score places you in the "Natural Leader" category, indicating that you are highly suitable for high-level leadership roles. This report aims to provide a comprehensive analysis of your leadership skills and personality traits based on your responses to the assessment.</p>
            <h2 className="feedback-section-title">Detailed Analysis</h2>
            <h3 className="feedback-subsection-title">Initiative and Adaptability:</h3>
            <p className="feedback-text">You have demonstrated a strong ability to take initiative in unfamiliar situations and adapt to new challenges. This is a critical skill for high-level leaders who often need to navigate uncharted territories and make quick decisions.</p>
            <h3 className="feedback-subsection-title">Team Leadership and Collaboration:</h3>
            <p className="feedback-text">Your responses indicate that you often step up as the leader when working in a team setting. You also prioritize listening to team members and valuing diversity, which are essential traits for effective leadership and team cohesion.</p>
            <h3 className="feedback-subsection-title">Conflict Resolution:</h3>
            <p className="feedback-text">Your tendency to act as a mediator in conflicts suggests that you possess strong interpersonal skills and emotional intelligence. These are invaluable traits for leaders who need to manage team dynamics and resolve conflicts efficiently.</p>
            <h3 className="feedback-subsection-title">Self-Reflection and Improvement:</h3>
            <p className="feedback-text">You have a strong inclination for self-reflection and actively seek feedback about your performance. This willingness to improve and adapt is crucial for any leader aiming for long-term success.</p>
            <h3 className="feedback-subsection-title">Task Management and Delegation:</h3>
            <p className="feedback-text">You are comfortable with delegating tasks and trust your team's abilities. You also prioritize tasks based on importance and deadlines, which is essential for effective project management.</p>
            <h3 className="feedback-subsection-title">Stress Management:</h3>
            <p className="feedback-text">Your ability to manage stress and high-pressure situations effectively is a strong indicator of your resilience and mental fortitude, qualities that are indispensable in high-stakes leadership roles.</p>
            <h2 className="feedback-section-title">Recommendations:</h2>
            <p className="feedback-text">1. Leadership Roles: Given your strong leadership traits, you are highly recommended for high-level leadership positions, such as Director, VP, or C-level roles.</p>
            <p className="feedback-text">2. Mentorship: Your skills in mentoring and guiding others can be invaluable in a leadership role where training and developing team members is crucial.</p>
            <p className="feedback-text">3. Continuous Learning: While you have scored highly, continuous learning is key to leadership. Consider advanced leadership training and courses to further hone your skills.</p>
            <p className="feedback-text">4. Networking: Utilize your skills in relationship-building to network with other leaders and professionals in your industry.</p>
            <h2 className="feedback-section-title">Conclusion:</h2>
            <p className="feedback-text">Your score and subsequent analysis indicate that you possess the skills, traits, and mindset required for high-level leadership roles. Your strengths in initiative, team leadership, conflict resolution, and self-improvement are particularly noteworthy. We highly recommend that you pursue opportunities that allow you to leverage these skills in a leadership capacity.</p>
            <p className="feedback-footer">Thank you for participating in this Leadership Skills and Personality Assessment. We wish you all the best in your future leadership endeavors.</p>
        </div>
            ;
      
        const teamPlayerFeedback = 
            <div className="feedback-container">
            <h1 className="feedback-title">Leadership Skills and Personality Assessment Report</h1>
            <hr />
            <h2 className="feedback-section-title">Executive Summary:</h2>
            <p className="feedback-text">Congratulations on completing the Leadership Skills and Personality Assessment. Your total score places you in the "Team Player" category, suggesting that you are well-suited for mid-level leadership or specialized roles. This report aims to provide a detailed analysis of your skills and traits based on your responses to the assessment.</p>
            <h2 className="feedback-section-title">Detailed Analysis</h2>
            <h3 className="feedback-subsection-title">Initiative and Adaptability:</h3>
            <p className="feedback-text">You've shown a good level of initiative, particularly in familiar settings. While you may not always be the first to step up in completely new situations, you are generally willing to take on responsibilities and challenges.</p>
            <h3 className="feedback-subsection-title">Team Leadership and Collaboration:</h3>
            <p className="feedback-text">Your responses indicate that you are comfortable working in a team and often contribute significantly to team efforts. While you may not always take the lead, you are a key player who helps the team move towards its goals.</p>
            <h3 className="feedback-subsection-title">Conflict Resolution:</h3>
            <p className="feedback-text">You have a balanced approach to conflict resolution, often helping to mediate disputes or find middle ground. This skill is essential for mid-level leaders who need to maintain team harmony.</p>
            <h3 className="feedback-subsection-title">Self-Reflection and Improvement:</h3>
            <p className="feedback-text">You are open to feedback and make an effort to improve, although you may not always seek it out proactively. This trait is important for anyone in a specialized or leadership role, as it allows for continual growth and adaptation.</p>
            <h3 className="feedback-subsection-title">Task Management and Delegation:</h3>
            <p className="feedback-text">You are generally good at managing tasks and may be comfortable delegating to team members you trust. Your ability to prioritize tasks based on importance and deadlines is a valuable skill in any professional setting.</p>
            <h3 className="feedback-subsection-title">Stress Management:</h3>
            <p className="feedback-text">You have shown that you can manage stress and high-pressure situations reasonably well, although there may be room for improvement. This is an important skill for anyone in a leadership or specialized role.</p>
            <h2 className="feedback-section-title">Recommendations:</h2>
            <p className="feedback-text">1. Mid-Level Leadership: Your skills and traits make you a strong candidate for mid-level leadership roles, such as team lead or manager, where you can use your team-playing abilities to the fullest.</p>
            <p className="feedback-text">2. Specialized Roles: Given your skills, you may also excel in specialized roles that require a high level of expertise and the ability to work well in a team setting.</p>
            <p className="feedback-text">3. Skill Development: Consider taking courses or workshops to improve areas like proactive self-reflection and stress management.</p>
            <p className="feedback-text">4. Mentorship: Seek out mentors who can guide you in honing your leadership skills and navigating the challenges of mid-level leadership roles.</p>
            <h2 className="feedback-section-title">Conclusion:</h2>
            <p className="feedback-text">Your score and subsequent analysis indicate that you have strong team-playing abilities and are well-suited for mid-level leadership or specialized roles. While you may not naturally gravitate towards high-level leadership positions, your skills are invaluable in a team setting and can be instrumental in achieving collective goals.</p>
            <p className="feedback-footer">Thank you for participating in this Leadership Skills and Personality Assessment. We wish you success in your future endeavors, whether they be in leadership or specialized roles.</p>
        </div>
            ;
      
        const contributorFeedback = 
            <div className="feedback-container">
            <h1 className="feedback-title">Leadership Skills and Personality Assessment Report</h1>
            <hr />
            <h2 className="feedback-section-title">Executive Summary:</h2>
            <p className="feedback-text">Thank you for completing the Leadership Skills and Personality Assessment. Your total score places you in the "Contributor" category, suggesting that you are most effective in individual contributor roles. This report aims to provide a detailed analysis of your skills and traits based on your responses to the assessment.</p>
            <h2 className="feedback-section-title">Detailed Analysis</h2>
            <h3 className="feedback-subsection-title">Initiative and Adaptability:</h3>
            <p className="feedback-text">Your responses indicate that you may be more comfortable taking initiative in familiar situations rather than unfamiliar ones. This is a valuable trait for individual contributors who need to execute tasks effectively within known parameters.</p>
            <h3 className="feedback-subsection-title">Team Leadership and Collaboration:</h3>
            <p className="feedback-text">While you may not naturally step up as the leader in a team setting, you do contribute to team efforts. Your skills are often best utilized in roles where you can focus on specific tasks.</p>
            <h3 className="feedback-subsection-title">Conflict Resolution:</h3>
            <p className="feedback-text">You may prefer to avoid conflicts rather than mediate them, which is often suitable for roles that require less interpersonal interaction and more individual focus.</p>
            <h3 className="feedback-subsection-title">Self-Reflection and Improvement:</h3>
            <p className="feedback-text">You show some interest in self-improvement but may not actively seek out feedback. This is an area where you could grow to become even more effective in your role.</p>
            <h3 className="feedback-subsection-title">Task Management and Delegation:</h3>
            <p className="feedback-text">You are generally good at managing your own tasks and may prefer to complete them yourself rather than delegating. This trait is often seen in effective individual contributors.</p>
            <h3 className="feedback-subsection-title">Stress Management:</h3>
            <p className="feedback-text">Your ability to manage stress and high-pressure situations is moderate. This is an area where improvement could make you even more effective in your role.</p>
            <h2 className="feedback-section-title">Recommendations:</h2>
            <p className="feedback-text">1. Individual Contributor Roles: Your skills and traits are well-suited for roles that allow you to focus on specific tasks, such as analyst, developer, or specialist positions.</p>
            <p className="feedback-text">2. Skill Development: Consider taking courses or workshops to improve in areas like stress management and self-reflection. These skills can make you even more effective in individual contributor roles.</p>
            <p className="feedback-text">3. Team Collaboration: While your strengths lie in individual tasks, the ability to collaborate effectively with a team is also important. Consider team-building activities or training to improve this skill.</p>
            <p className="feedback-text">4. Mentorship: A mentor can provide valuable insights into how to navigate your career path effectively, even in individual contributor roles.</p>
            <h2 className="feedback-section-title">Conclusion:</h2>
            <p className="feedback-text">Your score and subsequent analysis suggest that you are most effective in individual contributor roles where you can focus on specific tasks. While you may not be inclined towards leadership positions, your skills are invaluable in roles that require a high level of individual expertise and execution.</p>
            <p className="feedback-footer">Thank you for participating in this Leadership Skills and Personality Assessment. We wish you continued success in your career, particularly in roles that allow you to utilize your strengths as an effective individual contributor.</p>
        </div>
            ;
      
        const needsImprovementFeedback = 
            <div className="feedback-container">
            <h1 className="feedback-title">Leadership Skills and Personality Assessment Report</h1>
            <hr />
            <h2 className="feedback-section-title">Executive Summary:</h2>
            <p className="feedback-text">Thank you for participating in the Leadership Skills and Personality Assessment. Your total score places you in the "Needs Improvement" category. This suggests that there are areas where you could benefit from further development, potentially through training or mentorship. This report aims to provide a detailed analysis of your skills and traits based on your responses to the assessment.</p>
            <h2 className="feedback-section-title">Detailed Analysis</h2>
            <h3 className="feedback-subsection-title">Initiative and Adaptability:</h3>
            <p className="feedback-text">Your responses indicate that you may hesitate to take the initiative, particularly in unfamiliar situations. This is an area where training or mentorship could provide valuable guidance.</p>
            <h3 className="feedback-subsection-title">Team Leadership and Collaboration:</h3>
            <p className="feedback-text">You appear to be less comfortable in leadership roles within a team setting. This is an area where you could benefit from specific training to improve your collaboration and leadership skills.</p>
            <h3 className="feedback-subsection-title">Conflict Resolution:</h3>
            <p className="feedback-text">Your approach to conflict resolution may need improvement. Effective communication and negotiation skills are crucial in both leadership and team roles, and this is an area where you could benefit from further development.</p>
            <h3 className="feedback-subsection-title">Self-Reflection and Improvement:</h3>
            <p className="feedback-text">You may not actively seek out feedback or engage in self-reflection. These are important skills for personal and professional growth and are areas where you could improve.</p>
            <h3 className="feedback-subsection-title">Task Management and Delegation:</h3>
            <p className="feedback-text">Your ability to manage tasks and delegate, when necessary, appears to be limited. These are key skills in most professional settings and could be developed through targeted training.</p>
            <h3 className="feedback-subsection-title">Stress Management:</h3>
            <p className="feedback-text">Your responses suggest that you may find it challenging to manage stress and high-pressure situations effectively. This is another area where you could benefit from training or mentorship.</p>
            <h2 className="feedback-section-title">Recommendations:</h2>
            <p className="feedback-text">1. Training Programs: Consider enrolling in training programs that focus on leadership skills, team collaboration, and effective communication.</p>
            <p className="feedback-text">2. Mentorship: Seek out a mentor who can provide personalized guidance and help you identify areas for improvement.</p>
            <p className="feedback-text">3. Self-Improvement: Invest time in self-improvement books, online courses, or workshops that can help you develop the skills you need to improve.</p>
            <p className="feedback-text">4. Feedback Loop: Make it a habit to seek regular feedback from peers and supervisors to continually assess and improve your skills.</p>
            <h2 className="feedback-section-title">Conclusion:</h2>
            <p className="feedback-text">Your score and subsequent analysis indicate that there are several areas where you could benefit from further development. While you may currently be more effective in roles that require less leadership and collaboration, there is room for growth. Training and mentorship are recommended to help you develop the skills you need to become more effective in a wider range of roles.</p>
            <p className="feedback-footer">Thank you for participating in this Leadership Skills and Personality Assessment. Improvement is a continuous journey, and we encourage you to take the steps necessary to develop your skills further.</p>
        </div>
            ;
      
                // Based on the total score, assign the feedback JSX
            if (totalScore >= 70 && totalScore <= 80) {
                feedback = <div>{`Your Total Score: ${totalScore} (${percentageScore.toFixed(2)}% out of 100%)`}{naturalLeaderFeedback}</div>;
            } else if (totalScore >= 60 && totalScore <= 69) {
                feedback = <div>{`Your Total Score: ${totalScore} (${percentageScore.toFixed(2)}% out of 100%)`}{teamPlayerFeedback}</div>;
            } else if (totalScore >= 50 && totalScore <= 59) {
                feedback = <div>{`Your Total Score: ${totalScore} (${percentageScore.toFixed(2)}% out of 100%)`}{contributorFeedback}</div>;
            } else {
                feedback = <div>{`Your Total Score: ${totalScore} (${percentageScore.toFixed(2)}% out of 100%)`}{needsImprovementFeedback}</div>;
            }
      
        // Return the feedback
        return feedback;
      };
    

    const startTest = () => {
        setCurrentQuestion(0);
    };

    const handleOptionChangeByIndex = (index) => {
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestion] = index;
        setAnswers(updatedAnswers);
    };

    const suggestions = () => {

        navigate('/suggestions-feedback'); // Navigate to the suggestions-feedback page

    };

    useEffect(() => {
        const handleKeyPress = (e) => {
            // Check if the question is currently being displayed
            if (currentQuestion !== null && currentQuestion < questions.length) {
                switch (e.keyCode) {
                    case 38: // UP arrow
                        if (answers[currentQuestion] > 0) {
                            handleOptionChangeByIndex(answers[currentQuestion] - 1);
                        }
                        break;
                    case 40: // DOWN arrow
                        if (answers[currentQuestion] < questions[currentQuestion].options.length - 1) {
                            handleOptionChangeByIndex(answers[currentQuestion] + 1);
                        }
                        break;
                    case 13: // ENTER key
                        moveToNextQuestion();
                        break;
                    default:
                        break;
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [currentQuestion, answers, moveToNextQuestion]);


    return (
        <>
          <nav className={styles.navbar}>
          <Link to="/" style={{ textDecoration: 'none' }}>
              <h1>PersonaScope</h1>
            </Link>
            <div className={styles.button_container}>
              <button className={styles.white_btn} onClick={handleLogout}>
                Logout
              </button>
              <button className={styles.white_btn} onClick={AboutUs}>
                AboutUs
              </button>
            </div>
          </nav>
          
          <div className="mainContent">
            {feedback ? (
              <div className={styles.feedbackContainer}>
                <h2>Feedback</h2>
                <p>{feedback}</p> {/* Displaying the feedback string */}
                <div className={styles.startButtonContainer}>
                  <button className={styles.startButton} onClick={suggestions}>
                    Give Us Your Feedback!
                  </button>
                </div>
              </div>
            ) : (
              <>
                {currentQuestion !== null && currentQuestion < questions.length && (
                  <div className={styles.questionContainer}>
                    <ProgressBar current={currentQuestion + 1} total={questions.length} />
                    <h3 className={styles.progressInfo}>Question {currentQuestion + 1} of {questions.length}</h3>
                    <h2>{questions[currentQuestion].question}</h2>
                    <div className={styles.optionsContainer}>
                      {questions[currentQuestion].options.map((option, index) => (
                        <div key={index} className={styles.optionItem} onClick={() => handleOptionChangeByIndex(index)}>
                          <input
                            type="radio"
                            id={`option-${currentQuestion}-${index}`}
                            name="answer"
                            value={index}
                            checked={answers[currentQuestion] === index}
                            onChange={handleOptionChange}
                            className={styles.optionInput}
                          />
                          <label htmlFor={`option-${currentQuestion}-${index}`} className={styles.optionLabel}>
                            {`${index + 1}. ${option}`}
                          </label>
                        </div>
                      ))}
                    </div>
                    <div className={styles.navigationButtons}>
                      {currentQuestion > 0 && <button onClick={moveToPreviousQuestion}>Previous</button>}
                      <button onClick={moveToNextQuestion} disabled={currentQuestion === questions.length - 1 && !allQuestionsAnswered()}>
                        {currentQuestion < questions.length - 1 ? "Next" : "Submit"}
                      </button>
                    </div>
                  </div>
                )}
      
                <div className={styles.introContainer}>
                  <img src="pt1.png" alt="Motivational Image" className={styles.introImage} />
                  <div>
                    <p className={styles.introText}>Discover the leader within you! Take the test to understand your leadership style.</p>
                    {currentQuestion === null && (
                      <div className={styles.startButtonContainer}>
                        <button className={styles.startButton} onClick={startTest}>
                          Start Test
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
      
          <footer className={styles.footer}>
    <div className={styles.footerLinks}>
        <span className={styles.footerLink} onClick={handleSuggestionsFeedbackPage}>
            Feedback
        </span>
        <span className={styles.footerLink} onClick={contact}>
            Contact Us
        </span>
    </div>
    <div className={styles.copyrightText}>
        © {new Date().getFullYear()} Personality Test Web App. All rights reserved.
    </div>
</footer>

        </>
      );
    
};

export default PersonalityTestPage;
