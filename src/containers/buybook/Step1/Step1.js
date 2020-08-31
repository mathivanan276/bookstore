import React from 'react';
import classes from './Step1.module.css';
import Button from '../../../components/UI/form/button/button'

class Step1 extends React.Component {

    state = {
        addressId: this.props.addressId,
        addressForm : {
            street:{
                elementType:'input',
                elementConfig:{
                    placeholder:'',
                    type:'text',
                    name:'street'
                }, 
                validation:{
                    required: true,
                    address: true
                },
                touched : false,
                isvalid : true,
                value: this.props.address.streetAddress
            },
            district:{
                elementType:'input',
                elementConfig:{
                    placeholder:'',
                    type:'text',
                    name:'district'
                }, 
                validation:{
                    required: true,
                },
                touched : false,
                isvalid : true,
                value: this.props.address.district
            },
            state:{
                elementType:'input',
                elementConfig:{
                    placeholder:'',
                    type:'text',
                    name:'state'
                }, 
                validation:{
                    required: true,
                },
                touched : false,
                isvalid : true,
                value: this.props.address.state
            },
            pin:{
                elementType:'input',
                elementConfig:{
                    placeholder:'',
                    type:'text',
                    name:'pin'
                }, 
                validation:{
                    required: true,
                    minLength: 6,
                    maxLength:8
                },
                touched : false,
                isvalid : true,
                value: this.props.address.pin
            }
        },
        updating: true,
        error:false,
        selected:this.props.type
    }
    handleAddressChange = ( event,addressId) => {
        this.setState({
            ...this.state,
            addressId,
            selected:'select'
        })
    }
    handleChange = (event,name) => {
        const updatedAddressForm = {...this.state.addressForm};
        updatedAddressForm[name].value = event.target.value;
        updatedAddressForm[name].touched = true;
        updatedAddressForm[name].isvalid = this.checkValidity(event.target.value,updatedAddressForm[name].validation);
        this.setState({
            ...this.state,
            addressForm:updatedAddressForm,
            addressId:'',
            selected:'form'
        })
    }
    checkValidity = (value,rule) => {
        let isvalid = true;
        if(rule.required){
            isvalid = value.trim(' ') !== '' && isvalid;
        }
        if(rule.name){
            const pattern = /^[A-Za-z]+$/;
            isvalid = pattern.test(value) && isvalid;
        }
        if(rule.minLength){
            isvalid = value.length >= rule.minLength && isvalid;
        }
        if(rule.maxLength){
            isvalid = value.length <= rule.maxLength && isvalid;
        }
        return isvalid;
    }
    formvalid = () => {
        let validating = false;
        let formElement = [];
        for(let key in this.state.addressForm){
            formElement.push({
                config : this.state.addressForm[key]
            })
        }
        validating = formElement.map( element => {
            if(element.config.isvalid){
                return true;
            }else{
                return false;
            }
        })
        return validating.filter(data => data === false);
    }
    handleSubmit = () => {
        if(this.formvalid().length === 0 && this.state.selected == 'form'){
            let address = {
                streetAddress : this.state.addressForm.street.value,
                district:this.state.addressForm.district.value,
                state:this.state.addressForm.state.value,
                pin:this.state.addressForm.pin.value
            }
            this.props.changed(null,address)
        } else if (this.state.addressId !== '' && this.state.selected == 'select'){
            this.props.changed(this.state.addressId,null)
        } else{
            this.setState({
                ...this.state,
                error:true
            })
        }
    }

    render(){
    let address = null;

    if(this.props.addresses.length > 0){
        address = this.props.addresses.map(address => {
            return <div className={classes.AddressCard} onClick={(event)=>this.handleAddressChange(event,address.addressId)}>
                <input type='checkbox' checked={this.state.addressId === address.addressId} />
                        <address>
                            {address.streetAddress}<br />
                            {address.district}<br/>
                            {address.state}<br/>
                            pin: {address.pin}
                        </address>
                    </div>
        })
    }
    let error = null;   
        if(this.state.error){
            error =  <div className={classes.Error}>
                        <p>Validation Error</p>
                    </div>
        }
        const formElement = [];
        let form = null;
        for(let key in this.state.addressForm){
            formElement.push({
                id: key,
                elementConfig : this.state.addressForm[key].elementConfig,
                value : this.state.addressForm[key].value,
                isvalid : this.state.addressForm[key].isvalid
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
                onChange={(event)=>this.handleChange(event,data.id)} />
            </div>
        })
    return (
        <div className={classes.Section}>
            <h3>Select Your Address</h3>
            <div className={classes.Address}>
                {address}
            </div>
            <h3>Enter New</h3>
            <div>
                {form}
            </div>
            <div className={classes.Buttons}>
                <button onClick={this.props.Goback} className={classes.Back}>Back</button>
                <button onClick={this.handleSubmit} className={classes.Next}>Next</button>
            </div>
        </div>
    )
}
}
export default Step1;