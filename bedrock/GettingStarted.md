
## Understanding the Wiki

This is a "wiki-like personal notebook". If you don't know what that is, see [[WhatIsAWiki]]?

If you do sort of know, this page should explain what you need to understand. 

----

In [[CardiganBay]] you start on a page called "[[HelloWorld]]", and then navigate to and add further pages about whatever it is you are interested in.

By default, CardiganBay comes with some standard pages, to let you see what it's like to navigate around inside the wiki, with the instructions and explanations (like this one), and with examples of the various magic tricks this wiki has up its sleeve.

You are free to change these pages and customize the notebook to your own taste. But note, that you will discover some pages have specific functions. For example, the page called "[[AllPages]]" shows you a list of all the pages in the wiki. It does this because it contains a special "*system card*" (don't worry about what this means yet, it will be explained later). And if you remove that system card, it will no longer show you all the pages. Don't worry about all this. It should be pretty obvious once you get going. 

----

### Editing Pages 

To edit any page, just click the **Edit** button at the top. 

It will open up the full contents of the page in a single textarea.

You can now edit the contents of the page.

The default markup is [Markdown](https://daringfireball.net/projects/markdown/syntax). With this you can add titles, subtitles, bold and italic etc.

To make a link to another page, simply put double square brackets around it like this:

[<!-- -->[HelloWorld]] 

will become a link, as in, [[HelloWorld]]

When you have saved your edit, and gone back into the "reading mode" then the link will be active. Click on it to go to the linked page.

If the page doesn't exist, you will be taken to a non-page whose content is "PAGE DOES NOT EXIST"

You can now create this page simply by choosing to edit and save that new-page. 

If you *don't* do any work on it, then no new page will be created. 




----

So far, this is pretty much just like any other wiki, including the original C2 Wiki AKA "Ward's Wiki" (because it was invented by [Ward Cunningham](https://en.wikipedia.org/wiki/Ward_Cunningham)) and Wikipedia.

However CardiganBay adds to standard wiki structure in the following ways :

- Pages are broken into a sequence of cards. 
- Each card has a card *type* which defines how it is rendered. 
- By default, cards are "Markdown" type, but there are more specialized types with their own rendering etc. 
- There are a few extra markup tricks. See [[ExtraMarkupExamples]]

Let's drill down into all this :

### Sequence of Cards

In [[CardiganBay]], pages are made of a sequence of sections called "cards". 

The four horizontal dashes markup (ie. -<!-->-<!-->-<!-->-) on a line by themselves, has been re-purposed as the "card separator".

It will break your page up into separate cards.

For example, there is a card separator following this line ...

----

... we are now after the card separator. And you can see we are in a new card.

Here's another separator before a new card with a new header, on a new theme ...


----

### Card Types

Each card in CardiganBay has a type, which tells us what its data is meant to represent, and how to render it. 

Cards which do not specify their type explicitly are taken to be of the :markdown type. And are therefore rendered on the client as Markdown.


To declare that a card has a type other than Markdown, you should specify the type as a :keyword, on a line by itself, immediately *after* the card separator.

See more on [[CardTypes]]

----

### Extra Card Functions

At the bottom left of each card are up and down buttons. These move a card shift the card either up or down in the sequence of cards on the page. It's a quick and convenient way to reorder cards on the page without going to the Edit mode.

At the bottom right of each card is a little "eye" icon. Click this to open and see the **CardBar** which contains extra information about the card, and some buttons to do things like re-order it within the page or move it to a different page.

See [[CardBar]] for details.

----

### Running Locally, Export Globally

The original wikis were public servers allowing anyone to edit them to encourage a community sense of responsibility. In 2020, the web is a more dangerous place, full of hostile spam-bots, right-wing trolls and fake-news mongers. And the ideal of wiki as completely open space is largely gone.

Cardigan Bay is intended to be run locally on your own machine. And then its contents can be exported as a "flat" or "static" collection of HTML files that can be hosted on any public facing server. 

See [[ExportingAsFlatSite]] for information about how to do this. 

----

### Backlinks

Links in wikis are unidirectional. They start on a page like ChocolateCake and go to a page like BlackForestGateau. But, particularly as your notebooks get larger and more complex, many people find it useful to know what pages link *into* the page they are currently looking at. Maybe when you made a BlackForestGateau page you didn't think it was necessary to add a link back to the ChocolateCake page. 

But someone else reading the wiki would get a lot of value from that. 

We call a link "backwards" from a page to a page that links to it, a "backlink". And CardiganBay automatically calculates all the backlinks for any page and shows them in a separate card at the bottom. This card is not really part of the page, and if you edit the text you'll see no reference to it. But it's added automatically and becomes increasingly useful as your wiki gets bigger.