const environment = require("./environment");
environment.init();

const ScheduleHelpers = require("./controllers/clinic-controller/schedule-helpers");
const FeatureFlag = require("tia-common/utils/feature-flag");

const getClinicsSchedule = async () => {
  const timeStart = new Date().getTime();
  const query = {
    startDate: "2021-10-01",
    endDate: "2021-10-31",
  };
  const showACI = await FeatureFlag.isEnabled("ACI");
  const schedule = await ScheduleHelpers.fetchSchedule(query, showACI);
  const resolveAppointmentProfile =
    await ScheduleHelpers.createAppointmentProfileResolver(schedule);
  await ScheduleHelpers.serializeSchedule(schedule, resolveAppointmentProfile);

  return new Date().getTime() - timeStart;
};

const analyzeTimes = (times) => {
  const filteredTimes = times.filter((time) => time !== null);
  let sum = 0;
  let max;
  let min;

  for (const time of filteredTimes) {
    sum += time;

    if (max === undefined || time > max) {
      max = time;
    }

    if (min === undefined || time < min) {
      min = time;
    }
  }

  return {
    min,
    max,
    avg: sum / filteredTimes.length,
  };
};

const main = async () => {
  const numThreads = 100;

  try {
    const promises = [...new Array(numThreads)];
    const times = await Promise.all(
      promises.map(async () => {
        try {
          return getClinicsSchedule();
        } catch (err) {
          console.log(err);

          return null;
        }
      })
    );
    const result = analyzeTimes(times);

    console.log(
      [process.env.MAX_POOL_SIZE, result.min, result.max, result.avg].join(",")
    );
  } catch (error) {
    console.log(error);
  }

  process.exit(0);
};

main();
