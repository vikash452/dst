var c = document.getElementById("mycanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(750, 400, 40, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.font='30px Arial'
    ctx.fillText('a',750,400)
    ctx.strokeText('a',750,400)

    ctx.beginPath();
    ctx.arc(400, 40, 40, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.font='30px Arial'
    ctx.fillText('b',400,40)
    ctx.strokeText('b',400,40)

    ctx.beginPath();
    ctx.arc(200, 400, 40, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.font='30px Arial'
    ctx.fillText('c',200,400)
    ctx.strokeText('c',200,400)

    ctx.beginPath();
    ctx.arc(1200, 150, 40, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.font='30px Arial'
    ctx.fillText('d',1200,150)
    ctx.strokeText('d',1200,150)

    ctx.beginPath();
    ctx.arc(1200, 600, 40, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.font='30px Arial'
    ctx.fillText('e',1200,600)
    ctx.strokeText('e',1200,600)