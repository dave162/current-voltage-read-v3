input.onButtonPressed(Button.B, function () {
    basic.showIcon(IconNames.Sad)
    serial.redirect(
    SerialPin.P15,
    SerialPin.P16,
    BaudRate.BaudRate9600
    )
    serial.writeString("ldc")
    serial.writeLine("\\r")
    serial.writeLine("\\r")
})
let current = 0
let voltage = 0
basic.showString("Read V/C")
radio.setGroup(1)
music.playMelody("C5 B A G F E D C ", 368)
serial.redirect(
SerialPin.P15,
SerialPin.P16,
BaudRate.BaudRate9600
)
basic.pause(5000)
basic.pause(5000)
basic.showIcon(IconNames.Happy)
basic.forever(function () {
    voltage = pins.analogReadPin(AnalogPin.P1)
    voltage = pins.map(
    voltage,
    0,
    1023,
    0,
    3.3
    )
    voltage = voltage * 11
    voltage = Math.round(voltage * 100) / 100
    current = pins.analogReadPin(AnalogPin.P2)
    current = pins.map(
    current,
    0,
    1023,
    0,
    3.3
    )
    current = current - 0.33
    current = current * 37.8788
    current = Math.round(current * 100) / 100
    serial.writeString("ld1 right thruster DA")
    serial.writeLine("\\r")
    serial.writeLine("\\r")
    basic.pause(100)
    serial.writeString("ld2 voltage:   ")
    serial.writeNumber(voltage)
    serial.writeString("")
    serial.writeLine("\\r")
    serial.writeLine("\\r")
    basic.pause(50)
    serial.writeString("ld3 current:   ")
    serial.writeNumber(current)
    serial.writeString("")
    serial.writeLine("\\r")
    serial.writeLine("\\r")
    basic.pause(50)
    radio.sendValue("rtc", current)
    radio.sendValue("rtv", voltage)
    led.toggle(0, 0)
})
