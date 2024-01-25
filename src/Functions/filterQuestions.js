export default function filterQuestions(questions) {
    const easy = [],
        medium = [],
        hard = [];
        
    questions.forEach((q) => {
        const diff = q.difficulty;
        if (diff === "easy") easy.push(q);
        else if (diff === "medium") medium.push(q);
        else hard.push(q);
    });

    return {
        easy,
        medium,
        hard,
    };
}
