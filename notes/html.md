# Introduction to HTML
HTML stands for Hyper Text Markup Language. While not a traditional programming language (it
is technically a markup language), it's what we use to create web pages. A markup language is
generally used to define the structure and display of content, HTML is no different.
Text Editor
To write HTML, one of the first things you will need is a plain text editor. Most operating
systems come with this capability built-in (TextEdit on the Mac and Notepad on Windows). While
these applications work fine, there are some benefits to using a programmer's text editor
such as Atom, Sublime Text or VS Code.
In particular, they have line numbering, syntax coloring and other features that will make it easier
to work with.
I recommend using [VS Code](https://code.visualstudio.com/download), as it has a few extra features (built-in terminal, remote file editing) that will come in handy later in the semester.
***
**Tags**

HTML is a tag based language. This means that you define the structure of the content of a document using tags. An example of a tag would be: <strong>some text</strong> which when rendered in a browser looks like this: **some text**.

Here are some tags that we’ll start with:
* `<html>...</html>` Start and end HTML
* `<head>...</head>` Head of page, not actual content; Contains *metadata* about your page.
   * `<title>...</title>` Title of the page, displayed in the web browser tab; Also in search engine indexing, etc.
* `<body>...</body>` Body of the page, this is where the visible page content lives;
   * **Working with text:**
       * `<p>...</p>` → paragraph
       * `<h1> ... </h1>` → headings (also h2, h3, ... h6)
       * `<strong>...</strong>` → bolded text
       * `<em>...</em>` → italicized text
       * `<small> ... </small>` → small text
       * `<br />` → line break (notice that this tag doesn’t have any content and therefore is both an begin and end tag, with the slash)
       * `<hr />` horizontal rule → a line break which draws a line
       * `<a href="http://...">...</a>` → a link to another page. The “`href=""`” portion is an **attribute**. Many tags have optional attributes, further details below.
   * **Grouping & information organization:**
       * `<div> ... </div>` → [Block-level](https://www.w3schools.com/html/html_blocks.asp)
       * `<span> ... </span>` → [Inline](https://www.w3schools.com/html/html_blocks.asp)
          * These will come in handy as we start working with styles and Javascript.
* `<!-- This is a comment -->` Comments

	   <html> <!-- Start the HTML -->
	      <head> <!-- Start the Head -->
	        <title>This is a Web Page</title> <!-- The Title of the page, start and end tag with text in-between -->
	      </head> <!-- End the Head, always with a "/" -->
	      <body> <!-- Start the body -->
	        This is where you would put the content of the page. <!-- This is a comment and won't display -->
	        This will be on the same line as the above.  To specify a line break, you use: <br /> 
	        This text will be a line down
	        <p> This text will also be a line down </p> 
	        <!-- The <p> tag introduces a line break before and after the text on its own -->
	        <br /><br /> <!-- Two line breaks --> <!-- Line break tags include the closing "/" as part of them, there isn't a </br> tag.-->
	       </body> <!-- End the body -->
	   </html> <!-- End the HTML -->

To try this out, copy the above into a new text file and save it as `something.html` then open it in a web browser to see it.
***
**Indenting**

Indenting (the spacing before each line that you see in the example HTML page above) isn’t strictly required, but it really helps YOU to see the nesting structure of the document. It gives you the ability to quickly recognize when you missed closing a tag, and keeps the code tidy.

Please use it 🙂

I would also recommend downloading a code formatter that will automatically catch your errors if needed! I use [Prettier for VSCode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
***
**View Source and Inspect Element**

One of the very fundamental things that made web publishing very successful in the beginning was the inclusion of a View Source feature in most web browsers. This allows people to look at the HTML of a page they are viewing so as to understand how it was constructed and learn how to do similar things themselves.

Different browsers have different ways of accessing the source — you will likely find it in the Right-Click context menu, or under the Tools or Developer menus of the browser itself.

Inspect Element is a more recent addition to web browsers, which is, in some ways, an interactive version of View Source. It’s a great prototyping tool, as it allows for on-the-fly changes to the HTML and CSS of a page. (Important note: These changes are not saved, we’re just modifying how the page is displayed.)
***
**Attributes**

Most HTML tags can have **attributes**. In the case of the `<a>` above, `href` is an attribute which indicates the URL that the link should point to. Other common attributes are `id`, `class` or `src`

* `id` allows a specific tag/element on the page to be referenced through JavaScript or CSS 
(which we’ll cover later). 

* `class` is useful when using CSS to define the design of the page.

* `src` is specific to media elements (images, audio, video, iframes) and point to the actual file being embedded into the webpage.

There are more attributes out there, most of them specific to certain tags. We will cover them as we discover other tags.
***
**Links**

You can define links in HTML using the `<a>` tag, as follows:

    <a href="http://www.google.com">Go to Google</a>

Links are the connective tissue of the web, without them every website would be an isolated island in the middle of the ocean. The example above is a link to an external website. You can also link to pages within your own website, like this:

    <a href="/page-2.html">Go to Page #2</a>

_Local links_, like the one above, need a web server in order to work (i.e. if you simply opened your `html` page in the web browser, this will not work properly.) We will cover that in the next tutorial.

_Email links_ are somewhat rare, but websites use them occasionally. They take a special value within the href property — the mailto: prefix, followed by an email address —, and clicking on them leads to the computer opening the default email client with the address filled in for the recipient field:
    
    <a href="mailto:sam.heckle@nyu.edu">Email Sam</a>

_Anchor links_ are used to point to a different section of the current webpage. They work in conjunction with an `id` attribute attached to a different tag on the same page. 

In order to see them in action, we actually need a webpage long enough that it needs scrolling, so clicking on our anchor link will take us to the bottom of the page. The example below inserts a few filler `h1` and `br` tags, and attaches the anchor to the `p` tag at the very end of the page.

    <a href="#bottomElement"> Go to bottom of the page </a>

    <!-- Filler content, so we have a long enough page -->
    <h1> Text </h1> <br/> <hr/> <br/> <br/>
    <h1> More text </h1> <br/> <hr/> <br/> <br/>
    <h1> More text </h1> <br/> <hr/> <br/> <br/>
    <h1> More text </h1> <br/> <hr/> <br/> <br/>
    <h1> More text </h1> <br/> <hr/> <br/> <br/>
    <h1> More text </h1> <br/> <hr/> <br/> <br/>
    <h1> More text </h1> <br/> <hr/> <br/> <br/>
    <h1> More text </h1> <br/> <hr/> <br/> <br/>
    <h1> More text </h1> <br/> <hr/> <br/> <br/>
    <h1> More text </h1> <br/> <hr/> <br/> <br/>
    <h1> More text </h1> <br/> <hr/> <br/> <br/>
    <h1> More text </h1> <br/> <hr/> <br/> <br/>
    <h1> More text </h1> <br/> <hr/> <br/> <br/>
    <h1> More text </h1> <br/> <hr/> <br/> <br/>
    <h1> More text </h1> <br/> <hr/> <br/> <br/>
    <!-- End of filler content, so we have a long enough page -->

    <p id="bottomElement"> This is the end of the page </p>

Notice the syntax of the `href` attribute: a `#`, followed by the `id` of the element we want to create an anchor to.

Sometimes you will see a `Back to top` button on blogs, websites, etc. Anchors are the mechanism behind the back to top functionality.

**Opening links in a new tab**
If we wanted to force the opening of a link in a new tab — which is commonly done for links that point to different websites than the current one —, we need to use the `target` attribute, with the value set to `_blank`. It looks like this:

    <a href="http://www.google.com" target="_blank"> Open Google in a new tab </a>

***
**Images**

To place an image in a page, you use a URL in the src attribute of the img tag:

    <img src="/animage.jpg" /> 
    <!-- This is a "local" URL, hosted on your server -->

    <img src="https://cezar.io/assets/images/24hrslandscape/cover.png" /> 
    <!-- This is a "global" URL, hosted anywhere on the internet. It's global because it starts with "http://" or "https://" -->

You can control the dimensions of the image by using the `width` and/or `height` attributes on the image tag:

    <img src="https://cezar.io/assets/images/24hrslandscape/cover.png" width="500" />
    <!-- or -->
    <img src="https://cezar.io/assets/images/24hrslandscape/cover.png" height="500" />
    <!-- or -->
    <img src="https://cezar.io/assets/images/24hrslandscape/cover.png" width="500" height="500" />

The unit of measurement for the width and height attributes is pixels. Once we get into CSS, we will learn more granular ways of controlling the dimensions of an image.
***
**Containers**

As our HTML pages become larger, we need to start using containers in order to organize our content or achieve more complex layouts. We will get into more advanced use cases of these containers as we start working with CSS. For now, you should be aware of:

* `<div> ... </div>` → the div is a block level container. Block-level means that it’s a type of container that takes the entire width of the page (or of its parent container,) and always starts on a new line. 

For example:

    <div> This is text #1 </div>
    <div> This is text #2, on a new line </div>

* `<span> ... </span>` → the span is an inline-level container. Inline means that it’s a type of container which only takes up as much width as necessary (based on its children’s dimensions,) and doesn’t start on a new line.

For example:

    This is a <span> piece of text </span> that all lives on the same line.

One popular usecase of the `span` container is for styling individual words or elements. For example, if we wanted to make only the `piece of text` words blue in the example above, we would write:

    This is a <span style="color: blue"> piece of text </span> that all lives on the same line.

***
**Special characters — HTML entities**

Certain characters are reserved in HTML, for reasons having to do with its structure as a markup language. For example, `<` and `>` are used to define tags. If we want to use these characters as part of our content, we need to write them differently, using *HTML entities*.

A character entity looks like this:`&entity_name;` or `&#entity_number;`

For example, if we write `&lt;` in our HTML file, the browser will display that as the lower-than sign, `<`. `&gt;` gets displayed as the greater-than sign, `>`. A few other useful entities below:

- `&nbsp;` → non-breaking space; You need to use this entity if you want more than one space between your words; If you simply add multiple regular spaces in your HTML file, the browser will reduce them to one single space.
- `&amp;` → the `&` symbol
- `&copy;` → the `©` symbol
- `&cent;` → the `¢` symbol
- `&ndash;` → En dash, –
- `&mdash;` → Em dash, —

For a full list of entities, go [here](https://www.freeformatter.com/html-entities.html). You will notice that any character can also be written as an HTML entity.

***
**Nesting**

As you noticed in all previous examples, HTML tags are nested within each-other. For instance all of the content you want inside the body of the page is nested within the `body` start and end tags. 

For example, if you want an image to act as a link, you can nest an `img` tag inside of an `a` tag, like this:

    <a href="http://www.google.com">
      <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_light_color_272x92dp.png" width="200"/>
    </a>
***

# Further Resources
- [W3Schools HTML Tutorial](https://www.w3schools.com/htmL/)
- [HTML Tags Reference](https://www.w3schools.com/tags/default.asp)
- [HTML Special Characters (entities)](https://www.w3schools.com/html/html_entities.asp)
- [HTML Block vs Inline Elements](https://www.w3schools.com/html/html_blocks.asp)
- [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)
    - This website offers a more accurate & comprehensive reference than W3Schools, but it can be more intimidating in the beginning. Use whichever you are most comfortable with.