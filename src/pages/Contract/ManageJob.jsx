import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../const/api";
import Overview from "./OverView";

function ManageJob() {
  const [data, setData] = useState([]);

  const callData = async () => {
    const resp = await axios.get(`${BASE_URL}/contract/jobs`);

    if (resp.data.data) setData(resp.data.data);
  };
  useEffect(() => {
    callData();
  }, []);

  const submit = (data) => {
    return axios.patch(`${BASE_URL}/contract`, data);
  };

  if (data.length == 0) return <></>;
  return <Overview kanbanData={data} submit={submit} />;
}

export default ManageJob;
