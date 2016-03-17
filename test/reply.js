'use strict';

/* eslint camelcase: [2, {properties: "never"}] */
/* eslint space-before-function-paren: [2, "never"] */
/* eslint-env es6 */

var assert = require('assert');
var nodeWeixinMessage = require('../');

var x2j = require('xml2js');

describe('node-weixin-message should reply', function() {
  it('it should be able to reply text', function(done) {
    var reply = nodeWeixinMessage.reply;
    var text = reply.text('a', 'b', 'content');
    x2j.parseString(text, {
      explicitArray: false,
      ignoreAttrs: true
    }, function(error, data) {
      var json = data.xml;
      assert.equal(true, json.FromUserName === 'a');
      assert.equal(true, json.ToUserName === 'b');
      assert.equal(true, json.MsgType === 'text');
      assert.equal(true, json.Content === 'content');
      assert.equal(true, new Date(parseInt(json.CreateTime, 10)).getTime() > 0);
      done();
    });
  });

  it('it should be able to reply image', function(done) {
    var reply = nodeWeixinMessage.reply;
    var image = reply.image('a', 'b', 'mediaId');

    x2j.parseString(image, {
      explicitArray: false,
      ignoreAttrs: true
    }, function(error, data) {
      var json = data.xml;
      assert.equal(true, json.FromUserName === 'a');
      assert.equal(true, json.ToUserName === 'b');
      assert.equal(true, json.MsgType === 'image');
      assert.equal(true, json.Image.MediaId === 'mediaId');
      assert.equal(true, new Date(parseInt(json.CreateTime, 10)).getTime() > 0);
      done();
    });
  });

  it('it should be able to reply voice', function(done) {
    var reply = nodeWeixinMessage.reply;
    var voice = reply.voice('a', 'b', 'mediaId');
    x2j.parseString(voice, {
      explicitArray: false,
      ignoreAttrs: true
    }, function(error, data) {
      var json = data.xml;
      assert.equal(true, json.FromUserName === 'a');
      assert.equal(true, json.ToUserName === 'b');
      assert.equal(true, json.MsgType === 'voice');
      assert.equal(true, json.Voice.MediaId === 'mediaId');
      assert.equal(true, new Date(parseInt(json.CreateTime, 10)).getTime() > 0);
      done();
    });
  });

  it('it should be able to reply video', function(done) {
    var reply = nodeWeixinMessage.reply;
    var video = reply.video('a', 'b', 'mediaId', 'title', 'desc');
    x2j.parseString(video, {
      explicitArray: false,
      ignoreAttrs: true
    }, function(error, data) {
      var json = data.xml;
      assert.equal(true, json.FromUserName === 'a');
      assert.equal(true, json.ToUserName === 'b');
      assert.equal(true, json.MsgType === 'video');
      assert.equal(true, json.Video.MediaId === 'mediaId');
      assert.equal(true, json.Video.Title === 'title');
      assert.equal(true, json.Video.Description === 'desc');
      assert.equal(true, new Date(parseInt(json.CreateTime, 10)).getTime() > 0);
      done();
    });
  });

  it('it should be able to reply music', function(done) {
    var reply = nodeWeixinMessage.reply;
    var music = reply.music('a', 'b', 'mediaId', 'title', 'desc',
      'http://www.music1.com', 'http://www.music2.com');
    x2j.parseString(music, {
      explicitArray: false,
      ignoreAttrs: true
    }, function(error, data) {
      var json = data.xml;
      assert.equal(true, json.FromUserName === 'a');
      assert.equal(true, json.ToUserName === 'b');
      assert.equal(true, json.MsgType === 'music');
      assert.equal(true, json.Music.ThumbMediaId === 'mediaId');
      assert.equal(true, json.Music.Title === 'title');
      assert.equal(true, json.Music.Description === 'desc');
      assert.equal(true, json.Music.MusicUrl === 'http://www.music1.com');
      assert.equal(true, json.Music.HQMusicUrl === 'http://www.music2.com');
      assert.equal(true, new Date(parseInt(json.CreateTime, 10)).getTime() > 0);
      done();
    });
  });

  it('it should be able to reply news', function(done) {
    var reply = nodeWeixinMessage.reply;
    var news = reply.news('a', 'b', [{
      title: 'title1',
      description: 'description1',
      picUrl: 'picUrl1',
      url: 'url1'
    }, {
      title: 'title2',
      description: 'description2',
      picUrl: 'picUrl2',
      url: 'url2'
    }, {
      title: 'title3',
      description: 'description3',
      picUrl: 'picUrl3',
      url: 'url3'
    }]);
    x2j.parseString(news, {
      explicitArray: false,
      ignoreAttrs: true
    }, function(error, data) {
      var json = data.xml;
      assert.equal(true, json.FromUserName === 'a');
      assert.equal(true, json.ToUserName === 'b');
      assert.equal(true, json.MsgType === 'news');
      assert.equal(true, json.ArticleCount === '3');
      assert.equal(true, json.Articles.item.length === 3);
      assert.equal(true, new Date(parseInt(json.CreateTime, 10)).getTime() > 0);

      var items = json.Articles.item;
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var idx = i + 1;

        assert.equal(true, item.Title === 'title' + idx);
        assert.equal(true, item.Description === 'description' + idx);
        assert.equal(true, item.PicUrl === 'picUrl' + idx);
        assert.equal(true, item.Url === 'url' + idx);
      }
      done();
    });
  });
});
