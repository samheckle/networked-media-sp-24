# What are cookies?

First of all, what are cookies? Specifically, we are talking about an HTTP cookie, a web cookie, or a browser cookie. **A cookie is a small piece of data that a server sends to a user's web browser.** The browser may store the cookie and send it back to the same server with later requests. Typically, an HTTP cookie is used to tell if two requests come from the same browser — keeping a user logged in, for example. It remembers stateful information for the stateless HTTP protocol.

P.S. stateless HTTP protocol means that there is no link between two requests being successively carried out on the same connection, which is problematic for users attempting to interact with certain pages coherently.

Cookies were once used for general client-side storage. While this made sense when they were the only way to store data on the client, modern storage APIs are now recommended. **Cookies are sent with every request, so they can worsen performance** (especially for mobile data connections). 

**Note:** To see stored cookies (and other storage that a web page can use), view, edit, and delete a page's cookies with [Chrome DevTools](https://developer.chrome.com/docs/devtools/storage/cookies/).

## Cookies are mainly used for three purposes:

1. Session management - Logins, shopping carts, game scores, or anything else the server should remember
2. Personalization - User preferences, themes, and other settings 
3. Tracking - Recording and analyzing user behavior

## Drawbacks of cookies:

- Cookies are included with every HTTP request, thereby slowing down your web application by transmitting the same data.
- Cookies are included with every HTTP request, thereby sending data unencrypted over the internet.
- Cookies are limited to about 4 KB of data. Not enough to store required data.

## Creating cookies

After receiving an HTTP request, a server can send one or more [Set-Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie) headers with the response. The browser usually stores the cookie and sends it with requests made to the same server inside a [Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cookie) HTTP header. You can specify an expiration date or time period after which the cookie shouldn't be sent. You can also set additional restrictions to a specific domain and path to limit where the cookie is sent. 

### The Set-Cookie and Cookie headers

The Set-Cookie HTTP response header sends cookies from the server to the user agent. A simple cookie is set like this:

```html
Set-Cookie: <cookie-name>=<cookie-value>
```

This instructs the server sending headers to tell the client to store a pair of cookies:

```html
HTTP/2.0 200 OK
Content-Type: text/html
Set-Cookie: yummy_cookie=choco
Set-Cookie: tasty_cookie=strawberry

[page content]
```

Then, with every subsequent request to the server, the browser sends all previously stored cookies back to the server using the `Cookie` header.

```html
GET /sample_page.html HTTP/2.0
Host: www.example.org
Cookie: yummy_cookie=choco; tasty_cookie=strawberry
```

## Define the lifetime of a cookie

The lifetime of a cookie can be defined in two ways:

- ***Session*** cookies are deleted when the current session ends. The browser defines when the "current session" ends, and some browsers use *session restoring* when restarting. This can cause session cookies to last indefinitely.
- ***Permanent*** cookies are deleted at a date specified by the `Expires` attribute, or after a period of time specified by the `Max-Age` attribute.

For example:

```
Set-Cookie: id=a3fWa; Expires=Thu, 31 Oct 2021 07:28:00 GMT;
```

**Note:** When you set an `Expires`date and time, they're relative to the client the cookie is being set on, not the server.

If your site authenticates users, it should regenerate and resend session cookies, even ones that already exist, whenever a user authenticates. This approach helps prevent the third party reusing a user's session.

# Session storage

The `Session Storage` is designed for scenarios where the user is carrying out a single transaction, but could be carrying out multiple transactions in different windows at the same time.

### For example

Imagine the scenario when a user is buying plane tickets in two different windows, using the same site. If the site used cookies to keep track of which ticket the user was buying, then as the user clicked from page to page in both windows, the ticket currently being purchased would "leak" from one window to the other, potentially causing the user to buy two tickets for the same flight without really noticing.

HTML5 introduces the `sessionStorage` attribute which would be used by the sites to add data to the session storage, and it will be accessible to any page from the same site opened in that window, i.e., **session** and as soon as you close the window, the session would be lost.

- **Session Storage has 4 methods:**
    - **`setItem()` Method –** This method takes two parameters one is key and another one is value. It is used to store the value in a particular location with the name of the key.
        
        ```
        sessionStorage.setItem(key, value)
        ```
        
    - **`getIteam()` Method –** This method takes one parameter that is key which is used to get the value stored with a particular key name.
        
        ```
        sessionStorage.getItem(key)
        ```
        
    - **`removeItem()` Method –** This is method is used to remove the value stored in the memory in reference to key.
        
        ```
        sessionStorage.removeItem(key)
        ```
        
    - **`clear()` Method –** This method is used to clear all the values stored in the session storage
        
        ```
        sessionStorage.clear()
        ```
        

# Local storage

The `Local Storage` is designed for storage that spans multiple windows, and lasts beyond the current session. In particular, Web applications may wish to store megabytes of user data, such as entire user-authored documents or a user's mailbox, on the client side for performance reasons.

Again, cookies do not handle this case well, because they are transmitted with every request.

- **Local storage has 4 methods:**
    - **`setItem()` Method –** This method takes two parameters one is key and another one is value. It is used to store the value in a particular location with the name of the key.
        
        ```jsx
        localStorage.setItem(key, value)
        ```
        
    - **`getItem()` Method –** This method takes one parameter that is key which is used to get the value stored with a particular key name.
        
        ```jsx
        localStorage.getItem(key)
        ```
        
    - **`removeItem()` Method –** This is method is used to remove the value stored in the memory in reference to key.
        
        ```jsx
        localStorage.removeItem(key)
        ```
        
    - **`clear()` Method –** This method is used to clear all the values stored in `localstorage`.
        
        ```jsx
        localStorage.clear()
        ```
        
- **JavaScript code to check browser compatibility**
    
    With the help of below code example, you can check the browser compatibility. Use this code in your every localStorage program to check the browser compatibility before adding or deleting something from localStorage.
    
    ```jsx
     // Code to check browser support
    if (typeof(Storage) !== "undefined") {
    //browser support localStorage
    } else {
    //browser does not support localStorage
    }
    ```
    

# What are the differences?

| Cookies | Session Storage | Local Storage |
| --- | --- | --- |
| The storage capacity of Cookies is 4KB | The storage capacity of session storage is 5MB | The storage capacity of local storage is 5MB/10MB |
| Cookies expire based on the setting and working per tab and window | It’s session-based and works per window or tab. This means that data is stored only for the duration of a session, i.e., until the browser (or tab) is closed | As it is not session-based, it must be deleted via javascript or manually |
| Both clients and servers can read and write the cookies | The client can only read local storage | The client can only read local storage |
| Data transfer to the server is exist | There is no transfer of data to the server | There is no transfer of data to the server |
| It is supported by all the browser including older browser  | There are fewer old browsers that support it | There are fewer old browsers that support it |

Click [me](https://www.geeksforgeeks.org/difference-between-local-storage-session-storage-and-cookies/) for more reference