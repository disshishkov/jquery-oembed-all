Jquery-Oembed-Youtube
=================

This is a fork of the [jquery-oembed-all][1] which contains only support of [youtube.com][2]. If you need other oembed providers please see to forked project.

Quick Start
-----------
Add this to your javascript file.
````
$(function()
{
   $("a.embed").OEmbedYoutube();
});
````

Add `class="embed"` to anchor tag which contains the URL you wish to embed.  
Ex: `<a href="http://www.youtube.com/watch?v=8mwKq7_JlS8" class="embed"></a>`

Options
-----------

- **maxWidth** (default value is `'auto'`) - max width of returned youtube player
- **maxHeight** (default value is `'auto'`) - max height of returned youtube player
- **includeHandle** (default value is `true`) - indicates include or not handle for collapse/expand embed youtube player. See v ^ near link
- **onProviderNotFound** (default value is `null`) - fires when resource link isn't valid youtube link
- **beforeEmbed** (default value is `null`) - fires before starting embed the youtube player
- **afterEmbed** (default value is `null`) - fires after starting embed the youtube player
- **onEmbed** (default value is `null`) - fires on embeding the youtube player


````
$(function()
{
   $("a.embed").OEmbedYoutube(
   {
        maxWidth: 500,
        maxHeight: 500,
        includeHandle: false,
        onProviderNotFound: function(element, resourceUrl) { alert(resourceUrl + " wan't found"); },
        beforeEmbed: function(element, oembedData) { alert("I will embed next code: " + oembedData); },
        afterEmbed: function(element, oembedData) { alert("I have embeded next code: " + oembedData); },
        onEmbed: function(element, oembedData) { alert("I am embeding next code: " + oembedData); }
   });
});
````

[1]: http://starfishmod.github.io/jquery-oembed-all/
[2]: http://youtube.com


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/disshishkov/jquery-oembed-youtube/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

