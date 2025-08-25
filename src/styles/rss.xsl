<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8"/>
  <xsl:template match="/rss">
    <html lang="zh-CN">
      <head>
        <meta charset="UTF-8"/>
        <title>RSS Feed - <xsl:value-of select="channel/title"/></title>
        <link rel="stylesheet" href="%CSS_URL%"/>
        <noscript>
          <style>
          %NOSCRIPT_STYLE%
          </style>
        </noscript>
        <style>
          .post-title::before {
            content: "";
            position: absolute;
            bottom: -5px;
            left: 51%;
            right: 51%;
            height: 1px;
            background-color: var(--text-color);
            transition-property: left,right;
            transition-timing-function: cubic-bezier(0,0,.2,1);
          }
          @media (prefers-reduced-motion: no-preference) {
            .post-title::before {
              transition-duration: .2s;
            }
          }
          .post-title:hover::before {
            left: 0;
            right: 0;
          }
        </style>
        <script defer="" data-domain="ouuan.moe" src="https://plausible.ouuan.moe/js/script.js"></script>
      </head>

      <body>
        <header class="bg-card shadow print:hidden">
          <div class="flex flex-wrap justify-center whitespace-nowrap px-4 page-container sm:flex-nowrap">
            <div class="flex basis-full items-stretch justify-center sm:mr-3 sm:basis-auto">
              <a class="flex items-center p-3 text-xl font-serif bghover" href="/">ouuan's blog</a>
            </div>
            <nav class="flex">
              <ul class="flex">
                <li class="flex flex-1 items-stretch justify-center"><a class="flex items-center p-3 bghover" href="/"><span>首页</span></a></li>
                <li class="flex flex-1 items-stretch justify-center"><a class="flex items-center p-3 bghover" href="/posts"><span>文章</span></a></li>
                <li class="flex flex-1 items-stretch justify-center"><a class="flex items-center p-3 bghover" href="/tags"><span>标签</span></a></li>
                <li class="flex flex-1 items-stretch justify-center"><a class="flex items-center p-3 bghover" href="/about"><span>关于</span></a></li>
              </ul>
            </nav>
            <div class="sm:basis-full"></div>
            <ul class="flex">
              <li class="flex justify-center items-stretch w-10">
                <a class="flex items-center p-2 bghover" href="/search" title="搜索">
                  <span class="i-mdi-magnify text-xl"></span>
                </a>
              </li>
              <li class="flex justify-center items-stretch w-10">
                <a class="flex items-center p-2 bghover" href="/feed.xml" title="RSS 订阅">
                  <span class="i-mdi-rss text-xl"></span>
                </a>
              </li>
              <li class="flex justify-center items-stretch w-10">
                <a class="flex items-center p-2 bghover" href="https://taxodium.ink/about-feeds.html" title="About Feeds">
                  <span class="i-mdi-information-variant-circle text-xl"></span>
                </a>
              </li>
              <li class="flex justify-center items-stretch w-10">
                <a class="flex items-center p-2 bghover" href="https://app.folo.is/share/feeds/58094016632728586" title="Folo 订阅">
                  <span class="i-simple-icons-folo"></span>
                </a>
              </li>
              <li class="flex justify-center items-stretch w-10">
                <a class="flex items-center p-2 bghover" href="https://feedly.com/i/subscription/feed%2Fhttps%3A%2F%2Fouuan.moe%2Ffeed.xml" title="Feedly 订阅">
                  <span class="i-simple-icons-feedly text-lg"></span>
                </a>
              </li>
              <li class="flex justify-center items-stretch w-10">
                <a class="flex items-center p-2 bghover" href="https://www.inoreader.com/feed/https%3A%2F%2Fouuan.moe%2Ffeed.xml" title="Inoreader 订阅">
                  <span class="i-simple-icons-inoreader"></span>
                </a>
              </li>
            </ul>
          </div>
        </header>

        <main class="min-h-100vh py-6 page-container">
          <div class="mx-4 flex flex-col gap-6">
            <h1 class="text-6">
              RSS Feed - <xsl:value-of select="channel/title"/>
            </h1>
            <div class="standard-card 2xl:px-30 3xl:px-36 xl:px-24 b-l-6 b-rss">
              <div class="flex gap-2 my-3" style="margin-left: -6px;">
                <a class="flex items-center" href="">
                  <span class="text-6 i-mdi-rss text-rss"></span>
                </a>
                <span>这是本博客的 RSS Feed（使用了自定义 XSLT 样式），你可以使用 RSS 阅读器订阅本博客的更新。</span>
              </div>
            </div>
            <xsl:for-each select="channel/item">
              <div class="standard-card 2xl:px-30 3xl:px-36 xl:px-24">
                <article>
                  <header>
                    <h2 class="mb-3 mt-6 text-center text-balance text-8">
                      <a class="inline-block font-serif break-anywhere relative post-title" href="{link}">
                        <xsl:value-of select="title"/>
                      </a>
                    </h2>
                    <div class="flex flex-wrap justify-center gap-x-4 gap-y-1 text-footer md:text-sm">
                      <span class="flex items-center">
                        <span class="i-mdi-clock-check-outline mr-1"></span>
                        <xsl:call-template name="format-date">
                          <xsl:with-param name="rfc822Date" select="pubDate"/>
                        </xsl:call-template>
                      </span>
                      <xsl:if test="category">
                        <span class="flex flex-wrap justify-center gap-x-2 gap-y-1">
                          <xsl:for-each select="category">
                            <span class="flex items-center">
                              <span class="i-mdi-tag-outline mr-1" />
                              <a class="hover:underline" href="/tag/{translate(., ' ', '%20')}/feed.xml">
                                <span><xsl:value-of select="."/></span>
                              </a>
                            </span>
                          </xsl:for-each>
                        </span>
                      </xsl:if>
                    </div>
                  </header>
                  <section class="article-style my-6" data-content="{description}">
                    <noscript>
                      <xsl:value-of select="description" disable-output-escaping="yes"/>
                    </noscript>
                  </section>
                  <div class="my-3 flex justify-center">
                    <a class="btn pl-2 pr-1 btn-normal" href="{link}">
                      <span>阅读更多</span>
                      <span class="i-mdi-chevron-double-right"></span>
                    </a>
                  </div>
                </article>
              </div>
            </xsl:for-each>
          </div>
        </main>
        <script>
        const themeConfig = localStorage.getItem('vueuse-color-scheme');
        let theme;
        switch (themeConfig) {
          case 'dark':
            theme = 'dark';
            break;
          case 'light':
            theme = 'light';
            break;
          default:
            if (window.matchMedia?.('(prefers-color-scheme: dark)')?.matches) {
              theme = 'dark';
            } else {
              theme = 'light';
            }
            break;
        }
        document.documentElement.classList.add(theme);
        // workaround for disable-output-escaping not working on Firefox
        document.querySelectorAll('section[data-content]').forEach((el) => {
          el.innerHTML = el.getAttribute('data-content');
        });
        </script>
      </body>
    </html>
  </xsl:template>
  <xsl:template name="format-date">
    <xsl:param name="rfc822Date"/>
    <xsl:variable name="day" select="substring($rfc822Date, 6, 2)"/>
    <xsl:variable name="monthAbbr" select="substring($rfc822Date, 9, 3)"/>
    <xsl:variable name="year" select="substring($rfc822Date, 13, 4)"/>
    <xsl:variable name="time" select="substring($rfc822Date, 18, 8)"/>
    <xsl:variable name="timezoneOffset" select="substring($rfc822Date, 27, 5)"/>
    <xsl:variable name="monthLookup" select="'Jan01Feb02Mar03Apr04May05Jun06Jul07Aug08Sep09Oct10Nov11Dec12'"/>
    <xsl:variable name="monthNum" select="substring($monthLookup, string-length(substring-before($monthLookup, $monthAbbr)) + 4, 2)"/>
    <xsl:variable name="formattedDate" select="concat($year, '-', $monthNum, '-', $day)"/>
    <xsl:variable name="isoTimezone">
      <xsl:choose>
        <xsl:when test="$timezoneOffset = '+0000' or $timezoneOffset = '-0000' or $timezoneOffset = 'GMT'">Z</xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="concat(substring($timezoneOffset, 1, 3), ':', substring($timezoneOffset, 4, 2))"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
    <xsl:variable name="isoDateTime" select="concat($formattedDate, 'T', $time, $isoTimezone)"/>
    <time datetime="{$isoDateTime}" title="发布于 {$isoDateTime}">
      <xsl:value-of select="$formattedDate"/>
    </time>
  </xsl:template>
</xsl:stylesheet>
