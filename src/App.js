import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaAngleDown} from "react-icons/fa";
import './App.css';

function App() {
    const initialFormInputs = {
        name: '',
        email: '',
        type: '',
        password: '',
    };

    const [formValues, setformValues] = useState({ ...initialFormInputs });
    const [errors, seterrors] = useState([]);
    const [step, setstep] = useState(1);
    const [passwordVisible, setpasswordVisible] = useState(false);

    const displayPassword = () => {
        setpasswordVisible(!passwordVisible);
    }

    const validateFormInputs = (name, value) => {
        const rg = {
            email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            password: /.{8,}/
        }

        if ((name in rg) && (rg[name].test(value))) {
            return true;
        }

        if (!(name in rg)) {
            return true;
        }
         return false;
    };


    const handleInputChange = (e) => {
        const {name, value } = e.target;

        setformValues({...formValues, [name]: value});

        if( validateFormInputs(name, value)) {
            if(errors.includes(name)) {
                seterrors( errors.filter((x)=>  x !== name ) )
            }

            if(e.target.parentElement.querySelector('.error-message') && (name !== 'type')) {
                e.target.parentElement.querySelector('.error-message').style.display = 'none';
                e.target.parentElement.style.border = '1px solid #ccc';
                e.target.parentElement.querySelector('.legend').style.color = 'rgb(116, 113, 113)';
            }

        }else{
            if(!(errors.includes(name))){
                seterrors([...errors, name]);
            }

            e.target.parentElement.style.border = '1px solid red';
            e.target.parentElement.querySelector('.legend').style.color = 'red';
            e.target.parentElement.querySelector('.error-message').style.display = 'block';
            document.querySelector('.signup-form input[type="submit"] ').classList.add('submit_disabled');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setstep(step + 1);

        // similar reverse function  could be implemented if theres a go-back button
        document.getElementById('step-dots').children.item(step).style.backgroundColor = '#000';
    };



    // because of the async nature of state update
    useEffect(() => {
        if( (Object.values(formValues).every(x => x !== '')) && (errors.length === 0)){
            document.querySelector('.signup-form input[type="submit"] ').classList.remove('submit_disabled');
        }
    },[errors, formValues]);




  return (
    <div className="App">
        <div className="left-container">
            <div className="step-count">
                Step <span className="count-number"> { step } </span> of 3
                <div className="step-dots-container" id="step-dots">
                    <div style={{ backgroundColor: '#000' }}> </div>
                    <div> </div>
                    <div> </div>
                </div>
            </div>

            <div className="signup-content-container">
                <h3 className="signup-text">Let's setup your account</h3>
                <div className="alternate-login-text">Already have an account? <span>sign in</span> </div>
                <div className="form-container">
                    <form className="signup-form">
                        <fieldset>
                                <input type="text" placeholder="Your name" name="name" value={ formValues.name } onChange={ handleInputChange } ></input>
                                <div className="legend" tabIndex="0" >Your name</div>
                        </fieldset>

                        <fieldset>
                            <input type="text" placeholder="Email address" name="email" value={ formValues.email } onChange={ handleInputChange } ></input>
                            <div className="legend" tabIndex="0" >Email address</div>
                            <div className="error-message">Please enter a valid email address</div>
                        </fieldset>

                        <fieldset>
                            <select name="type"  value={ formValues.type } onChange={ handleInputChange } >
                                <option value="DEFAULT" hidden >I would describe my User type as</option>
                                <option value="Developer">Developer</option>
                                <option value="Student">Student</option>
                            </select>
                            <FaAngleDown className="fa-icons" />
                        </fieldset>

                        <fieldset>
                            <input type= { passwordVisible ? "text" : "password" } placeholder="Password" name="password" value={ formValues.password } onChange={ handleInputChange } ></input>
                            <div className="legend" tabIndex="0" >Password</div>
                            <div className="error-message">Password should be at least 8 characters long</div>
                            { passwordVisible ? <FaEyeSlash onClick={ displayPassword } className="fa-icons"/> :<FaEye onClick={ displayPassword }className="fa-icons"/>  }
                        </fieldset>

                        <span>Minimum 8 characters</span>

                        <input className="submit_disabled" type="submit" value="next" onClick={handleSubmit}></input>
                    </form>

                    <div className="terms">By clicking the "Next" button, you agree to creating a  free account,
                    and to <span> Terms of service</span> and <span> Privacy Policy.</span></div>
                </div>
            </div>

        </div>

        <div className="right-container">
            <h1>Dummy Heading</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>

    </div>
  );
}

export default App;
