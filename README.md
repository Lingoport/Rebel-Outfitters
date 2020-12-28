# Rebel-Outfitters
A single page Vanilla JS web app to demonstrate Lingoport's capabilities.

## To add a locale (or more) to an 'i18n' or 'IQA' version
* Edit <code>src/content/en-US/strings.json</code> and add the locale(s). For instance Norwegian, 'ia' (Linguistic Reviewer special case):
<pre>
        "localeNO": "Norwegian - Norway",
        "localeIA": "Linguistic Reviewer",
</pre>

* Edit <code>src/services/i18n.js</code>, add the corresponding currencies.  For instance Norwegian Kroner, and the  'ia' Linguistic Reviewer special case:
<pre>
    var currencyMap = {
    'en-US': 'USD',
    'fr-FR': 'EUR',
     [...]
    'no-NO': 'NOK'
</pre>
<pre>
       else if(locale == 'eo' || locale == 'ia') {
</pre>

* 
