direction = ""
prev_direction = ""
start_time = 0
speed_fast = 255
speed_slow = 100
speed_turn_offset = 50
speed = 0
line_follower = False
serial.redirect_to_usb()

def on_forever():
    global start_time, prev_direction
    start_time = control.millis()
    if prev_direction != direction:
        prev_direction = direction
        serial.write_line("Direction:" + direction)
        if direction == "FORWARD":
            motor.motor_run(motor.Motors.M1, motor.Dir.CCW, speed)
            motor.motor_run(motor.Motors.M2, motor.Dir.CCW, speed)
            motor.motor_run(motor.Motors.M3, motor.Dir.CCW, speed)
            motor.motor_run(motor.Motors.M4, motor.Dir.CCW, speed)
        elif direction == "REVERSE":
            motor.motor_run(motor.Motors.M1, motor.Dir.CW, speed)
            motor.motor_run(motor.Motors.M2, motor.Dir.CW, speed)
            motor.motor_run(motor.Motors.M3, motor.Dir.CW, speed)
            motor.motor_run(motor.Motors.M4, motor.Dir.CW, speed)
        elif direction == "ROTATE_CLOCKWISE":
            motor.motor_run(motor.Motors.M1,
                motor.Dir.CCW,
                min(255, speed + speed_turn_offset))
            motor.motor_run(motor.Motors.M2,
                motor.Dir.CCW,
                min(255, speed + speed_turn_offset))
            motor.motor_run(motor.Motors.M3,
                motor.Dir.CW,
                min(255, speed + speed_turn_offset))
            motor.motor_run(motor.Motors.M4,
                motor.Dir.CW,
                min(255, speed + speed_turn_offset))
        elif direction == "ROTATE_COUNTERCLOCKWISE":
            motor.motor_run(motor.Motors.M1,
                motor.Dir.CW,
                min(255, speed + speed_turn_offset))
            motor.motor_run(motor.Motors.M2,
                motor.Dir.CW,
                min(255, speed + speed_turn_offset))
            motor.motor_run(motor.Motors.M3,
                motor.Dir.CCW,
                min(255, speed + speed_turn_offset))
            motor.motor_run(motor.Motors.M4,
                motor.Dir.CCW,
                min(255, speed + speed_turn_offset))
        elif direction == "TRAVERSE_LEFT":
            motor.motor_run(motor.Motors.M1, motor.Dir.CCW, speed)
            motor.motor_run(motor.Motors.M2, motor.Dir.CW, speed)
            motor.motor_run(motor.Motors.M3, motor.Dir.CW, speed)
            motor.motor_run(motor.Motors.M4, motor.Dir.CCW, speed)
        elif direction == "TRAVERSE_RIGHT":
            motor.motor_run(motor.Motors.M1, motor.Dir.CW, speed)
            motor.motor_run(motor.Motors.M2, motor.Dir.CCW, speed)
            motor.motor_run(motor.Motors.M3, motor.Dir.CCW, speed)
            motor.motor_run(motor.Motors.M4, motor.Dir.CW, speed)
        elif direction == "STOP":
            motor.motor_stop_all()
        elif direction == "\"HORN\"":
            music.play(music.tone_playable(262, music.beat(BeatFraction.BREVE)),
                music.PlaybackMode.IN_BACKGROUND)
        else:
            motor.motor_stop_all()
basic.forever(on_forever)

def on_forever2():
    global direction
    if line_follower:
        if pins.digital_read_pin(DigitalPin.P1) == 1:
            direction = "FORWARD"
        elif pins.digital_read_pin(DigitalPin.P2) == 1:
            direction = "ROTATE_CLOCKWISE"
        elif pins.digital_read_pin(DigitalPin.P0) == 1:
            direction = "ROTATE_COUNTERCLOCKWISE"
        else:
            direction = "STOP"
basic.forever(on_forever2)
