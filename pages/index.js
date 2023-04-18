import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [smsInput, setSMSInput] = useState("");
  const [result, setResult] = useState();
  const [smsText, setSMSText] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sms_message: smsInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);

      setSMSText(smsInput)
      setSMSInput("");

      console.log(data.result)
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>SMS Opt In Compliance Validation</title>
      </Head>

      <main className={styles.main}>
        <h3>SMS Opt In Compliance Validation</h3>
        <form onSubmit={onSubmit}>
          <input
            type="textarea"
            name="sms_message"
            placeholder=""
            value={smsInput}
            onChange={(e) => setSMSInput(e.target.value)}
          />
          <input type="submit" value="Check Compliance" />
        </form>
        <div className={styles.result}>{smsText}</div>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}