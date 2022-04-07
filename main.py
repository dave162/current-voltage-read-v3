def on_button_pressed_b():
    basic.show_icon(IconNames.SAD)
    serial.redirect(SerialPin.P15, SerialPin.P16, BaudRate.BAUD_RATE9600)
    serial.write_string("ldc")
    serial.write_line("\\r")
    serial.write_line("\\r")
input.on_button_pressed(Button.B, on_button_pressed_b)

voltage = 0
current = 0
basic.show_string("Read V/C")
music.play_melody("C5 B A G F E D C ", 368)
serial.redirect(SerialPin.P15, SerialPin.P16, BaudRate.BAUD_RATE9600)
basic.pause(5000)
basic.pause(5000)

def on_forever():
    global voltage, current
    serial.write_value("current", Math.round(current))
    serial.write_value("voltage", Math.round(voltage))
    voltage = pins.analog_read_pin(AnalogPin.P1)
    voltage = pins.map(voltage, 0, 1023, 0, 3.3)
    voltage = voltage * 11
    current = pins.analog_read_pin(AnalogPin.P0)
    current = pins.map(current, 0, 1023, 0, 3.3)
    current = current - 0.33
    current = current * 37.8788
    basic.show_icon(IconNames.HAPPY)
    serial.write_string("ld1 right thruster DA")
    serial.write_line("\\r")
    serial.write_line("\\r")
    basic.pause(100)
    serial.write_string("ld2 voltage:   ")
    serial.write_number(voltage)
    serial.write_string("")
    serial.write_line("\\r")
    serial.write_line("\\r")
    basic.pause(100)
    serial.write_string("ld3 current:   ")
    serial.write_number(current)
    serial.write_string("")
    serial.write_line("\\r")
    serial.write_line("\\r")
    basic.pause(100)
basic.forever(on_forever)

def on_forever2():
    pass
basic.forever(on_forever2)
