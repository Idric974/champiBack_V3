import RPi.GPIO as gpio
import time
from signal import signal, SIGINT
from sys import exit
 
def handler(signal_received, frame):
    # on gère un cleanup propre
    print('')
    print('SIGINT or CTRL-C detected. Exiting gracefully')
    gpio.cleanup()
    exit(0)
 
def main():
    # GPIO init
    gpio.setmode(gpio.BCM)
    gpio.setup(22, gpio.OUT)
 
 
    input('Appuyez sur une touche pour stopper')
    gpio.cleanup()
 
if __name__ == '__main__':
    signal(SIGINT, handler)
    main()
