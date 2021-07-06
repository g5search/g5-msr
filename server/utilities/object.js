module.exports = {
  pick,
  reject
}

/**
 * Picks keys from object
 * @param {Object} obj
 * @param {Array} keys
 * @returns {Object}
 */
function pick (obj, keys) {
  return keys.map(k => k in obj ? { [k]: obj[k] } : {})
    .reduce((res, o) => Object.assign(res, o), {})
}

/**
 * Removes Keys from object
 * @param {Object} obj
 * @param {Array} keys
 * @returns {Object}
 */
function reject (obj, keys) {
  const vkeys = Object.keys(obj)
    .filter(k => !keys.includes(k))
  return pick(obj, vkeys)
}
