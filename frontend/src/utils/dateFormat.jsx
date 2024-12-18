
const formatDate = (dateString) => {
    const date = new Date( new Date(dateString).getTime() + 4*60*60*1000 ); 
    return date.toLocaleDateString();
};



const getToday = () => {
    return new Date(new Date());
}

const getMilestoneStatus= (end_date) => {
    const today = new Date();
    const today_day = today.getDate();
    const today_month = today.getMonth(); 
    const today_year = today.getFullYear();

    const endDate = new Date(new Date(end_date).getTime() + 4*60*60*1000);
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

const getMilestonePlanningStatus = (end_date) => {
    const today = new Date(new Date() - 24*60*60*1000).getTime();
    const end_date_time = end_date.getTime() + 4*60*60*1000; 
    return end_date_time  < today ?
            "late" :
             end_date_time > today + 6*24*60*60*1000
            ?  "pending"
            : "current";

}

const getDateTime = (dateString) => {
    const date = new Date( new Date(dateString).getTime() + 4*60*60*1000 ); 
    return date.getTime();
};

const getAcademicPeriodStatus = (academic_period) => {
    const today = new Date().getTime();
    const company_creation_start_date = getDateTime(academic_period.company_creation_start_date);
    const company_creation_end_date = getDateTime(academic_period.company_creation_end_date);
    const planning_start_date = getDateTime(academic_period.planning_start_date);
    const planning_end_date = getDateTime(academic_period.planning_end_date);
    const evaluation_start_date = getDateTime(academic_period.evaluation_start_date);
    const evaluation_end_date = getDateTime(academic_period.evaluation_end_date);
    if(company_creation_start_date <= today && today <= company_creation_end_date) {
        return "company_creation";
    }else if(planning_start_date <= today && today <= planning_end_date){ 
        return "planning";
    }else if(evaluation_start_date <= today && today <= evaluation_end_date){
        return "evaluation";
    }else if(planning_end_date <= today && today <= evaluation_start_date){
        return "project";
    }
    
}

export {formatDate,getToday,getMilestoneStatus,getMilestonePlanningStatus,getDateTime,getAcademicPeriodStatus};
