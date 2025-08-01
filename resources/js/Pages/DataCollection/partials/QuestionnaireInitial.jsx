function QuestionnaireInitial({ questionnaire, handleCheckboxChange, handleChange, data, errors }) {
    return (
        <>
            {questionnaire.questions.map((question, i) => {
                return (
                    <div key={question.id} className="flex flex-col gap-1">
                        <label
                            htmlFor={question.id}
                            className="text-sm font-normal text-gray-700"
                        >
                            {i + 1} - {question.statement}
                            <input type="hidden" name={`answers[${question.id}][type]`} value={question.type} />
                        </label>
                        {question.type === 'text' && (
                            <>
                                <input
                                    type="text"
                                    name={question.id}
                                    id={question.id}
                                    className="border border-gray-300 rounded-md p-2"
                                    placeholder="Digite sua resposta"
                                    onChange={handleChange}
                                    value={data.answers[question.id] || ''}
                                    required
                                    autoComplete="off"
                                />
                                {errors[`answers.${question.id}`] && (
                                    <p className="text-red-500 text-sm">{errors[`answers.${question.id}`]}</p>
                                )}
                            </>
                        )}
                        {question.options && question.type === 'checkbox' && (
                            <>
                                <div className="flex flex-col gap-2">
                                    {question.options.map((option) => (
                                        <label key={option.id} className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                name={question.id}
                                                value={option.id}
                                                className="border border-gray-300 rounded-md size-5"
                                                onChange={handleCheckboxChange}
                                                checked={data.answers[question.id]?.includes(option.id + '') || false}
                                            />
                                            {option.description}
                                        </label>
                                    ))}
                                </div>
                                {errors[`answers.${question.id}`] && (
                                    <p className="text-red-500 text-sm">{errors[`answers.${question.id}`]}</p>
                                )}
                            </>
                        )}
                        {question.options && question.type === 'radio' && (
                            <>
                                <div className="flex flex-col gap-2">
                                    {question.options.map((option) => (
                                        <label key={option.id} className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                name={question.id}
                                                value={option.id}
                                                className="border border-gray-300 rounded-full size-5"
                                                onChange={handleChange}
                                                checked={data.answers[question.id] === option.id + ''}
                                            />
                                            {option.description}
                                        </label>
                                    ))}
                                </div>
                                {errors[`answers.${question.id}`] && (
                                    <p className="text-red-500 text-sm">{errors[`answers.${question.id}`]}</p>
                                )}
                            </>
                        )}
                    </div>
                )
            })}
        </>
    );
}

export default QuestionnaireInitial;
