<page>
title: 赞赏支持
description: 如果喜欢 ouuan 的博客或者其他项目，可以扫码赞赏支持～
</page>

<template layout="base">
  <div class="m-4 standard-card">
    <h1
      class="my-3 text-6 font-bold font-serif"
      itemprop="headline"
    >
      赞赏支持
    </h1>
    <p class="mt-5 mb-4">
      If you do not live in China, you can
      <a href="https://ko-fi.com/ouuan">
        <img
          src="/images/kofi2.webp"
          class="inline max-h-9"
          alt="Buy Me a Coffee"
        >
      </a>
      on
      <span class="article-style font-sans">
        <a href="https://ko-fi.com/ouuan">ko-fi.com</a>
      </span>.
    </p>
    <p>如果喜欢我的博客或者其他项目，可以扫码赞赏支持～</p>
    <sponsor-request />
    <div class="article-style">
      <Card
        fold
        type="info"
        title="二维码校验信息"
        class="font-mono"
      >
        <p>
          原图:
          <a
            href="/images/wechat-donate.png"
            download
          >wechat-donate.png</a>
          &nbsp;
          <a
            href="/images/alipay-donate.png"
            download
          >alipay-donate.png</a>
        </p>
        <p>
          GPG 公钥:
          <a href="https://github.com/ouuan.gpg">
            <samp>863A0F9FA8127FA4</samp>
          </a>
          <br>
          GPG 签名:
          <a
            href="/images/wechat-donate.png.sig"
            download
          >wechat-donate.png.sig</a>
          &nbsp;
          <a
            href="/images/alipay-donate.png.sig"
            download
          >alipay-donate.png.sig</a>
        </p>
        <div class="my-6">
          <span>sha256</span>
          <pre>877c0b52ea6cddb99cb510da8cd02d099abf3f94874d6290fb7abd5f688bd092  alipay-donate.png
75a49c81a772ba3cbe00e489b3542275053707e00f8c2884653fa3bb3642ace0  wechat-donate.png</pre>
        </div>
        <div class="my-6">
          <span>BLAKE3</span>
          <pre>6569d9733bc5f1df7f254cfa29135e3f306cc6318d1cf3fc9bf8c50d813c31c6  alipay-donate.png
7c55f893ee9b149831434aecad4a8d5df4a033a2b21dc4ebcc4ae0b32f4685d8  wechat-donate.png</pre>
        </div>
      </Card>
    </div>
  </div>
</template>
