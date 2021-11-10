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
    Tooltip,
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
    constructor (ctx, params, index) {
        let data = params.loadLocal(index)
        const dsColor = 'rgb(255, 99, 132)'
        let timeStamps = data.time

       /* let timeStamps = []
        for (let i = 0; i< data.duration; i++) {
            timeStamps.push(i)
            if (data.log)
        }
        */
        let sensorValues = data.log
        let noSensors  = sensorValues.length

        let sensorDatasets = []
        for (let i = 0; i < noSensors; ++i) {
         /*   for (let j = 0; j < sensorValues[i].length; ++j) {
                if (sensorValues[i] == null) {
                    sensorValues[i] = 0
                }
                }
          */
          sensorDatasets[i] = {
                label: 'channel '+i+'',
                data: sensorValues[i],
                borderColor: CHART_COLORS[i],
                borderWidth: 1
            }
       }

        const totalDuration = 2000;
        const delayBetweenPoints = totalDuration / sensorValues[0].length;
        const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;


    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeStamps,
            datasets: sensorDatasets,
        },
        options: {
            maintainAspectRatio: false,
            interaction: {
                intersect: false
            },
            plugins: {
                legend: false
            },
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