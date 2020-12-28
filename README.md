# Rebel-Outfitters
A single page Vanilla JS web app to demonstrate Lingoport's capabilities.

### To add a locale (or more) to an 'i18n' or 'IQA' version
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

* Edit <code>src/views/components/Hamburger.js</code> to add the locale variabless based on their i18n display names. For instance, Norwegian and 'ia' Linguistic reviewer:
<pre>
        let localeNO = i18n.getString("Hamburger", "localeNO");
        let localeIA = i18n.getString("Hamburger", "localeIA")
</pre>
and in the option menu section (click edit to see code, does not show up even with 'pre')
<pre>
               <option value="no-NO">${localeNO}\</option>
               <option value="ia">${localeIA}\</option>
</pre>

