import {inject, config} from '@loopback/core';
import {
  SequenceHandler,
  Request,
  Response,
  InvokeMiddleware,
  InvokeMiddlewareOptions,
  MiddlewareSequence,
  RequestContext,
  SequenceActions,
} from '@loopback/rest';
import debug from 'debug';

export class MySequenceHandler implements SequenceHandler {
  static defaultOptions: InvokeMiddlewareOptions = {
    chain: 'middlewareChain.rest',
    orderedGroups: [
      // Please note that middleware is cascading. The `sendResponse` is
      // added first to invoke downstream middleware to get the result or
      // catch errors so that it can produce the http response.
      'sendResponse',

      // default
      'cors',
      'apiSpec',

      // default
      'middleware',

      // rest
      'findRoute',

      // authentication
      'authentication',

      // rest
      'parseParams',
      'invokeMethod',
    ],
  };

  /**
   * Constructor: Injects `InvokeMiddleware` and `InvokeMiddlewareOptions`
   *
   * @param invokeMiddleware - invoker for registered middleware in a chain.
   * To be injected via SequenceActions.INVOKE_MIDDLEWARE.
   */
  constructor(
    @inject(SequenceActions.INVOKE_MIDDLEWARE)
    readonly invokeMiddleware: InvokeMiddleware,
    @config()
    readonly options: InvokeMiddlewareOptions = MiddlewareSequence.defaultOptions,
  ) {}

  /**
   * Runs the default sequence. Given a handler context (request and response),
   * running the sequence will produce a response or an error.
   *
   * @param context - The request context: HTTP request and response objects,
   * per-request IoC container and more.
   */
  async handle(context: RequestContext): Promise<void> {
    debug('Invoking middleware chain %s with groups %s');
    await this.invokeMiddleware(context, this.options);
  }
}
