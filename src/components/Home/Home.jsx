import { useSelector } from "react-redux";
import styles from "./Home.module.scss";
import * as moment from "moment";

import timeIcon from "../../Img/iconTime.png";
import distanceIcon from "../../Img/distanceIcon.png";
import elevationIcon from "../../Img/elevationIcon.png";

export default function Home() {
  const activitiesUser = useSelector((state) => state.activitiesUser);
  const aux = activitiesUser.slice(0, 8);

  function secondsToString(seconds) {
    var hour = Math.floor(seconds / 3600);
    hour = hour < 10 ? "0" + hour : hour;
    var minute = Math.floor((seconds / 60) % 60);
    minute = minute < 10 ? "0" + minute : minute;
    var second = seconds % 60;
    second = second < 10 ? "0" + second : second;
    return hour + ":" + minute + ":" + second;
  }

  return (
    <div className={styles.containerHome}>
      <h2>Actividades recientes</h2>

      <div className={styles.containerCardsActivities}>
        {aux.map((currentActivitie) => {
          return (
            <div key={currentActivitie.id} className={styles.cardActiv}>
              <h4>{currentActivitie.name}</h4>

              <h5>{moment(currentActivitie.start_date).format("DD/MM/YYYY")}</h5>
              <div className={styles.containerMoreInfoCard}>
                <div className={styles.moreInfo}>
                  <h6>Distancia</h6>

                  <p>{currentActivitie.distance}</p>
                  <img className={styles.icons} src={distanceIcon} alt="" />
                </div>

                <div className={styles.moreInfo}>
                  <h6>Tiempo</h6>

                  <p>{secondsToString(currentActivitie.elapsed_time)}</p>
                  <img className={styles.icons} src={timeIcon} alt="" />
                </div>

                <div className={styles.moreInfo}>
                  <h6>Elevacion</h6>
                  <p>{currentActivitie.total_elevation_gain} mt</p>

                  <img className={styles.icons} src={elevationIcon} alt="" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
