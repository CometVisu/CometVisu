class AbstractHandler {

  ok(context) {
    this.respondMessage(context,200, 'Ok')
  }

  respondWithType(context, content, mimeType) {
    context.res
      .setStatus(200)
      .set('content-type', mimeType)
      .setBody(content);
  }

  respondMessage(context, status, message) {
    context.res
      .setStatus(status)
      .set('content-type', 'application/json')
      .setBody({message: message});
  }
}

module.exports = AbstractHandler
