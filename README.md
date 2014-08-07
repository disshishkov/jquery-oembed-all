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

- **MaxWidth** (default value is `'auto'`) - max width of returned youtube player
- **MaxHeight** (default value is `'auto'`) - max height of returned youtube player
- **IsReplaceLink** (default value is `'true'`) - replcae link by embded player.
- **IsIncludeHandle** (default value is `true`, works only if `IsReplaceLink` is `false`) - indicates include or not handle for collapse/expand embed youtube player. See v ^ near link
- **OnProviderNotFound** (default value is `null`) - fires when resource link isn't valid youtube link
- **OnBeforeEmbed** (default value is `null`) - fires before starting embed the youtube player
- **OnAfterEmbed** (default value is `null`) - fires after starting embed the youtube player
- **OnEmbed** (default value is `null`) - fires on embeding the youtube player


````
$(function()
{
   $("a.embed").OEmbedYoutube(
   {
        MaxWidth: 500,
        MaxHeight: 500,
        IsIncludeHandle: false,
        OnProviderNotFound: function(element, resourceUrl) { alert(resourceUrl + " wan't found"); },
        OnBeforeEmbed: function(element, oembedData) { alert("I will embed next code: " + oembedData); },
        OnAfterEmbed: function(element, oembedData) { alert("I have embeded next code: " + oembedData); },
        OnEmbed: function(element, oembedData) { alert("I am embeding next code: " + oembedData); }
   });
});
````

[1]: http://starfishmod.github.io/jquery-oembed-all/
[2]: http://youtube.com


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/disshishkov/jquery-oembed-youtube/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

