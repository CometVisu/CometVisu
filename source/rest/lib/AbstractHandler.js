class AbstractHandler {

  ok(context) {
    this.respondMessage(context,200, 'Ok')
  }

  respondMessage(context, status, message) {
    context.res
      .setStatus(status)
      .set('content-type', 'application/json')
      .setBody({message: message});
  }
}

module.exports = AbstractHandler
