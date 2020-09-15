from SocketHandler import HLSocketHandler
import time
import json 
import os

os.chdir(os.path.dirname(os.path.abspath(__file__)))

with open("states.json") as f:
    possibleStates = json.load(f)["array"]

def Estop(data=True):
    print("ESTOP something went wrong")

def next(data=True):
    print("next")

def incrementState():
    for i in range(len(possibleStates)):
        if "selected" in possibleStates[i] and possibleStates[i]["selected"]:
            possibleStates[i]["selected"] = False
            possibleStates[i]["subs"][0]["selected"] = True
            return [i,0]
        else:
            for j in range(len(possibleStates[i]["subs"])):
                if "selected" in possibleStates[i]["subs"][j] and possibleStates[i]["subs"][j]["selected"]:
                    possibleStates[i]["subs"][j]["selected"] = False; 
                    if len(possibleStates[i]["subs"]) > j+1:
                        possibleStates[i]["subs"][j+1]["selected"] = True; 
                        return [i,j+1]; 
                    elif len(possibleStates) > i+1:
                        possibleStates[i+1]["selected"] = True; 
                        return [i+1,None]; 
    possibleStates[0]["selected"] = True; 
    return [0,None]; 

socket = HLSocketHandler("http://localhost:8080/",getEstop=Estop,getNext=next)

for i in range(10):
    print("{} is being sent".format(i))
    nextState = incrementState()
    socket.setAutoState(nextState)
    socket.setFids(i,i,i,i)
    socket.setPnumatic(i,i,i,i)
    socket.setSpeed(i)
    socket.setEncoder(i)
    time.sleep(1)

# socket.setSpeed(15)



    

