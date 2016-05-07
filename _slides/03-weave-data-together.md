---
title: Weave data together
---

<section class="section-image" style="background-image:url({{site.baseurl}}/img/map.png)"></section>

<!--*-->

I need *data* and the **shapes for each country**.

<!--*-->

<figure class="atom">
<ul><li class="active">speakers.yml</li><li>countries.yml</li></ul>
{% highlight yaml %}
{% include speakers.yml %}
{% endhighlight %}
</figure>{% comment %}_{% endcomment %}

<!--*-->

<figure class="atom">
<ul><li>speakers.yml</li><li class="active">countries.yml</li></ul>
{% highlight yaml %}
{% include countries.yml %}
{% endhighlight %}
</figure>

<!--*-->

Assign the speaker data to each country shape.

<!--*-->

But let's take another look at the country shape data.

<!--*-->

<figure class="atom">
<ul><li class="active"></li></ul>
{% highlight js %}
{% for country in site.data.countries limit:1 offset:4 %}
{
  "type": "Feature",
  "properties": {
    "country": "{{country.country}}",
  },
  "geometry": {
    "type": "{{country.type}}",
    "coordinates": {{country.coordinates}}
  }
}
{% endfor %}
{% endhighlight %}
</figure>{% comment %}_{% endcomment %}

<!--*-->

This does not look fun to edit.

<!--*-->

What if I could make Jekyll do it for me?

<!--*-->

How can I *weave* together **two data files**?

<!--*-->

<figure class="atom">
<ul><li class="active">speakers.yml</li><li>countries.yml</li></ul>
{% highlight yaml %}
{% include speakers.yml %}
{% endhighlight %}
</figure>{% comment %}_{% endcomment %}

<!--*-->

<figure class="atom">
<ul><li>speakers.yml</li><li class="active">countries.yml</li></ul>
{% highlight yaml %}
{% include countries.yml %}
{% endhighlight %}
</figure>

<!--*-->

<figure class="atom">
<ul><li>speakers.yml</li><li>countries.yml</li><li class="active">data.geojson</li></ul>
{% highlight js %}
speakers + countries = <3 data <3
{% endhighlight %}
</figure>

<!--*-->

<figure class="atom">
<ul><li>speakers.yml</li><li>countries.yml</li><li class="active">data.geojson</li></ul>
{% highlight js %}
---
---
{
  "type": "FeatureCollection",
  "features": [
  // Use a loop to create a feature for each country
  {
      "type": "Feature",
      "properties": {
        "country": <country>,
        "speaker_num": <number of speakers>,
        "speaker_names": <names of speakers>,
        "twitter_handles": <twitter handles of speakers>,
        "talks": <talks of speakers>
      },
      "geometry": {
        "type": "<country shape type>",
        "coordinates": <country coordinates>
      }
    }
  ]
}
{% endhighlight %}
</figure>

<!--*-->

I could loop through each country&hellip;

<!--*-->

<figure class="atom">
<ul><li>speakers.yml</li><li>countries.yml</li><li class="active">data.geojson</li></ul>
{% highlight js %}{% raw %}
---
---
{
  "type": "FeatureCollection",
  "features": [
  {% for country in site.data.countries %}
  {
      "type": "Feature",
      "properties": {
        "country": <country>,
        "speaker_num": <number of speakers>,
        "speaker_names": <names of speakers>,
        "twitter_handles": <twitter handles of speakers>,
        "talks": <talks of speakers>
      },
      "geometry": {
        "type": "<country's shape type>",
        "coordinates": <country's coordinates>
      }
    }{% unless forloop.last %},{% endunless}{% endfor %}{% endraw %}
  ]
}
{% endhighlight %}
</figure>

<!--*-->

&hellip;but I don't need every country.

<!--*-->

I'll use the data in speakers.yml to decide what countries I need

<!--*-->

<figure class="atom">
<ul><li>speakers.yml</li><li>countries.yml</li><li class="active">data.geojson</li></ul>
{% highlight js %}{% raw %}
---
---
{
  "type": "FeatureCollection",
  "features": [
  {% for countries in site.data.countries %}
    {% for speaker in site.data.speakers %}
      {% if countries.country == speaker.country %}
      {
          "type": "Feature",
          "properties": {
            "country": <country>,
            "speaker_num": <number of speakers>,
            "speaker_names": <names of speakers>,
            "twitter_handles": <twitter handles of speakers>,
            "talks": <talks of speakers>
          },
          "geometry": {
            "type": "<country's shape type>",
            "coordinates": <country's coordinates>
          }
        }{% unless forloop.last %},{% endunless %}
      {% endif %}
    {% endfor %}
  {% endfor %}{% endraw %}
  ]
}
{% endhighlight %}
</figure>

<!--*-->

But the country in speakers.yml isn't distinct, so I'll have repeated data.

<section class="country-svg">
{% for speaker in site.data.speakers %}
{% assign country = speaker.country | slugify | append: ".svg" | prepend: 'countries/' %}
{% include {{country}} %}
{% endfor %}
</section>

<!--*-->

I'll create a distinct list of countries from speakers.yml

{% include distinct.liquid %}

<section class="country-svg">
{% for item in distinct_countries %}
{% assign country = item | slugify | append: ".svg" | prepend: 'countries/' %}
{% include {{country}} %}
{% endfor %}
</section>

<!--*-->

<figure class="atom">
<ul><li>speakers.yml</li><li>countries.yml</li><li class="active">data.geojson</li></ul>
{% highlight js %}{% raw %}
---
---
{% assign distinct_countries = "" | split: "" %}
{% for speaker in site.data.speakers %}
  {% unless distinct_countries contains speaker.country %}
    {% assign distinct_countries = distinct_countries | push: speaker.country %}
  {% endunless %}
{% endfor %}

{{distinct_countries | jsonify}}
{% endraw %}
{% endhighlight %}
</figure>

<!--*-->

<figure class="chrome">
{% include chrome.html url='jekyllconf/data.geojson' %}
{% highlight js %}{% include distinct/countries.liquid %}{{distinct_countries | jsonify}}{% endhighlight %}
</figure>

<!--*-->

I'll *store* data about the speakers in *arrays*.

<!--*-->

{% include distinct/speakers.liquid %}
{% include distinct/twitter.liquid %}
{% include distinct/talks.liquid %}
{% assign getSize = distinct_countries | size | minus: 1 %}


<figure class="chrome">
{% include chrome.html url='jekyllconf/data.geojson' %}
{% highlight js %}
// distinct_countries
{{distinct_countries | jsonify}}

// speakers
{{speakers  | jsonify}}

// twitter_handles
{{twitter_handles | jsonify}}

// talks
{{talks  | jsonify}}
{% endhighlight %}
</figure>

<!--*-->

<figure class="chrome highlight-1">
{% include chrome.html url='jekyllconf/data.geojson' %}
{% highlight js %}
// distinct_countries
{{distinct_countries | jsonify}}

// speakers
{{speakers  | jsonify}}

// twitter_handles
{{twitter_handles | jsonify}}

// talks
{{talks  | jsonify}}
{% endhighlight %}
</figure>

<!--*-->

<figure class="chrome highlight-3">
{% include chrome.html url='jekyllconf/data.geojson' %}
{% highlight js %}
// distinct_countries
{{distinct_countries | jsonify}}

// speakers
{{speakers  | jsonify}}

// twitter_handles
{{twitter_handles | jsonify}}

// talks
{{talks  | jsonify}}
{% endhighlight %}
</figure>

<!--*-->

<figure class="atom">
<ul><li class="active">data.geojson</li></ul>
{% highlight js %}
---
---
{% comment %} include/data.geojson {% endcomment %}{% raw %}
{% assign distinct_countries = "" | split: "" %}
  {% for speaker in site.data.speakers %}
    {% unless distinct_countries contains speaker.country %}
      {% assign distinct_countries = distinct_countries | push: speaker.country %}
    {% endunless %}
{% endfor %}

{% assign speakers = "" | split: "" %}
{% for country in distinct_countries %}
  {% assign list = "" | split: "|" %}
    {% for speaker in site.data.speakers %}
      {% if country == speaker.country %}
        {% assign list = list | push: speaker.speaker %}
      {% endif %}
    {% endfor %}
  {% assign speakers = speakers | push: list %}
{% endfor %}

{% assign twitter_handles = "" | split: "" %}
{% for country in distinct_countries %}
  {% assign twitter = "" | split: "|" %}
    {% for speaker in site.data.speakers %}
      {% if country == speaker.country %}
        {% assign twitter = twitter | push: speaker.twitter %}
      {% endif %}
    {% endfor %}
  {% assign twitter_handles = twitter_handles | push: twitter %}
{% endfor %}

{% assign talks = "" | split: "" %}
{% for country in distinct_countries %}
  {% assign store_talks = "" | split: "|" %}
  {% for speaker in site.data.speakers %}
    {% if country == speaker.country %}
      {% assign store_talks = store_talks | push: speaker.talk %}
    {% endif %}
  {% endfor %}
  {% assign talks = talks | push: store_talks %}
{% endfor %}

{
  "type": "FeatureCollection",
  "features": [
  {% for countries in site.data.countries %}
    {% for distinct_country in distinct_countries %}
      {% if countries.country == distinct_country %}
        {
          "type": "Feature",
          "properties": {
            "country": "{{countries.country}}",
            "speaker_num": {{speakers[forloop.index0] | size | jsonify}},
            "speaker_names": {{speakers[forloop.index0] | jsonify}},
            "twitter_handles": {{twitter_handles[forloop.index0] | jsonify}},
            "talks": {{talks[forloop.index0] | jsonify}}
          },
          "geometry": {
            "type": "{{countries.type}}",
            "coordinates": {{countries.coordinates}}
          }
        }{% unless forloop.last %},{% endunless %}
      {% endif %}
    {% endfor %}
  {% endfor %}
  ]
}
{% endraw %}
{% endhighlight %}
</figure>{% comment %}_{% endcomment %}


<!--*-->

<figure class="chrome">
{% include chrome.html url='jekyllconf/data.geojson' %}
{% highlight js %}{% include data.geojson %}{% endhighlight %}
</figure>

<!--*-->

<figure class="chrome">
{% include chrome.html url='jekyllconf/index.html' %}
<iframe src="jekyllconf/index.html" class="map"></iframe>
</figure>

<!--*-->


<figure class="atom">
<ul><li class="active">speakers.yml</li></ul>
{% highlight yaml %}
{% include speakers.yml %}
{% endhighlight %}
</figure>{% comment %}_{% endcomment %}