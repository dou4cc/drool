return async (
	source,
	hash_iter,
	new_span = (
		node,
		span = document.createElement("span")
	) => (
		span.append(node),
		span
	),
	new_link = (
		uri,
		nodes,
		link = document.createElement("a")
	) => (
		link.href = uri,
		link.append(...nodes),
		link.addEventListener("click", () => void link.blur()),
		link.addEventListener("mouseleave", () => void link.blur()),
		link.addEventListener("mousemove", () => void link.focus()),
		link
	),
	new_cell = (
		source,
		plain = (
			source,
			match = source.match(/[^\0-\u{ff}]+/u)
		) =>
			match
			? ((
				{index} = match,
				[$] = match
			) => [
				source.slice(0, index),
				new_span($),
				...plain(source.slice(index + $.length)),
			])()
			: [source],
		media = (
			uri,
			link = new_link(uri, plain((() => {
				try{
					const t = decodeURI(uri);
					return /\n|\r|\t/u.test(t) ? uri : t;
				}catch(error){
					return uri;
				}
			})())),
			image = document.createElement("img"),
			video = document.createElement("video"),
			image_off = () => void (
				image.removeEventListener("abort", image_onabort),
				image.removeEventListener("load", image_onload),
				image.removeEventListener("error", image_onerror)
			),
			image_onabort = () => void (
				image.src = "",
				image.src = uri
			),
			image_onload = () => void (
				image_off(),
				link.hidden = true,
				image.hidden = false
			),
			image_onerror = () => void (
				image_off(),
				image.src = "",
				video.addEventListener("abort", video_onabort),
				video.addEventListener("canplay", video_oncanplay),
				video.addEventListener("error", video_onerror),
				video.src = uri
			),
			video_off = () => void (
				video.removeEventListener("abort", video_onabort),
				video.removeEventListener("canplay", video_oncanplay),
				video.removeEventListener("error", video_onerror)
			),
			video_onabort = () => void (
				video.src = "",
				video.src = uri
			),
			video_oncanplay = () => void (
				video_off(),
				link.hidden = true,
				video.hidden = false,
				video.videoWidth || video.videoHeight || video.setAttribute("mini", "")
			),
			video_onerror = () => void (
				video_off(),
				video.src = "",
				requestAnimationFrame(() => setTimeout(start, 2000))
			),
			start = () => void (
				image.addEventListener("abort", image_onabort),
				image.addEventListener("load", image_onload),
				image.addEventListener("error", image_onerror),
				image.src = uri
			)
		) => (
			image.hidden = video.hidden = video.controls = true,
			start(),
			[link, image, video]
		),
		inline_media = (
			uri,
			image = document.createElement("img"),
			video = document.createElement("video"),
			image_off = () => void (
				image.removeEventListener("abort", image_onabort),
				image.removeEventListener("load", image_onload),
				image.removeEventListener("error", image_onerror)
			),
			image_onabort = () => void (
				image.src = "",
				image.src = uri
			),
			image_onload = () => void (
				image_off(),
				image.hidden = false
			),
			image_onerror = () => void (
				image_off(),
				image.src = "",
				video.addEventListener("abort", video_onabort),
				video.addEventListener("canplaythrough", video_oncanplaythrough),
				video.addEventListener("error", video_onerror),
				video.src = uri
			),
			video_off = () => void (
				video.removeEventListener("abort", video_onabort),
				video.removeEventListener("canplaythrough", video_oncanplaythrough),
				video.removeEventListener("error", video_onerror)
			),
			video_onabort = () => void (
				video.src = "",
				video.src = uri
			),
			video_oncanplaythrough = () => void (
				video_off(),
				video.hidden = false,
				video.play()
			),
			video_onerror = () => void (
				video_off(),
				video.src = "",
				requestAnimationFrame(() => setTimeout(start, 2000))
			),
			start = () => void (
				image.addEventListener("abort", image_onabort),
				image.addEventListener("load", image_onload),
				image.addEventListener("error", image_onerror),
				image.src = uri
			)
		) => (
			video.volume = 0,
			image.hidden = video.hidden = video.loop = true,
			start(),
			[image, video]
		),
		$1 = "\\w'():,;.?!+\\-*\\/$%#@&~=",
		$2 = "[" + $1 + "]",
		$3 = "[^" + $1 + "]",
		$4 = "(?:[:,;.?!]|\\.{3})",
		$5 = "\\)*" + $4 + "@*(?=@" + $3 + ")",
		$6 = "\\)+@*(?=@\\)*(?:" + $4 + "?(?:\\s|$))|" + $3 + ")",
		$7 = "(?=\\)*(?:" + $4 + "?(?:\\s|$))|" + $3 + ")",
		$8 = "(?:[a-z0-9\-]+:\\/\\/|\\/\\/|data:|\\.{0,2}\\/)" + $2 + "+?(?:" + $5 + "|" + $6 + "|" + $7 + ")",
		$9 = "(?:(?:[a-z0-9\-]+:\\/\\/|\\/\\/|data:|javascript:|mailto:)" + $2 + "|\\/(?!\\/)|\\.\\.?\\/)" + $2 + "*?(?:" + $5 + "|" + $6 + "|" + $7 + ")",
		$10 = "(?=\\S)(?!" + $8 + ")(.*?(?:@@" + $8 + "@?.*?)+?|.+?)(?:\\s+|(?<=\\)|" + $3 + "))(" + $9 + ")@?",
		f1 = source => plain(source.replace(RegExp("(?<=@@) (?= *" + $8 + ")", "ug"), "")),
		f2 = (
			source,
			match = source.match(RegExp("@@(" + $8 + ")@?", "u"))
		) =>
			match
			? ((
				{index} = match,
				[{length}, $1] = match
			) => [
				...f1(source.slice(0, index)),
				...media($1),
				...f2(source.slice(index + length)),
			])()
			: f1(source),
		f3 = source => f2(source.replace(RegExp("(?<=@@) (?= *" + $10 + ")", "ug"), "")),
		f4 = (
			source,
			match = source.match(RegExp("@@" + $10, "u"))
		) =>
			match
			? ((
				{index} = match,
				[{length}, $1, $2] = match,
				f = (
					source,
					match = source.match(RegExp("@@(" + $8 + ")@?", "u"))
				) =>
					match
					? ((
						{index} = match,
						[{length}, $1] = match
					) => [
						...plain(source.slice(0, index)),
						...inline_media($1),
						...f(source.slice(index + length)),
					])()
					: plain(source)
			) => [
				...f3(source.slice(0, index)),
				new_link($2, f($1)),
				...f4(source.slice(index + length)),
			])()
			: f3(source),
		cell = document.createElement("div")
	) => (
		/^\t?(?:-{3,}(?!-)|—{2,}(?!—))[^ ]/u.test(source)
		? (
			cell.setAttribute("right", ""),
			cell.append(...f4(source.replace(/(?<=^\t?)(?:-{3,}|—{2,})/u, "")))
		)
		: (
			RegExp("^\\t?(?:(?:@@" + $8 + "@?)+|-+|—+)$", "u").test(source) && cell.setAttribute("center", ""),
			cell.append(...f4(source.replace(/(?<=^\t?-{3,}) (?=[^\-])|(?<=^\t?—{2,}) (?=[^—])/u, "")))
		),
		cell.append(new_span("")),
		cell
	),
	new_column = (
		x,
		y,
		f1 = n =>
			matrix[n - 1] && typeof matrix[n - 1][y + 1] === "string"
			? ((
				source = matrix[n - 1][y]
			) => [...(/^\t?$/u.test(source) ? [] : [new_cell(source)]), ...f1(n - 1)])()
			: [],
		f2 = n =>
			matrix[n + 1] && typeof matrix[n + 1][y + 1] === "string"
			? ((
				source = matrix[n + 1][y]
			) => [...(/^\t?$/u.test(source) ? [] : [new_cell(source)]), ...f2(n + 1)])()
			: [],
		column = document.createElement("div")
	) => (
		column.append(...f1(x), ...f2(x), new_cell(matrix[x][y])),
		column
	),
	new_row = async (
		x,
		hash,
		link,
		list = matrix[x],
		{length} = list,
		row = document.createElement("div")
	) => (
		hash_iter && (hash = hash_iter.next()),
		row.append(
			...list.slice(0, -1).map((n, i) => new_column(x, i)),
			new_cell(list[length - 1])
		),
		hash_iter && (
			hash = (await hash).value,
			link = new_link("#" + hash, []),
			link.id = hash,
			row.insertBefore(link, row.firstChild)
		),
		row
	),
	f = n => n >= 0 ? [...f(n - 1), new_row(n)] : [],
	matrix = source.split(/\n|\r\n|\r/ug).map(source => [
		...(source.startsWith("\t") ? [""] : []),
		...source.split(/(?=\t)/ug),
	])
) => await Promise.all(f(matrix.length - 1));
