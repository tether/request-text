/**
 * Dependencies.
 */

const inflate = require('inflate-body')


/**
 * Return a promise that resolves when  x-www-form-urlencoded request is parsed.
 * Reject promise with 400 status error otherwise.
 *
 * @param {HttpIncomingMessage} request
 * @param {Object} options (folowing arguments are mixed with options)
 * @return {Promise}
 * @api public
 */

module.exports = function (request, options, ...args) {
  return inflate(request, setup(request, options, ...args))
}


/**
 * Clone and setup default options.
 *
 * @param {HttpIncomingMessage} request
 * @param {Object} options
 * @param {Object} mixin
 * @return {Object}
 * @api private
 */

function setup (request, options, ...args) {
  const len = request.headers['content-length']
  const encoding = request.headers['content-encoding'] || 'identity'
  return Object.assign({}, options, {
    encoding: options.encoding || 'utf-8',
    limit: options.limit || '1mb'
    length: (len && encoding === 'identity') ? ~~len : options.length
  }, ...args)
}
