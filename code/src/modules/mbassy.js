define(['utils'], function(utils){

    function MBassy(){
        this.channels = {};

    }

    MBassy.prototype.channel = function(channelId){
        return new utils.ValueRef(this.channels, channelId).get();
    };


    function Channel(params){
         this.id = params.id;
         this.subscriptions = undefined;
    }

    Channel.prototype.subscribe = function(handler){
        this.subscriptions = new Subscription(this, this.subscriptions, handler);
    };

    Channel.prototype.unsubscribe = function(subscription){
        // if is head
        if(this.subscriptions === subscription){
            this.subscriptions = subscription.next;
        }else{
            subscription.prev.next = this.next;
        }
    };

    Channel.prototype.publish = function(message){
        var current = this.subscriptions;
        while(current){
            current.handle(message);
            current = current.next;
        }
    };

    function Subscription(channel, next, handler){
        this.prev = undefined;
        this.next = next;
        this.channel = channel;
        this.handler = handler;
        next.prev = this;
    }

    Subscription.prototype.unsubscribe = function(){
        this.channel.unsubscribe(this);
    };

    Subscription.prototype.handle = function(message){
        this.handler(message);
    };


    return MBassy;


});