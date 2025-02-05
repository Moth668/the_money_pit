


const MonthSelector:React.FC = () => {
    

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];




    

    




    return (
     
        <select title='The Great Bell'>
            {months.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
        
    );
};



  


export default MonthSelector;