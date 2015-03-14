# Released #

## 0.0.19 ##
  * Fixed installation bug from 0.0.18.

## 0.0.18 ##
  * Fixed very specific bug with linking to a URL with UTF-8 characters.
  * Minor fixes.

## 0.0.17 ##
  * Fix problem with layout in 0.0.16.
  * Fixed error detecting for installation on PHP less than 5.2.
  * Wiki syntax update: replace -- with mdash.

## 0.0.16 ##
  * Error log for unexpected errors now stores to ./errors.txt - it will be helpful for researching errors on client installations.
  * Rename pages feature ([issue #21](https://code.google.com/p/wikicrowd/issues/detail?id=#21)).
  * Generate sitemap.xml file ([issue #37](https://code.google.com/p/wikicrowd/issues/detail?id=#37)).
  * Additional syntax for links: `[``[`link to somewhere`]``]` ([issue #35](https://code.google.com/p/wikicrowd/issues/detail?id=#35)).
  * New syntax for italic: //italic//.
  * Improved HTTP/404 page (now it's customizable by editing page ./error/404).
  * Themes support.

## 0.0.15 ##
  * Paging on 'All changes' page.
  * WikiSyntax changed a bit: // for italic //
  * Minor fixes.

## 0.0.14 ##
  * List unauthorized users in admin interface and grant them authorization ([issue #29](https://code.google.com/p/wikicrowd/issues/detail?id=#29)).
  * Installer: additional pre-install check for ZipArchive. Also <? changed to <?php ([issue #32](https://code.google.com/p/wikicrowd/issues/detail?id=#32)).
  * Fixed wiki layout for /italic/ text ([issue #9](https://code.google.com/p/wikicrowd/issues/detail?id=#9)).

## 0.0.13 ##
  * New content block type @html for embed HTML support.
  * Fixed Wrong breadcrump path ([issue #18](https://code.google.com/p/wikicrowd/issues/detail?id=#18)).
  * Fixed Invalid codepage of RSS feed ([issue #17](https://code.google.com/p/wikicrowd/issues/detail?id=#17)).
  * Fixed some other bugs.

## 0.0.12 ##
  * Initial [Wiki syntax](WikiSyntax.md) support for bold, italic, subscript and superscript text ([issue #9](https://code.google.com/p/wikicrowd/issues/detail?id=#9)).
  * List of all registered users.
  * Added config property for changing license.
  * Page hierarchy implemented ([issue #6](https://code.google.com/p/wikicrowd/issues/detail?id=#6)).
  * Handle @subtitle and @subsubtitle ([issue #14](https://code.google.com/p/wikicrowd/issues/detail?id=#14)).
  * Simple image handling added with @img url ([issue #15](https://code.google.com/p/wikicrowd/issues/detail?id=#15)).

## 0.0.11 ##
Bugfix: @page`[Internal link`] doesn't work ([issue #11](https://code.google.com/p/wikicrowd/issues/detail?id=#11)).

## 0.0.10 ##
Bugfix of installation script and configuration panel.

## 0.0.9 ##
  * List of all changes.
  * RSS channel for changes log.
  * Usable wiki configuration for administrators.
  * Bugfix.

## 0.0.8 ##
  * New positive logo :)
  * Changed format of localization data.
  * Access rights customization.
  * Anonymous editing.
  * Detect previous installation and update it.

## 0.0.7 ##
  * Localization (Russian and English languages impleented).
  * E-mail change confirmation re-implemented to prevent account blocking.
  * Improve installation with checking of newwer version of WikiCrowd.
  * Bugfix.

## 0.0.6 ##
  * Initial public version.