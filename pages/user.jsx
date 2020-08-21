import Head from "next/head";
import { usestate } from "react";
import styles from "../styles/Home.module.css";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import axios from "./../util/util";
const DATA = process.env.PORT;
export default function Home() {
  const facebooklogin = () => {
    // cosnt[(dta, setData)] = useState({});
    // window.location = "http://localhost:3000/api/auth/facebook";
    // axios.GET();
    // axios
    //   .GET("/api/user", false)
    //   .then((data) => {
    //     console.log(data.data);
    //     setData(data.data);
    //   })
    //   .catch((err) => {});
    // data:{}})
  };

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <a className='fb' href='/auth/facebook' type='submit'>
          <FaFacebookF style={{ fontSize: "20px", color: "#ffff" }} /> Connect
          with Facebook
        </a>
        <button className='google' type='submit'>
          <FcGoogle style={{ fontSize: "20px" }} /> &nbsp; Connect with Google
        </button>
      </div>
      <style jsx>{`
        .fb {
          border: none;
          width: 100%;
          text-align: center;
          padding: 14px;
          border-radius: 4px;
          color: white;
          background-color: rgb(51, 89, 157);
          width: 200px;
        }
        .google {
          border: 1px solid red;
          color: red;
          width: 100%;
          text-align: center;
          padding: 14px;
          border-radius: 4px;

          background-color: #eeee;

          width: 200px;
          margin-top: 20px;
        }
      `}</style>
    </>
  );
}
