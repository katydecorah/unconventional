---
---


/* Create distinct list of countries */
{% assign distinct_countries = "" | split: "" %}
{% for speaker in site.data.speakers %}
  {% if speaker.country %}
    {% unless distinct_countries contains speaker.country %}
      {% assign distinct_countries = distinct_countries | push: speaker.country %}
    {% endunless %}
  {% endif %}
{% endfor %}

/* Create count for each */
{% assign distinct_countries_count = "" | split: "" %}
{% for country in distinct_countries %}
{% assign count = 0 %}
{% for speaker in site.data.speakers %}{% if country == speaker.country %}{% assign count = count | plus: 1 %}{% endif %}{% endfor %}
{% assign distinct_countries_count = distinct_countries_count | push: count %}
{% endfor %}

/* Create list for each */
{% assign speakers = "" | split: "" %}
{% for country in distinct_countries %}
{% assign list = "" | split: "|" %}
{% for speaker in site.data.speakers %}{% if country == speaker.country %}{% assign list = list | push: speaker.speaker %}{% endif %}{% endfor %}
{% assign speakers = speakers | push: list %}
{% endfor %}

{% for country in distinct_countries %}
{{c}} - {{distinct_countries_count[forloop.index0]}}
{% endfor %}

