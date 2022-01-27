import { useDispatch, useSelector } from "react-redux";
import styles from "./Statistics.module.scss";
import * as moment from "moment";
import { loadRecentMonths } from "../../Store/Action/action";

import timeIcon from "../../Img/iconTime.png";
import distanceIcon from "../../Img/distanceIcon.png";
import elevationIcon from "../../Img/elevationIcon.png";
import { NavLink } from "react-router-dom";

export default function Statistics() {
  const dispatch = useDispatch();

  // Traemos todas las actividades del usuario
  const activities = useSelector((state) => state.activitiesUser);

  // Funcion para pasar de segundos a horas porque la api nos da el tiempo en segundos
  function secondsToString(seconds) {
    var hour = Math.floor(seconds / 3600);
    hour = hour < 10 ? "0" + hour : hour;
    var minute = Math.floor((seconds / 60) % 60);
    minute = minute < 10 ? "0" + minute : minute;
    var second = seconds % 60;
    second = second < 10 ? "0" + second : second;
    return hour + ":" + minute + ":" + second;
  }

  // Arreglo con los ultimos 3 meses y todos sus datos
  let months = [];

  if (activities.length > 0) {
    for (let i = 0; i < 3; i++) {
      months.push({
        monthStart: moment()
          .startOf("month")
          .subtract(i + 1, "months")
          .format("DD/MM/YYYY"),
        monthEnd: moment()
          .endOf("month")
          .subtract(i + 1, "months")
          .format("DD/MM/YYYY"),
        nameMonth: moment()
          .subtract(i + 1, "months")
          .format("MMMM"),
        activitiesOfTheMonth: [],
        averagesOfTheMonth: { distance: "", time: "", elevationGain: "" },
        id: i,
      });
    }

    for (let i = 0; i < 3; i++) {
      activities.forEach((current) => {
        const auxActionDate = moment(moment(current.start_date).format("DD/MM/YYYY"), "DD/MM/YYYY");
        const auxMonthStart = moment(months[i].monthStart, "DD/MM/YYYY");
        const auxMonthEnd = moment(months[i].monthEnd, "DD/MM/YYYY");

        if (auxActionDate >= auxMonthStart && auxActionDate <= auxMonthEnd) {
          return months[i].activitiesOfTheMonth.push({
            total_elevation_gain: current.total_elevation_gain,
            distance: current.distance,
            elapsed_time: current.elapsed_time,
            name: current.name,
            start_date: moment(current.start_date).format("DD/MM/YYYY"),
          });
        }
      });
    }

    for (let i = 0; i < 3; i++) {
      let elapsed_time = 0;
      let distance = 0;
      let total_elevation_gain = 0;

      months[i].activitiesOfTheMonth.forEach((current) => {
        elapsed_time += current.elapsed_time;
        distance += current.distance;
        total_elevation_gain += current.total_elevation_gain;
      });

      months[i].averagesOfTheMonth.elapsed_time = secondsToString(elapsed_time);
      months[i].averagesOfTheMonth.distance = distance;
      months[i].averagesOfTheMonth.total_elevation_gain = total_elevation_gain;
    }

    dispatch(loadRecentMonths(months));
  }

  return (
    <div className={styles.containerStatistics}>
      <h2>Estadisticas</h2>

      <div className={styles.containerCards}>
        {months.map((current) => {
          return (
            <NavLink key={current.monthStart} to={`/statistics/${current.id}`}>
              <div className={styles.containerCard}>
                <h3>{current.nameMonth}</h3>
                <div className={styles.containerDateStartDateEnd}>
                  <div>
                    <p>Fecha inicial: </p>
                    <h5>{current.monthStart}</h5>
                  </div>
                  <div>
                    <p>Fecha final: </p>
                    <h5>{current.monthEnd}</h5>
                  </div>
                </div>
                <h4>Datos acumulados del mes</h4>
                <div className={styles.containerMoreInfoCard}>
                  <div className={styles.moreInfo}>
                    <h4>Distancia total</h4>

                    <p>{current.averagesOfTheMonth.distance} mt</p>
                    <img className={styles.icons} src={distanceIcon} alt="" />
                  </div>

                  <div className={styles.moreInfo}>
                    <h4>Tiempo total</h4>

                    <p>{current.averagesOfTheMonth.elapsed_time}</p>
                    <img className={styles.icons} src={timeIcon} alt="" />
                  </div>

                  <div className={styles.moreInfo}>
                    <h4>Elevacion total</h4>
                    <p>{current.averagesOfTheMonth.total_elevation_gain} mt</p>

                    <img className={styles.icons} src={elevationIcon} alt="" />
                  </div>
                </div>
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
