function Update_Sensor () {
    if (true) {
        left_sensor = pins.digitalReadPin(DigitalPin.P0)
        middle_sensor = pins.digitalReadPin(DigitalPin.P1)
        right_sensor = pins.digitalReadPin(DigitalPin.P2)
    } else {
        left_sensor = pins.digitalReadPin(DigitalPin.P12)
        middle_sensor = pins.digitalReadPin(DigitalPin.P1)
        right_sensor = pins.digitalReadPin(DigitalPin.P13)
    }
}
/**
 * THICK / THIN
 */
let prev_direction = ""
let start_time = 0
let direction = ""
let right_sensor = 0
let middle_sensor = 0
let left_sensor = 0
let line_follower = true
let line_size = "THICK"
let speed_fast = 255
let speed_slow = 100
let speed_turn_offset = 50
serial.redirectToUSB()
basic.forever(function () {
    if (line_follower) {
        if (middle_sensor == 1) {
            direction = "FORWARD"
        } else if (right_sensor == 1) {
            direction = "ROTATE_CLOCKWISE"
        } else if (left_sensor == 1) {
            direction = "ROTATE_COUNTERCLOCKWISE"
        } else {
            direction = "STOP"
        }
    }
})
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
        } else {
            motor.motorStopAll()
        }
    }
})
