import axios from "axios";

const getListOfLanguages = () => {
    const URL = import.meta.env.VITE_BACKEND_URL;
    const token = localStorage.getItem("token");
    return axios.get(`${URL}/language`, { headers: { token } })
        .then((res) => {
            return res.data.data;
        })
        .catch((err) => {
            console.log(err);
        });
};

export default getListOfLanguages;