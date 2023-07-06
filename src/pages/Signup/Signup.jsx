import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import styles from "./styles.module.scss";

import { signupPlayer } from "../../GlobalState/PlayerSlice/playerSlice";

import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const onSubmit = async () => {
    setFieldErrors("");
    setError("");
    const data = {
      username,
      password,
      email,
    };
    dispatch(signupPlayer({ data, navigate, setFieldErrors, setError }));
  };

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.container_signUp}>
        <h2>Sign Up</h2>
        <div className={styles.container_signUp_inputBlock}>
          <Input
            label="User Name"
            type="text"
            placeholder="User Name"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            error={fieldErrors.username}
          />
          <Input
            label="Email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={fieldErrors.email}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={fieldErrors.password}
          />
        </div>
        <p>
          Already have an account ? <Link to="/login">Login</Link>
        </p>
        {error && <p className={styles.container_signUp_error}>{error}</p>}
        <Button onClick={onSubmit} size="medium" color="blue">
          Sign Up
        </Button>
      </div>
    </motion.div>
  );
};

export default Signup;
