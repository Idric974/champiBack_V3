from gpiozero import MCP3008
import time 
pot=MCP3008(1)
while 1:
    
    print (pot.value)
    time.sleep (1)
