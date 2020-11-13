const baseUrl = "https://ghibliapi.herokuapp.com/films/";
const filmEndPoin = `${baseUrl}films/${id}/films`;

function getFilmTittle ();
{
    title.innerHTML = "Daftar Film Studio Ghibli"
    fetch(teamEndPoin, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.teams);
            let teams = "";
            resJson.teams.forEach(team => {
                teams += `
                <li class="collection-item avatar">
                    <a href="#modal${film.id}" class="secondary-content waves-effect waves-light modal-trigger"><i class="material-icons">info</i></a>
                </li>

                <div id="modal${film.id}" class="modal">
                    <div class="modal-content">
                    <div class="center">
                    </div>
                    <table class="responsive-table striped centered">
                    <tbody>
                      <tr>
                        <td>Judul Film</td>
                        <td>:</td>
                        <td>${film.name}</td>
                      </tr>
                      <tr>
                        <td>Tanggal Berdiri</td>
                        <td>:</td>
                        <td>${film.release_date}</td>
                      </tr>
                      <tr>
                        <td>Phone</td>
                        <td>:</td>
                        <td>${film.director}</td>
                      </tr>
                    </tbody>
                  </table>
                    </div>
                    <div class="modal-footer">
                    <a href="${team.website}" class="waves-effect waves-green btn-flat">Website</a>
                    <a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>
                    </div>
                </div>
                `;
            });

            contents.innerHTML = '<ul class="collection">' + films + '</ul>';
            const modalbox = document.querySelectorAll('.modal');
            M.Modal.init(modalbox);
        }).catch(err => {
            console.error(err);
        })
    }

function showFilm(id){
    contents.innerHTML="berikut detail dari film dengan id "+id
}

(function (global) {
  'use strict';

  var languages = [];

  global.setupLanguages = setupLanguages;
  global.activateLanguage = activateLanguage;

  function activateLanguage(language) {
    if (!language) return;
    if (language === "") return;

    $(".lang-selector a").removeClass('active');
    $(".lang-selector a[data-language-name='" + language + "']").addClass('active');
    for (var i=0; i < languages.length; i++) {
      $(".highlight." + languages[i]).parent().hide();
    }
    $(".highlight." + language).parent().show();

    global.toc.calculateHeights();

    // scroll to the new location of the position
    if ($(window.location.hash).get(0)) {
      $(window.location.hash).get(0).scrollIntoView(true);
    }
  }
  // parseURL and stringifyURL are from https://github.com/sindresorhus/query-string
  // MIT licensed
  // https://github.com/sindresorhus/query-string/blob/7bee64c16f2da1a326579e96977b9227bf6da9e6/license
  function parseURL(str) {
    if (typeof str !== 'string') {
      return {};
    }

    str = str.trim().replace(/^(\?|#|&)/, '');

    if (!str) {
      return {};
    }

    return str.split('&').reduce(function (ret, param) {
      var parts = param.replace(/\+/g, ' ').split('=');
      var key = parts[0];
      var val = parts[1];

      key = decodeURIComponent(key);
      // missing `=` should be `null`:
      // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
      val = val === undefined ? null : decodeURIComponent(val);

      if (!ret.hasOwnProperty(key)) {
        ret[key] = val;
      } else if (Array.isArray(ret[key])) {
        ret[key].push(val);
      } else {
        ret[key] = [ret[key], val];
      }

      return ret;
    }, {});
  };

  function stringifyURL(obj) {
    return obj ? Object.keys(obj).sort().map(function (key) {
      var val = obj[key];

      if (Array.isArray(val)) {
        return val.sort().map(function (val2) {
          return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
        }).join('&');
      }

      return encodeURIComponent(key) + '=' + encodeURIComponent(val);
    }).join('&') : '';
  };

  // gets the language set in the query string
  function getLanguageFromQueryString() {
    if (location.search.length >= 1) {
      var language = parseURL(location.search).language
      if (language) {
        return language;
      } else if (jQuery.inArray(location.search.substr(1), languages) != -1) {
        return location.search.substr(1);
      }
    }

    return false;
  }

  // returns a new query string with the new language in it
  function generateNewQueryString(language) {
    var url = parseURL(location.search);
    if (url.language) {
      url.language = language;
      return stringifyURL(url);
    }
    return language;
  }

  // if a button is clicked, add the state to the history
  function pushURL(language) {
    if (!history) { return; }
    var hash = window.location.hash;
    if (hash) {
      hash = hash.replace(/^#+/, '');
    }
    history.pushState({}, '', '?' + generateNewQueryString(language) + '#' + hash);

    // save language as next default
    localStorage.setItem("language", language);
  }

  function setupLanguages(l) {
    var defaultLanguage = localStorage.getItem("language");

    languages = l;

    var presetLanguage = getLanguageFromQueryString();
    if (presetLanguage) {
      // the language is in the URL, so use that language!
      activateLanguage(presetLanguage);

      localStorage.setItem("language", presetLanguage);
    } else if ((defaultLanguage !== null) && (jQuery.inArray(defaultLanguage, languages) != -1)) {
      // the language was the last selected one saved in localstorage, so use that language!
      activateLanguage(defaultLanguage);
    } else {
      // no language selected, so use the default
      activateLanguage(languages[0]);
    }
  }

  // if we click on a language tab, activate that language
  $(function() {
    $(".lang-selector a").on("click", function() {
      var language = $(this).data("language-name");
      pushURL(language);
      activateLanguage(language);
      return false;
    });
    window.onpopstate = function() {
      activateLanguage(getLanguageFromQueryString());
    };
  });
})(window);


/**
 * TOC
 */
(function (global) {
  'use strict';

  var closeToc = function() {
    $(".tocify-wrapper").removeClass('open');
    $("#nav-button").removeClass('open');
  };

  var makeToc = function() {
    global.toc = $("#toc").tocify({
      selectors: 'h1, h2 , h3 , h4 , h5 , h6 ',
      extendPage: false,
      theme: 'none',
      smoothScroll: false,
      showEffectSpeed: 0,
      hideEffectSpeed: 180,
      ignoreSelector: '.toc-ignore',
      highlightOffset: 60,
      scrollTo: -1,
      scrollHistory: true,
      hashGenerator: function (text, element) {
        return element.prop('id');
      }
    }).data('toc-tocify');

    $("#nav-button").click(function() {
      $(".tocify-wrapper").toggleClass('open');
      $("#nav-button").toggleClass('open');
      return false;
    });

    $(".page-wrapper").click(closeToc);
    $(".tocify-item").click(closeToc);
  };

  // Hack to make already open sections to start opened,
  // instead of displaying an ugly animation
  function animate() {
    setTimeout(function() {
      toc.setOption('showEffectSpeed', 180);
    }, 50);
  }

  $(function() {
    makeToc();
    animate();
    $('.content').imagesLoaded( function() {
      global.toc.calculateHeights();
    });
  });
})(window);

/**
 * Search
 */
(function () {
  'use strict';

  var content, searchResults;
  var highlightOpts = { element: 'span', className: 'search-highlight' };

  var index = new lunr.Index();

  index.ref('id');
  index.field('title', { boost: 10 });
  index.field('body');
  index.pipeline.add(lunr.trimmer, lunr.stopWordFilter);

  $(populate);
  $(bind);

  function populate() {
    $('h1, h2 , h3 , h4 , h5 , h6 ').each(function() {
      var title = $(this);
      var body = title.nextUntil('h1, h2 , h3 , h4 , h5 , h6');
      index.add({
        id: title.prop('id'),
        title: title.text(),
        body: body.text()
      });
    });
  }

  function bind() {
    content = $('.content');
    searchResults = $('.search-results');   

    $('#input-search').on('keyup', search);
  }

  function search(event) {
    unhighlight();
    searchResults.addClass('visible');

    // ESC clears the field
    if (event.keyCode === 27) this.value = '';

    if (this.value) {
      var results = index.search(this.value).filter(function(r) {
        return r.score > 0.0001;
      });

      if (results.length) {
        searchResults.empty();
        $.each(results, function (index, result) {
          var elem = document.getElementById(result.ref);
          searchResults.append("<li><a href='#" + result.ref + "'>" + $(elem).text() + "</a></li>");
        });
        highlight.call(this);
      } else {
        searchResults.html('<li></li>');
        $('.search-results li').text('No Results Found for "' + this.value + '"');
      }
    } else {
      unhighlight();
      searchResults.removeClass('visible');
    }
  }
function loadPage(page) {
    switch (page) {
        case "tittle":
            getListTeams();
            break;
        case "release_date":
            getListStandings();
            break;
        case "director":
            getListMatches();
            break;
    }
}
  function highlight() {
    if (this.value) content.highlight(this.value, highlightOpts);
  }

  function unhighlight() {
    content.unhighlight(highlightOpts);
  }
})();
