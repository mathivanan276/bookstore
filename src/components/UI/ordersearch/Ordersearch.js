import React,{useState} from 'react';
import classes from './Ordersearch.module.css';


export default function Ordersearch(props) {
    const [sortBy,setSortBy] = useState('date');
    const [month, setMonth] = useState('01');
    const [year,setYear] = useState('2020');
    const [date1,setDate1] = useState('');
    const [date2,setDate2] = useState('');
    const [error,setError] = useState(false);
    let sort =  <div>
                    <input type='date' onChange={(event)=>props.getsearch(event.target.value)}/>
                </div>
    if(sortBy === 'month'){
        sort =  <div>
                    <select onChange={(event)=>{
                        setMonth(event.target.value)
                    }}>
                        <option value='01'>Jan</option>
                        <option value='02'>Feb</option>
                        <option value='03'>Mar</option>
                        <option value='04'>Apr</option>
                        <option value='05'>May</option>
                        <option value='06'>Jun</option>
                        <option value='07'>July</option>
                        <option value='08'>Aug</option>
                        <option value='09'>Sep</option>
                        <option value='10'>Oct</option>
                        <option value='11'>Nov</option>
                        <option value='12'>Dec</option>
                    </select>
                    <select onChange={(event)=>{
                        setYear(event.target.value)
                    }}>
                        <option value='2020'>2020</option>
                    </select>
                    <p 
                    onClick={()=>props.getsearch(year+'-'+month)}
                    style={{marginLeft:'0.75rem',color:'#3170b2'}}>search</p>
                </div>
    }
    if(sortBy === 'range'){
        sort =  <div>
                    <input type='date' onChange={(event)=>setDate1(event.target.value)} className={error ? classes.Error : null} />
                    <span> to </span>
                    <input type='date' onChange={(event)=>setDate2(event.target.value)} className={error ? classes.Error : null} />
                    <p onClick={()=>{
                        if(date1 !== '' && date2 !== '' && date2 > date1 && date1 !== date2 && new Date(date2) < new Date()){
                            props.getRange(date1,date2)
                            setError(false)
                        } else {
                            setError(true)
                        }
                    }}
                    style={{marginLeft:'0.75rem',color:'#3170b2'}}>search</p>
                </div>
    }
    return (
        <div className={classes.Section}>   
            <div >
                <label>Sort By</label>
                <select onChange={(event)=>{setSortBy(event.target.value)}}>
                    <option value='date'>Date</option>
                    <option value='month'>Month/Year</option>
                    <option value='range'>Range</option>
                </select>
            </div>  
            {sort}
        </div>
    )
}
