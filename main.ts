let direction = ""
let prev_direction = ""
let start_time = 0
let speed_fast = 255
let speed_slow = 100
let speed_turn_offset = 50
serial.redirectToUSB()
basic.forever(function () {
    start_time = control.millis()
    if (prev_direction != direction) {
        let speed = 0
        prev_direction = direction
        serial.writeLine("Direction:" + direction)
        if (direction == "FORWARD") {
            motor.MotorRun(motor.Motors.M1, motor.Dir.CCW, speed)
            motor.MotorRun(motor.Motors.M2, motor.Dir.CCW, speed)
            motor.MotorRun(motor.Motors.M3, motor.Dir.CCW, speed)
            motor.MotorRun(motor.Motors.M4, motor.Dir.CCW, speed)
        } else if (direction == "REVERSE") {
            motor.MotorRun(motor.Motors.M1, motor.Dir.CW, speed)
            motor.MotorRun(motor.Motors.M2, motor.Dir.CW, speed)
            motor.MotorRun(motor.Motors.M3, motor.Dir.CW, speed)
            motor.MotorRun(motor.Motors.M4, motor.Dir.CW, speed)
        } else if (direction == "ROTATE_CLOCKWISE") {
            motor.MotorRun(motor.Motors.M1, motor.Dir.CCW, Math.min(255, speed + speed_turn_offset))
            motor.MotorRun(motor.Motors.M2, motor.Dir.CCW, Math.min(255, speed + speed_turn_offset))
            motor.MotorRun(motor.Motors.M3, motor.Dir.CW, Math.min(255, speed + speed_turn_offset))
            motor.MotorRun(motor.Motors.M4, motor.Dir.CW, Math.min(255, speed + speed_turn_offset))
        } else if (direction == "ROTATE_COUNTERCLOCKWISE") {
            motor.MotorRun(motor.Motors.M1, motor.Dir.CW, Math.min(255, speed + speed_turn_offset))
            motor.MotorRun(motor.Motors.M2, motor.Dir.CW, Math.min(255, speed + speed_turn_offset))
            motor.MotorRun(motor.Motors.M3, motor.Dir.CCW, Math.min(255, speed + speed_turn_offset))
            motor.MotorRun(motor.Motors.M4, motor.Dir.CCW, Math.min(255, speed + speed_turn_offset))
        } else if (direction == "TRAVERSE_LEFT") {
            motor.MotorRun(motor.Motors.M1, motor.Dir.CCW, speed)
            motor.MotorRun(motor.Motors.M2, motor.Dir.CW, speed)
            motor.MotorRun(motor.Motors.M3, motor.Dir.CW, speed)
            motor.MotorRun(motor.Motors.M4, motor.Dir.CCW, speed)
        } else if (direction == "TRAVERSE_RIGHT") {
            motor.MotorRun(motor.Motors.M1, motor.Dir.CW, speed)
            motor.MotorRun(motor.Motors.M2, motor.Dir.CCW, speed)
            motor.MotorRun(motor.Motors.M3, motor.Dir.CCW, speed)
            motor.MotorRun(motor.Motors.M4, motor.Dir.CW, speed)
        } else if (direction == "STOP") {
            motor.motorStopAll()
        } else if (direction == "\"HORN\"") {
            music.play(music.tonePlayable(262, music.beat(BeatFraction.Breve)), music.PlaybackMode.InBackground)
        } else {
            motor.motorStopAll()
        }
    }
})
basic.forever(function () {
    let line_follower = 0
    if (line_follower) {
        if (pins.digitalReadPin(DigitalPin.P1) == 1) {
            direction = "FORWARD"
        } else if (pins.digitalReadPin(DigitalPin.P2) == 1) {
            direction = "ROTATE_CLOCKWISE"
        } else if (pins.digitalReadPin(DigitalPin.P0) == 1) {
            direction = "ROTATE_COUNTERCLOCKWISE"
        } else {
            direction = "STOP"
        }
    }
})
