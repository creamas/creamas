
console.log("run...");

$("#player1Button").on("click", function() {
    var num = parseInt($("#num1").val());
    var den = parseInt($("#den1").val());
    getFraction(num, den);
});

$("#player2Button").on("click", function() {
    var num = parseInt($("#num2").val());
    var den = parseInt($("#den2").val());
    getFraction(num, den);
});

function getFraction(num, den) {
    var dado = (Math.floor((Math.random()*12) + 1))/2;
    var denF = Math.floor((Math.random()*10) + 1);
    var numF = Math.floor((num + den*dado) * denF / num);

    $("#game").text( numF+"/"+ denF);
}