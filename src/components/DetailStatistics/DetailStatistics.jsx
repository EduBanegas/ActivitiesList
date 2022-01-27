import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import * as moment from "moment";

import timeIcon from "../../Img/iconTime.png";
import distanceIcon from "../../Img/distanceIcon.png";
import elevationIcon from "../../Img/elevationIcon.png";

import styles from "../Home/Home.module.scss";

export default function DetailStatistics(props) {
  const { id } = useParams();

  const recentMonths = useSelector((state) => state.recentMonths);

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
      <h2>Actividades de {recentMonths[id].nameMonth}</h2>

      <div className={styles.containerCardsActivities}>
        {recentMonths[id].activitiesOfTheMonth.map((currentActivitie, index) => {
          return (
            <div key={index} className={styles.cardActiv}>
              <h4>{currentActivitie.name}</h4>

              <h5>{currentActivitie.start_date}</h5>
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
