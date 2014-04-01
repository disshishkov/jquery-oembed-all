/*
 * jquery oembed plugin
 *
 * Copyright (c) 2009 Richard Chamorro
 * Licensed under the MIT license
 * 
 * Orignal Author: Richard Chamorro 
 * Forked by Dis Shishkov to clean code for use only youtube.
 */
(function($)
{
    $.fn.OEmbedYoutube = function(options) 
    {
        _settings = $.extend(true, $.fn.OEmbedYoutube.defaults, options);

        return this.each(function() 
        {
            var container = $(this);
            var resourceUrl = container.attr("href");
            
            if (!_settings.onEmbed)
            {
                _settings.onEmbed = function(oembedData) 
                {
                    _insertCode(this, oembedData);
                };
            }

            var regExp = new RegExp("youtube\\.com/watch.+v=[\\w-]+&?", "i");
            if (resourceUrl !== null && resourceUrl !== undefined && resourceUrl.match(regExp) !== null) 
            {
                var provider = new $.fn.OEmbedYoutube.OEmbedProvider('http://www.youtube.com/embed/$1?wmode=transparent', 
                {
                    templateRegex: /.*(?:v\=|be\/|embed\/)([\w\-]+)&?.*/,
                    embedtag: { tag: 'iframe', width: '425', height: '349' }
                });
                
                provider.maxWidth = _settings.maxWidth;
                provider.maxHeight = _settings.maxHeight;
                _embedCode(container, resourceUrl, provider);
            }
            else if (_settings.onProviderNotFound !== null)
            {
                _settings.onProviderNotFound.call(container, resourceUrl);
            }

            return container;
        });
    };

    var _settings;

    // Plugin defaults
    $.fn.OEmbedYoutube.defaults = 
    {
        maxWidth: null,
        maxHeight: null,
        includeHandle: true,
        replaceLink: true,
        onProviderNotFound: null,
        beforeEmbed: null,
        afterEmbed: null,
        onEmbed: null
    };
    
    _embedCode = function(container, externalUrl, embedProvider)
    {
        var code = $('<' + embedProvider.embedtag.tag + '/>')
            .attr('src', externalUrl.replace(embedProvider.templateRegex, embedProvider.apiendpoint))
            .attr('width', embedProvider.embedtag.width || 'auto')
            .attr('height', embedProvider.embedtag.height || 'auto')
            .attr('allowfullscreen', 'true')
            .attr('allowscriptaccess', 'always')
            .attr('scrolling', 'no')
            .attr('frameborder', '0')
            .css('max-height', _settings.maxHeight || 'auto' )
            .css('max-width', _settings.maxWidth || 'auto' );
        
        var oembedData = {code: code};
        if (_settings.beforeEmbed != null)
        {
            _settings.beforeEmbed.call(container, oembedData);
        }
        
        _settings.onEmbed.call(container, oembedData);
        
        if (_settings.afterEmbed != null)
        {
            _settings.afterEmbed.call(container, oembedData);
        }
    };

    _insertCode = function(container, oembedData) 
    {
        if (oembedData === null) 
        {
            return;
        }
        
        container.wrap('<div></div>');
        var oembedContainer = container.parent();
        
        if (_settings.replaceLink)
        {
            container.remove();
        }
        
        if (_settings.includeHandle && !_settings.replaceLink) 
        {
            $('<span>&darr;</span>').insertBefore(container).click(function() 
            {
                var span = $(this);
                var encodedString = window.encodeURIComponent(span.text());
                span.html((encodedString == '%E2%86%91') ? '&darr;' : '&uarr;');
                span.parent().children().last().toggle();
            });
        }
        oembedContainer.append('<br/>');
        try 
        {
            oembedData.code.clone().appendTo(oembedContainer);
        } 
        catch (e)
        {
            oembedContainer.append(oembedData.code);
        }			

        if(_settings.maxWidth)
        {
            var postWidth = oembedContainer.parent().width();
            if (postWidth < _settings.maxWidth)
            {
                var iframeWidthOrig = $('iframe', oembedContainer).width();
                var iframeHeightOrig = $('iframe', oembedContainer).height();
                var ratio =  iframeWidthOrig / postWidth;
                $('iframe', oembedContainer).width(iframeWidthOrig / ratio);
                $('iframe', oembedContainer).height(iframeHeightOrig / ratio);
            } 
            else 
            {
                if (_settings.maxWidth)
                {
                    $('iframe', oembedContainer).width(_settings.maxWidth);
                }
                if (_settings.maxHeight)
                {
                    $('iframe', oembedContainer).height(_settings.maxHeight);
                }
            }
        }
    };

    $.fn.OEmbedYoutube.OEmbedProvider = function(apiendpoint, extra_settings) 
    {
        this.apiendpoint = apiendpoint;
        this.maxWidth = 500;
        this.maxHeight = 400;
        extra_settings = extra_settings || {};
        
        for (var property in extra_settings) 
        {
             this[property] = extra_settings[property];
        }

        this.embedtag = this.embedtag || {tag:""};        
    };
})(jQuery);