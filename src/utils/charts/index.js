import moment from "moment";

export const chartsUploadMapper = (state) => {
  const uploadData = {
    date: moment().format("MMDDYYYYHHmmss"),
    rates: {
      [state["USD"]]: state["USD"],
      [state["RUB"]]: state["RUB"],
      [state["BYN"]]: state["BYN"],
    },
  };
  return uploadData;
};

export const checkLastUpload = (lastUploadeData) => {
  const uploadDateFromNow = moment(lastUploadeData.date, "MMDDYYYYHHmmss");
  if (uploadDateFromNow.diff(moment()) <= -6) {
    return true;
  }
  return false;
};
