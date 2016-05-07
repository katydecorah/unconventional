var data = [
  {% assign places = (site.posts | where: "category","adventures") %}{% for place in places %}{
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
  }{% unless forloop.last %},{% endunless %}{% endfor %}
]