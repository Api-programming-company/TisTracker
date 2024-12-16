

const sortMilestones = (milestones) => {
    return [...milestones].sort((a, b) => new Date(a.end_date).getTime() - new Date(b.end_date).getTime());
}

export {sortMilestones}