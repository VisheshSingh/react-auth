import { useContext, useRef } from 'react';
import AuthContext from '../../store/AuthContext';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const newPasswordRef = useRef();
  const { token } = useContext(AuthContext);

  const API_KEY = process.env.REACT_APP_API_KEY;

  const submitHandler = (e) => {
    e.preventDefault();

    const password = newPasswordRef.current.value;
    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idToken: token,
          password,
          returnSecureToken: false,
        }),
      }
    )
      .then((res) => {})
      .catch((err) => {});
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
