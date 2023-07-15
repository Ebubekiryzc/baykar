import styles from "@/styles/home.module.css";
import Image from "next/image";
import { FC } from "react";

interface HomeProps {}

const Home: FC<HomeProps> = ({}) => {
  return (
    <main>
      <div className="section-padding container h-100">
        <div
          className={`d-flex gap-5  align-items-center justify-content-center h-100 ${styles.landingContent}`}
        >
          <div className={`fs-4 ${styles.textContent}`}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel, unde
            veniam. Deserunt dolore voluptas ullam eius rem ratione quia
            nostrum, veritatis accusantium sunt omnis quis voluptatibus
            perspiciatis delectus suscipit sit!
          </div>
          <div className={`rounded-start ${styles.imageContent}`}>
            <Image
              src="/bayraktar-tb2-landing.png"
              alt="Landing image"
              fill
              className={styles.heroImage}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
