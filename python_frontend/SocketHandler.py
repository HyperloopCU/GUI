import socketio  # pip3 install "python-socketio[client]"

class SocketHandler: 
    def __init__(self,url,**kwargs):
        self.sio = socketio.Client()
        self.sio.connect(url);
        for key,arg in zip(kwargs,kwargs.values()):
            if(callable(arg)): 
                self.on(key,arg)
            else:
                print("The key {} could not be procced as an event its argument was not a function".format(key))
    
    def emit(self,name,data):
        self.sio.emit(name,data)
    
    def multipleEmits(self,**kwargs):
        for name,data in zip(kwargs,kwargs.values()):
            self.emit(name,data)
    
    def on(self,name,func):
        @self.sio.on(name)
        def handler(data):
            func(data)


class HLSocketHandler(SocketHandler):
    def __init__(self,url,**kwargs):
        super(HLSocketHandler,self).__init__(url,**kwargs)


    def setSpeed(self, data):
        self.emit("setSpeed",data)


    def setPosition(self, data):
        self.emit("setPosition",data)


    def setFids(self, topLeft,topRight,botLeft,botRight):
        data = {"topLeft":topLeft,"topRight":topRight,"botLeft":botLeft,"botRight":botRight}
        self.emit("setFids",data)


    def setEncoder(self, data):
        self.emit("setEncoder",data)


    def setPnumatic(self, topLeft,topRight,botLeft,botRight):
        data = {"topLeft":topLeft,"topRight":topRight,"botLeft":botLeft,"botRight":botRight}
        self.emit("setPnumatic",data)


    def setAutoState(self, data):
        self.emit("setAutoState",data)
    





    
    