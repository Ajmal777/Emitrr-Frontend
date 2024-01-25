const getProficiencyLevel = (solved, total) => {
    const score = Math.round((solved / total) * 100);
    if(score < 50){
        return 'Beginner';
    }
    else if(score > 50 && score < 80){
        return 'Intermediate';
    }
    else return 'Expert'
}

export default getProficiencyLevel;