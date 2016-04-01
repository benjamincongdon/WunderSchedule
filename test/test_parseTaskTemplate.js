var assert = require('assert');
var expect = require('chai').expect;

var parse = require('./../utils/parseTaskTemplate.js')

describe('parseTaskTemplate.js', function () {

  describe('parseDateString()', function () {
    it('should return 1 second ago when passed \'today\'', function () {
    	var correct = Date.today().setTimeToNow().addSeconds(-1);
    	expect(parse.parseDateString('today').toString()).to.equal(correct.toString());
    });

    it('should handle the MM/DD/YYYY format', function () {
    	var correct = Date.parse("11/22/2033");
    	expect(parse.parseDateString('11/22/2033').toString()).to.equal(correct.toString())
    });
  });
  
  describe('templateToNoteString()', function () {
    it('should return empty str with empty template', function () {
      expect(parse.templateToNoteString({})).to.equal("");
    });

    it('should properly parse starred', function (){
      var template = {starred: true};
      expect(parse.templateToNoteString(template)).to.equal("starred\n")
    });

    it('should properly parse list', function (){
      var template = {list: 'test'};
      expect(parse.templateToNoteString(template)).to.equal("list: test\n")
    });

    it('should properly parse note', function (){
      var template = {note: 'hello world'};
      expect(parse.templateToNoteString(template)).to.equal("note: hello world\n")
    });
    it('should properly parse due_date, repeat_every, and start_date', function (){
      var testDate = Date.parse("1/1/2020")
      var template = {due_date: testDate, start_date: testDate, due_date: testDate};
      var correct = "due-date: 2020/01/01 00:00:00\nstart-date: 2020/01/01 00:00:00\n"
      expect(parse.templateToNoteString(template)).to.equal(correct)
    });
  });

  describe('updateTemplateWithRepeat()', function () {
    //TODO
  });
});