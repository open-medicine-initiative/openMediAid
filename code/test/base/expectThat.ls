module.exports = (spec, checks) -> for msg, check of checks!
  if not check! then throw Error msg
