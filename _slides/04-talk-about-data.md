---
title: Talk about data
---

I can also *write* about the data **seamlessly**.

<!--*-->

How many *speakers* are at Jekyll Conf and how many *countries* are represented?

<!--*-->

{% include distinct.liquid %}

JekyllConf has *{{site.data.speakers | size}}* speakers from *{{distinct_countries | size}}* countries.

<!--*-->

JekyllConf has {% raw %}*{{site.data.speakers&nbsp;&#124;&nbsp;size}}*{% endraw %} speakers from {% raw %}*{{distinct_countries&nbsp;&#124;&nbsp;size}}*{% endraw %} countries.

<!--*-->

Which country has the *most* speakers?

<!--*-->

{% include distinct/speakers.liquid %}
{% include distinct/most_speakers.liquid %}

*{{distinct_countries[most_speakers_max_index]}}* has the most speakers this year with *{{most_speakers_max}}*.

<!--*-->

{% raw %}*{{distinct_countries[most_speakers_max_index]}}* has the most speakers this year with *{{most_speakers_max}}*.{% endraw %}

<!--*-->

What other data can I **weave** in here?

<!--*-->

{% include distinct/timezones.liquid %}
{% include distinct/speakers.liquid %}

The hour is *{{actualtimes[0] | replace: '.0',''}}* for *{{speakers[0] | split: ' ' | first | replace: '["',''}}* in  *{{distinct_countries[0]}}*.

<!--*-->

It's *{{meals[6]}}* time in *{{distinct_countries[6]}}* for *{{speakers[6] | split: ' ' | first | replace: '["',''}}*.

<!--*-->

It's *{{meals[7]}}* time in *{{distinct_countries[7]}}* for *{{speakers[7] | split: ' ' | first | replace: '["',''}}*.

<!--*-->

{% include distinct/birds.liquid %}

*{{distinct_countries[6]}}*'s national bird is a *{{birds[6]}}*. 
