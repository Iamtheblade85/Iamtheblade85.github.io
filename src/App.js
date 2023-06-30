import './App.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAuthorizedPlayer } from './GlobalState/PlayerSlice/playerSlice';
import { User } from './UserService';
import MyRouters from './router/MyRouters'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion"

function App() {
  const dispatch = useDispatch()
  const { token } = useSelector(state => state.user)
  const Variants = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 }
  }
  const mainTransition = {
    type: "spring", ease: "easeInOut", damping: 35, delay: 0.5
  }

  useEffect(() => {
    User.init();
    if (token) {
      dispatch(getAuthorizedPlayer())
    }
  }, [dispatch, token])

  return (
    <motion.div
      className="App"
      transition={mainTransition}
      variants={Variants}
      initial="initial"
      whileInView="whileInView">
      <ToastContainer />
      <MyRouters />
    </motion.div>
  );
}

export default App;
