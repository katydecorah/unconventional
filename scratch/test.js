---
---

{% include distinct/countries.liquid %}
{% include distinct/timezones.liquid %}

{{distinct_countries | jsonify}}
{{timezones | jsonify}}



---

{% assign meals = "" | split: "" %}

{% for time in actualtimes %}
{{time}}

{% if time > 20 %}
  {% assign meals = meals | push: "last night snack" %}
 {% elsif time > 17 %}
   {% assign meals = meals | push: "dinner" %}
  {% elsif time > 11 %}
    {% assign meals = meals | push: "lunch" %}
  {% elsif time > 6 %}
    {% assign meals = meals | push: "breakfast" %}
{% endif %}


{% endfor %}


{{meals | jsonify}}