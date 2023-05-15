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
    <p class="mb-4 mt-5">
      If you do not live in China, you can
      <a href="https://ko-fi.com/ouuan">
        <img
          src="/images/kofi2.webp"
          class="inline max-h-9 w-auto"
          alt="Buy Me a Coffee"
          width="286"
          height="73"
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
        :heading-level="2"
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
        <div class="my-4">
          <span>sha256</span>
          <pre>065939a6a9d67a4ae6a53e1732bae0a3063d852f94a63d39b5a3193226096565  alipay-donate.png
a2905f45d2a705de7974656c7e98394e7ea568b14665d0346d0f69f3d0d04bbe  wechat-donate.png</pre>
        </div>
        <div class="my-4">
          <span>BLAKE3</span>
          <pre>1c0692de813ee433046a0c7b3f56b9bbedc0d2fd052e196fadd952323a4b4775  alipay-donate.png
55431cd11d922b5b479641f8b22c457a3b2c4bbef6ad90a29e1024d75ceaf53a  wechat-donate.png</pre>
        </div>
      </Card>
    </div>
  </div>
</template>
