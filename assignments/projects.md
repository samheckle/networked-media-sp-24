# Projects
Projects are due at the start of class on the date assigned on the list below.

You may turn in a project up to one week late, for a one letter grade deduction off the project grade. Work that is more than one week late will not be accepted, meaning an automatic F on that project. If you are absent, you are still expected to turn in projects online by the deadline.

You can turn in your project by adding a link to it in this [spreadsheet](https://docs.google.com/spreadsheets/d/1I4rMb-gg-LCbdFIfDhe7uzGNk5gqZN4I2E5XjWZsquM/edit?usp=sharing).

# Project #1
### due 2/1

Using HTML and CSS, create a hypertext narrative which reveals something about yourself, or about an experience you’ve had. Think about narrative structures hypertext allows you to create (e.g. branching narrative, looping narrative,) and try to understand how they can best serve the story you are trying to tell. You are allowed to use words and images.

Keep styling to a minimum – don’t go beyond background & foreground colors, and maybe font size – in order to keep your focus on the storytelling and interaction. Use the `<br/>` and `<hr/>` tags, or the `&nbsp;` entity to control spacing in your piece. 

Within this minimal styling, make give some thought to how color, scale, spacing and the relationship between words and images shape the experience of navigating your website. Also consider the other affordances offered by the browser: maybe the HTML page name or address bar are part of your work, or maybe the work requires to be seen in a browser window of a certain size.

### Deliverables
2/01: You will turn in a website, hosted on your Digital Ocean droplet. Your starting page should be called `index.html`, and all other pages should be reachable (or not :) ) from it via hyperlinks. You will be submitting a link that is http://[your-ip-address]/project1. **If you do not have a project1 folder in your cyberduck this will not work**. _If you do not submit a link that includes the /project1 path in the url you will be deducted 50% of the grade for this assignment._

**Some Inspiration**
* Larissa Pham, [Poem Club](https://lrsphm.github.io/poem-club/)
* Nicky Case, [Anxiety Demo](https://ncase.me/anxiety-demo/)
* Everest Pipkin, [Gift Game](https://gift-game.neocities.org/)

# Project #2
### due 2/15
Using HTML, CSS and Javascript, create a clock that lives in the web browser. It should only have one HTML page, but other than that there is no specific requirement on its exact format or inner workings. All it should do is mark the passing of time in a way that is meaningful to you.

Some aspects to consider when conceptualizing this project are the time scale of your clock (e.g. time of day vs geological era,) the “materials” you are using to make it come to life (numbers / words / emojis / images / pure color, and so on,) whether your clock talks about “absolute time” or has a point of reference, and the overall design of the piece (does it reference a real clock? or is it more abstract? how do typography, color, spacing, and the relationships between elements contribute to your overall idea?). Don’t feel constrained by these categories, they are just meant to help you get started.

### Deliverables

Session #5 02/08/23: Come up with a concept for your project and post it on your blog / Google Doc / etc. Include a short description of what you will make, one or two sketches (hand-drawn is fine, but feel free to use digital tools if you prefer) and a few references or relevant projects. 

Session #7 02/15/23: The project is due, as a website hosted on your Digital Ocean server. The site should be hosted in the public directory of your web server, under a folder called clock. The main HTML page of your clock should be called index.html (its filesystem path will be your_webserver/public/clock/index.html and it will be accessible online at http://your-ip/clock.)

**Some Inspiration**
* Fruitful School, [Emoji Clock](https://web.archive.org/web/20201126185008/http://www.fruitful.school/blog/2019-12-23.html)
* Jacopo Colo, [Hex Clock](https://www.jacopocolo.com/hexclock/)
* Christian Marclay, [The Clock](https://www.youtube.com/watch?v=BoDMEixJYpE)

# Project #3 (Midterm)
### due 3/5
This is a straightforward project: choose a community you care about and build a website for it. If it helps, you can look at this assignment as your first professional web development gig: your chosen community is a client who has commissioned you to design and develop a public-facing website; specifically, a website that is in line with their ethos and values.

Your chosen community can be real (an NYU student organization, your 5th grade summer camp, a community brought together by a shared passion for X, etc.). fictional (the group of all your childhood imaginary friends, etc.) or anywhere in between (the plants in your apartment, the bacteria that makes up your microbiome, etc.)

**There is one technical requirement your project needs to fulfill: your website should feature user generated content (meaning that you’ll need to store some data on your server.)**

Make sure you are clear on who the audience for your website is (e.g. members of the community vs outsiders,) and that your design caters to your selected audiences, while staying truthful to the nature of the community. At the same time, make sure to consider the *content* of the website. Does your community have a manifesto? A list of members? A schedule? And is the content coming from a different website of the same community? Are you writing it? Does an AI write it? Are the users creating most of it?

The entire project is due on March 7th (midterms week,) but the work will be split up as detailed in the deliverables section below.

### Deliverables:

Due 2/22: Choose the community you want to focus on, and come up with a design for the website you want to build. A common structure is to have a header, a footer, a landing page and a few content pages, but don’t feel constrained by this. Use a digital tool to create your **site map** and **wireframes** (Figma, Google Slides, Canva, Miro, etc.) Begin working on the visual design of the site as well.
    
Due 3/5: The project is due, as a website hosted on your Digital Ocean server. The site should be hosted in a new folder at the same level as your webserver folder eg. `root/project3` or `root/community`. You should not include any `.html` files and everything should be in `.ejs` inside of your `views` folder. It will be accessible online at `http://your-ip:[port]/`. For a full tutorial on this, please refer to the [class 11 slides](https://docs.google.com/presentation/d/1SnDXloQ4or61M8BGn7YGZVK2guTj8UDUBJrEQMB6OA8/edit#slide=id.g2bd033dc6d2_0_117) starting at the cyberduck screenshot. If you choose to add `/project3` or `/community` to the path that is ok, just make sure to add that to all your routes as well.

**Some Inspiration:**

- Laurel Schwulst, [All of my friends at once](https://allmyfriendsatonce.com/)
- [School for Poetic Computation](https://sfpc.study/)
- [HTML Energy](http://html.energy/home.html)
- [Friends With Benefits](https://www.fwb.help/)
- [learningtoloveyoumore.com](http://www.learningtoloveyoumore.com/)

**Some Design Inspiration**

- [Brutalist Websites](https://brutalistwebsites.com/)
- [hoverstat.es](https://www.hoverstat.es/)
- [hallointer.net](https://hallointer.net/)
- [linci.co’s Design Bookmarks](https://bookmarks.linci.co/)

# Project #4
### due 4/4
This project consists of 2 small exercises to review technical components like apis and databases. 

### Deliverables:

Due 3/28 #4.1: Mastodon Bot
Create an account on our class's [Mastodon server](https://networked-media.itp.io/invite/GB28dTiY) and make a bot that runs automatically! What is the interval it posts at? Try bigger times, like once a day or once a week. Think about using an exernal api to produce content. 
**Some Inspiration**
* Allison Parrish, [everyword](https://twitter.com/everyword?lang=en)
* Darius Kazemi, [bot summit](http://tinysubversions.com/2013/11/bot-summit/) -- sadly a lot of these bots are removed from twitter aka x (which is also why we are using Mastodon)
* Colin Mitchell, [botsin.space](https://botsin.space/public/local) -- a mastodon server specifically for bots


Due 4/4 #4.2:
This assignment is all about getting comfortable with databases. Take the starter code and practice working with databases. You can also incorporate databases into your midterm for this exercise!

# Project #5
### due 4/30
For your final project, you will design and build a website starting from *one* of the following four prompts:

- a website that evolves over time;
- a website that is different for every one of its visitors;
- a website that is a gift to someone you care about;
- a website that is a garden;

These are broad prompts meant to get you started, and can be interpreted as literally or abstractly as you see fit. As usual, you are encouraged to bring your own design and artistic interests into this project. Regardless of which prompt you end up choosing, your website should take advantage of the fact that it lives in a networked environment, and should use the web browser’s affordances in meaningful ways to convey your concept. In a 1997 interview, Olia Lialina said “*If something is in the net, it should speak in net.language.”* Follow her advice — be medium specific with your projects.

You can work in teams of two if you prefer, as long as you let me know.

### Deliverables:

4/11: Choose your starting prompt, and come up with a concept for your website. Do your research as well, for both concept and visual style: other websites, pieces of art, zines, posters, books, installations, etc.
    
4/18: Come up with a design for your website. Use a digital tool or pen and paper to create your **site map** and **wireframes.** Use a digital tool (Figma, Google Slides, Canva, Miro, etc.) to turn your wireframes into higher fidelity visual designs for your site. You should design each page your website will have, in order to fully focus on the implementation over the following weeks.
    
4/30: The project is due, as a website hosted on your Digital Ocean server. We will have our in-class final presentations on *Tuesday April 30th and Thursday May 2*. *Students who presented their midterms during the first session get priority in choosing their preferred date for the final presentation.*
