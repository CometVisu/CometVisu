/**
 * Loads external content like CSS/JS files, config-content or a template file.
 *
 *  @author Tobias Bräutigam
 *  @since 2022
 */
qx.Class.define('cv.ui.structure.tile.elements.Loader', {
  extend: cv.ui.structure.tile.elements.AbstractCustomElement,

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {

    _init() {
      const element = this._element;
      const type = element.getAttribute('type');
      const src = element.getAttribute('src');
      let loaderElement;
      if (src) {
        switch (type) {
          case 'css':
            loaderElement = document.createElement('link');
            loaderElement.setAttribute('type', 'text/css');
            loaderElement.setAttribute('rel', 'stylesheet');
            loaderElement.setAttribute('href', src);
            break;

          case 'js':
            loaderElement = document.createElement('script');
            loaderElement.setAttribute('type', 'text/javascript');
            loaderElement.setAttribute('src', src);
            break;

          case 'templates':
            this.loadXml(src, type);
            break;
        }

        if (loaderElement) {
          element.appendChild(loaderElement);
        }
      }
    },

    loadXml(uri) {
      const ajaxRequest = new qx.io.request.Xhr(uri);
      ajaxRequest.set({
        accept: 'application/xml',
        cache: !cv.Config.forceReload
      });
      ajaxRequest.addListenerOnce('success', function (e) {
        let content = e.getTarget().getResponse();
        let htmlContent = content;
        const target = cv.Application.structureController.getRenderTarget();
        // we need the documents to be in HTML namespace
        if (!htmlContent.documentElement.xmlns) {
          let text = e.getTarget().getResponseText();
          text = text.replace('<templates', '<templates xmlns="http://www.w3.org/1999/xhtml"');
          const parser = new DOMParser();
          htmlContent = parser.parseFromString(text, 'text/xml');
        }
        let child;
        while ((child = htmlContent.documentElement.firstElementChild)) {
          target.appendChild(child);
        }
        // register custom elements for templates in this document
        cv.Application.structureController.registerTemplates(content);
      });
      ajaxRequest.addListener('statusError', function (e) {
        const status = e.getTarget().getTransport().status;
        if (!qx.util.Request.isSuccessful(status)) {
          this.handleError('filenotfound', ajaxRequest.getUrl());
        } else {
          this.handleError(status, null);
        }
      }, this);

      ajaxRequest.send();
    },

    handleError(textStatus, additionalErrorInfo) {
      const title = qx.locale.Manager.tr('File Error!').translate().toString();
      let message = '';
      let actions;
      switch (textStatus) {
        case 'parsererror':
          message = qx.locale.Manager.tr('Invalid XML file!');
          break;
        case 'filenotfound':
          message = qx.locale.Manager.tr('404: File not found, %1.', additionalErrorInfo).translate().toString();
          break;
        default:
          message = qx.locale.Manager.tr('Unhandled error of type "%1"', textStatus).translate().toString();
          if (additionalErrorInfo) {
            message += ': ' + additionalErrorInfo;
          } else {
            message += '.';
          }
      }
      const notification = {
        topic: 'cv.error',
        title: title,
        message: message
      };
      if (actions) {
        notification.actions = actions;
      }
      cv.core.notifications.Router.dispatchMessage(notification.topic, notification);
      this.error(this, message.toString());
    }
  },

  defer(Clazz) {
    customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'loader', class extends QxConnector {
      constructor() {
        super(Clazz);
      }
    });
  }
});
