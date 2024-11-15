import { HydrateClient } from "api/trpc/server";
import styles from "./index.module.css";
import { Flag } from "flag-checker/components";
import { flagCheck } from "flag-checker/util";

export default async function Home() {
  const sayHello = () => console.log("Hello World!");
  const sayHelloAgain = (text: string) => console.log(`Hello ${text}!`);
  const sayHelloMultiple = (greeting: string, name: string) =>
    console.log(`${greeting} ${name}!`);

  void flagCheck("test-site.say-hello", sayHello);
  void flagCheck("test-site.say-hello", sayHelloAgain, "Again");
  void flagCheck(
    "test-site.say-hello",
    sayHelloMultiple,
    "Good Morning",
    "Name Here"
  );

  return (
    <HydrateClient>
      <main className={styles.main}>
        <div className={styles.container}>
          <Flag flagName="test-site.green-box" fallback={<BlueBox />}>
            <GreenBox />
          </Flag>
        </div>
      </main>
    </HydrateClient>
  );
}

const GreenBox = () => {
  return (
    <>
      <h2 style={{ color: "white" }}>
        This box should only show if the flag is enabled
      </h2>
      <div style={{ backgroundColor: "green", padding: "32px" }}>Test box</div>
    </>
  );
};

const BlueBox = () => {
  return (
    <>
      <h2 style={{ color: "white" }}>
        This box should only show if the flag is disabled
      </h2>
      <div style={{ backgroundColor: "blue", color: "white", padding: "32px" }}>
        Test box
      </div>
    </>
  );
};
