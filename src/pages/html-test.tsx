import { MenuLayout } from "_/components/Layouts";
import { Link } from "_/components/Link";

const HTMLTest = () => {
  return (
    <MenuLayout>
      <h1 id="markdown-syntax">HTML Test (Markdown Content)</h1>
      <p>This is to test the default presentation of tags, when left unstyled.</p>
      <ul>
        <li>
          <p>
            <Link to="#overview">Overview</Link>
          </p>
          <ul>
            <li>
              <p>
                <Link to="#philosophy">Philosophy</Link>
              </p>
            </li>
            <li>
              <p>
                <Link to="#inline-html">Inline HTML</Link>
              </p>
            </li>
            <li>
              <p>
                <Link to="#automatic-escaping-for-special-characters">
                  Automatic Escaping for Special Characters
                </Link>
              </p>
            </li>
          </ul>
        </li>
        <li>
          <p>
            <Link to="#block">Block Elements</Link>
          </p>
          <ul>
            <li>
              <p>
                <Link to="#p">Paragraphs and Line Breaks</Link>
              </p>
            </li>
            <li>
              <p>
                <Link to="#header">Headers</Link>
              </p>
            </li>
            <li>
              <p>
                <Link to="#blockquote">Blockquotes</Link>
              </p>
            </li>
            <li>
              <p>
                <Link to="#list">Lists</Link>
              </p>
            </li>
            <li>
              <p>
                <Link to="#precode">Code Blocks</Link>
              </p>
            </li>
            <li>
              <p>
                <Link to="#hr">Horizontal Rules</Link>
              </p>
            </li>
          </ul>
        </li>
        <li>
          <p>
            <Link to="#span">Span Elements</Link>
          </p>
          <ul>
            <li>
              <p>
                <Link to="#link">Links</Link>
              </p>
            </li>
            <li>
              <p>
                <Link to="#em">Emphasis</Link>
              </p>
            </li>
            <li>
              <p>
                <Link to="#code">Code</Link>
              </p>
            </li>
            <li>
              <p>
                <Link to="#img">Images</Link>
              </p>
            </li>
          </ul>
        </li>
        <li>
          <p>
            <Link to="#misc">Miscellaneous</Link>
          </p>
          <ul>
            <li>
              <p>
                <Link to="#backslash">Backslash Escapes</Link>
              </p>
            </li>
            <li>
              <p>
                <Link to="#autolink">Automatic Links</Link>
              </p>
            </li>
          </ul>
        </li>
      </ul>
      <hr />
      <h2 id="overview">
        <strong>Overview</strong>
      </h2>
      <h3 id="philosophy">Philosophy</h3>
      <p>Markdown is intended to be as easy-to-read and easy-to-write as is feasible.</p>
      <p>
        Readability, however, is emphasized above all else. A Markdown-formatted document
        should be publishable as-is, as plain text, without looking like it&#039;s been
        marked up with tags or formatting instructions. While Markdown&#039;s syntax has
        been influenced by several existing text-to-HTML filters -- including Setext, atx,
        Textile, reStructuredText, Grutatext, and EtText -- the single biggest source of
        inspiration for Markdown&#039;s syntax is the format of plain text email.
      </p>
      <p>
        To this end, Markdown&#039;s syntax is comprised entirely of punctuation
        characters, which punctuation characters have been carefully chosen so as to look
        like what they mean. E.g., asterisks around a word actually look like *emphasis*.
        Markdown lists look like, well, lists. Even blockquotes look like quoted passages
        of text, assuming you&#039;ve ever used email.
      </p>
      <h3 id="inline-html">Inline HTML</h3>
      <p>
        Markdown&#039;s syntax is intended for one purpose: to be used as a format for{" "}
        <em>writing</em> for the web.
      </p>
      <p>
        Markdown is not a replacement for HTML, or even close to it. Its syntax is very
        small, corresponding only to a very small subset of HTML tags. The idea is{" "}
        <em>not</em> to create a syntax that makes it easier to insert HTML tags. In my
        opinion, HTML tags are already easy to insert. The idea for Markdown is to make it
        easy to read, write, and edit prose. HTML is a <em>publishing</em> format;
        Markdown is a <em>writing</em> format. Thus, Markdown&#039;s formatting syntax
        only addresses issues that can be conveyed in plain text.
      </p>
      <p>
        For any markup that is not covered by Markdown&#039;s syntax, you simply use HTML
        itself. There&#039;s no need to preface it or delimit it to indicate that
        you&#039;re switching from Markdown to HTML; you just use the tags.
      </p>
      <p>
        The only restrictions are that block-level HTML elements -- e.g.{" "}
        <code>{`<div>`}</code>,<code>{`<table>`}</code>, <code>{`<pre>`}</code>,{" "}
        <code>{`<p>`}</code>, etc. -- must be separated from surrounding content by blank
        lines, and the start and end tags of the block should not be indented with tabs or
        spaces. Markdown is smart enough not to add extra (unwanted) <code>{`<p>`}</code>{" "}
        tags around HTML block-level tags.
      </p>
      <p>For example, to add an HTML table to a Markdown article:</p>
      <pre>
        <code>{`This is a regular paragraph.

<table>
    <tr>
        <td>Foo</td>
    </tr>
</table>

This is another regular paragraph.`}</code>
      </pre>
      <p>
        Note that Markdown formatting syntax is not processed within block-level HTML
        tags. E.g., you can&#039;t use Markdown-style <code>{`*emphasis*`}</code> inside
        an HTML block.
      </p>
      <p>
        Span-level HTML tags -- e.g. <code>{`<span>`}</code>, <code>{`<cite>`}</code>, or{" "}
        <code>{`<del>`}</code> -- can be used anywhere in a Markdown paragraph, list item,
        or header. If you want, you can even use HTML tags instead of Markdown formatting;
        e.g. if you&#039;d prefer to use HTML <code>{`<a>`}</code> or{" "}
        <code>{`<img>`}</code> tags instead of Markdown&#039;s link or image syntax, go
        right ahead.
      </p>
      <p>
        Unlike block-level HTML tags, Markdown syntax <em>is</em> processed within
        span-level tags.
      </p>
      <h3 id="automatic-escaping-for-special-characters">
        Automatic Escaping for Special Characters
      </h3>
      <p>
        In HTML, there are two characters that demand special treatment:{" "}
        <code>{`<`}</code>
        and <code>{`&`}</code>. Left angle brackets are used to start tags; ampersands are
        used to denote HTML entities. If you want to use them as literal characters, you
        must escape them as entities, e.g. <code>{`&lt;`}</code>, and
        <code>{`&amp;`}</code>.
      </p>
      <p>
        Ampersands in particular are bedeviling for web writers. If you want to write
        about &#039;AT&amp;T&#039;, you need to write &#039;<code>{`AT&amp;T`}</code>
        &#039;. You even need to escape ampersands within URLs. Thus, if you want to link
        to:
      </p>
      <pre>
        <code>{`http://images.google.com/images?num=30&q=larry+bird`}</code>
      </pre>
      <p>you need to encode the URL as:</p>
      <pre>
        <code>{`http://images.google.com/images?num=30&amp;q=larry+bird`}</code>
      </pre>
      <p>
        in your anchor tag <code>{`href`}</code> attribute. Needless to say, this is easy
        to forget, and is probably the single most common source of HTML validation errors
        in otherwise well-marked-up web sites.
      </p>
      <p>
        Markdown allows you to use these characters naturally, taking care of all the
        necessary escaping for you. If you use an ampersand as part of an HTML entity, it
        remains unchanged; otherwise it will be translated into <code>{`&amp;`}</code>.
      </p>
      <p>So, if you want to include a copyright symbol in your article, you can write:</p>
      <pre>
        <code>{`&copy;`}</code>
      </pre>
      <p>and Markdown will leave it alone. But if you write:</p>
      <pre>
        <code>{`AT&T`}</code>
      </pre>
      <p>Markdown will translate it to:</p>
      <pre>
        <code>{`AT&amp;T`}</code>
      </pre>
      <p>
        Similarly, because Markdown supports <Link to="#html">inline HTML</Link>, if you
        use angle brackets as delimiters for HTML tags, Markdown will treat them as such.
        But if you write:
      </p>
      <pre>
        <code>{`4 < 5`}</code>
      </pre>
      <p>Markdown will translate it to:</p>
      <pre>
        <code>{`4 &lt; 5`}</code>
      </pre>
      <p>
        However, inside Markdown code spans and blocks, angle brackets and ampersands are{" "}
        <em>always</em> encoded automatically. This makes it easy to use Markdown to write
        about HTML code. (As opposed to raw HTML, which is a terrible format for writing
        about HTML syntax, because every single <code>{`<`}</code>
        and <code>{`&`}</code> in your example code needs to be escaped.)
      </p>
      <hr />
      <h2 id="block">Block Elements</h2>
      <h3 id="p">Paragraphs and Line Breaks</h3>
      <p>
        A paragraph is simply one or more consecutive lines of text, separated by one or
        more blank lines. (A blank line is any line that looks like a blank line -- a line
        containing nothing but spaces or tabs is considered blank.) Normal paragraphs
        should not be indented with spaces or tabs.
      </p>
      <p>
        The implication of the "one or more consecutive lines of text" rule is that
        Markdown supports "hard-wrapped" text paragraphs. This differs significantly from
        most other text-to-HTML formatters (including Movable Type&#039;s "Convert Line
        Breaks" option) which translate every line break character in a paragraph into a{" "}
        <code>{`<br />`}</code> tag.
      </p>
      <p>
        When you <em>do</em> want to insert a <code>{`<br />`}</code> break tag using
        Markdown, you end a line with two or more spaces, then type return.
      </p>
      <p>
        Yes, this takes a tad more effort to create a <code>{`<br />`}</code>, but a
        simplistic "every line break is a <code>{`<br />`}</code>" rule wouldn&#039;t work
        for Markdown. Markdown&#039;s email-style [blockquoting][#blockquote] and
        multi-paragraph [list items][#list] work best -- and look better -- when you
        format them with hard breaks.
      </p>
      <h3 id="header">Headers</h3>
      <p>Markdown supports two styles of headers, [Setext] [1] and [atx] [2].</p>
      <p>
        Setext-style headers are "underlined" using equal signs (for first-level headers)
        and dashes (for second-level headers). For example:
      </p>
      <pre>
        <code>{`This is an H1
=============

This is an H2
-------------`}</code>
      </pre>
      <p>
        Any number of underlining <code>{`=`}</code>&#039;s or <code>{`-`}</code>&#039;s
        will work.
      </p>
      <p>
        Atx-style headers use 1-6 hash characters at the start of the line, corresponding
        to header levels 1-6. For example:
      </p>
      <pre>
        <code>{`# This is an H1

## This is an H2

###### This is an H6`}</code>
      </pre>
      <p>
        Optionally, you may "close" atx-style headers. This is purely cosmetic -- you can
        use this if you think it looks better. The closing hashes don&#039;t even need to
        match the number of hashes used to open the header. (The number of opening hashes
        determines the header level.) :
      </p>
      <pre>
        <code>{`# This is an H1 #

## This is an H2 ##

### This is an H3 ######`}</code>
      </pre>
      <h3 id="blockquote">Blockquotes</h3>
      <p>
        Markdown uses email-style <code>{`>`}</code> characters for blockquoting. If
        you&#039;re familiar with quoting passages of text in an email message, then you
        know how to create a blockquote in Markdown. It looks best if you hard wrap the
        text and put a <code>{`>`}</code> before every line:
      </p>
      <pre>
        <code>{`> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
> consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
> Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
>
> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
> id sem consectetuer libero luctus adipiscing.`}</code>
      </pre>
      <p>
        Markdown allows you to be lazy and only put the <code>{`>`}</code> before the
        first line of a hard-wrapped paragraph:
      </p>
      <pre>
        <code>{`> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
id sem consectetuer libero luctus adipiscing.`}</code>
      </pre>
      <p>
        Blockquotes can be nested (i.e. a blockquote-in-a-blockquote) by adding additional
        levels of <code>{`>`}</code>:
      </p>
      <pre>
        <code>{`> This is the first level of quoting.
>
> > This is nested blockquote.
>
> Back to the first level.`}</code>
      </pre>
      <p>
        Blockquotes can contain other Markdown elements, including headers, lists, and
        code blocks:
      </p>
      <pre>
        <code>{`> ## This is a header.
>
> 1.   This is the first list item.
> 2.   This is the second list item.
>
> Here's some example code:
>
>     return shell_exec("echo $input | $markdown_script");`}</code>
      </pre>
      <p>
        Any decent text editor should make email-style quoting easy. For example, with
        BBEdit, you can make a selection and choose Increase Quote Level from the Text
        menu.
      </p>
      <h3 id="list">Lists</h3>
      <p>Markdown supports ordered (numbered) and unordered (bulleted) lists.</p>
      <p>
        Unordered lists use asterisks, pluses, and hyphens -- interchangably -- as list
        markers:
      </p>
      <pre>
        <code>{`*   Red
*   Green
*   Blue`}</code>
      </pre>
      <p>is equivalent to:</p>
      <pre>
        <code>{`+   Red
+   Green
+   Blue`}</code>
      </pre>
      <p>and:</p>
      <pre>
        <code>{`-   Red
-   Green
-   Blue`}</code>
      </pre>
      <p>Ordered lists use numbers followed by periods:</p>
      <pre>
        <code>{`1.  Bird
2.  McHale
3.  Parish`}</code>
      </pre>
      <p>
        It&#039;s important to note that the actual numbers you use to mark the list have
        no effect on the HTML output Markdown produces. The HTML Markdown produces from
        the above list is:
      </p>
      <pre>
        <code>{`<ol>
<li>Bird</li>
<li>McHale</li>
<li>Parish</li>
</ol>`}</code>
      </pre>
      <p>If you instead wrote the list in Markdown like this:</p>
      <pre>
        <code>{`1.  Bird
1.  McHale
1.  Parish`}</code>
      </pre>
      <p>or even:</p>
      <pre>
        <code>{`3. Bird
1. McHale
8. Parish`}</code>
      </pre>
      <p>
        you&#039;d get the exact same HTML output. The point is, if you want to, you can
        use ordinal numbers in your ordered Markdown lists, so that the numbers in your
        source match the numbers in your published HTML. But if you want to be lazy, you
        don&#039;t have to.
      </p>
      <p>
        If you do use lazy list numbering, however, you should still start the list with
        the number 1. At some point in the future, Markdown may support starting ordered
        lists at an arbitrary number.
      </p>
      <p>
        List markers typically start at the left margin, but may be indented by up to
        three spaces. List markers must be followed by one or more spaces or a tab.
      </p>
      <p>To make lists look nice, you can wrap items with hanging indents:</p>
      <pre>
        <code>{`*   Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
    Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi,
    viverra nec, fringilla in, laoreet vitae, risus.
*   Donec sit amet nisl. Aliquam semper ipsum sit amet velit.
    Suspendisse id sem consectetuer libero luctus adipiscing.`}</code>
      </pre>
      <p>But if you want to be lazy, you don&#039;t have to:</p>
      <pre>
        <code>{`*   Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi,
viverra nec, fringilla in, laoreet vitae, risus.
*   Donec sit amet nisl. Aliquam semper ipsum sit amet velit.
Suspendisse id sem consectetuer libero luctus adipiscing.`}</code>
      </pre>
      <p>
        If list items are separated by blank lines, Markdown will wrap the items in{" "}
        <code>{`<p>`}</code> tags in the HTML output. For example, this input:
      </p>
      <pre>
        <code>{`*   Bird
*   Magic`}</code>
      </pre>
      <p>will turn into:</p>
      <pre>
        <code>{`<ul>
<li>Bird</li>
<li>Magic</li>
</ul>`}</code>
      </pre>
      <p>But this:</p>
      <pre>
        <code>{`*   Bird

*   Magic`}</code>
      </pre>
      <p>will turn into:</p>
      <pre>
        <code>{`<ul>
<li><p>Bird</p></li>
<li><p>Magic</p></li>
</ul>`}</code>
      </pre>
      <p>
        List items may consist of multiple paragraphs. Each subsequent paragraph in a list
        item must be indented by either 4 spaces or one tab:
      </p>
      <pre>
        <code>{`1.  This is a list item with two paragraphs. Lorem ipsum dolor
    sit amet, consectetuer adipiscing elit. Aliquam hendrerit
    mi posuere lectus.

    Vestibulum enim wisi, viverra nec, fringilla in, laoreet
    vitae, risus. Donec sit amet nisl. Aliquam semper ipsum
    sit amet velit.

2.  Suspendisse id sem consectetuer libero luctus adipiscing.`}</code>
      </pre>
      <p>
        It looks nice if you indent every line of the subsequent paragraphs, but here
        again, Markdown will allow you to be lazy:
      </p>
      <pre>
        <code>{`*   This is a list item with two paragraphs.

    This is the second paragraph in the list item. You're
only required to indent the first line. Lorem ipsum dolor
sit amet, consectetuer adipiscing elit.

*   Another item in the same list.`}</code>
      </pre>
      <p>
        To put a blockquote within a list item, the blockquote&#039;s <code>{`>`}</code>
        delimiters need to be indented:
      </p>
      <pre>
        <code>{`*   A list item with a blockquote:

    > This is a blockquote
    > inside a list item.`}</code>
      </pre>
      <p>
        To put a code block within a list item, the code block needs to be indented{" "}
        <em>twice</em> -- 8 spaces or two tabs:
      </p>
      <pre>
        <code>{`*   A list item with a code block:

        <code goes here>`}</code>
      </pre>
      <p>
        It&#039;s worth noting that it&#039;s possible to trigger an ordered list by
        accident, by writing something like this:
      </p>
      <pre>
        <code>{`1986. What a great season.`}</code>
      </pre>
      <p>
        In other words, a <em>number-period-space</em> sequence at the beginning of a
        line. To avoid this, you can backslash-escape the period:
      </p>
      <pre>
        <code>{`1986\\. What a great season.`}</code>
      </pre>
      <h3 id="precode">Code Blocks</h3>
      <p>
        Pre-formatted code blocks are used for writing about programming or markup source
        code. Rather than forming normal paragraphs, the lines of a code block are
        interpreted literally. Markdown wraps a code block in both <code>{`<pre>`}</code>{" "}
        and <code>{`<code>`}</code> tags.
      </p>
      <p>
        To produce a code block in Markdown, simply indent every line of the block by at
        least 4 spaces or 1 tab. For example, given this input:
      </p>
      <pre>
        <code>{`This is a normal paragraph:

    This is a code block.`}</code>
      </pre>
      <p>Markdown will generate:</p>
      <pre>
        <code>{`<p>This is a normal paragraph:</p>

<pre><code>This is a code block.
</code></pre>`}</code>
      </pre>
      <p>
        One level of indentation -- 4 spaces or 1 tab -- is removed from each line of the
        code block. For example, this:
      </p>
      <pre>
        <code>{`Here is an example of AppleScript:

    tell application "Foo"
        beep
    end tell`}</code>
      </pre>
      <p>will turn into:</p>
      <pre>
        <code>{`<p>Here is an example of AppleScript:</p>

<pre><code>tell application "Foo"
    beep
end tell
</code></pre>`}</code>
      </pre>
      <p>
        A code block continues until it reaches a line that is not indented (or the end of
        the article).
      </p>
      <p>
        Within a code block, ampersands (<code>{`&`}</code>) and angle brackets (
        <code>{`<`}</code> and <code>{`>`}</code>) are automatically converted into HTML
        entities. This makes it very easy to include example HTML source code using
        Markdown -- just paste it and indent it, and Markdown will handle the hassle of
        encoding the ampersands and angle brackets. For example, this:
      </p>
      <pre>
        <code>{`    <div class="footer">
        &copy; 2004 Foo Corporation
    </div>`}</code>
      </pre>
      <p>will turn into:</p>
      <pre>
        <code>{`<pre><code>&lt;div class="footer"&gt;
    &amp;copy; 2004 Foo Corporation
&lt;/div&gt;
</code></pre>`}</code>
      </pre>
      <p>
        Regular Markdown syntax is not processed within code blocks. E.g., asterisks are
        just literal asterisks within a code block. This means it&#039;s also easy to use
        Markdown to write about Markdown&#039;s own syntax.
      </p>
      <h3 id="hr">Horizontal Rules</h3>
      <p>
        You can produce a horizontal rule tag (<code>{`<hr />`}</code>) by placing three
        or more hyphens, asterisks, or underscores on a line by themselves. If you wish,
        you may use spaces between the hyphens or asterisks. Each of the following lines
        will produce a horizontal rule:
      </p>
      <pre>
        <code>{`* * *

***

*****

- - -

---------------------------------------`}</code>
      </pre>
      <hr />
      <h2 id="span">Span Elements</h2>
      <h3 id="link">Links</h3>
      <p>
        Markdown supports two style of links: <em>inline</em> and <em>reference</em>.
      </p>
      <p>In both styles, the link text is delimited by [square brackets].</p>
      <p>
        To create an inline link, use a set of regular parentheses immediately after the
        link text&#039;s closing square bracket. Inside the parentheses, put the URL where
        you want the link to point, along with an <em>optional</em>
        title for the link, surrounded in quotes. For example:
      </p>
      <pre>
        <code>{`This is [an example](http://example.com/ "Title") inline link.

[This link](http://example.net/) has no title attribute.`}</code>
      </pre>
      <p>Will produce:</p>
      <pre>
        <code>{`<p>This is <a href="http://example.com/" title="Title">
an example</a> inline link.</p>

<p><a href="http://example.net/">This link</a> has no
title attribute.</p>`}</code>
      </pre>
      <p>
        If you&#039;re referring to a local resource on the same server, you can use
        relative paths:
      </p>
      <pre>
        <code>{`See my [About](/about/) page for details.`}</code>
      </pre>
      <p>
        Link definitions can be placed anywhere in your Markdown document. I tend to put
        them immediately after each paragraph in which they&#039;re used, but if you want,
        you can put them all at the end of your document, sort of like footnotes.
      </p>
      <h3 id="em">Emphasis</h3>
      <p>
        Markdown treats asterisks (<code>{`*`}</code>) and underscores (<code>{`_`}</code>
        ) as indicators of emphasis. Text wrapped with one <code>{`*`}</code> or{" "}
        <code>{`_`}</code> will be wrapped with an HTML <code>{`<em>`}</code> tag; double{" "}
        <code>{`*`}</code>&#039;s or <code>{`_`}</code>&#039;s will be wrapped with an
        HTML
        <code>{`<strong>`}</code> tag. E.g., this input:
      </p>
      <pre>
        <code>{`*single asterisks*

_single underscores_

**double asterisks**

__double underscores__`}</code>
      </pre>
      <p>will produce:</p>
      <pre>
        <code>{`<em>single asterisks</em>

<em>single underscores</em>

<strong>double asterisks</strong>

<strong>double underscores</strong>`}</code>
      </pre>
      <p>
        You can use whichever style you prefer; the lone restriction is that the same
        character must be used to open and close an emphasis span.
      </p>
      <p>Emphasis can be used in the middle of a word:</p>
      <pre>
        <code>{`un*frigging*believable`}</code>
      </pre>
      <p>
        But if you surround an <code>{`*`}</code> or <code>{`_`}</code> with spaces,
        it&#039;ll be treated as a literal asterisk or underscore.
      </p>
      <p>
        To produce a literal asterisk or underscore at a position where it would otherwise
        be used as an emphasis delimiter, you can backslash escape it:
      </p>
      <pre>
        <code>{`\\*this text is surrounded by literal asterisks\\*`}</code>
      </pre>
      <h3 id="code">Code</h3>
      <p>
        To indicate a span of code, wrap it with backtick quotes (<code>{`\``}</code>).
        Unlike a pre-formatted code block, a code span indicates code within a normal
        paragraph. For example:
      </p>
      <pre>
        <code>{`Use the \`printf()\` function.`}</code>
      </pre>
      <p>will produce:</p>
      <pre>
        <code>{`<p>Use the <code>printf()</code> function.</p>`}</code>
      </pre>
      <p>
        To include a literal backtick character within a code span, you can use multiple
        backticks as the opening and closing delimiters:
      </p>
      <pre>
        <code>{`\`\`There is a literal backtick (\`) here.\`\``}</code>
      </pre>
      <p>which will produce this:</p>
      <pre>
        <code>{`<p><code>There is a literal backtick (\`) here.</code></p>`}</code>
      </pre>
      <p>
        The backtick delimiters surrounding a code span may include spaces -- one after
        the opening, one before the closing. This allows you to place literal backtick
        characters at the beginning or end of a code span:
      </p>
      <pre>
        <code>{`A single backtick in a code span: \`\` \` \`\`

A backtick-delimited string in a code span: \`\` \`foo\` \`\``}</code>
      </pre>
      <p>will produce:</p>
      <pre>
        <code>{`<p>A single backtick in a code span: <code>\`</code></p>

<p>A backtick-delimited string in a code span: <code>\`foo\`</code></p>`}</code>
      </pre>
      <p>
        With a code span, ampersands and angle brackets are encoded as HTML entities
        automatically, which makes it easy to include example HTML tags. Markdown will
        turn this:
      </p>
      <pre>
        <code>{`Please don't use any \`<blink>\` tags.`}</code>
      </pre>
      <p>into:</p>
      <pre>
        <code>{`<p>Please don't use any <code>&lt;blink&gt;</code> tags.</p>`}</code>
      </pre>
      <p>You can write this:</p>
      <pre>
        <code>{`\`&#8212;\` is the decimal-encoded equivalent of \`&mdash;\`.`}</code>
      </pre>
      <p>to produce:</p>
      <pre>
        <code>{`<p><code>&amp;#8212;</code> is the decimal-encoded
equivalent of <code>&amp;mdash;</code>.</p>`}</code>
      </pre>
      <h3 id="img">Images</h3>
      <p>
        Admittedly, it&#039;s fairly difficult to devise a "natural" syntax for placing
        images into a plain text document format.
      </p>
      <p>
        Markdown uses an image syntax that is intended to resemble the syntax for links.
      </p>
      <p>Image syntax looks like this:</p>
      <pre>
        <code>{`![Alt text](/path/to/img.jpg)

![Alt text](/path/to/img.jpg "Optional title")`}</code>
      </pre>
      <p>That is:</p>
      <ul>
        <li>
          <p>
            An exclamation mark: <code>{`!`}</code>;
          </p>
        </li>
        <li>
          <p>
            followed by a set of square brackets, containing the <code>{`alt`}</code>
            attribute text for the image;
          </p>
        </li>
        <li>
          <p>
            followed by a set of parentheses, containing the URL or path to the image, and
            an optional <code>{`title`}</code> attribute enclosed in double or single
            quotes.
          </p>
        </li>
      </ul>
      <p>
        As of this writing, Markdown has no syntax for specifying the dimensions of an
        image; if this is important to you, you can simply use regular HTML{" "}
        <code>{`<img>`}</code> tags.
      </p>
      <hr />
      <h2 id="misc">Miscellaneous</h2>
      <h3 id="autolink">Automatic Links</h3>
      <p>
        Markdown supports a shortcut style for creating "automatic" links for URLs and
        email addresses: simply surround the URL or email address with angle brackets.
        What this means is that if you want to show the actual text of a URL or email
        address, and also have it be a clickable link, you can do this:
      </p>
      <pre>
        <code>{`<http://example.com/>`}</code>
      </pre>
      <p>Markdown will turn this into:</p>
      <pre>
        <code>{`<a href="http://example.com/">http://example.com/</a>`}</code>
      </pre>
      <h3 id="backslash">Backslash Escapes</h3>
      <p>
        Markdown allows you to use backslash escapes to generate literal characters which
        would otherwise have special meaning in Markdown&#039;s formatting syntax. For
        example, if you wanted to surround a word with literal asterisks (instead of an
        HTML <code>{`<em>`}</code> tag), you can use backslashes before the asterisks,
        like this:
      </p>
      <pre>
        <code>{`\\*literal asterisks\\*`}</code>
      </pre>
      <p>Markdown provides backslash escapes for the following characters:</p>
      <pre>
        <code>{`\\   backslash
\`   backtick
*   asterisk
_   underscore
{}  curly braces
[]  square brackets
()  parentheses
#   hash mark
+   plus sign
-   minus sign (hyphen)
.   dot
!   exclamation mark`}</code>
      </pre>
    </MenuLayout>
  );
};

export default HTMLTest;
