import RPi.GPIO as gpio
from signal import signal, SIGINT
from sys import exit

def handler(signal_received, frame):
    # Gestion propre du nettoyage en cas d'interruption (SIGINT)
    print('')
    print('SIGINT or CTRL-C detected. Exiting gracefully')
    gpio.cleanup()
    exit(0)

def main():
    # Initialisation des GPIO
    gpio.setmode(gpio.BCM)
    gpio.setup(22, gpio.OUT)
    
    # Désactivation du GPIO 22
    gpio.output(22, gpio.LOW)
    print("GPIO 22 is now OFF")
    
    # Nettoyage des ressources GPIO
    gpio.cleanup()

if __name__ == '__main__':
    # On prévient Python d'utiliser la méthode handler quand un signal SIGINT est reçu
    signal(SIGINT, handler)
    main()
