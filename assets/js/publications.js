(function () {
  "use strict";

  var SECTION_TYPES = {
    "conference papers": "inproceedings",
    "journal papers": "article",
    "books": "book"
  };

  var keyCounts = {};
  var activeTrigger = null;
  var modal = null;
  var modalCode = null;
  var modalStatus = null;
  var modalCopy = null;

  function normalizeSpace(value) {
    return (value || "").replace(/\s+/g, " ").trim();
  }

  function stripEdgePunctuation(value) {
    return normalizeSpace(value)
      .replace(/^[\s.,;:，。]+/, "")
      .replace(/[\s.]+$/, "");
  }

  function escapeBibTeX(value) {
    return String(value || "")
      .replace(/\\/g, "\\textbackslash{}")
      .replace(/([&%#$])/g, "\\$1")
      .replace(/~/g, "\\textasciitilde{}")
      .replace(/\^/g, "\\textasciicircum{}");
  }

  function textBefore(element, descendant) {
    var range = document.createRange();
    range.selectNodeContents(element);
    range.setEndBefore(descendant);
    return range.toString();
  }

  function textAfterUntil(element, descendant, endNode) {
    var range = document.createRange();
    range.setStartAfter(descendant);
    if (endNode) {
      range.setEndBefore(endNode);
    } else {
      range.setEnd(element, element.childNodes.length);
    }
    return range.toString();
  }

  function getTitleNode(item) {
    var candidates = Array.prototype.slice.call(
      item.querySelectorAll("strong > em, em > strong")
    );

    return candidates.sort(function (left, right) {
      return normalizeSpace(right.textContent).length -
        normalizeSpace(left.textContent).length;
    })[0] || null;
  }

  function getItemContentContainer(item, node) {
    var container = node;
    while (container.parentElement && container.parentElement !== item) {
      container = container.parentElement;
    }

    return container.tagName === "P" ? container : item;
  }

  function parseAuthors(value, venueLabel) {
    var authors = normalizeSpace(value);
    if (venueLabel) {
      authors = authors.replace(venueLabel, "");
    }

    authors = authors
      .replace(/^[\s.,;:，。]+/, "")
      .replace(/[\s.,;:，。]+$/, "")
      .replace(/\s+(?:and|&)\s+/gi, ", ");

    return authors
      .split(/[,，]/)
      .map(function (author) { return normalizeSpace(author); })
      .filter(Boolean)
      .join(" and ");
  }

  function getYear(citationText, fallbackYear) {
    var years = citationText.match(/\b(?:19|20)\d{2}\b/g);
    return years && years.length ? years[0] : fallbackYear;
  }

  function getUrl(item) {
    var links = Array.prototype.slice.call(item.querySelectorAll("a[href]"));
    var publicationLink = links.find(function (link) {
      return /paper|book/i.test(normalizeSpace(link.textContent));
    });

    if (!publicationLink) {
      return "";
    }

    var href = publicationLink.getAttribute("href");
    return href && href !== "#" ? publicationLink.href : "";
  }

  function getDoi(url) {
    var decodedUrl;
    try {
      decodedUrl = decodeURIComponent(url);
    } catch (error) {
      decodedUrl = url;
    }

    var match = decodedUrl.match(/10\.\d{4,9}\/[^?#\s]+/i);
    return match ? match[0].replace(/\/$/, "") : "";
  }

  function getJournalFields(citationText, year) {
    var text = stripEdgePunctuation(citationText);
    var fields = {};
    var journal = text.split(/[,，]/)[0] || "";
    var compactMatch;
    var volumeMatch;

    if (year) {
      journal = journal.replace(new RegExp("\\b" + year + "\\b.*$"), "");
    }

    compactMatch = journal.match(/^(.+?)\s+(\d+)(?:\(([^)]+)\))?$/);
    if (compactMatch) {
      journal = compactMatch[1];
      fields.volume = compactMatch[2];
      if (compactMatch[3]) {
        fields.number = compactMatch[3];
      }

      volumeMatch = text.match(/[,，]\s*(\d+\s*-\s*\d+)\s*$/);
      if (volumeMatch) {
        fields.pages = volumeMatch[1].replace(/\s*-\s*/g, "--");
      }
    }

    fields.journal = stripEdgePunctuation(journal);

    volumeMatch = text.match(
      /(?:^|[,，]\s*)(\d+)(?:\(([^)]+)\))?\s*:\s*([A-Za-z0-9-]+)/
    );
    if (volumeMatch) {
      fields.volume = volumeMatch[1];
      if (volumeMatch[2]) {
        fields.number = volumeMatch[2];
      }
      fields.pages = volumeMatch[3].replace(/-/g, "--");
    } else {
      volumeMatch = text.match(
        /(?:^|[,，]\s*)(\d+)(?:\(([^)]+)\))?[,，]\s*(\d+\s*-\s*\d+)/
      );
      if (volumeMatch) {
        fields.volume = volumeMatch[1];
        if (volumeMatch[2]) {
          fields.number = volumeMatch[2];
        }
        fields.pages = volumeMatch[3].replace(/\s*-\s*/g, "--");
      }
    }

    return fields;
  }

  function getConferenceFields(citationText, year, venueLabel) {
    var text = stripEdgePunctuation(citationText)
      .replace(/^In\s+/i, "")
      .replace(new RegExp("[,，]?\\s*" + year + "\\s*[,，.]?\\s*"), ", ")
      .replace(/[,，]\s*$/, "");
    var fields = {};
    var pagesMatch = text.match(/[,，]\s*(\d+\s*(?:--|-)\s*\d+)\s*$/);

    if (pagesMatch) {
      fields.pages = pagesMatch[1].replace(/\s*(?:--|-)\s*/g, "--");
      text = text.slice(0, pagesMatch.index);
    }

    fields.booktitle = stripEdgePunctuation(text)
      .replace(/[,，]\s*(?=\()/g, " ") || venueLabel;
    return fields;
  }

  function makeCitationKey(authors, year, title, type) {
    var firstAuthor = authors.split(" and ")[0] || "";
    var authorParts = firstAuthor.match(/[A-Za-z0-9]+/g) || [];
    var authorKey = authorParts.length ?
      authorParts[authorParts.length - 1] :
      (type === "book" ? "Book" : "Publication");
    var stopWords = /^(a|an|and|for|from|of|on|the|to|towards|via|with)$/i;
    var titleWords = title.match(/[A-Za-z0-9]+/g) || [];
    var titleKey = titleWords.find(function (word) {
      return /[A-Za-z]/.test(word) && !stopWords.test(word);
    }) || (type === "book" ? "Book" : "Work");
    var baseKey = authorKey + year + titleKey;

    keyCounts[baseKey] = (keyCounts[baseKey] || 0) + 1;
    return baseKey + (keyCounts[baseKey] > 1 ? keyCounts[baseKey] : "");
  }

  function addField(lines, name, value, isTitle) {
    if (!value) {
      return;
    }

    var escaped = escapeBibTeX(value);
    lines.push(
      "  " + name + " = {" + (isTitle ? "{" + escaped + "}" : escaped) + "}"
    );
  }

  function buildBibTeX(item, type, fallbackYear) {
    var titleNode = getTitleNode(item);
    if (!titleNode) {
      return "";
    }

    var titleWrapper = titleNode.parentElement;
    var itemContentWrapper = getItemContentContainer(item, titleWrapper);
    var venueNode = item.querySelector("code");
    var venueLabel = venueNode ? normalizeSpace(venueNode.textContent) : "";
    var resourceLink = Array.prototype.slice.call(item.querySelectorAll("a")).find(
      function (link) {
        return /paper|book/i.test(normalizeSpace(link.textContent));
      }
    );
    var authorsText = textBefore(item, titleWrapper);
    var citationText = textAfterUntil(
      itemContentWrapper,
      titleWrapper,
      resourceLink && itemContentWrapper.contains(resourceLink) ? resourceLink : null
    );
    var authors = parseAuthors(authorsText, venueLabel);
    var title = normalizeSpace(titleNode.textContent);
    var year = getYear(citationText, fallbackYear);
    var url = getUrl(item);
    var doi = getDoi(url);
    var typeFields = type === "inproceedings" ?
      getConferenceFields(citationText, year, venueLabel) :
      type === "article" ?
        getJournalFields(citationText, year) :
        { publisher: stripEdgePunctuation(citationText).replace(
          new RegExp("[,，]?\\s*" + year + "\\s*$"),
          ""
        ) };
    var key = makeCitationKey(authors, year, title, type);
    var lines = ["@" + type + "{" + key + ","];

    addField(lines, "author", authors);
    addField(lines, "title", title, true);
    addField(lines, "booktitle", typeFields.booktitle);
    addField(lines, "journal", typeFields.journal);
    addField(lines, "publisher", typeFields.publisher);
    addField(lines, "year", year);
    addField(lines, "volume", typeFields.volume);
    addField(lines, "number", typeFields.number);
    addField(lines, "pages", typeFields.pages);
    addField(lines, "doi", doi);
    addField(lines, "url", url);

    return lines.map(function (line, index) {
      return index > 0 && index < lines.length - 1 ? line + "," : line;
    }).join("\n") + "\n}";
  }

  function createModal() {
    var container = document.createElement("div");
    container.className = "bibtex-modal";
    container.hidden = true;
    container.innerHTML =
      '<div class="bibtex-backdrop" data-bibtex-close></div>' +
      '<section class="bibtex-panel" role="dialog" aria-modal="true" ' +
        'aria-labelledby="bibtex-modal-title">' +
        '<div class="bibtex-panel__header">' +
          '<h2 class="bibtex-panel__title" id="bibtex-modal-title">BibTeX citation</h2>' +
          '<button class="bibtex-close" type="button" data-bibtex-close ' +
            'aria-label="Close BibTeX citation">&times;</button>' +
        '</div>' +
        '<pre class="bibtex-code" tabindex="0"><code></code></pre>' +
        '<div class="bibtex-actions">' +
          '<button class="bibtex-copy" type="button">Copy BibTeX</button>' +
          '<span class="bibtex-status" role="status" aria-live="polite"></span>' +
        '</div>' +
      '</section>';

    document.body.appendChild(container);
    modal = container;
    modalCode = container.querySelector(".bibtex-code code");
    modalStatus = container.querySelector(".bibtex-status");
    modalCopy = container.querySelector(".bibtex-copy");

    container.addEventListener("click", function (event) {
      if (event.target.hasAttribute("data-bibtex-close")) {
        closeModal();
      }
    });

    container.addEventListener("keydown", function (event) {
      var focusable;
      var first;
      var last;

      if (event.key !== "Tab") {
        return;
      }

      focusable = container.querySelectorAll("button, [tabindex='0']");
      first = focusable[0];
      last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    modalCopy.addEventListener("click", copyCurrentCitation);
  }

  function openModal(trigger, bibtex) {
    if (!modal) {
      createModal();
    }

    activeTrigger = trigger;
    modalCode.textContent = bibtex;
    modalStatus.textContent = "";
    modal.hidden = false;
    document.body.classList.add("bibtex-modal-open");
    modalCopy.focus();
  }

  function closeModal() {
    if (!modal || modal.hidden) {
      return;
    }

    modal.hidden = true;
    document.body.classList.remove("bibtex-modal-open");
    if (activeTrigger) {
      activeTrigger.focus();
    }
    activeTrigger = null;
  }

  function fallbackCopy(value) {
    var textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    var copied = document.execCommand("copy");
    document.body.removeChild(textarea);
    return copied;
  }

  function copyCurrentCitation() {
    var citation = modalCode.textContent;
    var copyPromise;

    if (navigator.clipboard && window.isSecureContext) {
      copyPromise = navigator.clipboard.writeText(citation);
    } else {
      copyPromise = Promise.resolve(fallbackCopy(citation));
    }

    copyPromise.then(function (copied) {
      if (copied === false) {
        throw new Error("Copy command failed");
      }
      modalStatus.textContent = "Copied!";
    }).catch(function () {
      modalStatus.textContent = "Copy failed. Select the citation above to copy it.";
    });
  }

  function decorateSection(sectionHeading, type, year) {
    var sibling = sectionHeading.nextElementSibling;

    while (sibling && sibling.tagName !== "H3") {
      if (sibling.tagName === "UL" || sibling.tagName === "OL") {
        Array.prototype.forEach.call(sibling.children, function (item) {
          if (item.tagName !== "LI" || item.hasAttribute("data-bibtex-ready")) {
            return;
          }

          var bibtex = buildBibTeX(item, type, year);
          if (!bibtex) {
            return;
          }

          var trigger = item.querySelector("[data-bibtex-trigger]");
          var titleNode = getTitleNode(item);

          if (!trigger) {
            trigger = document.createElement("button");
            trigger.type = "button";
            trigger.className = "bibtex-trigger";
            trigger.textContent = "BibTeX";

            var contentContainer = titleNode ?
              getItemContentContainer(item, titleNode) :
              item;
            contentContainer.appendChild(document.createTextNode(" "));
            contentContainer.appendChild(trigger);
          }

          trigger.setAttribute("aria-haspopup", "dialog");
          trigger.setAttribute(
            "aria-label",
            "Show BibTeX citation" +
              (titleNode ? " for " + normalizeSpace(titleNode.textContent) : "")
          );
          trigger.addEventListener("click", function () {
            openModal(trigger, bibtex);
          });

          item.setAttribute("data-bibtex-ready", "true");
        });
      }

      sibling = sibling.nextElementSibling;
    }
  }

  function decoratePublicationDetails(details) {
    var summary = details.querySelector("summary");
    var yearMatch = summary && summary.textContent.match(/\b(?:19|20)\d{2}\b/);
    var fallbackYear = yearMatch ? yearMatch[0] : "";

    Array.prototype.forEach.call(details.querySelectorAll("h3"), function (heading) {
      var type = SECTION_TYPES[normalizeSpace(heading.textContent).toLowerCase()];
      if (type) {
        decorateSection(heading, type, fallbackYear);
      }
    });
  }

  function initializePublications() {
    var anchor = document.getElementById("-publications");
    var contentRoot;
    var topLevelAnchor;
    var sibling;

    if (!anchor) {
      return;
    }

    contentRoot = anchor.parentElement;
    while (
      contentRoot &&
      !contentRoot.classList.contains("page__content")
    ) {
      contentRoot = contentRoot.parentElement;
    }

    topLevelAnchor = anchor;
    while (
      contentRoot &&
      topLevelAnchor.parentElement &&
      topLevelAnchor.parentElement !== contentRoot
    ) {
      topLevelAnchor = topLevelAnchor.parentElement;
    }

    sibling = topLevelAnchor.nextElementSibling;
    while (sibling && sibling.tagName !== "H1") {
      if (sibling.tagName === "DETAILS") {
        decoratePublicationDetails(sibling);
      }
      sibling = sibling.nextElementSibling;
    }

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeModal();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializePublications);
  } else {
    initializePublications();
  }
})();
