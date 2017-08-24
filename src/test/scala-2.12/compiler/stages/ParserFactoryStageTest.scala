package compiler.stages

import Fixture.TestBase
import compiler_new.SnippetStageOutput
import compiler_new.stages.{FinderStage, ParserFactoryStage, SnippetStage}
import org.scalatest.FunSpec
import play.api.libs.json.JsString
import sdk.descriptions.Component.CodeTypes.{apply => _, _}
import sdk.descriptions.Component.Types._
import sdk.descriptions.Finders.Finder.StringRules
import sdk.descriptions.Finders.StringFinder
import sdk.descriptions.{Component, Lens, Snippet}
import sourcegear.gears.ParseGear

import scala.util.Try

class ParserFactoryStageTest extends TestBase {

  describe("Parser factory stage") {

    def parseGearFromSnippetWithComponents(block: String, components: Vector[Component]) : ParseGear = {
      val snippet = Snippet("Testing", "Javascript", "es6", block)
      implicit val lens : Lens = Lens("Example", null, snippet, Vector(), components)

      val snippetBuilder = new SnippetStage(snippet)
      val snippetOutput = snippetBuilder.run
      val finderStage = new FinderStage(snippetOutput)
      val finderStageOutput = finderStage.run
      val parserFactoryStage = new ParserFactoryStage(finderStageOutput)
      val output = parserFactoryStage.run

      output.parseGear
    }

    def sample(block: String) : SnippetStageOutput = {
      val snippet = Snippet("Testing", "Javascript", "es6", block)
      implicit val lens : Lens = Lens("Example", null, snippet, Vector(), Vector())
      val snippetBuilder = new SnippetStage(snippet)
      snippetBuilder.run
    }

    it("Can build a valid description from snippet") {
      val block = "var hello = require('world')"

      val parseGear = parseGearFromSnippetWithComponents("var hello = require('world')", Vector())
      println(parseGear.description.toString)
      assert(parseGear.description.toString == """NodeDesc(AstType(VariableDeclaration,Javascript),null,Map(kind -> "var"),Vector(NodeDesc(AstType(VariableDeclarator,Javascript),declarations,Map(),Vector(NodeDesc(AstType(Identifier,Javascript),id,Map(name -> "hello"),Vector(),Vector()), NodeDesc(AstType(CallExpression,Javascript),init,Map(),Vector(NodeDesc(AstType(Identifier,Javascript),callee,Map(name -> "require"),Vector(),Vector()), NodeDesc(AstType(Literal,Javascript),arguments,Map(value -> "world"),Vector(),Vector())),Vector())),Vector())),Vector())""")
    }

    it("Can match its original snippet to the description") {
      val parseGear = parseGearFromSnippetWithComponents("var hello = require('world')", Vector())

      val block = "var hello = require('world')"

      val parsedSample = sample(block)
      val result = parseGear.matches(parsedSample.entryChildren.head)(parsedSample.astGraph, block)
      assert(result.isMatch)
    }

    it("fails to match a different snippet than the description") {
      val parseGear = parseGearFromSnippetWithComponents("var hello = require('world')", Vector())

      val block = "var goodbye = notRequire('nation')"

      val parsedSample = sample(block)
      val result = parseGear.matches(parsedSample.entryChildren.head)(parsedSample.astGraph, block)
      assert(!result.isMatch)

    }

    describe("with rules") {

      it("Matches any value for a token component/extracts value") {
        val parseGear = parseGearFromSnippetWithComponents("var hello = require('world')", Vector(
          //this causes any token rule to be applied
          Component(Code, Token, "definedAs", StringFinder(StringRules.Entire, "hello"))
        ))

        val block = "var otherValue = require('world')"

        val parsedSample = sample(block)
        val result = parseGear.matches(parsedSample.entryChildren.head, true)(parsedSample.astGraph, block)
        assert(result.isMatch)
        assert(result.extracted.isDefined)
        assert(result.extracted.get.head.value == JsString("otherValue"))
      }

    }


  }

}
