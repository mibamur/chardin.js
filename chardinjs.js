// Generated by CoffeeScript 1.6.1
(function() {
  var __slice = [].slice;

  (function($, window) {
    var chardinJs;
    chardinJs = (function() {

      function chardinJs(el) {
        this.$el = $(el);
      }

      chardinJs.prototype.start = function() {
        var el, _i, _len, _ref;
        if (this._overlay_visible()) {
          return false;
        }
        this._add_overlay_layer();
        _ref = this.$el.find('*[data-intro]');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          el = _ref[_i];
          this._show_element(el);
        }
        return this.$el.trigger('chardinJs:start');
      };

      chardinJs.prototype.toggle = function() {
        if (!this._overlay_visible()) {
          return this.start();
        } else {
          return this.stop();
        }
      };

      chardinJs.prototype.stop = function() {
        this.$el.find(".chardinjs-overlay").fadeOut(function() {
          return this.remove();
        });
        this.$el.find('.chardinjs-helper-layer').remove();
        this.$el.find('.chardinjs-show-element').removeClass('chardinjs-show-element');
        if (window.removeEventListener) {
          window.removeEventListener("keydown", this._onKeyDown, true);
        } else {
          if (document.detachEvent) {
            document.detachEvent("onkeydown", this._onKeyDown);
          }
        }
        return this.$el.trigger('chardinJs:stop');
      };

      chardinJs.prototype._overlay_visible = function() {
        return this.$el.find('.chardinjs-overlay').length !== 0;
      };

      chardinJs.prototype._add_overlay_layer = function() {
        var element_position, overlay_layer, styleText,
          _this = this;
        if (this._overlay_visible()) {
          return false;
        }
        overlay_layer = document.createElement("div");
        styleText = "";
        overlay_layer.className = "chardinjs-overlay";
        if (this.$el.prop('tagName') === "BODY") {
          styleText += "top: 0;bottom: 0; left: 0;right: 0;position: fixed;";
          overlay_layer.setAttribute("style", styleText);
        } else {
          element_position = this._get_offset();
          if (element_position) {
            styleText += "width: " + element_position.width + "px; height:" + element_position.height + "px; top:" + element_position.top + "px;left: " + element_position.left + "px;";
            overlay_layer.setAttribute("style", styleText);
          }
        }
        this.$el.get()[0].appendChild(overlay_layer);
        overlay_layer.onclick = function() {
          return _this.stop();
        };
        return setTimeout(function() {
          styleText += "opacity: .8;";
          return overlay_layer.setAttribute("style", styleText);
        }, 10);
      };

      chardinJs.prototype._get_position = function(element) {
        return element.getAttribute('data-position') || 'bottom';
      };

      chardinJs.prototype._place_tooltip = function(element, tooltip_layer) {
        var my_height, my_width, target_element_position, target_height, target_width, tooltip_layer_position;
        tooltip_layer_position = this._get_offset(tooltip_layer);
        tooltip_layer.style.top = null;
        tooltip_layer.style.right = null;
        tooltip_layer.style.bottom = null;
        tooltip_layer.style.left = null;
        switch (this._get_position(element)) {
          case "top":
          case "bottom":
            target_element_position = this._get_offset(element);
            target_width = target_element_position.width;
            my_width = $(tooltip_layer).width();
            tooltip_layer.style.left = "" + ((target_width / 2) - (tooltip_layer_position.width / 2)) + "px";
            break;
          case "left":
          case "right":
            target_element_position = this._get_offset(element);
            target_height = target_element_position.height;
            my_height = $(tooltip_layer).height();
            tooltip_layer.style.top = "" + ((target_height / 2) - (tooltip_layer_position.height / 2)) + "px";
        }
        switch (this._get_position(element)) {
          case "left":
            return tooltip_layer.style.left = "-" + (tooltip_layer_position.width - 34) + "px";
          case "right":
            return tooltip_layer.style.right = "-" + (tooltip_layer_position.width - 34) + "px";
          case "bottom":
            return tooltip_layer.style.bottom = "-" + tooltip_layer_position.height + "px";
          case "top":
            return tooltip_layer.style.top = "-" + tooltip_layer_position.height + "px";
        }
      };

      chardinJs.prototype._show_element = function(element) {
        var current_element_position, element_position, helper_layer, tooltip_layer;
        element_position = this._get_offset(element);
        helper_layer = document.createElement("div");
        tooltip_layer = document.createElement("div");
        if (element.id) {
          helper_layer.setAttribute("data-id", element.id);
        }
        helper_layer.className = "chardinjs-helper-layer chardinjs-" + (this._get_position(element));
        helper_layer.setAttribute("style", "width: " + element_position.width + "px; height:" + element_position.height + "px; top:" + element_position.top + "px; left: " + element_position.left + "px;");
        this.$el.get()[0].appendChild(helper_layer);
        tooltip_layer.className = "chardinjs-tooltip chardinjs-" + (this._get_position(element));
        tooltip_layer.innerHTML = "<div class='chardinjs-tooltiptext'>" + (element.getAttribute('data-intro')) + "</div>";
        helper_layer.appendChild(tooltip_layer);
        this._place_tooltip(element, tooltip_layer);
        element.className += " chardinjs-show-element";
        current_element_position = "";
        if (element.currentStyle) {
          current_element_position = element.currentStyle["position"];
        } else {
          if (document.defaultView && document.defaultView.getComputedStyle) {
            current_element_position = document.defaultView.getComputedStyle(element, null).getPropertyValue("position");
          }
        }
        current_element_position = current_element_position.toLowerCase();
        if (current_element_position !== "absolute" && current_element_position !== "relative") {
          return element.className += " chardinjs-relative-position";
        }
      };

      chardinJs.prototype._get_offset = function(element) {
        var element_position, _x, _y;
        element_position = {
          width: element.offsetWidth,
          height: element.offsetHeight
        };
        _x = 0;
        _y = 0;
        while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
          _x += element.offsetLeft;
          _y += element.offsetTop;
          element = element.offsetParent;
        }
        element_position.top = _y;
        element_position.left = _x;
        return element_position;
      };

      return chardinJs;

    })();
    return $.fn.extend({
      chardinJs: function() {
        var $this, args, data, option;
        option = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        $this = $(this[0]);
        data = $this.data('chardinJs');
        if (!data) {
          $this.data('chardinJs', (data = new chardinJs(this, option)));
        }
        if (typeof option === 'string') {
          data[option].apply(data, args);
        }
        return data;
      }
    });
  })(window.jQuery, window);

}).call(this);
