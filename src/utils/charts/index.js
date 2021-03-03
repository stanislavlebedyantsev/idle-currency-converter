import moment from "moment";

export const chartsUploadMapper = (rates) => {
  const uploadTime = moment().valueOf();
  const uploadData = {
    date: uploadTime,
    rates: [
      {
        currency: "USD",
        date: uploadTime,
        name: "USD",
        value: rates["USD"],
        pv: rates["USD"] * 6,
        amt: rates["USD"] * 6,
      },
      {
        currency: "RUB",
        date: uploadTime,
        name: "RUB",
        uv: rates["RUB"],
        pv: rates["RUB"] * 6,
        amt: rates["RUB"] * 6,
      },
      {
        currency: "BYN",
        date: uploadTime,
        name: "BYN",
        uv: rates["BYN"],
        pv: rates["BYN"] * 6,
        amt: rates["BYN"] * 6,
      },
    ],
  };
  return uploadData;
};

export const checkLastUpload = (lastUploadeData) => {
  const now = moment().valueOf();
  if (moment(now).diff(lastUploadeData) >= 21600000) {
    return true;
  }
  return false;
};

export const displayedCharts = (selectedCharts, chartsData) => {
  // return chartsData.reduce((acc, el, id) => {
  //   el.forEach((element) => {
  //     if(element.currency === )
  //   });
  //   return acc;
  // }, []);
};
