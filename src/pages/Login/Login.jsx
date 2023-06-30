import { useState } from 'react';
import { useNavigate } from 'react-router'
import styles from './styles.module.scss'
import { useDispatch } from 'react-redux';
import { loginPlayer } from '../../GlobalState/PlayerSlice/playerSlice';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion"

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [usernameOrEmail, setUserNameOrEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  const onSubmit = async () => {
    setError('')
    setFieldErrors('')
    const data = {
      usernameOrEmail,
      password
    }
    dispatch(loginPlayer({ data, navigate, setFieldErrors, setError }))
  }

  return (
    <motion.div className={styles.container} initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}>
      <div className={styles.container_login}>
        <h2>Login</h2>
        <div className={styles.container_login_inputBlock}>
          <Input
            label="User Name or Email"
            type="text"
            placeholder="User Name or Email"
            value={usernameOrEmail}
            onChange={e => setUserNameOrEmail(e.target.value)}
            error={fieldErrors.usernameOrEmail}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            error={fieldErrors.password}
          />
        </div>
        <p>Don't have an account yet ? <Link to="/signup">Sign Up</Link></p>
        {error && <p className={styles.container_login_error}>{error}</p>}
        <Button onClick={onSubmit} size="medium" color="olive">Login</Button>
      </div>
    </motion.div>
  )
}

export default Login;