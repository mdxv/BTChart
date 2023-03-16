const ctx = document.getElementById('myChart');
const price = document.getElementById('price');
var xmlhttp = new XMLHttpRequest();

var url = "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=brl&days=1";
xmlhttp.open("GET", url, true);
xmlhttp.send();

var timestamps = [];
var prices = [];

xmlhttp.onreadystatechange = function() {
    if ( this.readyState == 4 && this.status == 200 ) {
        var data = JSON.parse( this.responseText );
        console.log(data)

        data = data['prices'];

        for (var i in data) {
            var d = new Date(data[i][0]).toLocaleString('pt-BR');
            timestamps.push(d.slice(d.indexOf(",") + 1, -3));
            prices.push(data[i][1].toFixed(2));
        }

        let conversao = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        })

        price.innerHTML = `${conversao.format(data[data.length - 1][1].toFixed(2))}`
        console.log(timestamps);
    }
}

new Chart(ctx, {
    type: 'line',
    data: {
        labels: timestamps,
        datasets: [{
            label: 'BitCoin',
            data: prices,
            borderColor: '#FF0000',
            tension: 0,
            pointRadius: 0.5
        }]
    },
    options: {
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
        }
    }
});
