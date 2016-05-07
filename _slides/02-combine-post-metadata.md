---
title: Combine post metadata
---

How can I create a *single map* using data in the front matter of *multiple posts*?

<!--*-->

<figure class="atom">
<ul>{% for post in site.posts %}<li{% if forloop.first %} class="active"{% endif %}>{{post.path | replace:'_posts/','' | truncate:25,'..'}}</li>{% endfor %}</ul>{% comment %}_{% endcomment %}
{% highlight md %}
---
title: Iceland
category: adventures
image: https://c2.staticflickr.com/8/7732/17830222499_b36c366db1_b.jpg
coordinates:
- -21.9303337,64.1388635
---

We spent 10 amazing days in Iceland, here's our journey.

## Reykjavík

We kicked it off in Reykjavík and walked all around the city.
{% endhighlight %}
</figure>

<!--*-->

Where do I start?

<!--*-->

<figure class="atom">
<ul><li class="active">data.html</li></ul>
{% highlight html %}
---
title: Adventure map
---

{% raw %}{% for post in site.posts %}
{{post.coordinates}}
{% endfor %}{% endraw %}
{% endhighlight %}
</figure>

<!--*-->

I need *geo* data.

<!--*-->

<figure class="atom">
{% highlight js %}
{
  "type": "FeatureCollection",
  "comment": "Hi! I'm your new pal, GeoJSON!",
  "features": [
  {
    "type": "Feature",
    "properties": {
      "title": <post title>,
      "description": <post description>,
      "cool_thing": <that I want to store>
    },
    "geometry": {
      "type": "point",
      "coordinates": <post coordinates>
    }
  },
  {
    "type": "Feature",
    "properties": {
      "title": <post title>,
      "description": <post description>,
      "cool_thing": <that I want to store>
    },
    "geometry": {
      "type": "point",
      "coordinates": <post coordinates>
    }
  }]
}
{% endhighlight %}
</figure>

<!--*-->

<figure class="atom">
<ul><li class="active">data.js</li></ul>
{% highlight js %}
{% endhighlight %}
</figure>

<!--*-->

<figure class="atom">
<ul><li class="active">data.js</li></ul>
{% highlight js %}
---
---
{% endhighlight %}
</figure>

<!--*-->

<figure class="atom">
<ul><li class="active">data.js</li></ul>
{% highlight js %}
---
title: Will this work?
---

{%raw%}{{page.title}}{% endraw%}
{% endhighlight %}
</figure>

<!--*-->

<figure class="terminal">
<pre>
Last login: {{ site.time | date: '%c' | replace: '2016','' }} on ttys000
Jupiter:{{site.baseurl | replace:'/',''}} katydecorah$ jekyll serve
</pre>
</figure>

<!--*-->

<figure class="terminal">
<pre>
Last login: {{ site.time | date: '%c' | replace: '2016','' }} on ttys000
Jupiter:{{site.baseurl | replace:'/',''}} katydecorah$ jekyll serve
Configuration file: /Users/katydecorah{{site.baseurl}}/_config.yml
            Source: /Users/katydecorah{{site.baseurl}}
       Destination: /Users/katydecorah{{site.baseurl}}/_site
 Incremental build: disabled. Enable with --incremental
      Generating... 
                    done in 0.03 seconds.
 Auto-regeneration: enabled for '/Users/katydecorah{{site.baseurl}}'
Configuration file: /Users/katydecorah{{site.baseurl}}/_config.yml
    Server address: http://127.0.0.1:4000{{site.baseurl}}/
  Server running... press ctrl-c to stop.
</pre>
</figure>{% comment %}_{% endcomment %}

<!--*-->

<figure class="chrome">
{% include chrome.html url='blog/data.js' %}
<pre>Will this work?</pre>
</figure>

<!--*-->

YES!

<!--*-->

*Y*ES!

<!--*-->

*YE*S!

<!--*-->

*YES*!

<!--*-->

*YES!*

<!--*-->

&hellip;well why wouldn't it?

<!--*-->

but anyway&hellip;

<!--*-->

*YES!*

<!--*-->

*YES*!

<!--*-->

*YE*S!

<!--*-->

YES!

<!--*-->

<figure class="atom">
<ul><li class="active">data.js</li></ul>
{% highlight js %}
---
---

var data = []
{% endhighlight %}
</figure>{% comment %}_{% endcomment %}

<!--*-->

<figure class="atom">
<ul><li class="active">data.js</li></ul>
{% highlight js %}
---
---
{% comment %} includes/data.js {% endcomment %}{% raw %}
var data = [
  {% assign places = (site.posts | where: "category","adventures") %}
  {% for place in places %}{
      "type": "Feature",
      "properties": {
        "title": "{{ place.title }}",
        "description": "<img src='{{ place.image }}' width='200'>",
        "url": "{{site.baseurl}}{{place.url}}",
      },
      "geometry": {
        "type": "Point",
        "coordinates": [{{ place.coordinates }}]
      }
  }{% unless forloop.last %},{% endunless %}
  {% endfor %}
]
{% endraw %}
{% endhighlight %}
</figure>{% comment %}_{% endcomment %}


<!--*-->

<figure class="chrome">
{% include chrome.html url='blog/data.js' %}
{% highlight js %}{% include data.js %}{% endhighlight %}
</figure>

<!--*-->

<figure class="chrome">
{% include chrome.html url='blog/index.html' %}
<iframe src="blog/index.html" class="map"></iframe>
</figure>

<!--*-->

What can I *do* with this?
