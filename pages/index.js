import { useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/router";
export default function Home() {
  const router = useRouter();
  const { token } = router.query;

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <div>
          <h1>This is Home Page</h1>
          <h6>{token}</h6>
        </div>
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
