function generateChart(canvas, labels, stockData, buyDecision, sellDecision, noAnimation){
    function gen(decisions){
        var data = [];
        for(var eachLabel of decisions){
            data.push({
                x: eachLabel,
                y: stockData[labels.indexOf(eachLabel)],
                r: 5
            });
        }
        return data;
    }
    if(window.chartInstance){
        window.chartInstance.destroy();
    }
    window.chartInstance = new Chart(canvas.getContext('2d'), {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label: '주식 데이터',
                borderColor: 'rgb(0,0,0)',
                data: stockData,
                lineTension: 0,
                fill: false,
                radius: 0,
                borderWidth: 1
            },{
                label: '매수 데이터',
                borderColor: 'rgb(255,0,0)',
                data: gen(buyDecision),
                fill: false,
                type: 'bubble',
                backgroundColor: 'rgb(255,0,0)',
                pointStyle: 'triangle',
                rotation: 0
            },{
                label: '매도 데이터',
                borderColor: 'rgb(0,0,255)',
                data: gen(sellDecision),
                fill: false,
                type: 'bubble',
                backgroundColor: 'rgb(0,0,255)',
                pointStyle: 'triangle',
                rotation: 180
            }]
        },
        options: {
            animation: {
                duration: noAnimation ? 0 : 500
            },
            maintainAspectRatio: false
        }
    });
}
window.onload = function(){
    var chartDom = document.getElementById('chart');
    
    // 예시로
    window.mainChart = generateChart(chartDom, [1,2,3,4,5], [20, 60, 50, 99, 100], [2,3], [5]);
};