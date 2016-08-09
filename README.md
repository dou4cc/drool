# drool

Since it is said that the source of a markdown is as readable as visual documents, why do we compile `*something*` to *something*? Based on this consideration, I designed *drool*. You cannot make something bold or italic with it (because sources like `*something*` is readable enough), which is why drool is different from markdown. You can retract (the restract of drool can be used as table) and align right something to express the structure of a document and can still insert media elements and links. Compared with markdown, drool is minimal without signals like `[` or `!`. Drool will not make a literary article look like programming codes.

For details, please visit [a demo](https://dou4cc.github.io/drool/demo.html?./demo.en.drool) **which requires your browser supporting `Element.prototype.append`, async functions, WebP, WebM, fetch API, CSS Variables, CSS sticky position, and full of ECMAScript 6**. I recommend you use Chromium or Chrome Canary with two flags, chrome://flags/#enable-javascript-harmony & chrome://flags/#enable-experimental-web-platform-features, on. I am sorry that I used a few unstable features. If you are unable to open the demo, please refer to [the screenshot](https://dou4cc.github.io/drool/screenshot.en.png).

There is a UTF-8 BOM in the head of every text file and I use `\r\n` to break lines.

————————

既然markdown自称源码的可读性堪比可视化编辑，为什么我们还要把`*something*`编译成*something*？于是，我设计了*drool*。它没有加粗、斜体之类的功能（`*something*`的可读性就很好了，不是吗？），但可用缩进（drool的缩进可用作表格）和右对齐表达文档结构，图片（音视频）、链接仍可插入。相比markdown，drool是极简的，不使用`[`、`!`之类的标识。markdown要求链接和图片的URL要么不含括号，要么成对出现，而drool不要求，毕竟不成对出现括号的URL也是合法的。drool不会像markdown那样让一篇文学文章看上去布满代码。drool是中文友好的，中文标点不会使用英文字体。

详见[demo](https://dou4cc.github.io/drool/demo.html?./demo.han.drool)。**你的浏览器得支持`Element.prototype.append`、async functions、WebP、WebM、fetch API、CSS变量、CSS sticky position和完整的ECMAScript 6**，我推荐使用开启了实验选项chrome://flags/#enable-javascript-harmony和chrome://flags/#enable-experimental-web-platform-features的Chromium或Chrome Canary。抱歉使用了一些草案级别的特性，如果你打不开demo，请参考[英语版demo的截图](https://dou4cc.github.io/drool/screenshot.en.png)。

因为使用了Windows和微软的编辑器，本仓库的每个文本文件头都有UTF-8的BOM，使用`\r\n`换行。

## License
MIT
