loadCameraOnConnect({
    container: '#driver_camera_container',
    port: 1181,
    image_url: '/?action=stream',
    data_url: '/config.json',
    attrs: {
        width: 951,
        height: 653
    }
});

loadCameraOnConnect({
    container: '#vision_camera_container',
    host: 'photonvision.local',
    port: 1183,
    image_url: '/stream.mjpg?1643123413248',
    data_url: '/config.json',
    attrs: {
        width: 729,
        height: 360
    }
});

const visibleState = document.getElementById('visible_state');
const aimState = document.getElementById('aim_state');
const speedState = document.getElementById('speed_state');

const timer = document.getElementById('timer_text');

const activeCommand = document.getElementById('active_command_text');


setInterval(() => {
    // states
    let visible = NetworkTables.getValue('/SmartDashboard/visible_state');
    if (visible == undefined)
        visible = 'red'
    visibleState.style.backgroundImage = "url(" + visible + "_gradient.png)";
    let aim = NetworkTables.getValue('/SmartDashboard/aim_state');
    if (aim == undefined)
        aim = 'red'
    aimState.style.backgroundImage = "url(" + aim + "_gradient.png)";
    let speed = NetworkTables.getValue('/SmartDashboard/speed_state');
    if (speed == undefined)
        speed = 'red'
    speedState.style.backgroundImage = "url(" + speed + "_gradient.png)";

    //timer
    let time = NetworkTables.getValue('/SmartDashboard/timer')
    if (time == undefined) {
        time = '02:30'
    }
    timer.innerHTML = time;

    //command
    let active = NetworkTables.getValue('/SmartDashboard/active_command');
    if (active == undefined)
        active = 'none'
    activeCommand.innerHTML = active;
})

function map(value, minimumInput, maximumInput, minimumOutput, maximumOutput) {
    return (value - minimumInput) * (maximumOutput - minimumOutput) / (maximumInput - minimumInput) + minimumOutput;
}

function mapX(x) {
    return map(x, 0, 16.46, 108, 807);
}

function mapY(y) {
    return map(y, 0, 8.23, 1105, 705);
}

const robot = document.getElementById('robot');

setInterval(() => {
    let robotPosition = NetworkTables.getValue('/SmartDashboard/robot_position');
    if (robotPosition == undefined) {
        robot.style.left = mapX(5) + "px";
        robot.style.top = mapY(3) + "px";
    } else {
        let x = Number.parseFloat(robotPosition.slice(0, robotPosition.indexOf(',')));
        let y = Number.parseFloat(robotPosition.slice(robotPosition.indexOf(',') + 2, robotPosition.length));
        robot.style.left = mapX(x) + "px";
        robot.style.top = mapY(y) + "px";
    }

    robotRotation = NetworkTables.getValue("/SmartDashboard/robot_rotation");
    if (robotRotation == undefined)
        robotRotation = '0'
    rotation = -Number.parseFloat(robotRotation) + 90;
    robot.style.transform = "rotate(" + rotation + "deg)"
});

const conveyor = document.getElementById('conveyor');

setInterval(() => {
    let firstColor = NetworkTables.getValue('/SmartDashboard/first_color');
    let secondColor = NetworkTables.getValue('/SmartDashboard/second_color');

    if (firstColor == undefined || secondColor == undefined) {
        firstColor = 'red';
        secondColor = 'red';
    }

    conveyor.style.backgroundImage = "url(" + 'conveyor/' + firstColor + secondColor + ".png)";
});


