# drool

- Since it is said that the source of a markdown is as readable as visual documents, why do we compile `*something*` to *something*? Based on this consideration, I designed *drool*. You cannot make something bold or italic with it (because sources like `*something*` is readable enough), which is why *drool* is different from markdown. You can retract (The restract of drool can be used as table. I made a table in `./demo.en.drool`. When viewing a *drool* file which contains a table with a common text editor, I recommand you **set tab-size to at least 31ch**.) and right align something to express the structure of a document and can still insert media elements and links.
- Compared with markdown, *drool* is minimal without signals like `[` or `!`. *drool* will not make a literary article look like programming codes.
- You can use links like `https://example.org/).html` in *drool* but cannot in markdown.

For details, please visit [a demo](https://dou4cc.github.io/drool/demo.html?./demo.en.drool) **which requires your browser supporting `Element.prototype.append`, async (generator) functions, WebP, WebM, fetch API, CSS Variables, CSS sticky position, and full of ECMAScript 6**. I recommend you use [Chromium](https://download-chromium.appspot.com) or [Chrome Canary](https://www.google.com/chrome/browser/canary.html) with two flags enabled before 2017:
- *chrome://flags/#enable-javascript-harmony*
- *chrome://flags/#enable-experimental-web-platform-features*

I am sorry that I used a few unstable features even [Babel](https://babeljs.io) does not support which. If you are unable to open the demo, please refer to [the screenshot](https://dou4cc.github.io/drool/screenshot.en.png).

There is a UTF-8 BOM in the head of every text file of this repository and I use `\r\n` to break lines. (You need not add a BOM to your *drool* file.)

————————

- 既然markdown自称源码的可读性堪比可视化编辑，为什么我们还要把`*something*`编译成*something*？*drool*没有加粗、斜体之类的功能（`*something*`的可读性就很好了，不是吗？），但可用缩进（*drool*的缩进可用作表格，比如`./demo.han.drool`就包含一个表格，使用普通文本编辑器打开时为了不使表格混乱，应**调宽tab-size，例如调成12ch**）和右对齐表达文档结构，图片（音视频）、链接仍可插入。
- 相比markdown，*drool*是极简的，不使用`[`、`!`之类的标识。*drool*不会像markdown那样让一篇文学文章看上去布满代码。
- markdown要求链接和图片的URL要么不含括号，要么成对出现，而*drool*不要求，毕竟不成对出现括号的URL也是合法的。
- *drool*对中文友好，中文标点不会使用英文字体。

详见[demo](https://dou4cc.github.io/drool/demo.html?./demo.han.drool)。**你的浏览器得支持`Element.prototype.append`、async (generator) functions、WebP、WebM、fetch API、CSS变量、CSS sticky position和完整的ECMAScript 6**，我推荐使用启用了如下实验选项的[Chromium](https://download-chromium.appspot.com)或[Chrome Canary](https://www.google.com/chrome/browser/canary.html)：
- *chrome://flags/#enable-javascript-harmony*
- *chrome://flags/#enable-experimental-web-platform-features*

抱歉使用了一些草案级别的、连[Babel](https://babeljs.io)都不支持的特性，如果你打不开demo，请参考[其英语版的截图](https://dou4cc.github.io/drool/screenshot.en.png)。

因为使用了Windows和微软的编辑器，本仓库的每个文本文件头都有UTF-8的BOM，使用`\r\n`换行。

## License
MIT
