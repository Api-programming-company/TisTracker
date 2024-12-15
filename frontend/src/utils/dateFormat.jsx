
const formatDate = (dateString) => {
    const date = new Date( new Date(dateString).getTime() + 24*60*60*1000 ); 
    return date.toLocaleDateString();
};

const getToday = () => {
    return new Date(new Date() - 24*60*60*1000);
}

const getMilestoneStatus= (end_date) => {
    const today = new Date(new Date() - 24*60*60*1000);
    const today_day = today.getDate();
    const today_month = today.getMonth(); 
    const today_year = today.getFullYear();

    const endDate = new Date(end_date);
    const endDate_day = endDate.getDate();
    const endDate_month = endDate.getMonth();
    const endDate_year = endDate.getFullYear();

    if(today_year === endDate_year && today_month === endDate_month && today_day === endDate_day) {
        return "current";
    } else if(today_year === endDate_year && today_month > endDate_month) {
        return "late";
    }else if(today_year > endDate_year) {
        return "late";
    }else if (today_year === endDate_year && today_month === endDate_month && today_day > endDate_day) {
        return "late";
    }else{
        return "pending";
    }
}

export {formatDate,getToday,getMilestoneStatus};
