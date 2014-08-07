var DS;
(function (DS) {
    var OEmbedProvider = (function () {
        function OEmbedProvider(apiEndpoint, templateRegex, embedTag) {
            this.MaxHeight = 400;
            this.MaxWidth = 500;

            this.ApiEndpoint = apiEndpoint;
            this.TemplateRegex = templateRegex;
            this.EmbedTag = embedTag;
        }
        return OEmbedProvider;
    })();
    DS.OEmbedProvider = OEmbedProvider;
})(DS || (DS = {}));
var DS;
(function (DS) {
    var OEmbedYoutube = (function () {
        function OEmbedYoutube(el, options) {
            this._defaultOptions = {
                MaxWidth: null,
                MaxHeight: null,
                IsIncludeHandle: true,
                IsReplaceLink: true,
                OnProviderNotFound: null,
                OnBeforeEmbed: null,
                OnAfterEmbed: null,
                OnEmbed: null
            };
            this._options = $.extend(true, {}, this._defaultOptions, options);

            var resourceUrl = el.attr("href");
            var regExp = new RegExp("youtube\\.com/watch.+v=[\\w-]+&?", "i");
            if (resourceUrl !== null && resourceUrl !== undefined && resourceUrl.match(regExp) !== null) {
                var provider = new DS.OEmbedProvider("https://www.youtube.com/embed/$1?wmode=transparent", /.*(?:v\=|be\/|embed\/)([\w\-]+)&?.*/, { Tag: "iframe", Height: 349, Width: 425 });
                provider.MaxWidth = this._options.MaxWidth;
                provider.MaxHeight = this._options.MaxHeight;

                var code = $("<" + provider.EmbedTag.Tag + "/>").attr("src", resourceUrl.replace(provider.TemplateRegex, provider.ApiEndpoint)).attr("width", provider.EmbedTag.Width ? provider.EmbedTag.Width.toString() : "auto").attr("height", provider.EmbedTag.Height ? provider.EmbedTag.Height.toString() : "auto").attr("allowfullscreen", "true").attr("allowscriptaccess", "always").attr("scrolling", "no").attr("frameborder", "0").css("max-height", this._options.MaxHeight ? this._options.MaxHeight.toString() : "auto").css("max-width", this._options.MaxWidth ? this._options.MaxWidth.toString() : "auto");

                if (this._options.OnBeforeEmbed != null) {
                    this._options.OnBeforeEmbed.call(el, code);
                }

                if (this._options.OnEmbed != null) {
                    this._options.OnEmbed.call(el, code);
                } else {
                    if (!code) {
                        return;
                    }

                    el.wrap("<div></div>");
                    var oembedContainer = el.parent();

                    if (this._options.IsReplaceLink) {
                        el.remove();
                    }

                    if (this._options.IsIncludeHandle && !this._options.IsReplaceLink) {
                        $("<span>&darr;</span>").insertBefore(el).click(function (event) {
                            var span = $(event.currentTarget);
                            span.html((window.btoa(span.text()) == "JnVhcnI7") ? "&darr;" : "&uarr;");
                            span.parent().children().last().toggle();
                        });
                    }
                    oembedContainer.append("<br/>");
                    try  {
                        code.clone().appendTo(oembedContainer);
                    } catch (e) {
                        oembedContainer.append(code);
                    }

                    if (this._options.MaxWidth) {
                        var postWidth = oembedContainer.parent().width();
                        if (postWidth < this._options.MaxWidth) {
                            var iframeWidthOrig = $("iframe", oembedContainer).width();
                            var iframeHeightOrig = $("iframe", oembedContainer).height();
                            var ratio = iframeWidthOrig / postWidth;
                            $("iframe", oembedContainer).width(iframeWidthOrig / ratio);
                            $("iframe", oembedContainer).height(iframeHeightOrig / ratio);
                        } else {
                            if (this._options.MaxWidth) {
                                $("iframe", oembedContainer).width(this._options.MaxWidth);
                            }
                            if (this._options.MaxHeight) {
                                $("iframe", oembedContainer).height(this._options.MaxHeight);
                            }
                        }
                    }
                }

                if (this._options.OnAfterEmbed != null) {
                    this._options.OnAfterEmbed.call(el, code);
                }
            } else if (this._options.OnProviderNotFound !== null) {
                this._options.OnProviderNotFound.call(el, resourceUrl);
            }

            return this;
        }
        return OEmbedYoutube;
    })();
    DS.OEmbedYoutube = OEmbedYoutube;
})(DS || (DS = {}));

(function ($) {
    $.fn.OEmbedYoutube = function (options) {
        return this.each(function () {
            var el = $(this);
            if (!el.data("OEmbedYoutube")) {
                el.data("OEmbedYoutube", new DS.OEmbedYoutube(el, options));
            }
        });
    };
})(jQuery);
//# sourceMappingURL=jquery.oembed.js.map
