import RPi.GPIO as gpio
from signal import signal, SIGINT
from sys import exit, argv

def handler(signal_received, frame):
    print('')
    print('SIGINT or CTRL-C detected. Exiting gracefully')
    gpio.cleanup()
    exit(0)

def main(pin):
    gpio.setmode(gpio.BCM)
    gpio.setup(pin, gpio.OUT)
    gpio.output(pin, gpio.LOW)
    print(f"GPIO {pin} is now OFF")
    gpio.cleanup()

if __name__ == '__main__':
    signal(SIGINT, handler)
    if len(argv) != 2:
        print("Usage: python script.py <GPIO_PIN>")
        exit(1)
    pin = int(argv[1])
    main(pin)
