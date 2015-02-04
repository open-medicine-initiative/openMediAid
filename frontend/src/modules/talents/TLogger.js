define( ['typo'], function ( typo ) {
  /**
   *
   * @param {Object} target - The object that will receive the logging capabilities
   * @param {Function} destination - The target for the log messages
   * @returns {*} - The augmented target
   * @constructor
   */
  function TLogger ( target, destination ) {
    typo.mix( target, {
      '@types' : { expose : "TLogger" },
      log : function ( what ) {
        destination( what );
      }
    } );
    return target;
  }

  /**
   * A simple {@link TLogger} that logs to the console.
   *
   * @param target
   * @returns {*}
   * @constructor
   */
  function TConsoleLogger ( target ) {
    return TLogger( target, function ( what ) {
      console.log( what );
    } );
  }

  return {
    TLogger : TLogger,
    TConsoleLogger : TConsoleLogger
  };

} );
