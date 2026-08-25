(function () {
  "use strict";

  var activeTrigger = null;
  var modal = null;
  var modalCode = null;
  var modalStatus = null;
  var modalCopy = null;
  var citations = {};

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

  function loadCitations() {
    var dataElement = document.getElementById("publication-bibtex-data");
    if (!dataElement) {
      return false;
    }

    try {
      citations = JSON.parse(dataElement.textContent);
      return true;
    } catch (error) {
      return false;
    }
  }

  function initializePublications() {
    if (!loadCitations()) {
      return;
    }

    Array.prototype.forEach.call(
      document.querySelectorAll("[data-bibtex-trigger][data-bibtex-key]"),
      function (trigger) {
        var key = trigger.getAttribute("data-bibtex-key");
        var bibtex = citations[key];

        if (!bibtex) {
          trigger.disabled = true;
          trigger.title = "BibTeX data unavailable";
          return;
        }

        trigger.setAttribute("aria-haspopup", "dialog");
        trigger.addEventListener("click", function () {
          openModal(trigger, bibtex);
        });
      }
    );

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
