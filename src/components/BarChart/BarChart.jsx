import { Chart } from "react-chartjs-2";
import s from "./BarChart.module.css"

const BarChart = ({data}) => {
    return (
         <div className={s.container}>
            <Chart
                type="bar" 
                data={data} />
         </div>
    );
}
 
export default BarChart;