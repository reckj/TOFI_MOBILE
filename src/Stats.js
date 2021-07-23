import {
    Chart,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip
} from 'chart.js';

Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip
);

const CHART_COLORS = ['rgb(255, 99, 132)', 'rgb(255, 159, 64)',  'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)', 'rgb(201, 203, 207)', 'rgb(0, 250, 192)', 'rgb(75, 192, 0)']


class Stats {
    constructor (ctx, params) {
        const dsColor = 'rgb(255, 99, 132)'
        let data = params.loadLocal()
        let timeStamps = data[data.length-1].time
        let sensor = data[data.length-1].log
        let sensorValues = []
        let sensor0 = []
        let sensor1 = []
        let sensor2 = []
        let sensor3 = []
        let sensor4 = []
        let noSensors  = sensor[0].length
        for (let i = 0; i < noSensors; i++) {
            let singleSensorLog = []
            console.log(i)
            for (let t = 0; t < sensor.length; t++) {

                singleSensorLog.push(sensor[t][i])
                //sensorValues[i].push(sensor[i][i])
                // sensor1.push(sensor[i][0])
            }
            sensorValues[i] = singleSensorLog
        }
        console.log(sensorValues)
        let sensorDatasets = []
        for (let i = 0; i < noSensors; ++i) {
          sensorDatasets[i] = {
                label: 'channel '+i+'',
                data: sensorValues[i],
                borderColor: CHART_COLORS[i],
                borderWidth: 1
            }
       }
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeStamps,
            datasets: sensorDatasets,
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    }
}
export default Stats