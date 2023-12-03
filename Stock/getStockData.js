async function getData(stockSymbol, limit){
    if(!stockSymbol){
        alert('뭐라도 입력하세요.');
        return;
    }
    
    var flag = true;
    if(!limit){
        flag = false;
    }
    var rawData = await (await window.fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&outputsize=full&apikey=demo'+encodeURIComponent(stockSymbol)+'&apikey=VFKNX13I1KQF3WRZ')).json();
    
    var errMsg = rawData['Error Message'];
    if(errMsg){
        if(errMsg.includes('틀린 API')){
            alert('주식 심볼을 찾을 수 없습니다.');
        }else if(errMsg.includes('호출빈도가 높다면')){
            alert('너무 많이 요청했습ㄴ디ㅏ. 좀 기다리세요.');
        }else{
            alert('alpha vantage의 에러 메시지:'+errMsg);
        }
        return;
    }
    
    var labels = [];
    var prices = [];
    var count = 0;
    for(var label in rawData['Time Series (Daily)']){
        if(flag && count >= limit) break;
        labels.push(label);
        prices.push(parseFloat(rawData['Time Series (Daily)'][label]['4. close']));
        count++;
    }
    return [labels.reverse(), prices.reverse()];
}