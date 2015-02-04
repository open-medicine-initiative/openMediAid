define( function () {

  function MBassy () {
    this.root = new Channel( 'ROOT', undefined );
  }

  MBassy.prototype.channel = function ( channelId ) {
    if ( !channelId ) // empty or undefined channel ids can not be created
      return undefined;
    if ( channelId === 'ROOT' )
      return this.root;
    return this.root.channel( channelId );
  };


  function Channel ( id, parent ) {
    this.id = id;
    this.subscriptions = undefined;
    this.channels = {};
    this.parent = parent;
    if ( parent )
      parent.channels[id] = this;
  }

  Channel.prototype.subscribe = function ( handler ) {
    this.subscriptions = new Subscription( this, this.subscriptions, handler );
    return this.subscriptions;
  };

  Channel.prototype.parents = function () {
    var parents = [],
      curParent = this.parent;
    while ( curParent ) {
      parents.push( curParent );
      curParent = curParent.parent;
    }
    return parents;
  };

  Channel.prototype.isEmpty = function () {
    return this.subscriptions === undefined;
  };

  Channel.prototype.channel = function ( channelId ) {
    var path = channelId.split( '.' ),
      channel = this; // start with self
    for ( var i = 0; i < path.length; i++ ) {
      if ( channel.id === path[i] )
        return channel;
      if ( channel.channels[path[i]] === undefined ) {
        channel = new Channel( path[i], channel );
      }
    }
    return channel;
  };


  Channel.prototype.unsubscribe = function ( subscription ) {
    // if is head
    if ( this.subscriptions === subscription ) {
      this.subscriptions = subscription.next;
    } else {
      // otherwise just cut this subscription out of the list
      subscription.prev.next = this.next;
    }
  };

  Channel.prototype.publish = function ( message ) {
    var current = this.subscriptions;
    while ( current ) {
      current.handle( message );
      current = current.next;
    }
  };

  function Subscription ( channel, next, handler ) {
    this.prev = undefined; // insertion at head will -> no predecessor
    this.next = next;
    this.channel = channel;
    this.handler = handler;
    if ( next )
      next.prev = this;
  }

  Subscription.prototype.unsubscribe = function () {
    this.channel.unsubscribe( this );
  };

  Subscription.prototype.handle = function ( message ) {
    this.handler( message );
  };


  return MBassy;


} );