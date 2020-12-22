var ctx = document.getElementById("line-chart");
var button = document.getElementById("reset");
Chart.defaults.global.legend.display = false;

var graph = new Chart(ctx, {
    type: "line",
    data: {
        labels: [],
        datasets: [{
            data: [],
            borderColor: "#361cc1",
            borderWidth: "2",
            lineTension: "0.1",
            pointBackgroundColor: "#2e82ef",
            pointRadius: "4",
            pointBorderColor: "rgb(0,0,0,0)",
            hoverBorderColor: "#000",
            pointHoverRadius: "5",
        }]
    },
    options: {
        layout: {
            padding: {
                left: 30,
                right: 30,
                top: 30,
                bottom: 100
            }
        },
        animation: {
            duration: "0"
        },
        scales: {
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: "Time",
                    fontColor: "#000"
                },
                gridLines: {
                    drawOnChartArea: false
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: "Weight (in g)",
                    fontColor: "#000"
                },
                gridLines: {
                    drawOnChartArea: false
                }   
            }]
        },
        tooltips: {
            backgroundColor: "#fff",
            bodyFontColor: "#000",
            titleFontColor: "#000",
            borderColor: "rgba(0,0,0,0.5)",
            borderWidth: "2",
            bodySpacing: "5"
        }
    }
});

button.addEventListener("click", () => {
    graph.data.datasets[0].data = [];
    graph.data.labels = [];
    graph.update(0);
});

firebase.database().ref("/Pressure").on("value", snap => {
    var dataPressure = snap.val();    
    var date = new Date();
    graph.data.datasets[0].data.push(dataPressure);
    graph.data.labels.push(date.toLocaleTimeString());
    graph.update(0);
});

