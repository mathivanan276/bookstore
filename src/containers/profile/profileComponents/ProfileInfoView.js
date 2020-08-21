import React,{useState} from 'react';
import classes from './ProfileInfoView.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../components/UI/form/button/button';
const ProfileInfoView = (props) => {
    const [disable,setDisable] = useState(true);
    const formElement = [];
    let form = null;
    for(let key in props.profileForm){
        formElement.push({
            id: key,
            elementType : props.profileForm[key].elementType,
            elementConfig : props.profileForm[key].elementConfig,
            value : props.profileForm[key].value,
            isvalid : props.profileForm[key].isvalid
        })
    }
    form = formElement.map(data => {
        return <div key={data.id}>
            <label>{data.id.toUpperCase()} <span style={{color:'red'}}>*</span></label>
            <input 
            style={ !data.isvalid ? {border:'2px solid red'} : null}
            type={data.elementType}  
            {...data.elementConfig}
            value={data.value}
            disabled={disable}
            onChange={(event) =>{props.changed(event,data.id)} } />
        </div>
    })
    // console.log(form);
    let error = null;
        if(props.error){
            error = <p className={classes.Error}>Something Went Wrong!!</p>
        }
    return (
        <div>
            
        <div className={classes.Section}>
            <h3>Personal Info</h3>
            <p onClick={()=>{setDisable(!disable)}}><FontAwesomeIcon icon={faUserEdit} /> Edit</p>
            {form}
            <Button show={disable} clicked={props.submitted}>Edit</Button>
        </div>
        </div>
    )
}
export default ProfileInfoView;