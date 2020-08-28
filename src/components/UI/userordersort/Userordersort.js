import React,{ useState } from 'react';
import classes from './Userordersort.module.css';

export default function Userordersort(props) {
    const [month, setMonth] = useState((new Date().getMonth()+1) >= 10 ? new Date().getMonth()+1 : '0'+(new Date().getMonth()+1));
    const [year, setYear] = useState('2020');
    return (
                <div className={classes.Section}>
                    <select onChange={(event) => setMonth(event.target.value)} value={month}>
                        <option value=''>All</option>
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
                    <select onChange={(event) => setYear(event.target.value)}>
                        <option value='2020'>2020</option>
                    </select>
                    <p 
                    style={{marginLeft:'0.75rem',color:'#3170b2'}}
                    onClick={()=>{
                        if(year !== ''){
                            props.getSort(year+'-'+month)
                        }
                        }}>search</p>
                </div>
    )
}
